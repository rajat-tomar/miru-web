# frozen_string_literal: true

class InternalApi::V1::ClientsController < InternalApi::V1::ApplicationController
  def index
    authorize Client
    query = current_company.clients.kept.ransack({ name_or_email_cont: params[:q] })
    clients = query.result(distinct: true)
    client_details = clients.map { |client| client.client_detail(params[:time_frame]) }
    total_minutes = (client_details.map { |client| client[:minutes_spent] }).sum
    overdue_outstanding_amount = current_company.overdue_and_outstanding_and_draft_amount
    render json: { client_details:, total_minutes:, overdue_outstanding_amount: }, status: :ok
  end

  def create
    authorize Client

    client = Client.create!(client_params)

    if client
      render :create, locals: { client:, address: client.current_address }
    end
  end

  def show
    authorize client

    render json: {
             client_details: Client::ShowPresenter.new(client).process,
             project_details: client.project_details(params[:time_frame]),
             total_minutes: client.total_hours_logged(params[:time_frame]),
             overdue_outstanding_amount: client.client_overdue_and_outstanding_calculation
           },
      status: :ok
  end

  def update
    authorize client

    if client.update!(update_client_params)
      render json: {
        success: true,
        client:,
        notice: I18n.t("client.update.success.message")
      }, status: :ok
    end
  end

  def destroy
    authorize client

    if client.discard!
      render json: {
        client:,
        notice: I18n.t("client.delete.success.message")
      }, status: :ok
    end
  end

  private

    def client
      @_client ||= Client.find(params[:id])
    end

    def client_params
      params.require(:client).permit(
        policy(Client).permitted_attributes
      ).tap do |client_params|
        client_params[:company_id] = current_company.id
      end
    end

    def update_client_params
      if client_params.key?(:logo) && client_params[:logo].blank?
        client.logo.destroy
        client_params.except(:logo)
      else
        client_params
      end
    end
end

# frozen_string_literal: true

module Reports::ClientRevenues
  class IndexService
    attr_reader :params, :current_company

    def initialize(params, current_company)
      @params = params
      @current_company = current_company
    end

    def process
      {
        clients:,
        summary:
      }
    end

    private

      def clients
        current_clients.includes(:invoices).map do |client|
          client.payment_summary(duration_params).merge({ name: client.name, logo: client.logo_url })
        end
      end

      def summary
        total_paid_amount = clients.pluck(:paid_amount).sum
        total_outstanding_amount = clients.pluck(:outstanding_amount).sum
        {
          total_paid_amount:,
          total_outstanding_amount:,
          total_revenue: total_paid_amount + total_outstanding_amount
        }
      end

      def current_clients
        @_current_clients ||= client_ids_params.blank? ?
        billable_clients : billable_clients.where(id: client_ids_params)
      end

      def client_ids_params
        JSON.parse(params[:client_ids]) if params[:client_ids].present?
      end

      def duration_params
        if params[:duration_from].present? && params[:duration_to].present?
          params[:duration_from].to_date..params[:duration_to].to_date
        end
      end

      def billable_clients
        current_company.billable_clients
      end
  end
end

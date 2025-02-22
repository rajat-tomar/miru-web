# frozen_string_literal: true

class Invoices::PaymentsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized
  before_action :load_invoice
  before_action :ensure_invoice_unpaid, only: [:new]

  def new
    session = @invoice.create_checkout_session!(
      success_url: request.base_url + "/invoices/#{@invoice.id}/payments/success",
      cancel_url: cancel_invoice_payments_url(@invoice)
    )

    redirect_to session.url, allow_other_host: true
  end

  def cancel
    render
  end

  private

    def load_invoice
      @invoice = Invoice.includes(client: :company).find(params[:invoice_id])
    end

    def ensure_invoice_unpaid
      if @invoice.paid?
        redirect_to request.base_url + "/invoices/#{@invoice.id}/payments/success"
      end
    end
end

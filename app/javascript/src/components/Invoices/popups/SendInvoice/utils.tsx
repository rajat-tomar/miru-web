import dayjs from "dayjs";
import { currencyFormat } from "helpers";
import * as Yup from "yup";

import { ApiStatus as InvoiceStatus } from "constants/index";

export const isEmailValid = (email: string): boolean => {
  const schema = Yup.string().email();

  return schema.isValidSync(email);
};

export const emailSubject = (invoice: any): string =>
  `${invoice.company.name} sent you an invoice (${invoice.invoiceNumber})`;

export const emailBody = (invoice: any): string => {
  const formattedAmount = currencyFormat(
    invoice.company.baseCurrency || invoice.company.currency,
    invoice.amount
  );

  const dueDate = dayjs(invoice.dueDate, invoice.company.dateFormat).format(
    invoice.company.dateFormat || "DD.MM.YYYY"
  );

  return `${invoice.company.name} has sent you an invoice (${invoice.invoiceNumber}) for ${formattedAmount} that's due on ${dueDate}.`;
};

export const isDisabled = (status: string): boolean =>
  status === InvoiceStatus.LOADING || status === InvoiceStatus.SUCCESS;

export const buttonText = (status: string): string =>
  status === InvoiceStatus.SUCCESS ? "🎉  Invoice Sent!" : "Send Invoice";

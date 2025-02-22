import React from "react";

import ClientInfo from "./ClientInfo";
import InvoiceInfo from "./InvoiceInfo";
import InvoiceLineItems from "./InvoiceLineItems";
import InvoiceTotalSummary from "./InvoiceTotalSummary";

import CompanyInfo from "../common/CompanyInfo";

const InvoiceDetails = ({ invoice }) => {
  const invoiceWaived = invoice?.status === "waived";
  const strikeAmount = invoiceWaived && "line-through";

  return (
    <>
      <CompanyInfo company={invoice.company} />
      <div className="flex h-40 justify-between border-b border-miru-gray-400 px-10 py-5">
        <ClientInfo client={invoice.client} />
        <InvoiceInfo invoice={invoice} strikeAmount={strikeAmount} />
      </div>
      <InvoiceLineItems
        showHeader
        currency={invoice.company.currency}
        dateFormat={invoice.company.dateFormat}
        items={invoice.invoiceLineItems}
        strikeAmount={strikeAmount}
      />
      <InvoiceTotalSummary invoice={invoice} strikeAmount={strikeAmount} />
    </>
  );
};

export default InvoiceDetails;

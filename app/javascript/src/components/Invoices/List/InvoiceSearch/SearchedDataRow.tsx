import React from "react";

import dayjs from "dayjs";
import { currencyFormat } from "helpers";
import { useNavigate } from "react-router-dom";

import getStatusCssClass from "utils/getBadgeStatus";

const formattedDate = (date, format) => dayjs(date).format(format);

const SearchDataRow = ({ invoice }) => {
  const navigate = useNavigate();

  const handleClick = invoice => {
    navigate(`/invoices/${invoice.id}`);
  };

  return (
    <div
      className="group flex cursor-pointer items-center py-2 last:border-b-0 hover:bg-miru-gray-100"
      onClick={() => handleClick(invoice)}
    >
      <div className="ftracking-wider w-5/12 px-2/100 font-medium">
        <div className="font-semibold capitalize text-miru-dark-purple-1000">
          {invoice.client.name}
        </div>
        <div className="text-sm font-normal text-miru-dark-purple-400">
          {invoice.invoiceNumber}
        </div>
      </div>
      <div className="w-4/12 px-2/100 font-medium tracking-wider">
        {currencyFormat(invoice.company.baseCurrency, invoice.amount)}
        <div className="text-sm font-normal text-miru-dark-purple-400">
          {formattedDate(invoice.issueDate, invoice.company.dateFormat)}
        </div>
      </div>
      <div className="w-3/12 px-2/100 font-medium">
        <span className={`${getStatusCssClass(invoice.status)} uppercase`}>
          {invoice.status}
        </span>
      </div>
    </div>
  );
};

export default SearchDataRow;

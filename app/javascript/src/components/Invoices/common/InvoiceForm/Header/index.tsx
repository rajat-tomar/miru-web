import React, { useState, useRef } from "react";

import { useOutsideClick } from "helpers";
import { XIcon, FloppyDiskIcon, PaperPlaneTiltIcon } from "miruIcons";
import { Link } from "react-router-dom";

import MoreButton from "../../MoreButton";
import MoreOptions from "../../MoreOptions";

const Header = ({
  formType = "generate",
  handleSaveInvoice,
  handleSendInvoice,
  setShowInvoiceSetting, //eslint-disable-line
  invoiceNumber = null,
  id = null,
  deleteInvoice = null,
  wavieInvoice = null,
  showMoreButton = false,
}) => {
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] =
    useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideClick(
    wrapperRef,
    () => setIsMoreOptionsVisible(false),
    isMoreOptionsVisible
  );

  return (
    <div className="mt-6 mb-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex">
        <h2 className="header__title font-bold">
          {formType == "edit"
            ? `Edit Invoice #${invoiceNumber}`
            : "Generate Invoice"}
        </h2>
      </div>
      <div className="flex flex-col md:w-2/5 md:flex-row">
        <Link
          className="header__button my-1 p-0 md:my-0 md:w-1/3"
          to={formType == "edit" ? `/invoices/${id}` : "/invoices"}
          type="button"
        >
          <XIcon size={12} />
          <span className="ml-2 inline-block" id="cancelEditInvoiceButton">
            CANCEL
          </span>
        </Link>
        <button
          className="header__button my-1 bg-miru-han-purple-1000 p-0 text-white hover:text-white md:my-0 md:w-1/3"
          id="saveInvoiceButton"
          type="button"
          onClick={handleSaveInvoice}
        >
          <FloppyDiskIcon color="white" size={18} />
          <span className="ml-2 inline-block">SAVE</span>
        </button>
        <button
          className="header__button my-1 bg-miru-han-purple-1000 p-0 text-white hover:text-white md:my-0 md:w-1/3"
          type="button"
          onClick={handleSendInvoice}
        >
          <PaperPlaneTiltIcon color="White" size={18} />
          <span className="ml-2 inline-block" id="sendInvoiceButton">
            SEND TO
          </span>
        </button>
        {showMoreButton && (
          <div ref={wrapperRef}>
            <MoreButton
              onClick={() => setIsMoreOptionsVisible(!isMoreOptionsVisible)}
            />
            {isMoreOptionsVisible && (
              <MoreOptions
                deleteInvoice={deleteInvoice}
                downloadInvoice={null}
                invoice={undefined}
                markInvoiceAsPaid={() => null}
                wavieInvoice={wavieInvoice}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

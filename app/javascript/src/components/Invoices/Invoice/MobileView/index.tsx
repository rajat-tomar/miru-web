import React, { useState } from "react";

import {
  PaperPlaneTiltIcon,
  PrinterIcon,
  DeleteIcon,
  DotsThreeVerticalIcon,
  ArrowLeftIcon,
  EditIcon,
  WaiveSVG,
} from "miruIcons";
import { useNavigate } from "react-router-dom";
import { Button, MobileMoreOptions, Badge } from "StyledComponents";

import CompanyInfo from "components/Invoices/common/CompanyInfo";
import InvoiceInfo from "components/Invoices/Generate/MobileView/Container/InvoicePreview/InvoiceInfo";
import InvoiceTotal from "components/Invoices/Generate/MobileView/Container/InvoicePreview/InvoiceTotal";
import LineItems from "components/Invoices/Generate/MobileView/Container/MenuContainer/LineItems";
import DeleteInvoice from "components/Invoices/popups/DeleteInvoice";
import WavieOffInvoice from "components/Invoices/popups/WavieOffInvoice";
import getStatusCssClass from "utils/getBadgeStatus";

const MobileView = ({ invoice, handleSendInvoice }) => {
  const {
    id,
    invoiceLineItems,
    tax,
    discount,
    invoiceNumber,
    status,
    company,
    amount,
    dueDate,
    issueDate,
    reference,
    client,
    amountDue,
    amountPaid,
  } = invoice;
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showWavieDialog, setShowWavieDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const subTotal = invoiceLineItems.reduce(
    (prev, curr) => prev + (curr.rate * curr.quantity) / 60,
    0
  );
  const total = Number(subTotal) + Number(tax) - Number(discount);
  const invoiceWaived = invoice?.status === "waived";
  const strikeAmount = invoice?.status === "waived" && "line-through";

  return (
    <div className="h-full">
      <div className="sticky top-0 left-0 right-0 z-50 flex h-12 items-center bg-white px-4 shadow-c1">
        <div className="flex items-center">
          <Button
            style="ternary"
            onClick={() => {
              navigate("/invoices");
            }}
          >
            <ArrowLeftIcon
              className="mr-4 text-miru-dark-purple-1000"
              size={16}
              weight="bold"
            />
          </Button>
          <span>Invoice #{invoiceNumber}</span>
        </div>
        <div>
          <Badge
            className={`${getStatusCssClass(status)} uppercase`}
            text={status}
          />
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <CompanyInfo company={company} />
        <InvoiceInfo
          amount={amount}
          currency={company.currency}
          dateFormat={company.dateFormat}
          dueDate={dueDate}
          invoiceNumber={invoiceNumber}
          issueDate={issueDate}
          reference={reference}
          selectedClient={client}
          setActiveSection={() => {}} //eslint-disable-line
          showEditButton={false}
          strikeAmount={strikeAmount}
        />
        <div className="border-b border-miru-gray-400 px-4 py-2">
          <LineItems
            isInvoicePreviewCall
            currency={company.currency}
            dateFormat={company.dateFormat}
            manualEntryArr={[]}
            selectedClient={client}
            selectedLineItems={invoiceLineItems}
            setActiveSection={() => {}} //eslint-disable-line
            setEditItem={() => {}} //eslint-disable-line
            strikeAmount={strikeAmount}
          />
        </div>
        <InvoiceTotal
          amountDue={amountDue}
          amountPaid={amountPaid}
          currency={company.currency}
          discount={discount}
          setActiveSection={() => {}} //eslint-disable-line
          showEditButton={false}
          strikeAmount={strikeAmount}
          subTotal={subTotal}
          tax={tax}
          total={total}
        />
      </div>
      {!invoiceWaived && (
        <>
          <div className="sticky bottom-0 left-0 right-0 z-50 flex w-full items-center justify-between  bg-white p-4 shadow-c1">
            <Button
              className="mr-2 flex w-1/2 items-center justify-center px-4 py-2"
              style="primary"
              onClick={() => {
                navigate(`/invoices/${invoice.id}/edit`);
              }}
            >
              <EditIcon className="text-white" size={16} weight="bold" />
              <span className="ml-2 text-center text-base font-bold leading-5 text-white">
                Edit
              </span>
            </Button>
            <Button
              className="ml-2 flex w-1/2 items-center justify-center px-4 py-2"
              style="primary"
              onClick={handleSendInvoice}
            >
              <PaperPlaneTiltIcon
                className="text-white"
                size={16}
                weight="bold"
              />
              <span className="ml-2 text-center text-base font-bold leading-5 text-white">
                Send to
              </span>
            </Button>
            <Button onClick={() => setShowMoreOptions(true)}>
              <DotsThreeVerticalIcon
                className="ml-4 text-miru-han-purple-1000"
                size={20}
                weight="bold"
              />
            </Button>
          </div>
          {showMoreOptions && (
            <MobileMoreOptions
              setVisibilty={setShowMoreOptions}
              visibilty={showMoreOptions}
            >
              {["sent", "overdue", "viewed"].includes(invoice?.status) && (
                <li
                  className="flex cursor-pointer items-center py-2 px-5 text-sm text-miru-han-purple-1000 hover:bg-miru-gray-100 lg:py-1 xl:py-2"
                  onClick={() => {
                    setShowMoreOptions(false);
                    setShowWavieDialog(true);
                  }}
                >
                  <img
                    className="mr-4"
                    height="16px"
                    src={WaiveSVG}
                    width="16px"
                  />
                  Waive Off
                </li>
              )}
              <li
                className="flex cursor-pointer items-center py-2 px-5 text-sm text-miru-red-400 hover:bg-miru-gray-100 lg:py-1 xl:py-2"
                onClick={() => {
                  setShowMoreOptions(false);
                  setShowDeleteDialog(true);
                }}
              >
                <DeleteIcon
                  className="mr-4 text-miru-red-400"
                  size={16}
                  weight="bold"
                />
                Delete
              </li>
              {status == "DRAFT" && (
                <li className="flex cursor-pointer items-center px-5 py-2 text-sm text-miru-han-purple-1000 hover:bg-miru-gray-100 lg:py-1 xl:py-2">
                  <PrinterIcon
                    className="mr-4 text-miru-han-purple-1000"
                    size={16}
                    weight="bold"
                  />
                  Download
                </li>
              )}
            </MobileMoreOptions>
          )}
          {showDeleteDialog && (
            <DeleteInvoice
              invoice={id}
              setShowDeleteDialog={setShowDeleteDialog}
              showDeleteDialog={showDeleteDialog}
            />
          )}
          {showWavieDialog && (
            <WavieOffInvoice
              invoice={id}
              invoiceNumber={invoiceNumber}
              setShowWavieDialog={setShowWavieDialog}
              showWavieDialog={showWavieDialog}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MobileView;

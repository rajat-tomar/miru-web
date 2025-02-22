/* eslint-disable import/exports-last */

import React from "react";

import classNames from "classnames";

const defaultInputBoxClassName =
  "form__input block w-full appearance-none bg-white p-4 text-sm lg:text-base h-12 border-miru-gray-1000";
const defaultWrapperClassName = "outline relative h-12";
const defaultLabelClassname =
  "absolute top-0.5 h-6 z-1 origin-0 bg-white p-2 text-sm lg:text-base font-medium text-miru-dark-purple-200 duration-300";

type customInputTextProps = {
  id?: string;
  inputBoxClassName?: string;
  disabled?: boolean;
  name?: string;
  type?: string;
  value: any;
  onChange: any;
  labelClassName?: string;
  label?: string;
  wrapperClassName?: string;
  moveLabelToRightClassName?: string;
  moveLabelToLeftClassName?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  step?: any;
  min?: any;
  onFocus?: (e?: any) => void; // eslint-disable-line
  onBlur?: (e?: any) => void; // eslint-disable-line
  onClick?: (e?: any) => void; // eslint-disable-line
};

export const CustomInputText = ({
  id,
  inputBoxClassName,
  disabled,
  name,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  labelClassName,
  label,
  wrapperClassName,
  moveLabelToRightClassName,
  moveLabelToLeftClassName,
  readOnly,
  step,
  min,
  onClick,
  autoFocus,
}: customInputTextProps) => (
  <div className="field relative">
    <div className={classNames(defaultWrapperClassName, wrapperClassName)}>
      <input
        autoFocus={autoFocus}
        className={classNames(defaultInputBoxClassName, inputBoxClassName)}
        disabled={disabled}
        id={id}
        min={min}
        name={name}
        placeholder=" "
        readOnly={readOnly}
        step={step}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
      />
      <label
        htmlFor={name}
        className={classNames([
          defaultLabelClassname,
          labelClassName,
          moveLabelToRightClassName?.trim()
            ? moveLabelToRightClassName
            : moveLabelToLeftClassName,
        ])}
      >
        {label}
      </label>
    </div>
  </div>
);

CustomInputText.defaultProps = {
  type: "text",
  disabled: false,
  readOnly: false,
  autoFocus: false,
  step: 1,
  min: null,
  moveLabelToLeftClassName: "left-1",
  moveLabelToRightClassName: "",
  onChange: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onFocus: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onBlur: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onClick: () => {}, // eslint-disable-line
};

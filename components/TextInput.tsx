"use client";
import React, { useState } from "react";
import { IconType } from "react-icons";
import useCompany from "./hooks/useCompany";
import useDynamicClasses from "./hooks/useDynamicClasses";
import Input from "./common/Input";

interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  secureEntry?: boolean;
  value?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: IconType;
  iconAction?: () => void;
  maxLength?: number;
  id?: string;
  name?: string;
  required?: boolean;
}

const TextInput = (props: TextInputProps) => {
  const {
    maxLength,
    disabled,
    value,
    defaultValue,
    onChange,
    secureEntry,
    placeholder,
    icon: Icon,
    iconAction,
    id,
    name,
    required,
  } = props;
  const [_isFocus, setIsFocus] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        required={required}
        maxLength={maxLength}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        disabled={disabled}
        id={id}
        name={name || id}
        type={secureEntry ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />

      {Icon && (
        <div className="absolute flex items-center justify-center inset-y-0 right-0 my-auto pr-4">
          <Icon
            onClick={iconAction}
            size={16}
            className="cursor-pointer text-gray-600"
          />
        </div>
      )}
    </div>
  );
};

export default TextInput;

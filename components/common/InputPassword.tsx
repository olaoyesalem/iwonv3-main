"use client";

import { useState } from "react";
import Icon from "./FontawesomeIcon";
import Input from "./Input";

interface propTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputPassword = ({ value, ...rest }: propTypes) => {
  const [showPass, set_showPass] = useState(false);

  return (
    <div className="group relative">
      <Input
        autoComplete="on"
        type={showPass ? "text" : "password"}
        placeholder={rest.placeholder || rest?.label || "Password"}
        required={true}
        {...rest}
      />

      <div
        onClick={() => set_showPass((p) => !p)}
        className="text-gray-400 hover:text-primary-600 absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-base"
      >
        {showPass ? <Icon icon="eye" /> : <Icon icon="eye-slash" />}
      </div>
    </div>
  );
};

export default InputPassword;

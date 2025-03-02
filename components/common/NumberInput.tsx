import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import Input from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setValue?: any;
  getValue?: (value: number) => void;
  maxNumber?: number;
}

export default function NumberInput({
  getValue,
  maxNumber,
  setValue,
  ...all
}: Props) {
  const [number, setNumber] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!isNaN(value as any) && !value?.includes("-")) {
      const nNumber = Number(value);
      if (maxNumber && nNumber > Number(maxNumber)) {
        maxNumber && setNumber(maxNumber?.toString());
        getValue && getValue(maxNumber);
        return;
      }

      setNumber(value);
      getValue && getValue(Number(value));
    }
  }

  useEffect(() => {
    if (setValue?.toString()) {
      setNumber(setValue);
    }
  }, [setValue]);

  return <Input value={number} onChange={handleChange} {...all} />;
}

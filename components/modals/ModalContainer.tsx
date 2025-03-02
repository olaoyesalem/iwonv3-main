"use client";
import { Modal } from "@mantine/core";
import React from "react";
import useTheme from "../hooks/useTheme";
import TailwindColorWrapper from "../TailwindColorWrapper";

interface ModalContainerProps {
  opened: boolean;
  onClose: () => void;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  title?: string;
  fullScreen?: boolean;
  children: React.ReactNode;
}

const ModalContainer = (props: ModalContainerProps) => {
  const { opened, onClose, size, title, children, fullScreen } = props;
  const { mode } = useTheme();

  return (
    <TailwindColorWrapper>
      <Modal
        fullScreen={fullScreen}
        opened={opened}
        onClose={onClose}
        title={title}
        centered
        size={size ? size : "md"}
        classNames={{
          header: `${
            mode === "light" ? "bg-white text-slate-700" : "!bg-dark text-white"
          }`,
          body: `${mode === "light" ? "bg-white" : "!bg-dark"}`,
          content: `${mode === "light" ? "text-slate-700" : "text-white"}`,
          title: `font-semibold text-lg`,
        }}
      >
        {children}
      </Modal>
    </TailwindColorWrapper>
  );
};

export default ModalContainer;

"use client";

import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

interface ConfirmationModalProps {
  title: string;
  content: React.ReactNode;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ModalProps["okButtonProps"];
  cancelButtonProps?: ModalProps["cancelButtonProps"];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  content,
  isVisible,
  onConfirm,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps,
  cancelButtonProps,
}) => {
  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      centered
    >
      {content}
    </Modal>
  );
};

export default ConfirmationModal;

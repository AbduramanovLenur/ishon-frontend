import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { close, stateViewObject } from "../model/slice";

import { ObjectDetails } from "@entities/objects";

const ViewObjectModal: FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isOpen, objectId } = useSelector(stateViewObject);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }

  if (!objectId) {
    message.error(t("objects.notFound"));
    handleClose();
    return null;
  }

  return (
    <Modal
      centered
      classNames={{
        close: 'centered',
        container:'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          paddingRight: 8,
        },
      }}
      open={isOpen}
      title={t("objects.details")}
      cancelText={t("common.cancel")}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={handleClose}
      zIndex={3000}
    >
      <ObjectDetails objectId={objectId} />
    </Modal>
  );
}

export default ViewObjectModal;

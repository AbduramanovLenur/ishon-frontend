import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { close, stateViewCompanyOwner } from "../model/slice";

import { DirectorDetails } from "@entities/directors";

const ViewCompanyOwnerModal: FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isOpen, companyOwnerId } = useSelector(stateViewCompanyOwner);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }

  if (!companyOwnerId) {
    message.error(t("directors.notFound"));
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
      open={isOpen}
      title={t("directors.details")}
      cancelText={t("common.cancel")}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={handleClose}
      zIndex={3000}
    >
      <DirectorDetails companyOwnerId={companyOwnerId} />
    </Modal>
  );
}

export default ViewCompanyOwnerModal;

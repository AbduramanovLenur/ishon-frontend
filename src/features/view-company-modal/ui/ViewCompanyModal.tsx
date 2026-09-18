import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { close, stateViewCompany } from "../model/slice";

import { CompanyDetails } from "@entities/companies";

const ViewCompanyModal: FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isOpen, companyId } = useSelector(stateViewCompany);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }

  if (!companyId) {
    message.error(t("companies.notFound"));
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
      title={t("companies.details")}
      cancelText={t("common.cancel")}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={handleClose}
      zIndex={3000}
    >
      <CompanyDetails companyId={companyId} />
    </Modal>
  );
}

export default ViewCompanyModal;

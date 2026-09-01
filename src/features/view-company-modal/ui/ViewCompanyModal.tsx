import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateViewCompany } from "../model/slice";

import { CompanyDetails } from "@entities/companies";

const ViewCompanyModal: FC = () => {
  const { message } = App.useApp();
  const { isOpen, companyId } = useSelector(stateViewCompany);
  const dispatch = useDispatch();

  const closeViewModalHandle = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }
  
  if (!companyId) {
    message.error('Kompaniya ma’lumotlari topilmadi');
    closeViewModalHandle();
    return;
  }

  return (
    <Modal 
      classNames={{
        close: 'centered',
        container:'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      open={isOpen}
      title={'Kompaniya tafsilotlari'}
      cancelText="Yopish"
      okButtonProps={{ style: { display: "none" } }}
      onCancel={closeViewModalHandle}
      style={{ zIndex: 1000 }}
    >
      <CompanyDetails companyId={companyId} />
    </Modal>
  );
}

export default ViewCompanyModal;
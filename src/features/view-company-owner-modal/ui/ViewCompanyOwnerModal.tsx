import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateViewCompanyOwner } from "../model/slice";

import { DirectorDetails } from "@entities/directors";

const ViewCompanyOwnerModal: FC = () => {
  const { message } = App.useApp();
  const { isOpen, companyOwnerId } = useSelector(stateViewCompanyOwner);
  const dispatch = useDispatch();

  const closeViewModalHandle = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }
  
  if (!companyOwnerId) {
    message.error('Kompaniya ma’lumotlari topilmadi');
    closeViewModalHandle();
    return;
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
      title="Direktor haqida ma’lumot"
      cancelText="Yopish"
      okButtonProps={{ style: { display: "none" } }}
      onCancel={closeViewModalHandle}
      style={{ zIndex: 1000 }}
    >
      <DirectorDetails companyOwnerId={companyOwnerId} />
    </Modal>
  );
}

export default ViewCompanyOwnerModal;
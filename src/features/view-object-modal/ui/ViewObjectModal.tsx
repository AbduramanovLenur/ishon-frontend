import type { FC } from "react";
import { App, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateViewObject } from "../model/slice";

import { ObjectDetails } from "@entities/objects";

const ViewObjectModal: FC = () => {
  const { message } = App.useApp();
  const { isOpen, objectId } = useSelector(stateViewObject);
  const dispatch = useDispatch();

  const closeViewModalHandle = () => {
    dispatch(close());
  }

  if (!isOpen) {
    return null;
  }
  
  if (!objectId) {
    message.error('Obyekt ma’lumotlari topilmadi');
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
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          paddingRight: 8,
        },
      }}
      open={isOpen}
      title="Obyekt haqida ma’lumot"
      cancelText="Yopish"
      okButtonProps={{ style: { display: "none" } }}
      onCancel={closeViewModalHandle}
      style={{ zIndex: 1000 }}
    >
      <ObjectDetails objectId={objectId} />
    </Modal>
  );
}

export default ViewObjectModal;
import { Modal } from "antd";
import type { FC } from "react";

export const ManageDirectorModal: FC = () => {
  return (
    <Modal
      classNames={{
        close: 'centered',
        container: 'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      title={"Hello"}
      open={true}
      okText="Saqlash"
      cancelText="Yopish"
    >
        
    </Modal>
  );
}

import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export const useDeleteCompany = () => {
  const [modal, contextHolder] = Modal.useModal();

  const confirmDelete = (id: number | string) => {
    modal.confirm({
      title: "Kompaniyani o‘chirish kerakmi?",
      icon: <DeleteOutlined style={{ color: "#ff0000" }} />,
      okText: "O'chirish",
      cancelText: "Bekor qilish",
      onOk: async () => {
        console.log("Удаляем компанию:", id);
        
      },
    });
  };

  return {
    confirmDelete,
    contextHolder,
  };
};
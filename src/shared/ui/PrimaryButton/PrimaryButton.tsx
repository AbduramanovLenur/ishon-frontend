import type { FC, ReactNode } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface IPrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const PrimaryButton: FC<IPrimaryButtonProps> = ({ children, onClick, className }) => {
  return (
    <Button 
      className={className}
      type="primary" 
      icon={<PlusOutlined />}
      onClick={onClick}
    >
      { children }
    </Button>
  );
}

export default PrimaryButton;
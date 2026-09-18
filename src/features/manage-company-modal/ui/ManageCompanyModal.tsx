import { useEffect, type FC } from "react";
import { Form, Input, InputNumber, Modal, Switch, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { close, stateManageCompany } from "../model/slice";
import type { IManageCompanyFields } from "../model/types";
import { useCreateCompany, useUpdateCompany } from "../model/mutations";

import { useCompanyById } from "@entities/companies";
import { status } from "@shared/config";

const ManageCompanyModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyFields>();
  const { isOpen, companyId } = useSelector(stateManageCompany);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompany();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompany();
  const isEdit = !!companyId;
  const title = isEdit ? t("companies.edit") : t("companies.create");
  const { data, isLoading } = useCompanyById(companyId, isEdit);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
        address: data.address,
        objectLimit: data.objectLimit,
        employeeLimit: data.employeeLimit,
        status: data.status === status.ACTIVE
      });
    }
  }, [data, isEdit, form]);

  const handleClose = () => {
    dispatch(close());
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }

  const handleSubmit: FormProps<IManageCompanyFields>['onFinish'] = (values) => {
    if (isEdit) {
      mutateAsyncUpdate({
        ...values,
        companyId,
        status: values.status ? status.ACTIVE : status.INACTIVE
      }, {
        onSuccess: handleClose
      })
      return;
    }

    mutateAsyncCreate(values, {
      onSuccess: handleClose
    });
  }

  return (
    <Modal
      centered
      classNames={{
        close: 'centered',
        container: 'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      title={title}
      open={isOpen}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={isPendingCreate || isPendingUpdate}
      zIndex={3000}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IManageCompanyFields>
          className="modal__item"
          layout="vertical"
          label={t("companies.name")}
          name="name"
          rules={[{
            required: true,
            message: t("companies.nameRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className="modal__item"
          layout="vertical"
          label={t("companies.address")}
          name="address"
          rules={[{
            required: true,
            message: t("companies.addressRequired")
          }]}
        >
          <Input
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className="modal__item"
          layout="vertical"
          label={t("companies.objectLimit")}
          name="objectLimit"
          rules={[{
            required: true,
            message: t("companies.objectLimitRequired")
          }]}
        >
          <InputNumber
            min={0}
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className="modal__item"
          layout="vertical"
          label={t("companies.employeeLimit")}
          name="employeeLimit"
          rules={[{
            required: true,
            message: t("companies.employeeLimitRequired")
          }]}
        >
          <InputNumber
            min={0}
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        {isEdit && <Form.Item<IManageCompanyFields>
          name="status"
          label={t("common.status")}
          valuePropName="checked"
          className="modal__switch not-margened-item"
        >
          <Switch />
        </Form.Item>}
      </Form>
    </Modal>
  );
}

export default ManageCompanyModal;

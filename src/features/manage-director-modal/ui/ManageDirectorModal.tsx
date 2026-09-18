import { useEffect, type FC } from "react";
import { Form, Input, Modal, Select, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-number-input';

import { close, stateManageCompanyOwner } from "../model/slice";
import type { IManageCompanyOwnerFields } from "../model/types";
import { useCreateCompanyOwner, useUpdateCompanyOwner } from "../model/mutations";

import { useCompanyOwnerById } from "@entities/directors";
import { useManualCompanyList } from "@entities/companies";

import 'react-phone-number-input/style.css';

const ManageDirectorModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyOwnerFields>();
  const { isOpen, companyOwnerId } = useSelector(stateManageCompanyOwner);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompanyOwner();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompanyOwner();
  const isEdit = !!companyOwnerId;
  const title = isEdit ? t("directors.edit") : t("directors.create");
  const { data, isLoading } = useCompanyOwnerById(companyOwnerId, isEdit);
  const { data: manualCompanyList, isLoading: isLoadingManualCompanyList } = useManualCompanyList(isOpen);

  const companyList = manualCompanyList?.map((company) => ({
    label: company.name,
    value: company.id
  })) ?? [];

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        fullName: data.fullName,
        username: data.username,
        position: data.position,
        companyId: data.companyId,
        phone: data.phone,
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

  const handleSubmit: FormProps<IManageCompanyOwnerFields>['onFinish'] = (values) => {
    if (isEdit) {
      mutateAsyncUpdate({
        ...values,
        companyOwnerId
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
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label={t("directors.fullName")}
          name="fullName"
          rules={[{
            required: true,
            message: t("directors.fullNameRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label={t("directors.login")}
          name="username"
          rules={[{
            required: true,
            message: t("directors.loginRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        {!isEdit && (
          <Form.Item<IManageCompanyOwnerFields>
            className="modal__item"
            layout="vertical"
            label={t("directors.password")}
            name="password"
            rules={[
              {
                required: true,
                message: t("directors.passwordRequired")
              },
              {
                min: 8,
                message: t("directors.passwordMin"),
              }
            ]}
          >
            <Input.Password
              className="modal__input"
            />
          </Form.Item>
        )}
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label={t("directors.position")}
          name="position"
          rules={[{
            required: true,
            message: t("directors.positionRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label={t("directors.company")}
          name="companyId"
          rules={[{
            required: true,
            message: t("directors.companyRequired")
          }]}
        >
          <Select
            className="modal__select"
            options={companyList}
            loading={isLoadingManualCompanyList || (isLoading && isEdit)}
            disabled={isLoadingManualCompanyList || (isLoading && isEdit)}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label={t("directors.phone")}
          name="phone"
          rules={[
            {
              required: true,
              message: t("directors.phoneRequired")
            },
          ]}
        >
          <PhoneInput
            className="modal__phone"
            international
            defaultCountry="UZ"
            onChange={() => {}}
            disabled={isEdit && isLoading}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ManageDirectorModal;

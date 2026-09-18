import { useEffect, type FC } from "react";
import { Checkbox, Form, Input, Modal, Select, Skeleton, Switch, Upload, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import PhoneInput from 'react-phone-number-input';
import { useTranslation } from "react-i18next";

import type { IManageEmployeeFields } from "../model/types";
import { close, stateManageEmployee } from "../model/slice";
import { useCreateEmployee, useUpdateEmployee } from "../model/mutations";
import { getWorkingDaysOptions } from "../model/config";

import { useEmployeeById } from "@entities/employees";
import { useManualObjectList } from "@entities/objects";
import { status } from "@shared/config";
import { useUploadFile } from "@shared/lib";

import 'react-phone-number-input/style.css';

const ManageEmployeeModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageEmployeeFields>();
  const { isOpen, employeeId } = useSelector(stateManageEmployee);
  const { mutateAsync: createEmployee, isPending: isCreating } = useCreateEmployee();
  const { mutateAsync: updateEmployee, isPending: isUpdating } = useUpdateEmployee();
  const { mutateAsync: uploadFile } = useUploadFile();
  const isEdit = !!employeeId;
  const title = isEdit ? t("employees.edit") : t("employees.create");
  const { data, isLoading: isLoadingEmployee } = useEmployeeById(employeeId, isEdit);
  const { data: manualObjects, isLoading: isLoadingObjects } = useManualObjectList(isOpen);

  const objectList = manualObjects?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  const workingDaysOptions = getWorkingDaysOptions(t);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        fullName: data.fullName,
        position: data.position,
        phone: data.phone?.replace(/\s/g, ""),
        assignedObjectId: data.assignedObject?.id,
        workingDays: data.workingDays,
        status: data.status === status.ACTIVE,
        image: data.fileUrl
          ? [
              {
                uid: String(data.fileId),
                name: "employee-image",
                status: "done",
                url: data.fileUrl,
              },
            ]
          : [],
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

  const handleSubmit: FormProps<IManageEmployeeFields>['onFinish'] = async (values) => {
    let fileId = isEdit ? (data?.fileId ?? '') : '';

    const file = values.image?.[0]?.originFileObj;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await uploadFile(formData);

      fileId = uploadResponse.data?.fileId ?? '';
    }

    if (isEdit) {
      await updateEmployee({
        ...values,
        employeeId,
        fileId,
        status: values.status ? status.ACTIVE : status.INACTIVE
      }, {
        onSuccess: handleClose,
      });

      return;
    }

    await createEmployee({
      ...values,
      fileId
    }, {
      onSuccess: handleClose,
    });
  };

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
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          paddingRight: 8,
        },
      }}
      title={title}
      open={isOpen}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={isCreating || isUpdating}
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
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.photo")}
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(event) => Array.isArray(event) ? event : event?.fileList}
          rules={[
            {
              required: !isEdit,
              message: t("employees.photoRequired"),
            },
          ]}
        >
          {isEdit && isLoadingEmployee ? (
            <Skeleton.Image active />
          ) : (
              <Upload
                  listType="picture-card"
                  accept="image/png,image/jpeg,image/webp"
                  maxCount={1}
                  beforeUpload={() => false}
                  showUploadList={{
                      showPreviewIcon: false,
                  }}
              >
                  <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>{t("employees.upload")}</div>
                  </div>
              </Upload>
          )}
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.fullNameLabel")}
          name="fullName"
          rules={[{
            required: true,
            message: t("employees.fullNameRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoadingEmployee}
          />
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.position")}
          name="position"
          rules={[{
            required: true,
            message: t("employees.positionRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoadingEmployee}
          />
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.phone")}
          name="phone"
          rules={[
            {
              required: true,
              message: t("employees.phoneRequired")
            },
          ]}
        >
          <PhoneInput
            className="modal__phone"
            international
            defaultCountry="UZ"
            onChange={() => false}
            disabled={isEdit && isLoadingEmployee}
          />
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.workingDays")}
          name="workingDays"
          rules={[
            {
              required: true,
              message: t("employees.workingDaysRequired"),
            },
          ]}
        >
          <Checkbox.Group
            className="modal__working-days"
            options={workingDaysOptions}
          />
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.object")}
          name="assignedObjectId"
          rules={[{
            required: true,
            message: t("employees.objectRequired")
          }]}
        >
          <Select
            className="modal__select"
            options={objectList}
            loading={isLoadingObjects || (isLoadingEmployee && isEdit)}
            disabled={isLoadingObjects || (isLoadingEmployee && isEdit)}
          />
        </Form.Item>
        {isEdit && <Form.Item<IManageEmployeeFields>
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

export default ManageEmployeeModal;

import { useEffect, type FC } from "react";
import { Checkbox, Form, Input, Modal, Select, Skeleton, Switch, Upload, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import PhoneInput from 'react-phone-number-input';

import type { IManageEmployeeFields } from "../model/types";
import { close, stateManageEmployee } from "../model/slice";
import { useCreateEmployee, useUpdateEmployee } from "../model/mutations";
import { workingDaysOptions } from "../model/config";

import { useEmployeeById } from "@entities/employees";
import { useManualObjectList } from "@entities/objects";
import { status } from "@shared/config";
import { useUploadFile } from "@shared/lib";

import 'react-phone-number-input/style.css';

const ManageEmployeeModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageEmployeeFields>();
  const { isOpen, employeeId } = useSelector(stateManageEmployee);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateEmployee();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateEmployee();
  const { mutateAsync: mutateAsyncUpload } = useUploadFile();
  const isEdit = !!employeeId;
  const title = !isEdit ? "Xodim yaratish" : "Xodim yangilash";
  const { data, isLoading: isLoadingEmployee } = useEmployeeById(employeeId, isEdit);
  const { data: manualObjects, isLoading: isLoadingObjects } = useManualObjectList(isOpen);

  const objectList = manualObjects?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

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

  const closeManageModalHandle = () => {
    dispatch(close());  
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IManageEmployeeFields>['onFinish'] = async (values) => {
    let fileId = isEdit ? (data?.fileId ?? '') : '';

    const file = values.image?.[0]?.originFileObj;

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await mutateAsyncUpload(formData);

        fileId = uploadResponse.data?.fileId ?? '';
    }

    if (isEdit) {
      await mutateAsyncUpdate({
        ...values,
        employeeId,
        fileId,
        status: values.status ? status.ACTIVE : status.INACTIVE
      }, {
          onSuccess: () => {
            closeManageModalHandle();
          },
        },
      );

      return;
    }

    await mutateAsyncCreate({
      ...values,
      fileId
    }, {
      onSuccess: () => {
        closeManageModalHandle();
      },
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
      okText="Saqlash"
      cancelText="Yopish"
      onOk={onOkHandle}
      onCancel={closeManageModalHandle}
      confirmLoading={isPendingCreate || isPendingUpdate}
      zIndex={3000}
    >
      <Form 
        form={form}
        onFinish={onSubmitHandle}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label="Xodim rasmi"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(event) => Array.isArray(event) ? event : event?.fileList}
          rules={[
            {
              required: !isEdit,
              message: "Xodim rasmini yuklang",
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
                      <div style={{ marginTop: 8 }}>Yuklash</div>
                  </div>
              </Upload>
          )}
        </Form.Item>
        <Form.Item<IManageEmployeeFields>
          className="modal__item"
          layout="vertical"
          label="To‘liq ism-familiya" 
          name="fullName"
          rules={[{ 
            required: true,
            message: 'To‘liq ism-familiyangizni kiriting'
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
          label="Lavozim" 
          name="position"
          rules={[{ 
            required: true,
            message: 'Lavozimni kiriting'
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
          label="Telefon raqami"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Telefon raqamini kiriting'
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
          label="Ish kunlari"
          name="workingDays"
          rules={[
            {
              required: true,
              message: "Ish kunlarini tanlang",
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
          label="Obyekt"
          name="assignedObjectId"
          rules={[{ 
            required: true,
            message: 'Obyektni tanlang'
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
          label="Holat"
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
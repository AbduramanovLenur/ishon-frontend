import { useEffect, type FC } from 'react';
import { Button, Form, Input, message, type FormProps } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import type { IAttendanceFields } from '../model/types';

import { useAttendance, useUploadFacePicture } from '@features/face-verification';
import { GeofenceMap, WebcamCapture } from '@shared/ui';
import { useCurrentLocation } from '@shared/lib';
import { eventTypes } from '@shared/config';

import styles from './Attendance.module.scss';

const Attendance: FC = () => {
  const { latitude, longitude } = useCurrentLocation();
  const [form] = Form.useForm<IAttendanceFields>();
  const { mutateAsync: mutateASyncUpload } = useUploadFacePicture();
  const { mutateAsync: mutateAsyncAttendance, isPending: isPendingAttendance } = useAttendance();

  useEffect(() => {
    if (latitude != null && longitude != null) {
      form.setFieldsValue({ latitude, longitude });
    }
  }, [latitude, longitude, form]);

  const handleCapture = (file: File) => {
    form.setFieldsValue({ photo: file });
  };

  const handleDelete = () => {
    form.setFieldsValue({ photo: null });
  };

  const onSubmitHandle: FormProps<IAttendanceFields>['onFinish'] = async (values) => {
    if (!values.photo) {
      message.warning('Iltimos, avval rasmga oling!');
      return;
    }

    if (values.latitude == null || values.longitude == null) {
      message.warning('Joylashuv aniqlanmadi!');
      return;
    }

    let fileUrl = '';
    const file = values.photo;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await mutateASyncUpload(formData);

      fileUrl = uploadResponse.data?.fileUrl ?? '';
    }

    const data = {
      fileUrl,
      eventType: values.eventType,
      latitude: values.latitude,
      longitude: values.longitude
    }

    mutateAsyncAttendance(data);
  };

  const handleSetEventType = (eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>) => {
    form.setFieldsValue({ eventType });
  };

  return (
    <div className={styles['attendance']}>
      <div className={styles['attendance__inner']}>
        <h1 className={styles['attendance__title']}>Kuzatish</h1>

        <p className={styles['attendance__subtitle']}>
          Yuzingizni skanerlash uchun ramkaga joylashtiring
        </p>

        <Form
          form={form}
          className={styles['attendance__form']}
          onFinish={onSubmitHandle}
        >
          <Form.Item name="photo" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="latitude" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="longitude" hidden>
            <Input />
          </Form.Item>

          <WebcamCapture 
            onCapture={handleCapture} 
            onDelete={handleDelete}
          />

          <GeofenceMap
            height={200}
            latitude={latitude ?? undefined}
            longitude={longitude ?? undefined}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={false}
            zoomControl={false}
          />

          <div className={styles['attendance__actions']}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<LoginOutlined />}
              className={styles['attendance__btn']}
              onClick={() => handleSetEventType(eventTypes.ENTER)}
              disabled={isPendingAttendance}
            >
              Kirish
            </Button>

            <Button
              htmlType="submit"
              icon={<LogoutOutlined />}
              className={`${styles['attendance__btn']} ${styles['attendance__btn--exit']}`}
              onClick={() => handleSetEventType(eventTypes.EXIT)}
              disabled={isPendingAttendance}
            >
              Chiqish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Attendance;

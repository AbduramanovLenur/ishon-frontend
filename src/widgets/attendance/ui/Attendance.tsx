import { useEffect, type FC } from 'react';
import { Form, Input, message, type FormProps } from 'antd';

import type { IAttendanceFields } from '../model/types';

import { useAttendance, useUploadFacePicture } from '@features/face-verification';
import { GeofenceMap, WebcamCapture } from '@shared/ui';
import { eventTypes } from '@shared/config';

import { useAttendanceLocation } from '../model/useAttendanceLocation';
import AttendanceActions from './AttendanceActions';

import styles from './Attendance.module.scss';

const Attendance: FC = () => {
  const [form] = Form.useForm<IAttendanceFields>();
  const { latitude, longitude, isGeolocationAvailable, isGeolocationEnabled } = useAttendanceLocation();
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

    if (!isGeolocationAvailable) {
      message.error("Geolokatsiya qo'llab-quvvatlanmaydi");
      return;
    }

    if (!isGeolocationEnabled) {
      message.error('Geolokatsiyaga ruxsat berilmagan');
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

    mutateAsyncAttendance({
      fileUrl,
      eventType: values.eventType,
      latitude: values.latitude,
      longitude: values.longitude,
    });
  };

  const handleSetEventType = (
    eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>,
  ) => {
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

          <WebcamCapture onCapture={handleCapture} onDelete={handleDelete} />

          <GeofenceMap
            height={200}
            latitude={latitude}
            longitude={longitude}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={false}
            zoomControl={false}
          />

          <AttendanceActions
            onEnter={() => handleSetEventType(eventTypes.ENTER)}
            onExit={() => handleSetEventType(eventTypes.EXIT)}
            isPending={isPendingAttendance}
          />
        </Form>
      </div>
    </div>
  );
};

export default Attendance;

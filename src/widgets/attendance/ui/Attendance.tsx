import { useEffect, useState, type FC } from 'react';
import { Form, Input, Popover, message, type FormProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import type { IAttendanceFields } from '../model/types';

import { useAttendance, useUploadFacePicture } from '@features/face-verification';
import { GeofenceMap, WebcamCapture } from '@shared/ui';
import { eventTypes } from '@shared/config';

import { useTelegramLocation } from '@shared/lib';
import AttendanceActions from './AttendanceActions';

import styles from './Attendance.module.scss';

const Attendance: FC = () => {
  const [form] = Form.useForm<IAttendanceFields>();
  const [photoKey, setPhotoKey] = useState(0);
  const { latitude, longitude, isGeolocationAvailable, isGeolocationEnabled } = useTelegramLocation();
  const { mutateAsync: mutateASyncUpload, isPending: isPendingUploadFile } = useUploadFacePicture();
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
    }).then(() => {
      form.setFieldsValue({ photo: null });
      setPhotoKey((k) => k + 1);
    });
  };

  const handleSetEventType = (
    eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>,
  ) => {
    form.setFieldsValue({ eventType });
  };

  const helpContent = (
    <div className={styles['attendance__help']}>
      <p className={styles['attendance__help-title']}>Yordam</p>
      <ol className={styles['attendance__help-list']}>
        <li>Telegram ilovasining <b>sozlamalari</b> bo'limiga boring va geolokatsiya hamda kamera uchun ruxsat bering.</li>
        <li>Qurilmangizda <b>geolokatsiyani</b> yoqing.</li>
        <li>Telegram mini app'ga kiring.</li>
        <li>Geolokatsiya va kamera uchun ruxsat so'rovchi oyna paydo bo'ladi — <b>barcha ruxsatlarni bering</b>.</li>
        <li>Agar geolokatsiya aniqlanmasa, mini app'ni qayta yuklang yoki yuqori o'ngdagi <b>uch nuqta</b> (...) tugmasini bosing va <b>qayta yuklash</b>ni tanlang.</li>
      </ol>
    </div>
  );

  return (
    <div className={styles['attendance']}>
      <div className={styles['attendance__inner']}>
        <div className={styles['attendance__header']}>
          <h1 className={styles['attendance__title']}>Kuzatish</h1>
          <Popover content={helpContent} trigger="click" placement="topRight">
            <button type="button" className={styles['attendance__help-btn']}>
              <QuestionCircleOutlined />
            </button>
          </Popover>
        </div>

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

          <Form.Item name="eventType" hidden>
            <Input />
          </Form.Item>

          <WebcamCapture key={photoKey} onCapture={handleCapture} onDelete={handleDelete} />

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
            isPending={isPendingAttendance || isPendingUploadFile}
          />
        </Form>
      </div>
    </div>
  );
};

export default Attendance;

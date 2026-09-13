import { useRef, useState, type FC } from "react";
import Webcam from "react-webcam";
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

import { dataUrlToFile } from "@shared/utils";

import styles from "./WebcamCapture.module.scss";

interface IWebcamCaptureProps {
  onCapture: (file: File) => void;
  onDelete?: () => void;
  className?: string;
}

const WebcamCapture: FC<IWebcamCaptureProps> = ({
  onCapture,
  onDelete,
  className,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setPreview(imageSrc);
    onCapture(dataUrlToFile(imageSrc, `photo-${Date.now()}.jpg`));
  };

  const handleDelete = () => {
    setPreview(null);
    onDelete?.();
  };

  const handleUserMedia = () => {
  console.log('CAMERA SUCCESS');

  message.success('Kamera yoqildi');
};

  const handleUserMediaError = (error: string | DOMException) => {
    console.error('CAMERA ERROR:', error);

    message.error(
      `Kameraga ruxsat berilmadi: ${
        typeof error === 'string'
          ? error
          : error.message
      }`,
    );
  };

  return (
    <div className={`${styles["webcam"]}${className ? ` ${className}` : ""}`}>
      {preview ? (
        <img 
          className={styles["webcam__media"]} 
          src={preview} 
          alt="Captured" 
        />
      ) : (
        <Webcam
          ref={webcamRef}
          className={styles["webcam__media"]}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          audio={false}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          videoConstraints={{
            width: 1280,
            height: 1280,
            facingMode: "user",
          }}
        />
      )}

      <div className={styles["webcam__controls"]}>
        {preview ? (
          <button
            type="button"
            className={`${styles["webcam__btn"]} ${styles["webcam__btn--delete"]}`}
            onClick={handleDelete}
            aria-label="Delete"
          >
            <DeleteOutlined />
          </button>
        ) : (
          <button
            type="button"
            className={`${styles["webcam__btn"]} ${styles["webcam__btn--capture"]}`}
            onClick={capture}
            aria-label="Capture"
          >
            <CameraOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;

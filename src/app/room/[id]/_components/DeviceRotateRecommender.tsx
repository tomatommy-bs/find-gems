'use client';

import {
  useFullscreen,
  useSessionStorage,
  useToggle,
  useViewportSize,
} from '@mantine/hooks';
import {useEffect, useRef} from 'react';
import Lottie from 'lottie-react';
import deviceRotateLottie from './device-rotate.lottie.json';
import {useShouldRotate} from '@/src/hooks/use-should-rotate';

const modal_ID = 'device_rotate_recommender';

const DeviceRotateRecommender: React.FC = () => {
  const shouldRotate = useShouldRotate({});

  const [shouldShow, setShouldShow] = useSessionStorage({
    key: 'shouldShowRotateRecommender',
    defaultValue: true,
  });
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (checkboxRef.current?.checked) {
      setShouldShow(false);
    }
  };

  useEffect(() => {
    const dialog = document.getElementById(modal_ID) as HTMLDialogElement;
    if (shouldShow && shouldRotate) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [shouldShow, shouldRotate]);

  return (
    <dialog id={modal_ID} className="modal">
      <div className="modal-box">
        <p className="text-center text-2xl font-bold">
          we recommend rotate your device
        </p>
        <Lottie animationData={deviceRotateLottie} />

        <div className="form-control">
          <label className="label cursor-pointer justify-end space-x-2">
            <input ref={checkboxRef} type="checkbox" className="checkbox" />
            <span className="label-text">
              {"Don't show again until next opening"}
            </span>
          </label>
        </div>
        <form method="dialog" className="text-right">
          <button onClick={handleClose}>close</button>
        </form>
      </div>
    </dialog>
  );
};

export default DeviceRotateRecommender;

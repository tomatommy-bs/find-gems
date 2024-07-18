import {useFullscreen, useOs} from '@mantine/hooks';

export const useShouldFullscreen = (): {
  shouldFullscreen: boolean;
  canFullscreen: boolean;
} => {
  const os = useOs();
  const {fullscreen} = useFullscreen();

  let shouldFullscreen = !fullscreen;
  let canFullscreen = true;

  switch (os) {
    case 'android':
      shouldFullscreen = !fullscreen;
      canFullscreen = true;
      break;
    case 'macos':
    case 'windows':
    case 'linux':
      if (process.env.NODE_ENV === 'development') {
        shouldFullscreen = !fullscreen;
        canFullscreen = true;
      } else {
        shouldFullscreen = false;
        canFullscreen = true;
      }
      break;
    case 'ios':
      canFullscreen = false;
      shouldFullscreen = false;
      break;
    case 'undetermined':
      canFullscreen = false;
      shouldFullscreen = false;
      break;
    default:
      throw Error(os satisfies never);
  }

  return {
    shouldFullscreen,
    canFullscreen,
  };
};

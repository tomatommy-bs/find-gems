import {useOs, useViewportSize} from '@mantine/hooks';

interface Props {
  threshold?: number;
}

export const useShouldRotate = ({threshold = 762}: Props) => {
  const {width, height} = useViewportSize();
  const os = useOs();

  switch (os) {
    // Skip rotation recommendation on desktop
    case 'windows':
    case 'macos':
    case 'linux':
      // But, still show it in development
      if (process.env.NODE_ENV !== 'development') return false;
  }

  if (width < threshold) return height > width;
  return false;
};

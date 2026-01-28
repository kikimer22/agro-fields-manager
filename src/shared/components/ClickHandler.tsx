import { useMapEvents } from 'react-leaflet';
import { memo } from 'react';
import { stopAndPrevent } from '@/lib/utils';
import type { LeafletMouseEvent } from 'leaflet';

interface Props {
  onMapClick: (e: LeafletMouseEvent) => void;
  isSkip?: boolean;
}

const ClickHandler = ({ onMapClick, isSkip = false }: Props) => {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      console.log('latlng', e.latlng);
      if (!isSkip) stopAndPrevent(e);
      onMapClick(e);
    },
  });
  return null;
};

export default memo(ClickHandler);

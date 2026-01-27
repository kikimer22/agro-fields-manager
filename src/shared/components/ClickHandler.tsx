import { useMapEvents } from 'react-leaflet';
import { memo } from 'react';
import { stopAndPrevent } from '@/lib/utils';
import type { LeafletMouseEvent } from 'leaflet';

interface Props {
  onMapClick: (e: LeafletMouseEvent) => void;
}

const ClickHandler = ({ onMapClick }: Props) => {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      console.log('latlng', e.latlng);
      stopAndPrevent(e);
      onMapClick(e);
    },
  });
  return null;
};

export default memo(ClickHandler);

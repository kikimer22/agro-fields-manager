import { useCallback } from 'react';
import { latLngBounds } from 'leaflet';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { transformPositionsToLatLngExpression } from '@/lib/utils';
import { useMapContext } from '@/context/MapContext';
import type { FieldFeature } from '@/shared/types';
import { selectFieldAction } from '@/store/actions/selectFieldAction.ts';
import { setSelectingFieldFlow } from '@/store/slices/sharedSlice.ts';

export const useFieldActions = () => {
  const dispatch = useAppDispatch();
  const selectedFieldId = useAppSelector((state) => state.fieldsSlice.selectedFieldId);
  const isSelectingFieldFlow = useAppSelector((state) => state.sharedSlice.isSelectingFieldFlow);
  const { map } = useMapContext();

  const handleToggleSelectingFlow = useCallback(() => {
    dispatch(setSelectingFieldFlow(!isSelectingFieldFlow));
  }, [isSelectingFieldFlow, dispatch]);

  const selectAndCenter = useCallback((f: FieldFeature) => {
    const isSameId = !!(selectedFieldId && selectedFieldId === f.properties.id);
    dispatch(selectFieldAction(isSameId ? null : f.properties.id));
    if (!isSameId) return;
    if (!map) return;
    const bounds = latLngBounds(transformPositionsToLatLngExpression(f.geometry.coordinates[0]));
    const center = bounds.getCenter();
    map.fitBounds(bounds);
    // map.setView(center, map.getZoom());
    map.setView(center);
  }, [dispatch, map, selectedFieldId]);

  return { selectAndCenter, handleToggleSelectingFlow };
};

export default useFieldActions;

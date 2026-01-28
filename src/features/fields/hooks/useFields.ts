import { useCallback } from 'react';
import { latLngBounds } from 'leaflet';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { transformPositionsToLatLngExpression } from '@/lib/utils';
import { useMapContext } from '@/shared/context/MapContext';
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
  }, [dispatch, isSelectingFieldFlow]);

  const selectAndCenter = useCallback((f: FieldFeature) => {
    const isSelected = !!(selectedFieldId && selectedFieldId === f.properties.id);
    dispatch(selectFieldAction(isSelected ? null : f.properties.id));
    if (isSelected) return;
    if (!map) return;
    const bounds = latLngBounds(transformPositionsToLatLngExpression(f.geometry.coordinates[0]));
    const center = bounds.getCenter();
    map.setView(center, map.getZoom());

    const currentViewBounds = map.getBounds();
    if (!currentViewBounds.contains(bounds)) map.fitBounds(bounds);
  }, [dispatch, map, selectedFieldId]);

  return { selectAndCenter, handleToggleSelectingFlow };
};

export default useFieldActions;

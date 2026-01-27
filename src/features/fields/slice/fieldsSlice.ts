import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fieldFeature } from '@/mock/fieldFeature.ts';
import type { FieldFeature, FieldsCollection } from '@/shared/types.ts';

interface FieldsState {
  fieldsCollection: FieldsCollection;
  selectedFieldId: string | null;
}

const initialState: FieldsState = {
  fieldsCollection: {
    type: 'FeatureCollection',
    features: [
      fieldFeature,
      {
        'type': 'Feature',
        'properties': {
          'id': 'RgJA5uNpqlSoUi0sCNihK',
          'name': 'qwe',
          'area': 2478.405140647014,
          'crop': 'asd123'
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [
                30.48192835512378,
                50.44832291434209
              ],
              [
                30.521079607580162,
                50.44176389056172
              ],
              [
                30.548210738668367,
                50.418472013737
              ],
              [
                30.552675355176536,
                50.40140590507445
              ],
              [
                30.52159475563881,
                50.40895513434
              ],
              [
                30.461150716758755,
                50.425362353704806
              ],
              [
                30.44329225072602,
                50.443841013116646
              ],
              [
                30.446211423058283,
                50.454225258495846
              ],
              [
                30.446383139077845,
                50.46264029053654
              ],
              [
                30.486392971631957,
                50.45848760468376
              ],
              [
                30.48192835512378,
                50.44832291434209
              ]
            ]
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 'nBoyXPleNnc53ThQEj3aT',
          'name': 'eee',
          'area': 369.4086139346843,
          'crop': 'rrer32'
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [
                30.559200563919273,
                50.4489787667211
              ],
              [
                30.534816889143805,
                50.46012686633918
              ],
              [
                30.532584580889722,
                50.46646481020967
              ],
              [
                30.535847185261108,
                50.470507537552685
              ],
              [
                30.542372394003802,
                50.4703982791962
              ],
              [
                30.547523874590194,
                50.470507537552685
              ],
              [
                30.550786478961545,
                50.471381595315364
              ],
              [
                30.5585136998411,
                50.46515358116524
              ],
              [
                30.562978316349273,
                50.46132895544606
              ],
              [
                30.564352044505664,
                50.45652041570478
              ],
              [
                30.5670995008184,
                50.453350883601736
              ],
              [
                30.56847322897475,
                50.45039974902326
              ],
              [
                30.565382340622925,
                50.44755774174372
              ],
              [
                30.559200563919273,
                50.4489787667211
              ]
            ]
          ]
        }
      }
    ],
  },
  selectedFieldId: null,
};

export const fieldsSlice = createSlice({
  name: 'fieldsSlice',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldFeature>) => {
      state.fieldsCollection.features.push(action.payload);
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fieldsCollection.features = state.fieldsCollection.features.filter((f) => f.properties.id !== action.payload);
      if (state.selectedFieldId === action.payload) {
        state.selectedFieldId = null;
      }
    },
    setSelectedFieldId: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },
  },
});

export const { addField, removeField, setSelectedFieldId } = fieldsSlice.actions;

export default fieldsSlice.reducer;

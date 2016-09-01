import { fromJS } from 'immutable';

import { totalPrice } from './Meals.selectors';
import { IState } from '../../base/interfaces';

describe('Meals selectors', () => {

  describe('totalPrice', () => {

    const stateFixture: IState = fromJS({
      meals: {
        entities: [
          {
            'id': 1,
            'title': 'Gulasch',
            'description': 'mit Gemüsesoße und bunten Nudeln',
            'price': 3.85,
            'unit': 'Anzahl',
            'group': 'Warengruppe 2'
          },
          {
            'id': 2,
            'title': 'Seelachsfilet mit Tomatenwürfeln',
            'description': 'und Käse überbacken, Kräutersoße und Kartoffelpüree',
            'price': 4,
            'unit': 'Anzahl',
            'group': 'Warengruppe 5'
          },
          {
            'id': 3,
            'title': 'Putenrollbraten',
            'description': 'mit Soße, Salzkartoffeln und buntem Gemüse',
            'price': 4,
            'unit': 'Anzahl',
            'group': 'Warengruppe 4'
          },
        ],
        order: { 1: 3, 3: 2 },
        loading: false,
        error: null
      }
    });

    it('correctly calculates the total price based on state', () => {
      expect(totalPrice(stateFixture)).toEqual(19.55);
    });


  });

});

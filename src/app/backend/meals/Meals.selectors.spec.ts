import { fromJS, Map } from 'immutable';

import { totalPrice } from './Meals.selectors';
import { IState } from '../../base/interfaces';


describe('Meals selectors', () => {

  describe('totalPrice', () => {

    const meals = fromJS([
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
    ]);

    const order = Map()
      .set(meals.get(0), 3)
      .set(meals.get(2), 2);

    const stateFixture: IState = fromJS({
      meals: {
        entities: meals,
        order: order,
        loading: false,
        error: null
      }
    });

    it('correctly calculates the total price based on state', () => {
      expect(totalPrice(stateFixture)).toEqual(19.55);
    });

  });

});

import { MealsGridComponent } from './MealsGrid.component';
import { fromJS, List, Map } from 'immutable';

import { customMatchers } from '../../utils/testing';


const MEALS_FIXTURE: List<any> = fromJS([
  {
    'id': 12,
    'title': 'pan.  Seelachsfilet',
    'description': 'mit Salzkartoffeln und Kaisergemüse',
    'price': 4,
    'unit': 'Anzahl',
    'group': 'Warengruppe 6'
  },
  {
    'id': 13,
    'title': 'Reissuppe',
    'description': 'mit Eierstich, Hühnerfleischwürfeln und Nachtisch',
    'price': 3.85,
    'unit': 'Anzahl',
    'group': 'Warengruppe 4'
  },
  {
    'id': 14,
    'title': 'gebratene Schweineleber',
    'description': 'mit Kartoffelpüree und Zwiebelsoße',
    'price': 4,
    'unit': 'Anzahl',
    'group': 'Warengruppe 3'
  },
]);

const ORDER_FIXTURE: Map<string, number> = Map({
  12: 3,
  14: 2
});


describe('MealsGridComponent', () => {

  let subject: MealsGridComponent;

  beforeAll(() => {
    jasmine.addMatchers(customMatchers);
  });

  beforeEach(() => {
    subject = new MealsGridComponent();
    subject.meals = MEALS_FIXTURE;
    subject.order = ORDER_FIXTURE;
  });


  describe('#productGroups', () => {
    const expected = List([
      'Warengruppe 3',
      'Warengruppe 4',
      'Warengruppe 6'
    ]);

    it('extracts all product groups from #meals', () => {
      expect(subject.productGroups.equals(expected)).toBeTruthy();
    });
  });


  describe('#getUnits', () => {

    it('returns the number of ordered units for a given meal', () => {
      expect(subject.getUnits(MEALS_FIXTURE.get(0))).toEqual(3);
      expect(subject.getUnits(MEALS_FIXTURE.get(1))).toEqual(0);
      expect(subject.getUnits(MEALS_FIXTURE.get(2))).toEqual(2);
    });
  });


  describe('#hasOrder', () => {

    it('returns if a meal has ordered units', () => {
      expect(subject.hasOrder(MEALS_FIXTURE.get(0))).toBeTruthy();
      expect(subject.hasOrder(MEALS_FIXTURE.get(1))).toBeFalsy();
      expect(subject.hasOrder(MEALS_FIXTURE.get(2))).toBeTruthy();
    });
  });


  describe('#highlightSearchMatch', () => {

    describe('if no #searchFilter is set', () => {
      it('always returns the original text', () => {
        expect(subject.highlightSearchMatch(MEALS_FIXTURE.getIn([0, 'title'])))
          .toEqual('pan.  Seelachsfilet');
      });
    });

    describe('if a #searchFilter is set', () => {

      beforeEach(() => {
        subject.searchFilter = 'lachs';
      });

      it('highlights the match if the text contains it', () => {
        expect(subject.highlightSearchMatch(MEALS_FIXTURE.getIn([0, 'title'])))
          .toEqual('pan.  See<strong class="match">lachs</strong>filet');
      });

      it('returns the original text if no match', () => {
        expect(subject.highlightSearchMatch(MEALS_FIXTURE.getIn([1, 'title'])))
          .toEqual('Reissuppe');
      });

    });

  });


  describe('#filteredMeals', () => {

    beforeEach(() => {
      subject.order = <Map<string, number>>Map({});
    });

    describe('with no searchFilter or gruopFilter', () => {

      beforeEach(() => {
        subject.searchFilter = '';
        subject.groupFilter = '';
      });

      it('returns all meals', () => {
        expect(subject.filteredMeals).toEqualImmutable(MEALS_FIXTURE);
      });

    });

    describe('with searchFilter', () => {

      beforeEach(() => {
        subject.searchFilter = 'schwein';
        subject.groupFilter = '';
      });

      it('only returns the correct matches', () => {
        expect(subject.filteredMeals).toEqualImmutable([
          MEALS_FIXTURE.get(2)
        ]);
      });

    });

    describe('with groupFilter', () => {

      beforeEach(() => {
        subject.searchFilter = '';
        subject.groupFilter = 'Warengruppe 4';
      });

      it('only returns the correct matches', () => {
        expect(subject.filteredMeals).toEqualImmutable([
          MEALS_FIXTURE.get(1)
        ]);
      });

    });

    describe('with searchFilter and gruopFilter', () => {

      beforeEach(() => {
        subject.searchFilter = 'suppe';
        subject.groupFilter = 'Warengruppe 4';
      });

      it('only returns the correct matches', () => {
        expect(subject.filteredMeals).toEqualImmutable([
          MEALS_FIXTURE.get(1)
        ]);
      });

    });

    describe('with an order', () => {

      beforeEach(() => {
        subject.order = ORDER_FIXTURE;
        subject.searchFilter = 'np match';
        subject.groupFilter = 'invalid';
      });

      it('always returns the ordered items too', () => {
        expect(subject.filteredMeals).toEqualImmutable([
          MEALS_FIXTURE.get(0),
          MEALS_FIXTURE.get(2)
        ]);
      });

    });

  });

});

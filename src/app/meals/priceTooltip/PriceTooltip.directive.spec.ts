import { Map } from 'immutable';
import { PriceTooltipDirective } from './PriceTooltip.directive';


describe('PriceTooltipDirective', () => {

  let subject: PriceTooltipDirective;

  beforeEach(() => {
    subject = new PriceTooltipDirective();
  });


  describe('#createMessage', () => {

    it('returns the correct message for 0 units', () => {
      expect(subject.createMessage(3.5, 0)).toEqual('The price for one item is 3.50 €');
    });

    it('returns the correct message for 1 unit', () => {
      expect(subject.createMessage(4, 1)).toEqual('The total price for the 1 item is 4.00 €');
    });

    it('returns the correct message for > 1 units', () => {
      expect(subject.createMessage(3.75, 3)).toEqual('The total price for the 3 items is 11.25 €');
    });

  });

  describe('#ngOnChanges', () => {

    beforeEach(() => {
      subject.dcsPriceTooltip = Map({
        price: 6.0
      });
      subject.units = 3;

      subject.ngOnChanges();
    });

    it('changes the message attribute', () => {
      expect(subject.message).toEqual('The total price for the 3 items is 18.00 €');
    });

  });

});

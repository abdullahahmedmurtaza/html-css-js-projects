import convertCurrency from '../../scripts/utils/money.js';

describe('Test Suite : convertCurrency',()=>{
    it('works with zero',()=>{
        expect(convertCurrency(0)).toEqual('0.00');
    });
    it('converts cents into dollars',()=>{
        expect(convertCurrency(2095)).toEqual('20.95');
    });
    it('rounds up to the nearest cent',()=>{
        expect(convertCurrency(2000.5)).toEqual('20.01');
    });
});


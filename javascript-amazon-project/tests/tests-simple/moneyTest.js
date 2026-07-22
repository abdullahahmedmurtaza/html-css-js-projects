import convertCurrency from '../../scripts/utils/money.js';

// test suite means a group of tests
console.log('Test Suite --> convertCurrency');

// converts dollars to cents
console.log('converts dollars to cents');

if(convertCurrency(2095) === '20.95') console.log('Passed');
else console.log('Passed');

console.log('checks with zero');

if(convertCurrency(0) === '0.00') console.log('passed');
else console.log('failed');

console.log('rounds to the nearest cent');

if(convertCurrency(2000.5) === '20.01') console.log('passed');
else console.log('failed');




    
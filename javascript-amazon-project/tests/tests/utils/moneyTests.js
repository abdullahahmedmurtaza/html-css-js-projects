import convertCurrency from '../scripts/utils/money.js';

// Test suite --> group of tests
console.log('Test Suite ==> convertCurrency');

// test name
console.log('converts cents into dollars');

// test case
if(convertCurrency(2095) === '20.95') console.log('passed');
else console.log('failed');

console.log('checks for 0 cents');

if(convertCurrency(0) === '0.00') console.log('passed');
else console.log('failed');

console.log('checks for rounding');

if(convertCurrency(2000.5) === '20.01') console.log('passed');
else console.log('failed');



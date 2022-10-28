const { SafeDate } = require('../dist');

// run this file with `node .\playground\template.js`

const numericSd = SafeDate.create('2022-10-28T08:31:00.914Z');

console.log('NUM', numericSd.value);
console.log('NDate', new Date().toISOString());

'uses strict';

let { start} = require('./src/server');

// sequelizeDB.sync()
//   .then(() => {
//     console.log('successfully connected');
//     start();
//   })
//   .catch((e) => console.error('Error on index page', e));

start();  
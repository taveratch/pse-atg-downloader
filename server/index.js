
import database from './utils/database';
import authAPI from './api/auth';
import siteAPI from './api/site';
import inventoryAPI from './api/inventory';
import log4js from './utils/log4js';

const PORT = process.env.PORT || 3000;

// log4js();

const app = require('./app');

(async () => {
  await database.start();
  app.use('/auth', authAPI);
  app.use('/site', siteAPI);
  app.use('/inventory', inventoryAPI);
})();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

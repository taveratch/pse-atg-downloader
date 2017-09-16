/*--- Import dependencies ===*/
import express from 'express';
import database from 'server/utils/database.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

/*--- Import APIs ----*/
import AuthAPI from 'server/api/auth';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3001;

(async () => {
    // Establish database connection.
    await database.start();

    app.use('/api/auth', AuthAPI);
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
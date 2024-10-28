require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const countryRouter = require('./routes/country.routes');
const languageRouter = require('./routes/language.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/country', countryRouter);
app.use('/language', languageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

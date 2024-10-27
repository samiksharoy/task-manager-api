const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
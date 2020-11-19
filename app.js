const dotenv  = require("dotenv");
dotenv.config();
const express = require ("express");
const app = express();

const userRouter = require('./api/users/user.router');

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/users/', userRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log('app is listening on port '+process.env.APP_PORT);
})
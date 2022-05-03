const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true //not supported, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})

app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보를 client에서 가져오면
  // 데이터베이스에 넣는다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true,
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
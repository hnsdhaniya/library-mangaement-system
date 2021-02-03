
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

var cors = require('cors')
const app = express();
app.use(logger("dev"));


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
})
);

var corsOptions = {
  origin: 'http://localhost:4200',
  
}

app.use(cors());
var models = require('./database/models');

models.sequelize.sync();

require('./routes')(app);

const port = process.env.PORT || 3000;




app.get('/', (req, res) => {
  res.send('Server Running!')
})


app.listen(port, () => {
  console.log('Server is listening on localhost 3000');
});



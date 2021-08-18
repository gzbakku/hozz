global.engine = require('wett-uws');
global.hozz_config = require('./hozz.json');
require('dotenv').config();

const app = require('./app/index');

app.init();

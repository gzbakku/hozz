global.engine = require('wett');
global.hozz_config = require('./hozz.json');

const app = require('./app/index');

app.init();

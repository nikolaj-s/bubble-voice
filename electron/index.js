// Entry point
const { app } = require('electron');
const { initAppLifecycle } = require('./app');

initAppLifecycle(app);
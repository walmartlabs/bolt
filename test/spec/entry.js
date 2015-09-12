global.chai = require('chai');
global.sinonChai = require("sinon-chai");

global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(sinonChai);

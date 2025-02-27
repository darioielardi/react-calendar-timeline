import 'regenerator-runtime/runtime';
const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

global.console.error = (message) => {
  // mostly related to proptypes errors
  // fail test if app code uses console.error
  throw new Error(message);
};

global.console.warn = (message) => {
  throw new Error(message);
};

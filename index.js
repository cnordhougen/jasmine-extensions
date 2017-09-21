const DOMMatchers          = require('./src/DOMMatchers')
    , multilineDescription = require('./src/multilineDescription')
    , spyOnAssignment      = require('./src/spyOnAssignment');

jasmine.use = (...fs) => fs.forEach(f => f(jasmine));

const jex = {
    ALL: jasmine => jasmine.use(...Object.keys(jex).filter(k => k !== 'ALL').map(k => jex[k])),
    DOMMatchers,
    multilineDescription,
    spyOnAssignment,
};

module.exports = jex;

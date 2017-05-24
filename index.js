import DOMMatchers          from './src/DOMMatchers';
import multilineDescription from './src/multilineDescription';
import spyOnAssignment      from './src/spyOnAssignment';

jasmine.use = (...fs) => fs.forEach(f => f(jasmine));

const jex = {
    ALL: jasmine => jasmine.use(...Object.keys(jex).filter(k => k !== 'ALL').map(k => jex[k])),
    DOMMatchers,
    multilineDescription,
    spyOnAssignment,
};

export default jex;

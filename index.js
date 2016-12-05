import DOMMatchers          from './src/DOMMatchers';
import multilineDescription from './src/multilineDescription'
import spyOnAssignment      from './src/spyOnAssignment';

function jex(jasmine) {
    jasmine.use = f => f(jasmine);
    return jasmine;
}

Object.assign(jex, {
    DOMMatchers,
    multilineDescription,
    spyOnAssignment
});

export default jex;

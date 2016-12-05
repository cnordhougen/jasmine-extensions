export default multilineDescription(jasmine) {
    jasmine.mld = strs => strs[0].trim().replace(/\s{2,}/g, '');
    return jasmine;
}

function multilineDescription(jasmine) {
    jasmine.mld = strs => strs[0].trim().replace(/\s{2,}/g, ' ');
    return jasmine;
}

module.exports = multilineDescription;

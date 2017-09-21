function spyOnAssignment(jasmine) {
    jasmine._assignmentSpies = [];
    jasmine.spyOnAssignment = (parent, objname, keysToSpyOn) => {
        const obj   = parent[objname]
            , spies = {}
            , multi = Array.isArray(keysToSpyOn);

        keysToSpyOn = [].concat(keysToSpyOn);

        for (const key of keysToSpyOn) {
            spies[key] = {
                assignments: {
                    _list: [],

                    count() {
                        return this._list.length;
                    },

                    any() {
                        return Boolean(this._list.length);
                    },

                    valueFor(i) {
                        return this._list[i].value;
                    },

                    allValues() {
                        return this._list.map(a => a.value);
                    },

                    all() {
                        return this._list;
                    },

                    mostRecent() {
                        return this._list[this._list.length - 1];
                    },

                    first() {
                        return this._list[0];
                    }
                }
            };
        }

        const revocable = Proxy.revocable(obj, {
            set(target, key, value) {
                if (keysToSpyOn.includes(key)) {
                    const valueIsPOJO = value && typeof value === 'object'
                            && Reflect.getPrototypeOf(value) === Object.prototype;

                    spies[key].assignments._list.push({
                        object: Object.assign({}, target),
                        value:  valueIsPOJO ? Object.assign({}, value) : value
                    });
                }
                target[key] = value;
                return true;
            }
        });
        parent[objname] = revocable.proxy;

        jasmine._assignmentSpies.push({
            spies,
            parent,
            objname,
            obj,
            revocable
        });

        if (multi) {
            return spies;
        }

        const loneSpy = spies[keysToSpyOn[0]];
        return loneSpy;
    };

    beforeEach(() => {
        window.spyOnAssignment = jasmine.spyOnAssignment;

        jasmine.addMatchers({
            toHaveAssigned() {
                return {
                    compare(obj, key, value) {
                        const fSpyInfo = jasmine._assignmentSpies.filter(s => obj === s.revocable.proxy && s.spies.hasOwnProperty(key));
                        if (!fSpyInfo.length) {
                            throw new Error(`There is no assignment spy on "${key}" for this object!`);
                        }

                        const spyInfo = fSpyInfo[0]
                            , hasBeenAssigned = spyInfo.spies[key].assignments.any()
                            , hasBeenAssignedValue = spyInfo.spies[key].assignments.allValues().includes(value)
                            , pass = (value && hasBeenAssignedValue) || hasBeenAssigned
                            , message = `Expected property ${spyInfo.objname}.${key} to have been assigned ${value ? `value: ${value}` : 'a value'}`;

                        return { pass, message };
                    }
                };
            }
        });
    });

    afterEach(() => {
        for (const aspy of jasmine._assignmentSpies) {
            aspy.parent[aspy.objname] = aspy.obj;
            aspy.revocable.revoke();
        }
        jasmine._assignmentSpies = [];
    });

    return jasmine;
}

module.exports = spyOnAssignment;

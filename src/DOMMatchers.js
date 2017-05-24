export default function DOMMatchers(jasmine) {
    beforeEach(() => {
        jasmine.addMatchers({
            toHaveTextContent() {
                return {
                    compare(element, expected) {
                        if (!(element instanceof HTMLElement)) {
                            throw new TypeError(`toHaveTextContent() TypeError: ${typeof element} - ${element && element.constructor} (${expected})`);
                        }

                        const actual  = element.textContent.trim().replace(/ {2,}/g, '');
                        let pass, message;

                        if (expected instanceof RegExp) {
                            pass = actual.match(expected);
                            message = `Expected "${actual}" ${pass ? 'to not' : 'to'} match ${expected}`;
                        } else {
                            pass = actual === expected;
                            message = `Expected "${actual}" ${pass ? 'to not' : 'to'} be "${expected}"`;
                        }

                        return { pass, message };
                    }
                };
            },

            toHaveAttribute() {
                return {
                    compare(element, attrName) {
                        if (!(element instanceof HTMLElement)) {
                            throw new TypeError(`toHaveAttribute() TypeError: ${typeof element} - ${element && element.constructor} (${attrName})`);
                        }

                        const pass    = element.hasAttribute(attrName)
                            , message = `Expected element ${pass ? 'to not' : 'to'} have attribute ${attrName}`;

                        return { pass, message };
                    }
                };
            },

            toHaveClass() {
                return {
                    compare(element, className) {
                        if (!(element instanceof HTMLElement)) {
                            throw new TypeError(`toHaveClass() TypeError: ${typeof element} - ${element && element.constructor} (${className})`);
                        }

                        const list    = Array.from(element.classList).map(c => `'${c}'`).join(', ')
                            , pass    = element.classList.contains(className)
                            , message = `Expected ${pass ? 'not to' : 'to'} find '${className}' in element's class list (${list})`;

                        return { pass, message };
                    }
                };
            }
        });
    });

    return jasmine;
}

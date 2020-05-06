"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grammar {
    constructor(gram) {
        let set = new Set();
        let input = gram.split("\n");
        for (let i = 0; i < input.length; i++) {
            if (input[i] != '') {
                if (!input[i].includes(" -> "))
                    throw new Error("No identifiers found...");
                let ID = input[i].split(" -> ");
                if (set.has(ID[0]))
                    throw new Error("Variable already exists...");
                set.add(ID[0]);
                try {
                    new RegExp(ID[1]);
                }
                catch (e) {
                    throw new Error("Invalid regular expression...");
                }
            }
        }
    }
}
exports.Grammar = Grammar;
//# sourceMappingURL=Grammar.js.map
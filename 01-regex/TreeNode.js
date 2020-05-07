"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
    constructor(sym, token) {
        this.sym = sym;
        this.token = token;
        this.children = [];
    }
    toString() {
        function walk(x, callback) {
            callback(x);
            x.children.forEach((j) => {
                walk(j, callback);
            });
        }
        let temp = [];
        temp.push("digraph d{");
        temp.push('node [fontname="Helvetica",shape=box];');
        let counter = 0;
        walk(this, (n) => {
            n.NUMBER = "n" + (counter++);
            let i = n.sym;
            if (n.token) {
                i += "\n";
                i += n.token.lexeme;
            }
            i = i.replace(/&/g, "&amp;");
            i = i.replace(/</g, "&lt;");
            i = i.replace(/>/g, "&gt;");
            i = i.replace(/\n/g, "<br/>");
            temp.push(`${n.NUMBER} [label=<${i}>];`);
        });
        walk(this, (n) => {
            n.children.forEach((x) => {
                temp.push(`${n.NUMBER} -> ${x.NUMBER};`);
            });
        });
        temp.push("}");
        return temp.join("\n");
    }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=TreeNode.js.map
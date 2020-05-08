import { Token } from "./Token"

export class TreeNode {
    sym: string;
    token: Token;
    children: TreeNode[];
    constructor(sym: string, token: Token) {
        this.sym = sym;
        this.token = token;
        this.children = [];
    }

    toString() {
        function walk(x: any, callback: any) {
            callback(x);
            x.children.forEach((j: any) => {
                walk(j, callback);
            });
        }
        let temp: string[] = [];
        temp.push("digraph d{");
        temp.push('node [fontname="Helvetica",shape=box];');
        let counter = 0;
        walk(this, (n: any) => {
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

        walk(this, (n: any) => {
            n.children.forEach((x: any) => {
                temp.push(`${n.NUMBER} -> ${x.NUMBER};`);
            });
        });

        temp.push("}");
        return temp.join("\n");

    }
}
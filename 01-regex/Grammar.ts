import { error } from "util";

class Node
{
    label: string;
    nodes: Node[];

    constructor(x: string)
    {
        this.label = x;
        this.nodes = [];
    }
}

export class Grammar
{

    nonTerminals: [string, string][] = [];
    terminals: [string, RegExp][] = [];
    nullable: Set<string> = new Set();

    dfs(node: Node, used: Set<string>)
    {
        used.add(node.label);

        const found = this.nonTerminals.find(n => n[0] === node.label);

        if (found !== undefined)
        {
            let str = found[1];
            str = str.replace('|', '');
            str = str.replace(',', ' ');

            str.split(new RegExp('\\b')).forEach(x =>
            {
                let tmp = x.trim();

                if (tmp !== '')
                {
                    let newNode: Node = new Node(tmp);
                    node.nodes.push(newNode);
                }
            });
        }

        if (node.nodes !== undefined)
        {
            node.nodes.forEach((x: Node) =>
            {
                if (!used.has(x.label))
                {
                    this.dfs(x, used);
                }
            });
        }


    }


    constructor(gram: string)
    {
        let set: Set<string> = new Set();
        let input = gram.split("\n");
        let isTerm: boolean = true;
        let terms: string[] = [];
        let nonterms: string[] = [];

        input.forEach(x =>
        {
            if (x.length != 0)
            {
                if (isTerm)
                {
                    terms.push(x);
                }
                else
                {
                    nonterms.push(x);
                }
            }
            else
            {
                isTerm = false;
            }

        });

        for (let i = 0; i < terms.length; i++)
        {
            if (terms[i].length == 0)
            {
                continue;
            }
            else if (!terms[i].includes(" -> "))
            {
                throw new Error("No Identifiers...");
            }

            let ID = terms[i].split(" -> ");

            if (set.has(ID[0]))
            {
                throw new Error("Variable already exists...");
            }
            else if (ID[0] == "")
            {
                throw new Error("ID is Empty!");
            }

            if (set.has(ID[1])) {
                throw new Error("Regex already exists...");
            }
            else if (ID[1] == "")
            {
                throw new Error("Regex is Empty!");
            }

            try
            {
                new RegExp(ID[1]);
            }
            catch
            {
                throw new Error("Invalid ragular expression...")
            }

            if (!set.has(ID[0]))
            {
                set.add(ID[0]);
            }
            
            this.terminals[i] = [ID[0], RegExp(ID[1])];

        }

        for (let i = 0; i < nonterms.length; i++)
        {
            if (nonterms[i].length == 0)
            {
                continue;
            }
            else if (!nonterms[i].includes(" -> "))
            {
                throw new Error("No connection...");
            }

            let ID = nonterms[i].split(" -> ");

            if (ID[0] == "") {
                throw new Error("ID is Empty!");
            }
            else if (ID[1] == "")
            {
                throw new Error("Nonterminal is Empty!");
            }

            const found: number = this.nonTerminals.findIndex(e => e[0] === ID[0]);

            if (found !== -1) {
                var nonterm = this.nonTerminals[found];
                this.nonTerminals[found][1] = nonterm + ' | ' + ID[1];
            }
            else if (!set.has(ID[0]))
            {
                set.add(ID[0]);
            }

            //console.log(set);
            this.nonTerminals[i] = [ID[0], ID[1]];

        }

        let used: Set<string> = new Set();
        let start: Node = new Node("expr");

        this.dfs(start, used);

        if (set !== undefined)
        {
            set.forEach(def =>
            {
                if (!used.has(def))
                {
                    //throw new Error(def + " is defined, but isn't used...");
                }
            });
        }

        if (used != undefined)
        {
            used.forEach(use =>
            {
                if (use !== '' && !set.has(use))
                {
                    //throw new Error(use + " is used, but isn't defined...");
                }
            });
        }


    }

    getNullable()
    {
        this.nullable = new Set();
        let cont;

        while (true)
        {
            cont = true;
            this.nonTerminals.forEach(x =>
            {
                console.log(x);
                if (!this.nullable.has(x[0]))
                {
                    let productions = x[1].split("|");
                    productions.forEach(j =>
                    {
                        let tmp = j.trim().split(" ");
                        if (tmp.every(y => this.nullable.has(y) || y == "lambda"))
                        {
                            this.nullable.add(x[0]);
                            cont = false;
                        }
                    });
                }
            });
            if (cont)
            {
                break;
            }
        }

        return this.nullable;

    }


}
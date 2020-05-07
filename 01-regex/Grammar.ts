﻿export class Grammar
{
    terminals: [string, RegExp][] = [];
    constructor(gram: string)
    {
        let set: Set<string> = new Set();
        let input = gram.split("\n");

        for (let i = 0; i < input.length; i++)
        {
            if (input[i].length == 0)
            {
                continue;
            }
            else if (!input[i].includes(" -> "))
            {
                throw new Error("No Identifiers...");
            }

            let ID = input[i].split(" -> ");

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
            set.add(ID[0]);
            this.terminals[i] = [ID[0], RegExp(ID[1])];

        }


    }
}
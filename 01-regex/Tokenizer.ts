import { Token } from "./Token"
import { Grammar } from "./Grammar"

export class Tokenizer {
    grammar: Grammar;
    inputData: string;
    currentLine: number = 1;
    idx: number = 0;    //index of next unparsed char in inputData

    constructor(grammar: Grammar)
    {
        this.grammar = grammar;

        let addWhitespace = true;
        let addComment = true;

        for (let i = 0; i < this.grammar.terminals.length; ++i)
        {
            if (this.grammar.terminals[i][0] == "WHITESPACE")
                addWhitespace = false;
            if (this.grammar.terminals[i][0] == "COMMENT")
                addComment = false;

        }
        if (addWhitespace)
            this.grammar.terminals.push(["WHITESPACE", new RegExp("\\s+")]);
        if (addComment)
            this.grammar.terminals.push(["COMMENT", new RegExp("/\\*(.|\\n)*?\\*/")]);

    }

    setInput(inputData: string)
    {
        this.inputData = inputData;
        this.currentLine = 1;
        this.idx = 0;
        console.log(inputData);
    }

    next(): Token
    {
        if (this.idx >= this.inputData.length)
        {
            //special "end of file" metatoken
            return new Token("$", undefined, this.currentLine)
        }
        for (let i = 0; i < this.grammar.terminals.length; ++i)
        {
            let terminal = this.grammar.terminals[i];
            let sym = terminal[0];
            let rex = new RegExp(terminal[1], "y");     //RegExp
            rex.lastIndex = this.idx;   //tell where to start searching
            let m = rex.exec(this.inputData);   //do the search

            if (m)
            {
                //m[0] contains matched text as string
                let lexeme = m[0];
                this.idx += lexeme.length;
                let tmp = this.currentLine;
                this.currentLine += lexeme.split('\n').length - 1;

                if (sym !== "WHITESPACE" && sym !== "COMMENT")
                {
                    //return new Token using sym, lexeme, and line number
                    return new Token(sym, lexeme, tmp);
                }
                else
                {
                    //skip whitespace and get next real token
                    return this.next();
                }
            }
        }
        //no match; syntax error
        throw new Error("Syntax Error!!!")
    }
}
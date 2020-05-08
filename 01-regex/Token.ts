export class Token {
    sym: string;
    lexeme: string;
    line: number;
    constructor(sym: string, line: number, lexeme: string) {
        this.sym = sym;
        this.lexeme = lexeme;
        this.line = line;
    }
    toString() {

        return `${this.sym} ${this.line} ${this.lexeme}`;
    }
}
"use strict";
class CPU {
    constructor() {
        this.registers = new Map();
        this.memory = new Array(256).fill(0);
        this.pc = 0;
        // Initialize registers (for simplicity, we'll use r1, r2, r3, r4)
        ["r1", "r2", "r3", "r4"].forEach((reg) => this.registers.set(reg, 0));
    }
    // Method to execute a given instruction
    execute(instruction) {
        const [opcode, ...args] = instruction.split(" ");
        switch (opcode) {
            case "ADD":
                this.add(args);
                break;
            case "SUB":
                this.sub(args);
                break;
            case "MUL":
                this.mul(args);
                break;
            case "DIV":
                this.div(args);
                break;
            case "AND":
                this.and(args);
                break;
            case "OR":
                this.or(args);
                break;
            case "NOT":
                this.not(args);
                break;
            case "XOR":
                this.xor(args);
                break;
            case "LOAD":
                this.load(args);
                break;
            case "STORE":
                this.store(args);
                break;
            case "MOVE":
                this.move(args);
                break;
            case "JMP":
                this.jmp(args);
                break;
            case "JZ":
                this.jz(args);
                break;
            case "JNZ":
                this.jnz(args);
                break;
            case "PRINT":
                this.print(args);
                break;
            default:
                throw new Error(`Unknown instruction: ${opcode}`);
        }
    }
    add(args) {
        var _a, _b;
        const [reg1, reg2, reg3] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg2)) !== null && _a !== void 0 ? _a : 0) + ((_b = this.registers.get(reg3)) !== null && _b !== void 0 ? _b : 0));
    }
    sub(args) {
        var _a, _b;
        const [reg1, reg2, reg3] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg2)) !== null && _a !== void 0 ? _a : 0) - ((_b = this.registers.get(reg3)) !== null && _b !== void 0 ? _b : 0));
    }
    mul(args) {
        var _a, _b;
        const [reg1, reg2, reg3] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg2)) !== null && _a !== void 0 ? _a : 0) * ((_b = this.registers.get(reg3)) !== null && _b !== void 0 ? _b : 0));
    }
    div(args) {
        var _a, _b;
        const [reg1, reg2, reg3] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg2)) !== null && _a !== void 0 ? _a : 0) / ((_b = this.registers.get(reg3)) !== null && _b !== void 0 ? _b : 1));
    }
    and(args) {
        var _a, _b;
        const [reg1, reg2] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg1)) !== null && _a !== void 0 ? _a : 0) & ((_b = this.registers.get(reg2)) !== null && _b !== void 0 ? _b : 0));
    }
    or(args) {
        var _a, _b;
        const [reg1, reg2] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg1)) !== null && _a !== void 0 ? _a : 0) | ((_b = this.registers.get(reg2)) !== null && _b !== void 0 ? _b : 0));
    }
    not(args) {
        var _a;
        const [reg1] = args;
        this.registers.set(reg1, ~((_a = this.registers.get(reg1)) !== null && _a !== void 0 ? _a : 0));
    }
    xor(args) {
        var _a, _b;
        const [reg1, reg2] = args;
        this.registers.set(reg1, ((_a = this.registers.get(reg1)) !== null && _a !== void 0 ? _a : 0) ^ ((_b = this.registers.get(reg2)) !== null && _b !== void 0 ? _b : 0));
    }
    load(args) {
        const [reg, addr] = args;
        this.registers.set(reg, this.memory[parseInt(addr)]);
    }
    store(args) {
        var _a;
        const [addr, reg] = args;
        this.memory[parseInt(addr)] = (_a = this.registers.get(reg)) !== null && _a !== void 0 ? _a : 0;
    }
    move(args) {
        var _a;
        const [reg1, reg2] = args;
        this.registers.set(reg1, (_a = this.registers.get(reg2)) !== null && _a !== void 0 ? _a : 0);
    }
    jmp(args) {
        const [addr] = args;
        this.pc = parseInt(addr);
    }
    jz(args) {
        const [addr, reg] = args;
        if (this.registers.get(reg) === 0) {
            this.pc = parseInt(addr);
        }
    }
    jnz(args) {
        const [addr, reg] = args;
        if (this.registers.get(reg) !== 0) {
            this.pc = parseInt(addr);
        }
    }
    print(args) {
        const [reg] = args;
        console.log(`${reg}: ${this.registers.get(reg)}`);
    }
    run(program) {
        while (this.pc < program.length) {
            this.execute(program[this.pc]);
            this.pc++;
        }
    }
}
// Sample program
const program = [
    "LOAD r1 10",
    "LOAD r2 20",
    "ADD r3 r1 r2",
    "PRINT r3",
    "SUB r3 r3 r1",
    "PRINT r3",
    "MUL r3 r3 r2",
    "PRINT r3",
    "DIV r3 r3 r2",
    "PRINT r3",
    "AND r1 r2",
    "PRINT r1",
    "OR r1 r2",
    "PRINT r1",
    "NOT r1",
    "PRINT r1",
    "XOR r1 r2",
    "PRINT r1",
];
const cpu = new CPU();
cpu.run(program);

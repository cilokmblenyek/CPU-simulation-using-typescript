"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class CPU {
    constructor() {
        this.registers = new Map();
        this.memory = new Array(256).fill(0);
        this.pc = 0;
        // Initialize registers (for simplicity, we'll use r1, r2, r3, r4)
        ["r1", "r2", "r3", "r4"].forEach((reg) => this.registers.set(reg, 0));
    }
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
        const [reg1, reg2, reg3] = args;
        const value1 = this.registers.get(reg2);
        const value2 = this.registers.get(reg3);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 + value2);
        }
    }
    sub(args) {
        const [reg1, reg2, reg3] = args;
        const value1 = this.registers.get(reg2);
        const value2 = this.registers.get(reg3);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 - value2);
        }
    }
    mul(args) {
        const [reg1, reg2, reg3] = args;
        const value1 = this.registers.get(reg2);
        const value2 = this.registers.get(reg3);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 * value2);
        }
    }
    div(args) {
        const [reg1, reg2, reg3] = args;
        const value1 = this.registers.get(reg2);
        const value2 = this.registers.get(reg3);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 / value2);
        }
    }
    and(args) {
        const [reg1, reg2] = args;
        const value1 = this.registers.get(reg1);
        const value2 = this.registers.get(reg2);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 & value2);
        }
    }
    or(args) {
        const [reg1, reg2] = args;
        const value1 = this.registers.get(reg1);
        const value2 = this.registers.get(reg2);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 | value2);
        }
    }
    not(args) {
        const [reg1] = args;
        const value1 = this.registers.get(reg1);
        if (value1 !== undefined) {
            this.registers.set(reg1, ~value1);
        }
    }
    xor(args) {
        const [reg1, reg2] = args;
        const value1 = this.registers.get(reg1);
        const value2 = this.registers.get(reg2);
        if (value1 !== undefined && value2 !== undefined) {
            this.registers.set(reg1, value1 ^ value2);
        }
    }
    load(args) {
        const [reg, addr] = args;
        const addressValue = parseInt(addr);
        if (!isNaN(addressValue)) {
            this.registers.set(reg, addressValue);
        }
        else {
            const value = this.memory[addressValue];
            if (value !== undefined) {
                this.registers.set(reg, value);
            }
        }
    }
    store(args) {
        const [addr, reg] = args;
        const value = this.registers.get(reg);
        if (value !== undefined) {
            this.memory[parseInt(addr)] = value;
        }
    }
    move(args) {
        const [reg1, reg2] = args;
        const value = this.registers.get(reg2);
        if (value !== undefined) {
            this.registers.set(reg1, value);
        }
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
// Function to read the assembly file and execute it
function executeAssemblyFile(filePath) {
    const assemblyCode = (0, fs_1.readFileSync)(filePath, "utf-8");
    const instructions = assemblyCode
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    const cpu = new CPU();
    cpu.run(instructions);
}
// Specify the path to the assembly file
const assemblyFilePath = (0, path_1.join)(__dirname, "../program.asm");
executeAssemblyFile(assemblyFilePath);

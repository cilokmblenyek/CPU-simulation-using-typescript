import { readFileSync } from "fs";
import { join } from "path";

class CPU {
  registers: Map<string, number>;
  memory: number[];
  pc: number; // Program counter

  constructor() {
    this.registers = new Map<string, number>();
    this.memory = new Array(256).fill(0);
    this.pc = 0;

    // Initialize registers (for simplicity, we'll use r1, r2, r3, r4)
    ["r1", "r2", "r3", "r4"].forEach((reg) => this.registers.set(reg, 0));
  }

  execute(instruction: string) {
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

  add(args: string[]) {
    const [reg1, reg2, reg3] = args;
    const value1 = this.registers.get(reg2);
    const value2 = this.registers.get(reg3);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 + value2);
    }
  }

  sub(args: string[]) {
    const [reg1, reg2, reg3] = args;
    const value1 = this.registers.get(reg2);
    const value2 = this.registers.get(reg3);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 - value2);
    }
  }

  mul(args: string[]) {
    const [reg1, reg2, reg3] = args;
    const value1 = this.registers.get(reg2);
    const value2 = this.registers.get(reg3);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 * value2);
    }
  }

  div(args: string[]) {
    const [reg1, reg2, reg3] = args;
    const value1 = this.registers.get(reg2);
    const value2 = this.registers.get(reg3);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 / value2);
    }
  }

  and(args: string[]) {
    const [reg1, reg2] = args;
    const value1 = this.registers.get(reg1);
    const value2 = this.registers.get(reg2);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 & value2);
    }
  }

  or(args: string[]) {
    const [reg1, reg2] = args;
    const value1 = this.registers.get(reg1);
    const value2 = this.registers.get(reg2);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 | value2);
    }
  }

  not(args: string[]) {
    const [reg1] = args;
    const value1 = this.registers.get(reg1);
    if (value1 !== undefined) {
      this.registers.set(reg1, ~value1);
    }
  }

  xor(args: string[]) {
    const [reg1, reg2] = args;
    const value1 = this.registers.get(reg1);
    const value2 = this.registers.get(reg2);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 ^ value2);
    }
  }

  load(args: string[]) {
    const [reg, addr] = args;
    const value = this.memory[parseInt(addr)];
    if (value !== undefined) {
      this.registers.set(reg, value);
    }
  }

  store(args: string[]) {
    const [addr, reg] = args;
    const value = this.registers.get(reg);
    if (value !== undefined) {
      this.memory[parseInt(addr)] = value;
    }
  }

  move(args: string[]) {
    const [reg1, reg2] = args;
    const value = this.registers.get(reg2);
    if (value !== undefined) {
      this.registers.set(reg1, value);
    }
  }

  jmp(args: string[]) {
    const [addr] = args;
    this.pc = parseInt(addr);
  }

  jz(args: string[]) {
    const [addr, reg] = args;
    if (this.registers.get(reg) === 0) {
      this.pc = parseInt(addr);
    }
  }

  jnz(args: string[]) {
    const [addr, reg] = args;
    if (this.registers.get(reg) !== 0) {
      this.pc = parseInt(addr);
    }
  }

  print(args: string[]) {
    const [reg] = args;
    console.log(`${reg}: ${this.registers.get(reg)}`);
  }

  run(program: string[]) {
    while (this.pc < program.length) {
      this.execute(program[this.pc]);
      this.pc++;
    }
  }
}

// Function to read the assembly file and execute it
function executeAssemblyFile(filePath: string) {
  const assemblyCode = readFileSync(filePath, "utf-8");
  const instructions = assemblyCode
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const cpu = new CPU();
  cpu.run(instructions);
}

// Specify the path to the assembly file
const assemblyFilePath = join(__dirname, "../program.asm");
executeAssemblyFile(assemblyFilePath);

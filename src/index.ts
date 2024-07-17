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

  // Method to execute a given instruction
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
    this.registers.set(
      reg1,
      (this.registers.get(reg2) ?? 0) + (this.registers.get(reg3) ?? 0)
    );
  }

  sub(args: string[]) {
    const [reg1, reg2, reg3] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg2) ?? 0) - (this.registers.get(reg3) ?? 0)
    );
  }

  mul(args: string[]) {
    const [reg1, reg2, reg3] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg2) ?? 0) * (this.registers.get(reg3) ?? 0)
    );
  }

  div(args: string[]) {
    const [reg1, reg2, reg3] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg2) ?? 0) / (this.registers.get(reg3) ?? 1)
    );
  }

  and(args: string[]) {
    const [reg1, reg2] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg1) ?? 0) & (this.registers.get(reg2) ?? 0)
    );
  }

  or(args: string[]) {
    const [reg1, reg2] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg1) ?? 0) | (this.registers.get(reg2) ?? 0)
    );
  }

  not(args: string[]) {
    const [reg1] = args;
    this.registers.set(reg1, ~(this.registers.get(reg1) ?? 0));
  }

  xor(args: string[]) {
    const [reg1, reg2] = args;
    this.registers.set(
      reg1,
      (this.registers.get(reg1) ?? 0) ^ (this.registers.get(reg2) ?? 0)
    );
  }

  load(args: string[]) {
    const [reg, addr] = args;
    this.registers.set(reg, this.memory[parseInt(addr)]);
  }

  store(args: string[]) {
    const [addr, reg] = args;
    this.memory[parseInt(addr)] = this.registers.get(reg) ?? 0;
  }

  move(args: string[]) {
    const [reg1, reg2] = args;
    this.registers.set(reg1, this.registers.get(reg2) ?? 0);
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

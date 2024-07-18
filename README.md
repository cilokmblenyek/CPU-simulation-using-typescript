# Proyek Simulasi CPU menggunakan typescript _(CPU Simulation Using Typescript)_

berikut adalah proyek simulasi CPU dengan menggunakan typescript.

<div align=center>

|    NRP     |         Name          |
| :--------: | :-------------------: |
| 5025221191 | Ahmad Fatih Ramadhani |

</div>

## Komponen

Pada simulasi CPU kali ini akan dideklarasikan komponen-komponen CPU berdasarkan gambar dibawah ini:

![komponen CPU](/img/komponen.png)

Dalam kode yang dibuat, komponen PC, Memory, Register, dan ALU disimulasikan menggunakan struktur data yang disediakan oleh typescript.

```ts
class CPU {
  registers: Map<string, number>;
  memory: number[];
  pc: number; // Program counter

  constructor() {
    this.registers = new Map<string, number>();
    this.memory = new Array(256).fill(0);
    this.pc = 0;

    // Inisiasi register
    ["r1", "r2", "r3", "r4", "r5", "r6"].forEach((reg) =>
      this.registers.set(reg, 0)
    );

    // Initialize memory with some values
    this.memory[0] = 10;
    this.memory[1] = 20;
    this.memory[2] = 30;
    this.memory[3] = 40;
    this.memory[4] = 10;
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

    // Check for the format X(R2)
    const match = addr.match(/(\d+)\((r\d+)\)/);
    if (match) {
      const offset = parseInt(match[1]);
      const baseReg = match[2];

      const baseAddress = this.registers.get(baseReg);
      if (baseAddress !== undefined) {
        const effectiveAddress = baseAddress + offset;
        const value = this.memory[effectiveAddress];
        if (value !== undefined) {
          this.registers.set(reg, value);
        }
      }
    } else {
      // Original LOAD functionality
      const value = this.memory[parseInt(addr)];
      if (value !== undefined) {
        this.registers.set(reg, value);
      }
    }
  }

  store(args: string[]) {
    const [reg, addr] = args;

    // Check for the format X(R2)
    const match = addr.match(/(\d+)\((r\d+)\)/);
    if (match) {
      const offset = parseInt(match[1]);
      const baseReg = match[2];

      const baseAddress = this.registers.get(baseReg);
      const value = this.registers.get(reg);
      if (baseAddress !== undefined && value !== undefined) {
        const effectiveAddress = baseAddress + offset;
        this.memory[effectiveAddress] = value;
      }
    } else {
      // Original STORE functionality
      const value = this.registers.get(reg);
      if (value !== undefined) {
        this.memory[parseInt(addr)] = value;
      }
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
      let currentInstruction = program[this.pc];
      this.pc++;
      this.execute(currentInstruction);
    }
  }
}
```

### register

register akan disimulasikan menggunakan map, dimana setiap alamat register akan berkorespondensi dengan sebuah alamat memori.

```ts
registers: Map<string, number>;
this.registers = new Map<string, number>();
// Inisiasi register
["r1", "r2", "r3", "r4", "r5", "r6"].forEach((reg) =>
  this.registers.set(reg, 0)
);
```

### memori

memori akan disimulasikan menggunakan array yang berisi sebuah nilai.

```ts
memory: number[];
this.memory = new Array(256).fill(0);
    // Initialize memory with some values
    this.memory[0] = 10;
    this.memory[1] = 20;
    this.memory[2] = 30;
    this.memory[3] = 40;
    this.memory[4] = 10;
```

### program counter

program counter disini disimulasikan menggunakan variabel int biasa yang di increment/decrement setiap sebuah printah dijalankan.

```ts
pc: number; // Program counter
this.pc = 0;
```

### ALU

ALU atau Arithmetic Logic Unit akan disimulasikan menggunakan beberapa user defined function yang dibuat untuk menjalankan perintah-perintah berikut:

Arithmetic instructions: ADD, SUB, MUL, DIV

Logical instructions: AND, OR, NOT, XOR

Data movement instructions: LOAD, STORE, MOVE

Control flow instructions: JMP (jump), JZ (jump if zero), JNZ (jump if not zero)

Print for debugging: PRINT <register>

```ts
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
```

## Datapath

Dalam simulasi ini, CPU berjalan berdasarkan gambar dibawah ini:

![Datapath CPU](/img/datapath.png)

datapath disimulasikan dalam fungsi run, dimana instruksi di fetch terlebih dahulu, kemudian program counter di-increment, dan instruksi di decode.

```ts
  run(program: string[]) {
    while (this.pc < program.length) {
      let currentInstruction = program[this.pc];
      this.pc++;
      this.execute(currentInstruction);
    }
  }
```

## Logic

Berikut adalah logic dari beberapa fungsi yang akan digunakan:

### LOAD

![LOAD](/img/LOAD.png)

```ts
  load(args: string[]) {
    const [reg, addr] = args;

    // Check for the format X(R2)
    const match = addr.match(/(\d+)\((r\d+)\)/);
    if (match) {
      const offset = parseInt(match[1]);
      const baseReg = match[2];

      const baseAddress = this.registers.get(baseReg);
      if (baseAddress !== undefined) {
        const effectiveAddress = baseAddress + offset;
        const value = this.memory[effectiveAddress];
        if (value !== undefined) {
          this.registers.set(reg, value);
        }
      }
    } else {
      // Original LOAD functionality
      const value = this.memory[parseInt(addr)];
      if (value !== undefined) {
        this.registers.set(reg, value);
      }
    }
  }
```

### STORE

![STORE](/img/STORE.png)

```ts
  store(args: string[]) {
    const [reg, addr] = args;

    // Check for the format X(R2)
    const match = addr.match(/(\d+)\((r\d+)\)/);
    if (match) {
      const offset = parseInt(match[1]);
      const baseReg = match[2];

      const baseAddress = this.registers.get(baseReg);
      const value = this.registers.get(reg);
      if (baseAddress !== undefined && value !== undefined) {
        const effectiveAddress = baseAddress + offset;
        this.memory[effectiveAddress] = value;
      }
    } else {
      // Original STORE functionality
      const value = this.registers.get(reg);
      if (value !== undefined) {
        this.memory[parseInt(addr)] = value;
      }
    }
  }
```

### ADD

![ADD](/img/ADD.png)

```ts
  add(args: string[]) {
    const [reg1, reg2, reg3] = args;
    const value1 = this.registers.get(reg2);
    const value2 = this.registers.get(reg3);
    if (value1 !== undefined && value2 !== undefined) {
      this.registers.set(reg1, value1 + value2);
    }
  }
```

## Use Case

Dengan menggunakan rangkaian perintah dalam bentuk assembly, simulasi CPU diatas dapat berjalan dan mengeluarkan output berikut:

![output](/img/output.png)

berikut adalah penjelasan dari rangkaian perintah assembly yang digunakan sebagai use case:

```asm
LOAD r1 0(r1)      // Load value from memory address (0 + r1) into r1. Initial r1 is 0, so it loads memory[0] (10) into r1.
LOAD r2 1(r2)      // Load value from memory address (1 + r2) into r2. Initial r2 is 0, so it loads memory[1] (20) into r2.
LOAD r3 2(r3)      // Load value from memory address (2 + r3) into r3. Initial r3 is 0, so it loads memory[2] (30) into r3.
LOAD r4 3(r4)      // Load value from memory address (3 + r4) into r4. Initial r4 is 0, so it loads memory[3] (40) into r4.
PRINT r1           // Print the value of r1 (10).
PRINT r2           // Print the value of r2 (20).
PRINT r3           // Print the value of r3 (30).
PRINT r4           // Print the value of r4 (40).
ADD r1 r2 r3       // Add the values of r2 (20) and r3 (30) and store the result in r1. Now r1 = 50.
PRINT r1           // Print the value of r1 (50).
STORE r1 4(r1)     // Store the value of r1 (50) into memory address (4 + r1). r1 is 50, so it stores 50 into memory[54].
LOAD r5 0(r5)      // Load value from memory address (0 + r5) into r5. Initial r5 is 0, so it loads memory[0] (10) into r5.
PRINT r5           // Print the value of r5 (10).
MOVE r6 r5         // Move the value of r5 (10) into r6. Now r6 = 10.
PRINT r6           // Print the value of r6 (10).
SUB r1 r3 r2       // Subtract the value of r2 (20) from r3 (30) and store the result in r1. Now r1 = 10.
PRINT r1           // Print the value of r1 (10).
MUL r1 r2 r3       // Multiply the values of r2 (20) and r3 (30) and store the result in r1. Now r1 = 600.
PRINT r1           // Print the value of r1 (600).
DIV r1 r3 r5       // Divide the value of r3 (30) by r5 (10) and store the result in r1. Now r1 = 3.
PRINT r1           // Print the value of r1 (3).
AND r1 r5          // Perform bitwise AND on the values of r1 (3) and r5 (10) and store the result in r1. Now r1 = 2.
PRINT r1           // Print the value of r1 (2).
OR r1 r5           // Perform bitwise OR on the values of r1 (2) and r5 (10) and store the result in r1. Now r1 = 10.
PRINT r1           // Print the value of r1 (10).
NOT r1             // Perform bitwise NOT on the value of r1 (10) and store the result in r1. Now r1 = -11.
PRINT r1           // Print the value of r1 (-11).
XOR r5 r6          // Perform bitwise XOR on the values of r5 (10) and r6 (10) and store the result in r5. Now r5 = 0.
PRINT r5           // Print the value of r5 (0).
JMP 35             // Jump to instruction at line 35.
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r3           // Print the value of r3 (30).
JZ 42 r5           // If r5 is zero, jump to instruction at line 42. r5 is 0, so jump to line 42.
PRINT r3           // (Skipped due to jump) Print the value of r3 (not executed).
PRINT r3           // (Skipped due to jump) Print the value of r3 (not executed).
PRINT r3           // (Skipped due to jump) Print the value of r3 (not executed).
PRINT r3           // (Skipped due to jump) Print the value of r3 (not executed).
PRINT r3           // (Skipped due to jump) Print the value of r3 (not executed).
PRINT r5           // Print the value of r5 (0).
JNZ 49 r3          // If r3 is not zero, jump to instruction at line 49. r3 is 30, so jump to line 49.
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r5           // (Skipped due to jump) Print the value of r5 (not executed).
PRINT r1           // Print the value of r1 (-11).
```

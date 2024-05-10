# TypeScript Basics: Basic Types and Variables

## Variables in TypeScript

Just like in JavaScript, a variable in TypeScript is a named location in memory that holds a value. You can declare variables using the `let` keyword. Here are some basic types of variables:

1. **Boolean**: Represents true or false values.

   ```typescript
   let isDone: boolean = false;
   ```

2. **Number**: Represents numeric values (both floating point and BigIntegers).

   ```typescript
   let decimal: number = 6;
   let hex: number = 0xf00d;
   let binary: number = 0b1010;
   let octal: number = 0o744;
   let big: bigint = 100n;
   ```

3. **String**: Represents textual data.

   ```typescript
   let color: string = "blue";
   color = "red";

   // Template strings
   let fullName: string = `Bob Bobbington`;
   let age: number = 37;
   let sentence: string = `Hello, my name is ${fullName}. I'll be ${
     age + 1
   } years old next month.`;
   ```

4. **Array**: Represents collections of values.

   ```typescript
   // Using type inference
   let list: number[] = [1, 2, 3];

   // Using generic array type
   let anotherList: Array<number> = [4, 5, 6];
   ```

5. **Tuple**: Represents an array with a fixed number of elements of known types.
   ```typescript
   let x: [string, number];
   x = ["hello", 10]; // OK
   // x = [10, "hello"]; // Error: Type 'number' is not assignable to type 'string'.
   ```

## Conclusion

These are some of the basic types and variables you can use in TypeScript. Feel free to explore more advanced features as you dive deeper into TypeScript!

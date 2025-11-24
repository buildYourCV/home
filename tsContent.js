function getTSContent() {
 const topicContent = {
      1: `
      <h4>Introduction to TypeScript</h4>
    <p>TypeScript is a strongly typed programming language that builds on JavaScript. TypeScript is a superset of JavaScript, which means any valid JavaScript code is also valid TypeScript code.</p>
    <p><b>TypeScript = JavaScript + Type System.</b> Where the Type System means (type safety, interfaces, generics, etc.)</p>  
    <h4>Setup and Hello World</h4>
    <p><strong>Step 1:</strong> Install TypeScript globally</p>
    <pre><code>npm install -g typescript</code></pre>
    <p><strong>Step 2:</strong> Create a file <code>hello.ts</code></p>
    <pre><code>let message: string = "Hello, TypeScript!";
console.log(message);</code></pre>
    <p><strong>Step 3:</strong> Compile and run</p>
    <pre><code>tsc hello.ts
node hello.js</code></pre>
    <p>This verifies your environment is set up correctly.</p>

    <hr/>
    <h4>Installing NodeJS and Creating Your First TypeScript Project</h4>
    <p>Now, in order to get started with TypeScript, the first thing that we need to do is to install the NodeJS runtime.</p>
    <p>NodeJS is a standard development tool used for developing both backend as well as front-end applications for JavaScript as well as TypeScript.</p>
    <p>To install NodeJS, open up your browser and head to <a href="https://nodejs.org" target="_blank">nodejs.org</a>. The homepage will suggest a version for your OS, or you can go to the download page to select one manually.</p>

    <p>Once downloaded and installed, verify installation:</p>
    <pre><code>node --version</code></pre>
    <p>You can also verify the npm executables:</p>
    <pre><code>npm --version
npx --version</code></pre>

    <h5>Initialize a TypeScript Project</h5>
    <pre><code>mkdir my-ts-app
cd my-ts-app
npm init -y</code></pre>
    <p>This creates a Node.js package. Now install TypeScript:</p>
    <pre><code>npm install typescript</code></pre>
    <p>This installs the TypeScript compiler (<code>tsc</code>) locally in your project.</p>

    <p>Initialize a TypeScript config file:</p>
    <pre><code>npx tsc --init --rootDir src --outDir lib</code></pre>
    <p>This creates a <code>tsconfig.json</code> file which stores compiler options.</p>

    <h5>Recommended IDE</h5>
    <p>Use <strong>Visual Studio Code</strong> — it’s developed by Microsoft (the creators of TypeScript). You can download it from <a href="https://code.visualstudio.com" target="_blank">code.visualstudio.com</a>.</p>

    <h5>Write Your First TypeScript Code</h5>
    <p>Create a file <code>src/index.ts</code> and add:</p>
    <pre><code>let message: string = "Hello World";
console.log(message);</code></pre>

    <h5>Compile and Run</h5>
    <pre><code>npx tsc --watch</code></pre>
    <p>This runs the TypeScript compiler in watch mode. It generates the compiled JavaScript inside <code>lib/index.js</code>.</p>

    <p>Run the compiled code:</p>
    <pre><code>node lib/index.js</code></pre>
    <p>You should see your message logged in the console.</p>

    <h5>Understanding Type Annotations</h5>
    <p>The main difference between TypeScript and JavaScript is type annotations. For example:</p>
    <pre><code>let message: string = "Hello";
message = 123; // ❌ Error: Type 'number' is not assignable to type 'string'</code></pre>
    <p>TypeScript catches these errors at compile time, helping prevent runtime issues.</p>

    <p>And with that said, congratulations on finishing the first lesson!</p>
  `,

      2: `
    <h4>Primitive Types in TypeScript</h4>
    <p>Primitive types are the most basic building blocks of data in TypeScript. They represent single immutable values and form the foundation of all data handling in TypeScript.</p>
    <p>TypeScript includes all JavaScript primitives and adds compile-time type checking for better safety and readability.</p>

    <hr/>
    <h5>1️⃣ string</h5>
    <p>Represents textual data. Strings can use single quotes, double quotes, or template literals.</p>
    <pre><code>let firstName: string = "Abhishek";
let greeting: string = \`Hello, \${firstName}!\`;</code></pre>
    <p><b>Tip:</b> Use template literals for string interpolation.</p>

    <hr/>
    <h5>2️⃣ number</h5>
    <p>Represents both integers and floating-point numbers. TypeScript does not differentiate between int and float.</p>
    <pre><code>let age: number = 25;
let price: number = 99.99;</code></pre>

    <hr/>
    <h5>3️⃣ boolean</h5>
    <p>Represents logical values: <code>true</code> or <code>false</code>.</p>
    <pre><code>let isLoggedIn: boolean = true;
let isCompleted: boolean = false;</code></pre>

    <hr/>
    <h5>4️⃣ null and undefined</h5>
    <p>Used to represent the absence of a value. When <code>strictNullChecks</code> is enabled, these types must be explicitly handled.</p>
    <pre><code>let nothing: null = null;
let notAssigned: undefined = undefined;</code></pre>
    <p><b>Note:</b> You cannot assign <code>null</code> or <code>undefined</code> to a variable of another type if <code>strictNullChecks</code> is true.</p>

    <hr/>
    <h5>5️⃣ symbol</h5>
    <p>Introduced in ES6, symbols are unique identifiers often used as object property keys.</p>
    <pre><code>let id1: symbol = Symbol("id");
let id2: symbol = Symbol("id");
console.log(id1 === id2); // false</code></pre>

    <hr/>
    <h5>6️⃣ bigint</h5>
    <p>Used to represent very large integers beyond JavaScript’s number limit.</p>
    <pre><code>let bigNumber: bigint = 1234567890123456789012345678901234567890n;</code></pre>

    <hr/>
    <h5>7️⃣ any</h5>
    <p>Disables type checking for a variable. It can hold any type of value, but should be used cautiously.</p>
    <pre><code>let randomValue: any = "Hello";
randomValue = 42; // ✅ Allowed
randomValue = true; // ✅ Allowed</code></pre>

    <hr/>
    <h5>8️⃣ unknown</h5>
    <p>Similar to <code>any</code>, but safer. You must perform a type check before using it.</p>
    <pre><code>let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe
}</code></pre>

    <hr/>
    <h5>📋 Summary Table</h5>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr><th>Type</th><th>Example</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>string</code></td><td>"Hello"</td><td>Text values</td></tr>
        <tr><td><code>number</code></td><td>42, 3.14</td><td>Numeric values</td></tr>
        <tr><td><code>boolean</code></td><td>true, false</td><td>Logical values</td></tr>
        <tr><td><code>null</code></td><td>null</td><td>Explicit absence of value</td></tr>
        <tr><td><code>undefined</code></td><td>undefined</td><td>Uninitialized variable</td></tr>
        <tr><td><code>symbol</code></td><td>Symbol("id")</td><td>Unique identifier</td></tr>
        <tr><td><code>bigint</code></td><td>123n</td><td>Large integer values</td></tr>
        <tr><td><code>any</code></td><td>Dynamic</td><td>Turns off type checking</td></tr>
        <tr><td><code>unknown</code></td><td>Dynamic but safe</td><td>Requires type check before use</td></tr>
      </tbody>
    </table>

    <p><b>Summary:</b> Primitive types ensure your variables hold predictable and valid values, reducing runtime errors and improving code quality.</p>
  `,

      3: `
    <h4>Instance Types in TypeScript</h4>
    <p>In TypeScript, <b>instance types</b> refer to the types of objects created from classes. They represent the <i>shape</i> of an instance of a class — meaning all the public properties and methods available on the class instance.</p>
    <p>Understanding instance types helps you write code that correctly uses class instances and leverages TypeScript’s strong typing for object-oriented programming.</p>

    <hr/>
    <h5>1️⃣ Defining a Class</h5>
    <pre><code>class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

// Creating an instance
const p1 = new Person("Abhishek", 25);
p1.greet();</code></pre>

    <p>Here, <code>p1</code> is an <b>instance</b> of the <code>Person</code> class, and its type is the <b>instance type</b> of <code>Person</code>.</p>

    <hr/>
    <h5>2️⃣ Instance Type vs Class Type</h5>
    <p>Every class in TypeScript has two types associated with it:</p>
    <ul>
      <li><b>The instance type</b> — describes the shape of objects created by the class.</li>
      <li><b>The constructor type</b> — describes the class itself (i.e., the constructor function).</li>
    </ul>

    <pre><code>class Car {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

// Instance type
let myCar: Car = new Car("Tesla");

// Constructor type
let carConstructor: typeof Car = Car;

const anotherCar = new carConstructor("BMW");
</code></pre>
    <p>👉 <code>Car</code> (when used as a type) refers to the instance type, while <code>typeof Car</code> refers to the constructor type.</p>

    <hr/>
    <h5>3️⃣ Using <code>InstanceType&lt;T&gt;</code> Utility Type</h5>
    <p>TypeScript provides a built-in utility type <code>InstanceType&lt;T&gt;</code> that extracts the instance type from a class constructor.</p>

    <pre><code>class Employee {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

// Extract the instance type from the class constructor
type EmployeeInstance = InstanceType<typeof Employee>;

const emp: EmployeeInstance = new Employee(101);
console.log(emp.id); // ✅ Works perfectly
</code></pre>

    <p><b>Explanation:</b> <code>typeof Employee</code> gives the constructor type, and <code>InstanceType&lt;typeof Employee&gt;</code> gives the instance type (the shape of an object created from that class).</p>

    <hr/>
    <h5>4️⃣ Why Instance Types Matter</h5>
    <ul>
      <li>They ensure that only valid instances are assigned to variables.</li>
      <li>They enable strong typing when working with classes and objects dynamically.</li>
      <li>They help when creating generic functions or factories that return class instances.</li>
    </ul>

    <hr/>
    <h5>5️⃣ Example: Factory Function Returning Instance Type</h5>
    <pre><code>function createInstance<T extends new (...args: any[]) => any>(ctor: T): InstanceType<T> {
  return new ctor(...([] as any));
}

class User {
  username: string = "guest";
}

const u = createInstance(User);
console.log(u.username); // "guest"</code></pre>
    <p>Here, <code>InstanceType&lt;T&gt;</code> helps the compiler infer the correct return type for <code>createInstance()</code>.</p>

    <hr/>
    <h5>6️⃣ Summary</h5>
    <ul>
      <li>Each class in TypeScript has two types: constructor type and instance type.</li>
      <li>The instance type represents the shape of the object created by the class.</li>
      <li>Use <code>typeof</code> to refer to a class’s constructor type.</li>
      <li>Use <code>InstanceType&lt;typeof ClassName&gt;</code> to extract the instance type.</li>
    </ul>

    <pre><code>type T = InstanceType<typeof MyClass>;</code></pre>

    <p><b>In short:</b> Instance types make your class-based code more precise, reusable, and type-safe in TypeScript.</p>
  `,


      4: `
    <h4>Arrays and Tuples in TypeScript</h4>
    <p>In TypeScript, <b>arrays</b> and <b>tuples</b> are used to store multiple values in a single variable. However, the key difference is that arrays are flexible in length and type (depending on declaration), while tuples have a fixed number of elements and each element has a specific type.</p>

    <hr/>
    <h5>1️⃣ Arrays in TypeScript</h5>
    <p>An array is a collection of values of the same type. You can define arrays in two ways:</p>

    <pre><code>// Using square brackets
let numbers: number[] = [10, 20, 30];

// Using Array generic type
let fruits: Array&lt;string&gt; = ["apple", "banana", "mango"]; or let fruits: string[] = ["apple", "banana", "mango"];
fruits.push("orange"); // ✅ Works
fruits.push(123); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'
</code></pre>

    <p>Both are valid and equivalent. You can use array methods like <code>push()</code>, <code>pop()</code>, and <code>map()</code>.</p>

    <pre><code>numbers.push(40);
console.log(numbers); // [10, 20, 30, 40]

fruits.map(f => console.log(f.toUpperCase()));
</code></pre>

    <hr/>
    <h5>2️⃣ Multi-Dimensional Arrays</h5>
    <p>You can create arrays containing other arrays — called multi-dimensional arrays.</p>

    <pre><code>let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[1][2]); // 6
</code></pre>

    <hr/>
    <h5>3️⃣ Readonly Arrays</h5>
    <p>If you want to make an array immutable (so it cannot be modified), use the <code>readonly</code> keyword.</p>

    <pre><code>const colors: readonly string[] = ["red", "green", "blue"];
// colors.push("yellow"); ❌ Error: Property 'push' does not exist on type 'readonly string[]'
</code></pre>

    <p>This ensures the array cannot be changed after creation, improving code safety.</p>

    <hr/>
    <h5>4️⃣ Tuples in TypeScript</h5>
    <p>A tuple is similar to an array but with a fixed number of elements and defined types for each position.</p>

    <pre><code>let person: [string, number] = ["Abhishek", 25];
console.log(person[0]); // "Abhishek"
console.log(person[1]); // 25
</code></pre>

    <p>Here, the first element must always be a <code>string</code> and the second a <code>number</code>. Changing the order or type will cause an error.</p>

    <pre><code>person = [25, "Abhishek"]; // ❌ Error: Type 'number' is not assignable to type 'string'</code></pre>

    <hr/>
    <h5>5️⃣ Optional and Readonly Tuple Elements</h5>
    <p>Tuples can have optional elements and readonly restrictions as well:</p>

    <pre><code>// Optional element
let data: [string, number?] = ["Hello"];
console.log(data); // ["Hello"]

// Readonly tuple
const point: readonly [number, number] = [10, 20];
// point[0] = 30; ❌ Error
</code></pre>

    <hr/>
    <h5>6️⃣ Tuple Destructuring</h5>
    <p>You can unpack tuple elements into variables easily using destructuring:</p>

    <pre><code>let user: [string, number] = ["Alice", 30];
const [name, age] = user;

console.log(name); // "Alice"
console.log(age);  // 30
</code></pre>

    <hr/>
    <h5>7️⃣ Tuple with Rest Elements (Variable Length)</h5>
    <p>TypeScript allows tuples with variable-length parts using rest elements:</p>

    <pre><code>let team: [string, ...string[]] = ["Captain", "Player1", "Player2", "Player3"];
console.log(team); // ["Captain", "Player1", "Player2", "Player3"]
</code></pre>

    <p>This means the tuple must start with one string (the captain) and can have any number of additional strings after that.</p>

    <hr/>
    <h5>8️⃣ Key Differences: Array vs Tuple</h5>
    <table border="1" cellpadding="6">
      <tr>
        <th>Feature</th>
        <th>Array</th>
        <th>Tuple</th>
      </tr>
      <tr>
        <td>Length</td>
        <td>Can change dynamically</td>
        <td>Fixed length</td>
      </tr>
      <tr>
        <td>Type of Elements</td>
        <td>Usually same type</td>
        <td>Each element can have a different type</td>
      </tr>
      <tr>
        <td>Use Case</td>
        <td>Homogeneous data</td>
        <td>Heterogeneous data</td>
      </tr>
    </table>

    <hr/>
    <h5>9️⃣ Summary</h5>
    <ul>
      <li>Use arrays for lists of items of the same type.</li>
      <li>Use tuples for fixed-size collections with known types for each position.</li>
      <li><code>readonly</code> prevents modification of arrays or tuples.</li>
      <li>Tuples are very useful for returning multiple values from functions.</li>
    </ul>

    <pre><code>// Example: Returning multiple values
function getUser(): [string, number] {
  return ["Bob", 28];
}

const [uname, uage] = getUser();
console.log(uname, uage);
</code></pre>

    <p><b>In short:</b> Arrays are flexible lists, while tuples are structured pairs or sets with fixed type positions — both enhance type safety in TypeScript.</p>
  `,
      5: `
    <h4>Object Types and Type Aliases in TypeScript</h4>
    <p>In TypeScript, <b>object types</b> describe the shape (structure) of an object — that is, what properties it has and what types those properties hold. TypeScript helps ensure that the objects you use conform to expected shapes, reducing runtime errors.</p>

    <hr/>
    <h5>1️⃣ Basic Object Type</h5>
    <pre><code>let person: { name: string; age: number; isStudent: boolean } = {
  name: "Abhishek",
  age: 25,
  isStudent: false
};</code></pre>

    <p>Here, the variable <code>person</code> must always have:
      <ul>
        <li>a <code>name</code> of type <b>string</b>,</li>
        <li>an <code>age</code> of type <b>number</b>,</li>
        <li>and <code>isStudent</code> of type <b>boolean</b>.</li>
      </ul>
    </p>

    <p>If you try to omit or change any property type, TypeScript will throw an error:</p>
    <pre><code>person.age = "twenty"; // ❌ Error: Type 'string' is not assignable to type 'number'</code></pre>

    <hr/>
    <h5>2️⃣ Optional and Readonly Properties</h5>
    <p>Object types can include optional (<code>?</code>) or readonly (<code>readonly</code>) properties.</p>

    <pre><code>type Product = {
  readonly id: number;
  name: string;
  price?: number; // optional
};

let laptop: Product = { id: 1, name: "MacBook" };

laptop.name = "MacBook Air"; // ✅ OK
laptop.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property
</code></pre>

    <p>
      ✅ <code>price?</code> means the property is optional.<br/>
      🔒 <code>readonly</code> ensures that once assigned, the property cannot be modified.
    </p>

    <hr/>
    <h5>3️⃣ Type Aliases</h5>
    <p>A <b>type alias</b> gives a name to a specific object type (or any other type). This helps avoid repetition and improves readability.</p>

    <pre><code>type User = {
  username: string;
  email: string;
  age: number;
};

let user1: User = {
  username: "john_doe",
  email: "john@example.com",
  age: 30
};

let user2: User = {
  username: "mary_smith",
  email: "mary@example.com",
  age: 25
};
</code></pre>

    <p>Now, instead of repeating the same structure for multiple users, we simply use the alias <code>User</code>.</p>

    <hr/>
    <h5>4️⃣ Nested Object Types</h5>
    <pre><code>type Address = {
  city: string;
  country: string;
};

type Employee = {
  id: number;
  name: string;
  address: Address;
};

const emp: Employee = {
  id: 101,
  name: "Raj",
  address: {
    city: "Bangalore",
    country: "India"
  }
};
</code></pre>

    <p>You can easily nest types to create complex and reusable data structures.</p>

    <hr/>
    <h5>5️⃣ Combining Type Aliases with Union Types</h5>
    <p>Type aliases can also represent a union of types:</p>
    <pre><code>type Status = "active" | "inactive" | "pending";

type Account = {
  id: number;
  name: string;
  status: Status;
};

const acc: Account = { id: 1, name: "Amit", status: "active" }; // ✅
</code></pre>

    <p>This ensures that only valid string literals are allowed for <code>status</code>.</p>

    <hr/>
    <h5>6️⃣ Difference Between Type Aliases and Interfaces</h5>
    <ul>
      <li><b>Type alias</b> can describe primitives, unions, tuples, and objects.</li>
      <li><b>Interface</b> can describe only object shapes (and can be extended).</li>
      <li>For objects, both work similarly — but interfaces are often preferred when designing reusable APIs or class structures.</li>
    </ul>

    <pre><code>// Interface example
interface Person {
  name: string;
  age: number;
}

let p: Person = { name: "Arun", age: 22 };
</code></pre>

    <hr/>
    <h5>7️⃣ Summary</h5>
    <ul>
      <li>Object types define the structure of an object.</li>
      <li>Use <code>?</code> for optional and <code>readonly</code> for immutable properties.</li>
      <li>Use <b>type aliases</b> to reuse complex type definitions.</li>
      <li>Type aliases can describe not just objects, but also primitives, arrays, and unions.</li>
      <li>Interfaces and type aliases can both describe objects — choose based on flexibility needs.</li>
    </ul>

    <p><b>In short:</b> Object types and type aliases make your TypeScript code structured, reusable, and easy to maintain.</p>
  `,
      6: `
    <h4>Const Declarations in TypeScript</h4>
    <p>The <code>const</code> keyword in TypeScript (just like in JavaScript) is used to declare variables whose <b>bindings cannot be reassigned</b> after initialization. However, it’s important to understand that while the reference is constant, the <b>value itself may still be mutable</b> in case of objects and arrays.</p>

    <hr/>
    <h5>1️⃣ Basic Const Declaration</h5>
    <pre><code>const pi = 3.14159;
pi = 3.14; // ❌ Error: Cannot assign to 'pi' because it is a constant.
</code></pre>

 <pre><code>type Point = {  x: number; y: number; };
const point: Point = { x: 10, y: 20}; 
point = {x:1, y:1}; // ❌ Error
</code></pre>

    <p>
      <ul>
        <li>You must initialize a <code>const</code> variable at the time of declaration.</li>
        <li>Once assigned, you cannot reassign it to another value.</li>
      </ul>
    </p>

    <hr/>
    <h5>2️⃣ Const with Objects</h5>
    <p>The <code>const</code> binding prevents reassignment, but the object’s internal properties can still be changed.</p>
    <pre><code>const user = { name: "Abhi", age: 25 };

// Allowed: modifying object properties
user.age = 26; // ✅ Works fine

// Not allowed: reassigning the object reference
user = { name: "New User", age: 30 }; // ❌ Error
</code></pre>

    <p><b>Explanation:</b> The reference <code>user</code> is constant, but the object itself is still mutable.</p>

    <hr/>
    <h5>3️⃣ Const with Arrays</h5>
    <p>Similarly, <code>const</code> arrays can be modified but not reassigned.</p>
    <pre><code>const fruits = ["apple", "banana"];
fruits.push("mango"); // ✅ Allowed
fruits[0] = "grape";  // ✅ Allowed

fruits = ["kiwi", "orange"]; // ❌ Error: cannot reassign
</code></pre>

    <p>This means that <code>const</code> ensures the variable always points to the same array, but the array contents can change.</p>

    <hr/>
    <h5>4️⃣ Const vs Let vs Var</h5>
    <table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse; border-color:#333;">
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Scope</th>
          <th>Can Reassign?</th>
          <th>Can Redeclare?</th>
          <th>Hoisted?</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><b>var</b></td><td>Function-scoped</td><td>✅ Yes</td><td>✅ Yes</td><td>✅ Yes (initialized as undefined)</td></tr>
        <tr><td><b>let</b></td><td>Block-scoped</td><td>✅ Yes</td><td>❌ No</td><td>✅ Yes (not initialized)</td></tr>
        <tr><td><b>const</b></td><td>Block-scoped</td><td>❌ No</td><td>❌ No</td><td>✅ Yes (not initialized)</td></tr>
      </tbody>
    </table>

    <p><b>Summary:</b> Always prefer <code>const</code> for variables whose value shouldn’t change, and <code>let</code> when you need to reassign later. Avoid <code>var</code> in modern TypeScript/JavaScript code.</p>

    <hr/>
    <h5>5️⃣ Const and Type Inference</h5>
    <p>When using <code>const</code>, TypeScript infers literal types for the variable. For example:</p>
    <pre><code>const name = "Abhi";
// inferred type: "Abhi" (a string literal type)

let city = "Delhi";
// inferred type: string (can hold any string)
</code></pre>

    <p>This difference helps TypeScript provide stronger type checking with <code>const</code>.</p>

    <hr/>
    <h5>6️⃣ Const with Type Annotations</h5>
    <p>You can still explicitly annotate types, though it’s rarely needed since TypeScript infers them automatically.</p>
    <pre><code>const count: number = 10;
const isActive: boolean = true;
</code></pre>

    <p>TypeScript will enforce these types strictly at compile time.</p>

    <hr/>
    <h5>7️⃣ Const Assertions (<code>as const</code>)</h5>
    <p>The <code>as const</code> assertion makes an object or array completely immutable — even its inner values become readonly.</p>
    <pre><code>const colors = ["red", "green", "blue"] as const;
// inferred as readonly ["red", "green", "blue"]

const user = {
  name: "Abhi",
  age: 25
} as const;

// user.age = 30; ❌ Error: Cannot assign to 'age' because it is a read-only property.
</code></pre>

    <p><b>Use Case:</b> When you want to define fixed configuration data or enum-like constants.</p>

    <hr/>
    <h5>🧩 Summary</h5>
    <ul>
      <li><code>const</code> creates read-only bindings — you can’t reassign them.</li>
      <li>Objects and arrays declared with <code>const</code> are mutable (unless you use <code>as const</code>).</li>
      <li><code>const</code> variables are block-scoped and must be initialized immediately.</li>
      <li>Prefer <code>const</code> over <code>let</code> whenever reassignment isn’t needed.</li>
      <li><code>as const</code> provides literal immutability for objects and arrays.</li>
    </ul>

    <p><b>In short:</b> Use <code>const</code> to ensure immutability of bindings and to help TypeScript infer the most specific types for your variables.</p>
  `,
      7: `
    <h4>Functions in TypeScript</h4>
    <p>Functions are one of the most important building blocks in TypeScript. TypeScript adds strong <b>type checking</b> for function parameters, return values, and optional/default arguments — making your code safer and easier to maintain.</p>

    <hr/>
    <h5>1️⃣ Function Basics</h5>
    <p>You can define function parameter and return types in TypeScript:</p>
    <pre><code>function add(a: number, b: number): number {
  return a + b;
}

let sum = add(10, 5); // ✅ 15
</code></pre>

    <p>Here:
      <ul>
        <li><code>a</code> and <code>b</code> are parameters of type <b>number</b>.</li>
        <li>The return type is also <b>number</b>.</li>
        <li>If you return anything else (like a string), TypeScript will throw a compile-time error.</li>
      </ul>
    </p>

    <hr/>
    <h5>2️⃣ Type Inference</h5>
    <p>If you omit the return type, TypeScript infers it automatically:</p>
    <pre><code>function greet(name: string) {
  return "Hello " + name;
}

let msg = greet("Abhi"); // inferred as string
</code></pre>

    <p>TypeScript knows that <code>greet()</code> returns a string because of the <code>return</code> statement.</p>

    <hr/>
    <h5>3️⃣ Optional and Default Parameters</h5>
    <p>You can make parameters optional or assign them default values.</p>
    <pre><code>function multiply(a: number, b?: number): number {
  return b ? a * b : a;
}

console.log(multiply(5)); // ✅ 5
console.log(multiply(5, 3)); // ✅ 15

function greetUser(name: string = "Guest"): string {
  return "Welcome, " + name;
}

console.log(greetUser()); // ✅ Welcome, Guest
</code></pre>

    <p>
      <ul>
        <li><code>b?: number</code> → optional parameter.</li>
        <li><code>name: string = "Guest"</code> → default parameter value.</li>
      </ul>
    </p>

    <hr/>
    <h5>4️⃣ Function Type Expressions</h5>
    <p>You can store a function type in a variable using a function type expression.</p>
    <pre><code>let addNumbers: (x: number, y: number) => number;

addNumbers = function (a, b) {
  return a + b;
};

console.log(addNumbers(4, 6)); // ✅ 10
</code></pre>

    <p>This syntax clearly defines what type of arguments and return value a function must have.</p>

    <hr/>
    <h5>5️⃣ Arrow Functions</h5>
    <p>Arrow functions in TypeScript are similar to JavaScript, with full type support:</p>
    <pre><code>const divide = (a: number, b: number): number => a / b;

console.log(divide(10, 2)); // ✅ 5
</code></pre>

    <p>You can omit parameter types when they can be inferred:</p>
    <pre><code>const greet = (msg = "Hello") => console.log(msg);</code></pre>

    <hr/>
    <h5>6️⃣ Void and Never Return Types</h5>
    <p><b>void</b> means a function doesn’t return any value.</p>
    <pre><code>function logMessage(message: string): void {
  console.log("INFO:", message);
}</code></pre>

    <p><b>never</b> means a function never successfully returns (like it always throws an error or loops infinitely):</p>
    <pre><code>function throwError(msg: string): never {
  throw new Error(msg);
}
</code></pre>

    <hr/>
    <h5>7️⃣ Rest Parameters</h5>
    <p>Use rest parameters when you don’t know how many arguments will be passed:</p>
    <pre><code>function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sumAll(1, 2, 3, 4)); // ✅ 10
</code></pre>

    <p>The rest parameter <code>...numbers</code> is an array of numbers.</p>

    <hr/>
    <h5>8️⃣ Anonymous and Callback Functions</h5>
    <p>You can define functions inline and pass them as arguments:</p>
    <pre><code>function processData(data: number[], callback: (num: number) => void) {
  for (let n of data) callback(n);
}

processData([10, 20, 30], (n) => console.log(n * 2));
</code></pre>

    <p>The callback is explicitly typed, ensuring the parameter <code>num</code> is a number.</p>

    <hr/>
    <h5>9️⃣ Function Overloading</h5>
    <p>TypeScript supports defining multiple function signatures for the same function (overloading):</p>
    <pre><code>function display(value: string): void;
function display(value: number): void;
function display(value: any): void {
  console.log("Value:", value);
}

display("Hello");
display(42);
</code></pre>

    <p>Overloads allow one function to handle different argument types safely.</p>

    <hr/>
    <h5>🔟 Summary</h5>
    <ul>
      <li>Functions in TypeScript have strict type checking for parameters and return values.</li>
      <li>Parameters can be optional (<code>?</code>), have default values, or be rest parameters (<code>...</code>).</li>
      <li>Use <code>void</code> for functions without return values, and <code>never</code> for those that never return.</li>
      <li>Arrow functions and callbacks support full typing.</li>
      <li>Overloading allows one function to handle multiple input types.</li>
    </ul>

    <p><b>In short:</b> TypeScript’s function typing system helps catch errors early, ensures predictable behavior, and makes your code more readable and maintainable.</p>
  `,
  8: `
  <h4>Structural Typing in TypeScript</h4>
  <p><b>Structural Typing</b> means that TypeScript compares types based on their <b>structure or shape</b>, not on their name or declaration. If two types have the same set of properties with the same types, they are considered compatible.</p>

  <hr/>
  <h5>1️⃣ Example: Shape-Based Compatibility</h5>
  <pre><code>type Point = { x: number; y: number };
type Coordinate = { x: number; y: number };

let p1: Point = { x: 10, y: 20 };
let c1: Coordinate = { x: 10, y: 20 };

p1 = c1; // ✅ Works because structure matches
  </code></pre>
  <p>Even though <code>Point</code> and <code>Coordinate</code> are different type names, they are compatible because their structure is identical.</p>

  <hr/>
  <h5>2️⃣ Example: Extra and Missing Properties</h5>
  <pre><code>type Point2D = { x: number; y: number };
type Point3D = { x: number; y: number; z: number };

let twoD: Point2D = { x: 1, y: 2 };
let threeD: Point3D = { x: 1, y: 2, z: 3 };

twoD = threeD; // ✅ Allowed (extra property ignored)
threeD = twoD; // ❌ Error: Property 'z' is missing
  </code></pre>
  <p>TypeScript allows assigning objects with extra properties to less specific types, but not the other way around.</p>

  <hr/>
  <h5>3️⃣ With Interfaces</h5>
  <pre><code>interface Person {
  name: string;
  age: number;
}

let user = { name: "Abhi", age: 25, city: "Delhi" };
let person: Person = user; // ✅ Works — structure matches
  </code></pre>
  <p>Interfaces also follow structural typing rules. As long as the structure matches, the assignment is valid.</p>

  <hr/>
  <h5>4️⃣ Why Structural Typing?</h5>
  <ul>
    <li>More flexible and JavaScript-friendly.</li>
    <li>Supports <b>duck typing</b> — “If it looks like a duck and quacks like a duck, it’s a duck.”</li>
    <li>Reduces the need for explicit inheritance or interface implementation.</li>
  </ul>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li>TypeScript uses <b>structural typing</b>, not nominal typing (like Java or C#).</li>
    <li>Compatibility is based on <b>shape (properties and types)</b>, not names.</li>
    <li>Encourages flexible, shape-based programming.</li>
  </ul>
  `,
  9: `
  <h4>Classes in TypeScript</h4>
  <p>Classes in TypeScript are blueprints for creating objects with properties and methods. They bring object-oriented programming (OOP) features like <b>encapsulation, inheritance, and polymorphism</b> to JavaScript.</p>

  <hr/>
  <h5>1️⃣ Basic Class Example</h5>
  <pre><code>class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(\`Hello, my name is \${this.name}\`);
  }
}

const user = new Person("Abhi", 25);
user.greet(); // Output: Hello, my name is Abhi
  </code></pre>

  <ul>
    <li><code>constructor</code> initializes class properties.</li>
    <li><code>this</code> refers to the current instance.</li>
    <li>TypeScript ensures property and method type safety.</li>
  </ul>

  <hr/>
  <h5>2️⃣ Access Modifiers</h5>
  <p>Access modifiers control the visibility of class members:</p>
  <ul>
    <li><b>public</b> – accessible anywhere (default).</li>
    <li><b>private</b> – accessible only inside the class.</li>
    <li><b>protected</b> – accessible inside the class and subclasses.</li>
  </ul>

  <pre><code>class Employee {
  private salary: number;
  protected department: string;

  constructor(salary: number, department: string) {
    this.salary = salary;
    this.department = department;
  }
}

class Manager extends Employee {
  getDepartment() {
    console.log(\`Department: \${this.department}\`);
  }
}
  </code></pre>

  <hr/>
  <h5>3️⃣ Readonly Properties</h5>
  <p>Readonly properties can only be assigned during declaration or in the constructor.</p>
  <pre><code>class Car {
  readonly model: string;

  constructor(model: string) {
    this.model = model;
  }
}

const myCar = new Car("Tesla");
// myCar.model = "BMW"; // ❌ Error: Cannot assign to 'model' because it is a read-only property
  </code></pre>

  <hr/>
  <h5>4️⃣ Inheritance</h5>
  <p>A class can extend another class to reuse properties and methods.</p>
  <pre><code>class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.move(); // ✅ Moving...
dog.bark(); // ✅ Woof!
  </code></pre>

  <hr/>
  <h5>5️⃣ Getters and Setters</h5>
  <p>Use <code>get</code> and <code>set</code> to control access to private properties.</p>
  <pre><code>class Circle {
  private _radius: number = 0;

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (value > 0) this._radius = value;
    else throw new Error("Radius must be positive");
  }
}

const c = new Circle();
c.radius = 10;
console.log(c.radius); // 10
  </code></pre>

  <hr/>
  <h5>6️⃣ Parameter Properties (Shorthand)</h5>
  <p>TypeScript allows declaring and initializing properties directly in the constructor.</p>
  <pre><code>class Student {
  constructor(public name: string, private rollNo: number) {}

  display() {
    console.log(\`Name: \${this.name}, Roll No: \${this.rollNo}\`);
  }
}

const s = new Student("Abhi", 101);
s.display();
  </code></pre>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li>Classes define object structure and behavior.</li>
    <li>Supports OOP features like encapsulation, inheritance, and access control.</li>
    <li>Use <code>public</code>, <code>private</code>, <code>protected</code>, and <code>readonly</code> for data safety.</li>
    <li>Parameter properties simplify class constructors.</li>
  </ul>
  `,
  10: `
  <h4>Target Compiler Option in TypeScript</h4>
  <p>The <code>target</code> compiler option in TypeScript defines the version of JavaScript that the TypeScript compiler (<code>tsc</code>) should output after compilation.</p>

  <hr/>
  <h5>1️⃣ What is the <code>target</code> option?</h5>
  <p>When you compile a TypeScript file, it’s converted into JavaScript. The <code>target</code> option tells the compiler which version of JavaScript to generate — for example, ES5, ES6 (ES2015), ES2017, etc.</p>

  <pre><code>{
  "compilerOptions": {
    "target": "ES6"
  }
}
  </code></pre>

  <p>This means that TypeScript will compile modern syntax (like <code>let</code>, <code>const</code>, arrow functions, classes, etc.) into JavaScript compatible with the ES6 standard.</p>

  <hr/>
  <h5>2️⃣ Common Target Options</h5>
  <table border="1" cellspacing="0" cellpadding="6">
    <tr><th>Target</th><th>Description</th></tr>
    <tr><td><b>ES3</b></td><td>Oldest supported version, compatible with very old browsers.</td></tr>
    <tr><td><b>ES5</b></td><td>Commonly used for maximum browser compatibility.</td></tr>
    <tr><td><b>ES6 / ES2015</b></td><td>Supports modern features like classes, arrow functions, and template literals.</td></tr>
    <tr><td><b>ES2017 / ES2018 / ESNext</b></td><td>Used when you want to use the latest JavaScript features (Node.js or modern browsers).</td></tr>
  </table>

  <hr/>
  <h5>3️⃣ Example</h5>
  <p>TypeScript code:</p>
  <pre><code>const greet = () => console.log("Hello TypeScript!");
  </code></pre>

  <p>Compiled output with <b>target: "ES5"</b>:</p>
  <pre><code>var greet = function () { return console.log("Hello TypeScript!"); };
  </code></pre>

  <p>Compiled output with <b>target: "ES6"</b>:</p>
  <pre><code>const greet = () => console.log("Hello TypeScript!");
  </code></pre>

  <p>As you can see, the <code>target</code> determines which JavaScript syntax is used in the output.</p>

  <hr/>
  <h5>4️⃣ How to Set the Target</h5>
  <p>You can set the target in two ways:</p>
  <ul>
    <li><b>Option 1:</b> Inside <code>tsconfig.json</code></li>
    <pre><code>{
  "compilerOptions": {
    "target": "ES6"
  }
}
    </code></pre>

    <li><b>Option 2:</b> Through the command line</li>
    <pre><code>npx tsc --target ES6</code></pre>
  </ul>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li>The <code>target</code> option controls the version of JavaScript emitted by the TypeScript compiler.</li>
    <li>Use <code>ES5</code> for older browsers, <code>ES6+</code> for modern environments.</li>
    <li>Set <code>target</code> in <code>tsconfig.json</code> or via command line.</li>
    <li>Choosing the right target ensures compatibility and performance.</li>
  </ul>
  `, 
  
  11: `
  <h4>Generics in TypeScript</h4>
  <p>Generics allow you to create reusable and flexible components that can work with multiple data types instead of a single one. They provide type safety while maintaining flexibility.</p>

  <hr/>
  <h5>1️⃣ Why Use Generics?</h5>
  <p>Without generics, you may have to create multiple versions of the same function or class for different data types, or use <code>any</code> which removes type safety.</p>

  <p>Example using <code>any</code> (❌ unsafe):</p>
  <pre><code>function identity(value: any): any {
  return value;
}

let num = identity(10);
let str = identity("Hello");
// No type checking - unsafe!
</code></pre>

  <p>Now, using <b>Generics</b> (✅ safe):</p>
  <pre><code>function identity&lt;T&gt;(value: T): T {
  return value;
}

let num = identity&lt;number&gt;(10);
let str = identity&lt;string&gt;("Hello");
</code></pre>

  <p>✔️ Here, <code>&lt;T&gt;</code> is a generic type variable. TypeScript infers or enforces the correct type automatically.</p>

  <hr/>
  <h5>2️⃣ Generic Functions</h5>
  <p>Write a single function that works with any type, while maintaining type safety.</p>

  <pre><code>function printArray&lt;T&gt;(items: T[]): void {
  items.forEach(item =&gt; console.log(item));
}

printArray&lt;number&gt;([1, 2, 3]);
printArray&lt;string&gt;(["a", "b", "c"]);
</code></pre>

  <p>This makes your function reusable for any data type.</p>

  <hr/>
  <h5>3️⃣ Generic Interfaces</h5>
  <pre><code>interface Box&lt;T&gt; {
  content: T;
}

let box1: Box&lt;string&gt; = { content: "Books" };
let box2: Box&lt;number&gt; = { content: 42 };
</code></pre>

  <p>✔️ The same interface can handle multiple data types using generics.</p>

  <hr/>
  <h5>4️⃣ Generic Classes</h5>
  <pre><code>class DataStore&lt;T&gt; {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

const stringStore = new DataStore&lt;string&gt;();
stringStore.addItem("Hello");

const numberStore = new DataStore&lt;number&gt;();
numberStore.addItem(123);
</code></pre>

  <p>✔️ The same class works for different types with type safety.</p>

  <hr/>
  <h5>5️⃣ Generic Queue Example</h5>
  <p>A practical example using a Queue data structure implemented with generics.</p>

  <pre><code>class Queue&lt;T&gt; {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberQueue = new Queue&lt;number&gt;();
numberQueue.enqueue(10);
numberQueue.enqueue(20);
console.log(numberQueue.dequeue()); // 10

const stringQueue = new Queue&lt;string&gt;();
stringQueue.enqueue("A");
stringQueue.enqueue("B");
console.log(stringQueue.peek()); // A
</code></pre>

  <p>✔️ The same queue logic works for <code>number</code>, <code>string</code>, or any custom type.</p>

  <hr/>
  <h5>6️⃣ Generic Constraints</h5>
  <p>Sometimes, you may want to restrict the types that can be used with a generic.</p>

  <pre><code>interface HasLength {
  length: number;
}

function logLength&lt;T extends HasLength&gt;(item: T): void {
  console.log(item.length);
}

logLength("Hello");     // ✅ Works
logLength([1, 2, 3]);   // ✅ Works
// logLength(123); ❌ Error
</code></pre>

  <p>✔️ <code>T extends HasLength</code> ensures that only types with a <code>length</code> property are allowed.</p>

  <hr/>
  <h5>7️⃣ Default Generic Type</h5>
  <pre><code>function identityWithDefault&lt;T = string&gt;(value: T): T {
  return value;
}

console.log(identityWithDefault("Hello"));
console.log(identityWithDefault(42));
</code></pre>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li>Generics provide type safety and flexibility.</li>
    <li>They work with functions, interfaces, and classes.</li>
    <li>Use <code>&lt;T&gt;</code> as a placeholder for any data type.</li>
    <li>Generic constraints (<code>extends</code>) allow limited type control.</li>
    <li>Default generic types simplify usage.</li>
    <li>Queue example shows how generics help build reusable data structures.</li>
  </ul>

  <p><b>Generics = Reusability + Type Safety ✅</b></p>
  `,
  12: `
  <h4>Special Types in TypeScript: <code>any</code> and <code>unknown</code></h4>
  <p>TypeScript provides special types like <code>any</code> and <code>unknown</code> for handling values whose types are not known at compile time.</p>

  <hr/>
  <h5>1️⃣ The <code>any</code> Type</h5>
  <p>The <b><code>any</code></b> type disables TypeScript’s type checking. It tells the compiler to skip type safety for that variable.</p>

  <pre><code>let value: any = 10;
value = "Hello";
value = true;
value = { name: "Abhi" };

console.log(value.toUpperCase()); // ✅ No error, but may fail at runtime
</code></pre>

  <p>✔️ <code>any</code> gives flexibility but removes all compile-time type safety.</p>

  <p>❌ <b>Disadvantage:</b> Using <code>any</code> frequently defeats the purpose of TypeScript’s type system.</p>

  <hr/>
  <h5>2️⃣ The <code>unknown</code> Type</h5>
  <p>The <b><code>unknown</code></b> type is a safer alternative to <code>any</code>. It represents a value that could be anything, but you must perform type checking before using it.</p>

  <pre><code>let data: unknown;
data = "Hello";
data = 42;
data = { name: "Abhi" };

// console.log(data.toUpperCase()); ❌ Error: Object is of type 'unknown'

if (typeof data === "string") {
  console.log(data.toUpperCase()); // ✅ Safe
}
</code></pre>

  <p>✔️ <code>unknown</code> forces you to check the type before accessing its properties or methods.</p>

  <hr/>
  <h5>3️⃣ Difference Between <code>any</code> and <code>unknown</code></h5>
  <table border="1" cellpadding="6">
    <tr>
      <th>Feature</th>
      <th><code>any</code></th>
      <th><code>unknown</code></th>
    </tr>
    <tr>
      <td>Type Checking</td>
      <td>Disabled ❌</td>
      <td>Required ✅</td>
    </tr>
    <tr>
      <td>Assign to Other Types</td>
      <td>Allowed freely</td>
      <td>Not allowed without checks</td>
    </tr>
    <tr>
      <td>Safety</td>
      <td>Unsafe (runtime errors possible)</td>
      <td>Safe (forces type checking)</td>
    </tr>
    <tr>
      <td>Example Usage</td>
      <td>For quick prototyping</td>
      <td>For values from dynamic sources (e.g. API data)</td>
    </tr>
  </table>

  <hr/>
  <h5>4️⃣ Type Narrowing Example with <code>unknown</code></h5>
  <pre><code>function processData(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log("Unknown type");
  }
}

processData("TypeScript");
processData(123.456);
processData(true);
</code></pre>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li><code>any</code> disables all type checking – use sparingly.</li>
    <li><code>unknown</code> is type-safe – you must narrow down the type before use.</li>
    <li>Prefer <code>unknown</code> when dealing with uncertain types (e.g., user input or API data).</li>
  </ul>

  <p><b>✅ Best Practice:</b> Avoid <code>any</code> unless absolutely necessary — prefer <code>unknown</code> for safety and clarity.</p>
  `,
  13: `
  <h4>JavaScript to TypeScript</h4>
  <p>TypeScript is a superset of JavaScript, which means <strong>any valid JavaScript code is also valid TypeScript code.</strong>  
  You can gradually migrate your existing JavaScript projects to TypeScript by adding type annotations and configuration.</p>

  <hr/>
  <h5>1️⃣ Step 1: Rename <code>.js</code> Files to <code>.ts</code></h5>
  <p>Start by renaming your existing JavaScript files from <code>.js</code> to <code>.ts</code>.  
  TypeScript will begin analyzing your code and highlight potential issues or missing types.</p>

  <pre><code>// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
</code></pre>

  <p>Adding type annotations (<code>: number</code>) helps catch type errors at compile time.</p>

  <hr/>
  <h5>2️⃣ Step 2: Add a <code>tsconfig.json</code></h5>
  <p>Use the TypeScript compiler to create a configuration file:</p>
  <pre><code>npx tsc --init</code></pre>
  <p>This creates a <code>tsconfig.json</code> file to control compiler settings like the output directory, target ECMAScript version, and strictness.</p>

  <hr/>
  <h5>3️⃣ Step 3: Enable Strict Type Checking</h5>
  <p>In <code>tsconfig.json</code>, enable strict mode for maximum safety:</p>
  <pre><code>{
  "compilerOptions": {
    "strict": true
  }
}</code></pre>

  <p>Strict mode ensures that all variables, functions, and parameters have explicit types.</p>

  <hr/>
  <h5>4️⃣ Step 4: Add Type Annotations</h5>
  <p>Use TypeScript’s type system to add safety to your variables and functions.</p>

  <pre><code>// JavaScript
let message = "Hello, JS!";

// TypeScript
let message: string = "Hello, TS!";
</code></pre>

  <p>You can also define object shapes and arrays:</p>
  <pre><code>let user: { name: string; age: number } = { name: "Abhi", age: 25 };
let numbers: number[] = [1, 2, 3];
</code></pre>

  <hr/>
  <h5>5️⃣ Step 5: Add Interfaces or Type Aliases</h5>
  <p>Use <code>interface</code> or <code>type</code> to define reusable structures.</p>
  <pre><code>interface User {
  name: string;
  email: string;
}

const newUser: User = { name: "Abhi", email: "abhi@example.com" };
</code></pre>

  <hr/>
  <h5>6️⃣ Step 6: Compile to JavaScript</h5>
  <p>Compile your TypeScript file to JavaScript using:</p>
  <pre><code>npx tsc</code></pre>
  <p>This generates <code>.js</code> files that can run in any JavaScript environment.</p>

  <hr/>
  <h5>7️⃣ Step 7: Gradual Migration Approach</h5>
  <p>TypeScript supports gradual adoption. You can mix <code>.js</code> and <code>.ts</code> files in the same project.</p>
  <pre><code>{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}</code></pre>

  <p>This lets you convert files one by one at your own pace.</p>

  <hr/>
  <h5>8️⃣ Benefits of Migrating to TypeScript</h5>
  <ul>
    <li>✔️ Early error detection at compile time</li>
    <li>✔️ Better code auto-completion and documentation</li>
    <li>✔️ Easier refactoring</li>
    <li>✔️ Clearer intent with static typing</li>
  </ul>

  <hr/>
  <h5>🧩 Example</h5>
  <pre><code>// JavaScript
function greet(name) {
  return "Hello " + name.toUpperCase();
}

// TypeScript
function greet(name: string): string {
  return "Hello " + name.toUpperCase();
}

console.log(greet("Abhi"));
</code></pre>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li><b>TypeScript = JavaScript + Type System</b></li>
    <li>Start migration by renaming <code>.js</code> to <code>.ts</code>.</li>
    <li>Add type annotations, enable strict mode, and compile to JavaScript.</li>
    <li>Gradual adoption makes migration easy and low-risk.</li>
  </ul>

  <p><b>✅ Result:</b> Safer, more maintainable, and self-documenting JavaScript code.</p>
  `,
  14: `
  <h4>Creating a React + TypeScript Frontend Project</h4>
  <p>TypeScript and React work perfectly together — TypeScript provides static typing, better IntelliSense, and early error detection while React handles the UI logic.</p>
  <p>Let’s see how to create and configure a React project with TypeScript step by step.</p>

  <hr/>
  <h5>1️⃣ Step 1: Create a New React Project with TypeScript Template</h5>
  <pre><code>npx create-react-app my-react-app --template typescript</code></pre>
  <p>This command sets up a ready-to-use React application with TypeScript configuration built in.</p>

  <p>After creation, navigate to your project folder:</p>
  <pre><code>cd my-react-app
npm start</code></pre>
  <p>This launches the development server and opens your app in the browser at <code>http://localhost:3000</code>.</p>

  <hr/>
  <h5>2️⃣ Step 2: Project Structure</h5>
  <pre><code>my-react-app/
├── node_modules/
├── public/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── components/
│   │   └── Hello.tsx
│   └── styles/
├── package.json
├── tsconfig.json
└── README.md</code></pre>

  <p>The <code>.tsx</code> extension allows JSX syntax in TypeScript files.</p>

  <hr/>
  <h5>3️⃣ Step 3: Understanding TypeScript in React</h5>
  <p>TypeScript helps define prop types and state shapes for React components.</p>

  <pre><code>// src/components/Hello.tsx
import React from "react";

type HelloProps = {
  name: string;
  age?: number; // Optional prop
};

const Hello: React.FC&lt;HelloProps&gt; = ({ name, age }) => {
  return (
    &lt;div&gt;
      &lt;h2&gt;Hello, {name}!&lt;/h2&gt;
      {age && &lt;p&gt;You are {age} years old.&lt;/p&gt;}
    &lt;/div&gt;
  );
};

export default Hello;
</code></pre>

  <p>Then import and use it in <code>App.tsx</code>:</p>
  <pre><code>import React from "react";
import Hello from "./components/Hello";

function App() {
  return (
    &lt;div className="App"&gt;
      &lt;h1&gt;Welcome to React + TypeScript&lt;/h1&gt;
      &lt;Hello name="Abhishek" age={25} /&gt;
    &lt;/div&gt;
  );
}

export default App;
</code></pre>

  <hr/>
  <h5>4️⃣ Step 4: Working with useState and useEffect Hooks</h5>
  <pre><code>import React, { useState, useEffect } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState&lt;number&gt;(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    &lt;div&gt;
      &lt;h2&gt;Count: {count}&lt;/h2&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
};

export default Counter;
</code></pre>

  <p>Type annotations like <code>useState&lt;number&gt;</code> ensure that <code>count</code> can only be a number — preventing common type errors.</p>

  <hr/>
  <h5>5️⃣ Step 5: TypeScript Configuration in React</h5>
  <p>TypeScript React projects include a <code>tsconfig.json</code> file by default.</p>

  <pre><code>{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}</code></pre>
  <p>This enables strict typing and React’s new JSX transform.</p>

  <hr/>
  <h5>6️⃣ Step 6: Adding Interfaces and Types for Props</h5>
  <pre><code>interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductListProps = {
  items: Product[];
};

const ProductList: React.FC&lt;ProductListProps&gt; = ({ items }) =&gt; (
  &lt;ul&gt;
    {items.map(item =&gt; (
      &lt;li key={item.id}&gt;
        {item.name} - ₹{item.price}
      &lt;/li&gt;
    ))}
  &lt;/ul&gt;
);</code></pre>

  <p>Interfaces and types make React code self-documenting and error-free.</p>

  <hr/>
  <h5>7️⃣ Step 7: Building and Deploying</h5>
  <p>To build your app for production:</p>
  <pre><code>npm run build</code></pre>
  <p>This generates an optimized, minified build in the <code>build/</code> folder — ready to be deployed.</p>

  <hr/>
  <h5>🧠 Summary</h5>
  <ul>
    <li>React + TypeScript provides strong typing and better developer experience.</li>
    <li>Use <code>tsx</code> for React components with JSX syntax.</li>
    <li>Always type props, state, and hooks for better readability and maintainability.</li>
    <li><b>Create React App</b> with <code>--template typescript</code> gives you everything preconfigured.</li>
  </ul>

  <p><b>✅ Result:</b> A robust, type-safe React project built using TypeScript — ready for scalable frontend development.</p>
  `,
  15: `
  <h4>Type Assertions in TypeScript</h4>
  <p>Type assertions tell the TypeScript compiler to treat a value as a specific type. It does not change the runtime behavior of the code; it only affects type checking.</p>

  <p>Type assertions are useful when you, as a developer, have more information about the type of a value than TypeScript can infer.</p>

  <h5>Syntax</h5>
  <pre><code>
  // Using 'as' syntax (recommended)
  let value: unknown = "Hello TypeScript";
  let strLength: number = (value as string).length;

  // Using angle-bracket syntax (older form)
  let strLength2: number = (&lt;string&gt;value).length; // This form is not allowed in .tsx files as <> is used for JSX syntax.
  </code></pre>

  <h5>Example</h5>
  <pre><code>
  // Example: DOM element type assertion
  const inputElement = document.querySelector("input") as HTMLInputElement;
  inputElement.value = "TypeScript Rocks!";
  </code></pre>

  <p>Here, TypeScript doesn't know that <code>document.querySelector()</code> returns an input element. By asserting its type, we can safely access input-specific properties like <code>value</code>.</p>

  <h5>Non-null Assertion Operator</h5>
  <p>Use <code>!</code> to tell TypeScript that a value is not <code>null</code> or <code>undefined</code>.</p>
  <pre><code>
  const element = document.getElementById("title")!;
  element.innerHTML = "Welcome!";
  </code></pre>

  <h5>Type Assertions vs Type Casting</h5>
  <ul>
    <li>Type Assertions exist only in TypeScript and are removed during compilation.</li>
    <li>They do not change the actual type or structure at runtime.</li>
    <li>Type Casting (in languages like C# or Java) actually converts data at runtime.</li>
  </ul>

  <h5>When to Use</h5>
  <ul>
    <li>When working with DOM elements.</li>
    <li>When migrating JavaScript code to TypeScript.</li>
    <li>When dealing with third-party libraries with incomplete type definitions.</li>
  </ul>

  <p><b>Important:</b> Avoid overusing type assertions — they can bypass TypeScript’s type safety if used incorrectly.</p>
  `,
  16: `
  <h4>Type Casting in TypeScript</h4>
  <p>Type casting is the process of explicitly converting a value from one type to another. In TypeScript, this is done using <b>type assertions</b> — but it does not actually change the data at runtime; it only informs the compiler of the intended type.</p>

  <h5>🧩 Type Casting Syntax</h5>
  <pre><code>
  // Using 'as' keyword (recommended)
  let value: unknown = "Hello World";
  let length: number = (value as string).length;

  // Using angle bracket syntax (older form)
  let length2: number = (&lt;string&gt;value).length;
  </code></pre>

  <p><b>Note:</b> The <code>&lt;&gt;</code> syntax cannot be used in .tsx (React TypeScript) files because it conflicts with JSX tags.</p>

  <h5>✅ Example – Casting from unknown</h5>
  <pre><code>
  function getData(): unknown {
    return "TypeScript Casting";
  }

  let data = getData();
  console.log((data as string).toUpperCase());
  </code></pre>

  <p>Here, <code>getData()</code> returns <code>unknown</code>. Using type casting tells TypeScript we are sure it’s a string.</p>

  <h5>⚙️ Casting Between Types</h5>
  <p>You can cast between compatible types using intermediate <code>unknown</code> or <code>any</code>:</p>
  <pre><code>
  type Cat = { meow: () => void };
  type Dog = { bark: () => void };

  let pet = { bark: () => console.log("Woof!") } as Dog;

  // Unsafe cast (not recommended)
  let cat = pet as unknown as Cat;
  cat.meow(); // Runtime error!
  </code></pre>

  <h5>💡 Type Casting vs Type Assertion</h5>
  <ul>
    <li><b>Type Casting:</b> Converts a variable from one type to another (conceptually).</li>
    <li><b>Type Assertion:</b> Tells the compiler to treat a variable as a specific type.</li>
    <li>In TypeScript, both are effectively the same — actual runtime conversion does not occur.</li>
  </ul>

  <h5>🚫 Caution</h5>
  <ul>
    <li>Type casting can bypass TypeScript’s type safety.</li>
    <li>Always ensure you’re casting between compatible types.</li>
  </ul>

  <p><b>Summary:</b> Type casting in TypeScript is a compile-time feature that helps the compiler understand the intended type but does not alter runtime behavior.</p>
  `,
  17: `
  <h4>Modules in TypeScript</h4>
  <p>Modules in TypeScript help organize code into separate files and reusable units. Each file in TypeScript can be treated as a module if it contains <code>export</code> or <code>import</code> statements.</p>

  <h5>🌐 Why Use Modules?</h5>
  <ul>
    <li>To split large applications into manageable files.</li>
    <li>To promote code reusability and maintainability.</li>
    <li>To avoid global scope pollution.</li>
  </ul>

  <hr/>
  <h4>Exporting from a Module</h4>
  <p>Use <code>export</code> to make variables, functions, classes, or interfaces accessible outside the current file.</p>
  <pre><code>
// mathUtils.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;

export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}
  </code></pre>

  <h4>Importing in Another File</h4>
  <p>Use <code>import</code> to bring in exported members.</p>
  <pre><code>
// app.ts
import { add, Calculator } from "./mathUtils";

console.log(add(5, 10)); // 15
const calc = new Calculator();
console.log(calc.multiply(3, 4)); // 12
  </code></pre>

  <h4>Default Exports</h4>
  <p>A module can have one default export. It can be imported with any name.</p>
  <pre><code>
// greet.ts
export default function greet(name: string) {
  return "Hello, " + name + "!";
}

// main.ts
import greet from "./greet";
console.log(greet("Abhi"));
  </code></pre>

  <h4>Renaming Imports and Exports</h4>
  <pre><code>
// export with alias
export { add as addition } from "./mathUtils";

// import with alias
import { addition as sum } from "./mathUtils";
  </code></pre>

  <h4>Re-exporting Modules</h4>
  <pre><code>
// operations.ts
export * from "./mathUtils";
export * from "./stringUtils";
  </code></pre>

  <h4>Module Resolution</h4>
  <p>TypeScript uses module resolution strategies to find imported modules:</p>
  <ul>
    <li><b>Classic:</b> Used for older projects.</li>
    <li><b>Node:</b> Used for Node.js-style imports (recommended).</li>
  </ul>

  <p>You can specify the module type in <code>tsconfig.json</code>:</p>
  <pre><code>
  {
    "compilerOptions": {
      "module": "ESNext", // or "CommonJS", "AMD", "UMD"
      "target": "ES6"
    }
  }
  </code></pre>

  <h4>Namespace vs Module</h4>
  <ul>
    <li><b>Namespaces</b> are for organizing code within a single file or script.</li>
    <li><b>Modules</b> are for organizing code across multiple files using imports/exports.</li>
  </ul>

  <h4>Summary</h4>
  <ul>
    <li>Each file with <code>export</code> or <code>import</code> becomes a module.</li>
    <li>Modules improve reusability, maintainability, and clarity.</li>
    <li>Use <code>import/export</code> for modular, scalable TypeScript applications.</li>
  </ul>
  `,
  18: `
  <h4>Type Declarations in TypeScript (.d.ts Files)</h4>
  <p><strong>Type Declarations</strong> in TypeScript describe the shape and types of existing code — especially JavaScript code. They allow the TypeScript compiler to understand what types exist even if there is no implementation provided.</p>
  <p>Type declarations are typically written inside files ending with the extension <code>.d.ts</code> (declaration files).</p>

  <hr/>
  <h4>💡 What Are Declaration Files?</h4>
  <p>A declaration file (<code>.d.ts</code>) tells TypeScript the types of variables, functions, classes, and modules that exist in JavaScript code.</p>
  <p>They contain <strong>only type information</strong>, no executable code.</p>

  <pre><code>// math.d.ts
declare function add(a: number, b: number): number;
declare const PI: number;
  </code></pre>

  <pre><code>// main.ts
console.log(add(2, 3));  // OK
console.log(PI);         // OK
  </code></pre>

  <hr/>
  <h4>📘 Purpose of Type Declarations</h4>
  <ul>
    <li>To provide type information for plain JavaScript libraries or code.</li>
    <li>To enable autocompletion, IntelliSense, and compile-time type checking.</li>
    <li>To make external JS libraries type-safe when used in TS projects.</li>
  </ul>

  <hr/>
  <h4>🧩 Declaring Modules</h4>
  <p>When using a JavaScript module that doesn’t have built-in types, you can declare it manually using the <code>declare module</code> syntax.</p>

  <pre><code>// custom-lib.d.ts
declare module "custom-lib" {
  export function greet(name: string): void;
  export const version: string;
}
  </code></pre>

  <pre><code>// app.ts
import { greet, version } from "custom-lib";
greet("Abhi");
console.log(version);
  </code></pre>

  <hr/>
  <h4>🌐 Declaring Global Variables</h4>
  <p>You can declare global variables available throughout your environment.</p>

  <pre><code>// globals.d.ts
declare const APP_NAME: string;
declare function log(message: string): void;
  </code></pre>

  <pre><code>// main.ts
log(\`Welcome to \${APP_NAME}\`);
  </code></pre>

  <hr/>
  <h4>📦 Using @types Packages</h4>
  <p>Most popular libraries (React, Node, etc.) already have pre-written declaration files published under the <strong>DefinitelyTyped</strong> repository.</p>
  <p>You can install them via npm:</p>

  <pre><code>npm install --save-dev @types/react
npm install --save-dev @types/node</code></pre>

  <p>This automatically adds their <code>.d.ts</code> files from <code>node_modules/@types</code>.</p>

  <hr/>
  <h4>🛠️ Custom Type Declarations</h4>
  <p>If you’re writing JavaScript but want to use TypeScript later, you can create your own type declarations.</p>

  <pre><code>// types/utils.d.ts
declare function multiply(a: number, b: number): number;
  </code></pre>

  <p>Then configure <code>tsconfig.json</code> to include the custom type root:</p>

  <pre><code>"typeRoots": ["./types", "./node_modules/@types"]</code></pre>

  <hr/>
  <h4>🔑 Summary</h4>
  <ul>
    <li><code>.d.ts</code> files define types but contain no code.</li>
    <li>They describe existing JavaScript modules, functions, and variables.</li>
    <li>Enable TypeScript to understand non-TypeScript libraries.</li>
    <li>Used by the TypeScript compiler and IDEs for type safety and autocompletion.</li>
  </ul>

  <p>➡️ In short: <strong>Type Declarations (.d.ts)</strong> make JavaScript type-safe without rewriting it in TypeScript.</p>
  `,
  19: `
  <h4>Creating an NPM Package using TypeScript</h4>
  <p>TypeScript makes it easy to build and publish reusable <strong>NPM packages</strong> with built-in type definitions. This allows other developers to use your library in both JavaScript and TypeScript projects with proper IntelliSense and type safety.</p>

  <hr/>
  <h4>1️⃣ Initialize the Project</h4>
  <p>Create a new folder for your package and initialize it with npm:</p>

  <pre><code>mkdir my-utils
cd my-utils
npm init -y</code></pre>

  <p>This creates a <code>package.json</code> file that defines your package metadata.</p>

  <hr/>
  <h4>2️⃣ Install TypeScript and Setup Compiler</h4>
  <pre><code>npm install typescript --save-dev
npx tsc --init --rootDir src --outDir dist --declaration true --esModuleInterop true</code></pre>

  <p>Key options explained:</p>
  <ul>
    <li><b>rootDir:</b> Source files directory (e.g. <code>src</code>).</li>
    <li><b>outDir:</b> Compiled JavaScript output directory (e.g. <code>dist</code>).</li>
    <li><b>declaration:</b> Generates <code>.d.ts</code> files automatically for TypeScript consumers.</li>
    <li><b>esModuleInterop:</b> Ensures compatibility with CommonJS and ES modules.</li>
  </ul>

  <hr/>
  <h4>3️⃣ Write Your TypeScript Code</h4>
  <pre><code>// src/index.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
  </code></pre>

  <p>When compiled, this will generate both <code>index.js</code> and <code>index.d.ts</code> inside the <code>dist</code> folder.</p>

  <hr/>
  <h4>4️⃣ Compile Your Code</h4>
  <pre><code>npx tsc</code></pre>
  <p>This generates the <code>dist</code> folder with compiled files.</p>

  <hr/>
  <h4>5️⃣ Update <code>package.json</code></h4>
  <p>Edit your <code>package.json</code> to point to the correct entry files:</p>

  <pre><code>{
  "name": "my-utils",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  }
}</code></pre>

  <hr/>
  <h4>6️⃣ Test Locally Before Publishing</h4>
  <p>You can test your package locally using <code>npm link</code>:</p>
  <pre><code>npm link</code></pre>
  <p>Then in another project:</p>
  <pre><code>npm link my-utils</code></pre>
  <p>Now you can import your functions like this:</p>
  <pre><code>import { add, greet } from "my-utils";
console.log(add(2, 3));
console.log(greet("Abhi"));</code></pre>

  <hr/>
  <h4>7️⃣ Publishing to NPM</h4>
  <p>Once everything works correctly, publish your package:</p>

  <pre><code>npm login
npm publish --access public</code></pre>

  <p>Your package is now available to everyone via:</p>
  <pre><code>npm install my-utils</code></pre>

  <hr/>
  <h4>8️⃣ Folder Structure Example</h4>
  <pre><code>my-utils/
  ├─ src/
  │   └─ index.ts
  ├─ dist/
  │   ├─ index.js
  │   └─ index.d.ts
  ├─ package.json
  ├─ tsconfig.json
  └─ README.md</code></pre>

  <hr/>
  <h4>🔑 Summary</h4>
  <ul>
    <li>Initialize an npm project with <code>npm init</code>.</li>
    <li>Use TypeScript for development and enable <code>declaration</code> output.</li>
    <li>Generate <code>.d.ts</code> files automatically for type safety.</li>
    <li>Set correct <code>main</code> and <code>types</code> fields in <code>package.json</code>.</li>
    <li>Use <code>npm publish</code> to share your library with others.</li>
  </ul>

  <p>➡️ With TypeScript, your npm package provides both <b>runtime functionality</b> and <b>type definitions</b> for seamless integration.</p>
  `,
  20: `
  <h4>Async / Await in TypeScript</h4>
  <p><b>Async/Await</b> provides a cleaner way to handle asynchronous operations in TypeScript compared to callbacks or promises.</p>

  <h5>1️⃣ What is <code>async</code>?</h5>
  <p>The <code>async</code> keyword is used before a function to make it return a <b>Promise</b>. Inside an async function, you can use the <code>await</code> keyword to pause execution until the promise resolves.</p>

  <pre><code>
  async function greet(): Promise&lt;string&gt; {
    return "Hello, TypeScript!";
  }

  greet().then(msg =&gt; console.log(msg));
  </code></pre>

  <h5>2️⃣ What is <code>await</code>?</h5>
  <p>The <code>await</code> keyword can only be used inside an <code>async</code> function. It pauses the function execution until the awaited promise is resolved.</p>

  <pre><code>
  async function fetchData() {
    console.log("Fetching data...");
    const data = await new Promise((resolve) =&gt; {
      setTimeout(() =&gt; resolve("Data loaded!"), 2000);
    });
    console.log(data);
  }

  fetchData();
  </code></pre>

  <p>Output:</p>
  <pre><code>
  Fetching data...
  (after 2 seconds)
  Data loaded!
  </code></pre>

  <h5>3️⃣ Error Handling with <code>try...catch</code></h5>
  <p>Async/Await supports synchronous-looking error handling using <code>try...catch</code>.</p>

  <pre><code>
  async function getUser() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const user = await response.json();
      console.log(user.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  getUser();
  </code></pre>

  <h5>4️⃣ Async Functions Always Return Promises</h5>
  <pre><code>
  async function add(a: number, b: number): Promise&lt;number&gt; {
    return a + b;
  }

  add(5, 10).then(result =&gt; console.log(result)); // Output: 15
  </code></pre>

  <h5>5️⃣ Combining Async / Await with Generics</h5>
  <pre><code>
  async function fetchJson&lt;T&gt;(url: string): Promise&lt;T&gt; {
    const response = await fetch(url);
    return await response.json();
  }

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  fetchJson&lt;Todo&gt;("https://jsonplaceholder.typicode.com/todos/1")
    .then(todo =&gt; console.log(todo.title));
  </code></pre>

  <h5>✅ Summary</h5>
  <ul>
    <li><code>async</code> functions return a promise.</li>
    <li><code>await</code> pauses execution until a promise resolves.</li>
    <li>Use <code>try...catch</code> for handling async errors.</li>
    <li>Improves readability and maintainability compared to callbacks or .then().</li>
  </ul>
  `,
  21: `
  <h4>ts-node in TypeScript</h4>
  <p><b>ts-node</b> is a TypeScript execution engine for Node.js. It allows you to run TypeScript code directly without manually compiling it using <code>tsc</code>.</p>

  <h5>1️⃣ What is ts-node?</h5>
  <p><code>ts-node</code> is a development tool that executes TypeScript files on the fly by automatically compiling them in memory before running. It’s useful for quick testing, scripts, and backend development.</p>

  <pre><code>
  // Normally you would compile TypeScript like this:
  tsc index.ts
  node index.js

  // With ts-node, you can skip compilation:
  npx ts-node index.ts
  </code></pre>

  <h5>2️⃣ Installing ts-node</h5>
  <p>To use <code>ts-node</code>, install it along with TypeScript:</p>

  <pre><code>
  npm install -g ts-node typescript
  </code></pre>

  <p>Or locally inside a project:</p>
  <pre><code>
  npm install --save-dev ts-node typescript
  </code></pre>

  <h5>3️⃣ Running TypeScript Files</h5>
  <p>Once installed, run any <code>.ts</code> file directly:</p>

  <pre><code>
  npx ts-node src/app.ts
  </code></pre>

  <p>It automatically reads configuration from <code>tsconfig.json</code> and compiles your code in memory.</p>

  <h5>4️⃣ Example</h5>
  <pre><code>
// app.ts
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greet("TypeScript"));
  </code></pre>

  <p>Run it using:</p>
  <pre><code>npx ts-node app.ts</code></pre>

  <p>Output:</p>
  <pre><code>Hello, TypeScript!</code></pre>

  <h5>5️⃣ Using ts-node with Node flags</h5>
  <p>You can pass Node.js options like <code>--watch</code> to enable live reload:</p>

  <pre><code>
  npx ts-node --watch src/index.ts
  </code></pre>

  <h5>6️⃣ Benefits of ts-node</h5>
  <ul>
    <li>No need for manual compilation steps.</li>
    <li>Faster feedback during development.</li>
    <li>Supports modern TypeScript features out of the box.</li>
    <li>Ideal for scripts, CLI tools, and backend APIs.</li>
  </ul>

  <h5>7️⃣ Performance Note</h5>
  <p>For production, it’s recommended to precompile TypeScript with <code>tsc</code> instead of using <code>ts-node</code> for better performance.</p>

  <h5>✅ Summary</h5>
  <ul>
    <li><code>ts-node</code> lets you run TypeScript directly in Node.js.</li>
    <li>Useful for rapid prototyping and development.</li>
    <li>Not recommended for production deployment.</li>
  </ul>
  `,
  22: `
  <h4>Lexical <code>this</code> in TypeScript</h4>
  <p>In JavaScript and TypeScript, the value of <code>this</code> depends on how a function is called. However, arrow functions behave differently — they have a <b>lexical this</b>, meaning they inherit <code>this</code> from their surrounding context.</p>

  <h5>1️⃣ What is "Lexical this"?</h5>
  <p>Lexical <code>this</code> means that arrow functions do not create their own <code>this</code> binding. Instead, they use the <code>this</code> value from the scope in which they were defined.</p>

  <p>In contrast, regular functions have their own <code>this</code> based on how they are invoked (e.g., as a method, constructor, or standalone function).</p>

  <h5>2️⃣ Example without Lexical this</h5>
  <pre><code>
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    greet() {
      setTimeout(function () {
        console.log("Hello, " + this.name); // ❌ 'this' is undefined
      }, 1000);
    }
  }

  const p = new Person("Alice");
  p.greet(); // Output: Hello, undefined
  </code></pre>

  <p>Here, the regular function inside <code>setTimeout</code> has its own <code>this</code> (not the class instance), so <code>this.name</code> becomes <code>undefined</code>.</p>

  <h5>3️⃣ Example with Lexical this (using Arrow Function)</h5>
  <pre><code>
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    greet() {
      setTimeout(() => {
        console.log("Hello, " + this.name); // ✅ 'this' refers to Person instance
      }, 1000);
    }
  }

  const p = new Person("Alice");
  p.greet(); // Output: Hello, Alice
  </code></pre>

  <p>Here, the arrow function captures the <code>this</code> value from the class context (lexical scope), so it correctly refers to the instance.</p>

  <h5>4️⃣ Key Takeaways</h5>
  <ul>
    <li><b>Regular functions</b> define their own <code>this</code> depending on how they’re called.</li>
    <li><b>Arrow functions</b> inherit <code>this</code> from the enclosing lexical scope.</li>
    <li>Lexical <code>this</code> helps avoid common issues when using callbacks or asynchronous code in classes.</li>
  </ul>

  <h5>5️⃣ Practical Tip</h5>
  <p>Prefer arrow functions for event handlers, callbacks, or methods passed to async functions — they automatically use the correct <code>this</code> binding.</p>

  <h5>✅ Summary</h5>
  <ul>
    <li>Arrow functions capture <code>this</code> from where they are defined — not how they are called.</li>
    <li>Helps avoid losing <code>this</code> in asynchronous code or nested functions.</li>
    <li>Recommended in modern TypeScript for clean, predictable behavior.</li>
  </ul>
  `,
  23: `
    <h4>Readonly Modifier</h4>
    <p>The <code>readonly</code> modifier in TypeScript is used to make object properties immutable after initialization. Once assigned, their values cannot be changed.</p>

    <h5>Example</h5>
    <pre><code>
    class Person {
      readonly id: number;
      name: string;

      constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
      }
    }

    const p = new Person(1, "Alice");
    p.name = "Bob";      // ✅ Allowed
    p.id = 10;           // ❌ Error: Cannot assign to readonly property
    </code></pre>

    <p><b>Use Case:</b> Creating constant properties such as IDs, configuration values, or tokens.</p>
  `,

  24: `
    <h4>Union Types</h4>
    <p>Union types allow a variable to hold more than one possible type. Use <code>|</code> to combine types.</p>

    <h5>Example</h5>
    <pre><code>
    let value: string | number;

    value = "hello";  // ✅
    value = 100;      // ✅
    value = true;     // ❌ Error
    </code></pre>

    <p><b>Use Case:</b> When a value can be one of several types, such as API responses, IDs, or user inputs.</p>
  `,

  25: `
    <h4>Literal Types</h4>
    <p>Literal types restrict a variable to specific predefined values.</p>

    <h5>Example</h5>
    <pre><code>
    let direction: "up" | "down" | "left" | "right";

    direction = "up";     // ✅
    direction = "forward"; // ❌ Not allowed
    </code></pre>

    <p><b>Use Case:</b> Creating constants, configuration flags, or action types.</p>
  `,

  26: `
    <h4>Type Narrowing</h4>
    <p>Type narrowing means reducing a union type to a more specific type using checks like <code>typeof</code>, <code>in</code>, <code>instanceof</code>, or custom checks.</p>

    <h5>Example</h5>
    <pre><code>
    function printLength(x: string | string[]) {
      if (typeof x === "string") {
        console.log(x.length);     // String length
      } else {
        console.log(x.length);     // Array length
      }
    }
    </code></pre>

    <p><b>Use Case:</b> When a variable may hold different types and the code must respond accordingly.</p>
  `,

  27: `
    <h4>Discriminated Unions</h4>
    <p>Discriminated unions are a pattern that combines union types with a common property (called a discriminator) to make type narrowing easier and safer.</p>

    <h5>Example</h5>
    <pre><code>
    type Circle = { kind: "circle", radius: number };
    type Square = { kind: "square", side: number };
    type Shape = Circle | Square;

    function area(shape: Shape) {
      switch (shape.kind) {
        case "circle":
          return Math.PI * shape.radius * shape.radius;
        case "square":
          return shape.side * shape.side;
      }
    }
    </code></pre>

    <p><b>Use Case:</b> Complex data models, state machines, form states, Redux actions.</p>
  `,

  28: `
    <h4>Class Parameter Properties</h4>
    <p>Parameter properties let you declare and initialize class properties directly inside the constructor parameters using <code>public</code>, <code>private</code>, <code>readonly</code>.</p>

    <h5>Example Without Parameter Properties</h5>
    <pre><code>
    class Person {
      name: string;
      age: number;

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
    </code></pre>

    <h5>Example With Parameter Properties</h5>
    <pre><code>
    class Person {
      constructor(
        public name: string,
        private age: number,
        readonly id: number
      ) {}
    }

    const p = new Person("Alice", 25, 101);
    </code></pre>

    <p><b>Benefits:</b> Less boilerplate, cleaner constructors, automatic property creation.</p>
  `,

  29: `
    <h4>Strict Compiler Option</h4>

    <p>The <code>"strict"</code> compiler option in <code>tsconfig.json</code> enables TypeScript’s highest level of type safety. 
    When turned on, it activates a collection of strict type-checking rules that help catch hidden bugs, prevent unsafe operations, and improve code reliability.</p>

    <p>Strict mode is considered the <b>recommended default</b> for all professional TypeScript applications because it prevents silent type errors that could otherwise become runtime failures.</p>

    <pre><code>
{
  "compilerOptions": {
    "strict": true
  }
}
    </code></pre>

    <hr/>

    <h4>What Strict Mode Enables</h4>
    <p>Turning on <code>strict</code> internally enables several individual compiler options. 
    Below is a detailed breakdown of each rule with explanations and examples.</p>

    <h5>1️⃣ strictNullChecks</h5>
    <p>Treats <code>null</code> and <code>undefined</code> as separate types. You must explicitly allow them.</p>

    <pre><code>
let name: string = null;       // ❌ Error
let id: number | null = null;  // ✅ Valid
    </code></pre>

    <p>This prevents accidental null-reference bugs.</p>

    <h5>2️⃣ noImplicitAny</h5>
    <p>Disallows variables or parameters that default to <code>any</code>.</p>

    <pre><code>
function sum(a, b) {   // ❌ 'a' and 'b' implicitly have type 'any'
  return a + b;
}
    </code></pre>

    <pre><code>
function sum(a: number, b: number) { // ✅ explicit types
  return a + b;
}
    </code></pre>

    <h5>3️⃣ strictBindCallApply</h5>
    <p>Ensures that <code>bind</code>, <code>call</code>, and <code>apply</code> receive the correct parameter types.</p>

    <pre><code>
function greet(name: string) { return "Hello " + name; }

greet.call(null, 123); // ❌ Error: expected string, got number
    </code></pre>

    <h5>4️⃣ strictFunctionTypes</h5>
    <p>Ensures that functions assigned to each other follow safe rules for parameter types (contravariance).</p>

    <pre><code>
let fn1 = (a: number) => {};
let fn2 = (a: number | string) => {};

fn1 = fn2; // ❌ Not safe
fn2 = fn1; // ✅ Allowed
    </code></pre>

    <h5>5️⃣ noImplicitThis</h5>
    <p>Ensures <code>this</code> is not implicitly typed as <code>any</code>.</p>

    <pre><code>
function click() {
  console.log(this); // ❌ this is implicitly 'any'
}
    </code></pre>

    <pre><code>
function click(this: HTMLButtonElement) {
  console.log(this.id); // ✅ correct type
}
    </code></pre>

    <h5>6️⃣ strictPropertyInitialization</h5>
    <p>Ensures class properties are initialized before use.</p>

    <pre><code>
class User {
  name: string; // ❌ Error: Property not initialized
}
    </code></pre>

    <pre><code>
class User {
  name: string = "Anonymous"; // ✅ initialized
}
    </code></pre>

    <h5>7️⃣ alwaysStrict</h5>
    <p>Emits JavaScript with <code>"use strict"</code> at the top of files, enforcing safe runtime behavior.</p>

    <hr/>

    <h4>Full Example Comparing Strict vs Non-Strict</h4>

    <h5>🔸 Without strict mode (unsafe)</h5>
    <pre><code>
function getLength(value) {
  return value.length; // No error, but may crash at runtime
}

console.log(getLength(123)); // ❌ Runtime error
    </code></pre>

    <h5>🔸 With strict mode (safe)</h5>
    <pre><code>
function getLength(value: string) {
  return value.length;
}

getLength(123);  // ❌ Compile time error — prevented early
    </code></pre>

    <hr/>

    <h4>Why You Should Always Use Strict Mode</h4>
    <ul>
      <li>Prevents hard-to-debug runtime crashes</li>
      <li>Forces explicit, predictable typing</li>
      <li>Makes refactoring safer</li>
      <li>Improves IDE auto-completion and inference</li>
      <li>Encourages intentional handling of <code>null</code> and <code>undefined</code></li>
      <li>Ensures high-quality, maintainable production code</li>
    </ul>

    <p>Strict mode is the foundation for writing reliable and scalable TypeScript applications. 
    It forces you to think clearly about types and eliminates hidden unsafe patterns.</p>
  `,
  30:
  `<h4>Null versus Undefined</h4>

<p>
In TypeScript, <code>null</code> and <code>undefined</code> are two separate primitive types, each representing the absence of a value but in different ways.
Understanding their differences is important for writing safer and more predictable TypeScript code—especially when strict type-checking is enabled.
</p>

<p>
By default (without <code>strictNullChecks</code>), both <code>null</code> and <code>undefined</code> are treated as valid values for all types.
But when <code>strictNullChecks</code> is turned ON, TypeScript requires you to explicitly handle them, making your code cleaner and less error-prone.
</p>

<h5>✔ Meaning and Usage</h5>

<ul>
  <li>
    <b><code>undefined</code></b> – A variable has been declared but not assigned any value.
    It represents a value that is missing unintentionally.
  </li>
  <li>
    <b><code>null</code></b> – A value intentionally set to represent “no value” or “empty state.”
  </li>
</ul>

<h5>✔ Key Differences</h5>

<table border="1" cellpadding="6">
  <tr>
    <th>Aspect</th>
    <th>undefined</th>
    <th>null</th>
  </tr>
  <tr>
    <td>Meaning</td>
    <td>Value not assigned</td>
    <td>Explicit empty value</td>
  </tr>
  <tr>
    <td>Assigned By</td>
    <td>JavaScript/TypeScript</td>
    <td>Developer</td>
  </tr>
  <tr>
    <td>Type</td>
    <td><code>undefined</code></td>
    <td><code>object</code></td>
  </tr>
  <tr>
    <td>Common Usage</td>
    <td>Uninitialized variables, missing optional params</td>
    <td>Represent empty data intentionally</td>
  </tr>
</table>

<h5>✔ Examples</h5>

<p><b>1. undefined example</b></p>
<pre>
let x: number | undefined;
console.log(x); // undefined
</pre>

<p><b>2. null example</b></p>
<pre>
let y: string | null = null;
console.log(y); // null
</pre>

<p><b>3. Function returning null when no result found</b></p>
<pre>
function findUser(id: number): string | null {
  if (id === 1) return "User Found";
  return null;
}
</pre>

<p><b>4. Optional parameters default to undefined</b></p>
<pre>
function greet(message?: string) {
  console.log(message); // undefined if no argument is passed
}
</pre>

<h5>✔ strictNullChecks Impact</h5>

<p>
When <code>"strictNullChecks": true</code> is enabled, variables cannot contain <code>null</code> or <code>undefined</code> unless their types explicitly allow it.
</p>

<pre>
// With strictNullChecks ON:
let age: number;
age = null;       // ❌ Error
age = undefined;  // ❌ Error

// Valid:
let age2: number | null | undefined;
</pre>

<h5>✔ Practical Use Cases</h5>
<ul>
  <li>API responses often use <code>null</code> to represent missing fields.</li>
  <li>Optional parameters and uninitialized variables naturally become <code>undefined</code>.</li>
  <li>Helps in writing cleaner conditional checks and safer code.</li>
</ul>

<p><b>Summary:</b>  
<code>undefined</code> = unintentional absence.  
<code>null</code> = intentional absence.  
<code>strictNullChecks</code> enforces clear handling of both.</p>
  `,
  31: `
<h4>Intersection Types</h4>

<p>
Intersection types in TypeScript allow you to combine multiple types into one.
The resulting type must include <b>all properties from all the combined types</b>.
It uses the <code>&</code> (AND) operator.
</p>

<p>
Intersection types are helpful when you want an object that has multiple 
capabilities or characteristics — similar to mixins or combining traits.
</p>

<h5>✔ What Are Intersection Types?</h5>

<p>
An intersection type <code>A & B</code> means the value must satisfy both <code>A</code> and <code>B</code>.
</p>

<pre><code>
type A = { name: string };
type B = { age: number };

type Person = A & B;

const p: Person = {
  name: "John",
  age: 30
};
</code></pre>

<h5>✔ Why Use Intersection Types?</h5>

<ul>
  <li>To merge multiple object types together.</li>
  <li>To enforce that a value must have multiple features/behaviors.</li>
  <li>To simulate mixins or capability-based design.</li>
</ul>

<h5>✔ Example: Combining Multiple Abilities</h5>

<pre><code>
type CanWalk = { walk: () => void };
type CanRun  = { run: () => void };
type CanSwim = { swim: () => void };

type SuperHuman = CanWalk & CanRun & CanSwim;

const hero: SuperHuman = {
  walk: () => console.log("Walking"),
  run: () => console.log("Running"),
  swim: () => console.log("Swimming")
};
</code></pre>

<h5>✔ Intersection with Primitive Types</h5>

<p>
Intersecting incompatible primitive types results in <code>never</code>.
</p>

<pre><code>
type X = string;
type Y = number;

type Z = X & Y;  
// Z = never (impossible type)
</code></pre>

<h5>✔ Intersection with Unions</h5>

<pre><code>
// Intersection narrows union types
type A = { a: number } | { b: number };
type B = { a: number };

type C = A & B;
// C = { a: number }
</code></pre>

<h5>✔ Function Example</h5>

<pre><code>
type Logger = { log: (msg: string) => void };
type Formatter = { format: (value: string) => string };

type LoggingFormatter = Logger & Formatter;

const tool: LoggingFormatter = {
  log: msg => console.log(msg),
  format: value => value.trim()
};
</code></pre>

<h5>✔ Practical Use Cases</h5>

<ul>
  <li>Mixins</li>
  <li>Combining multiple interfaces</li>
  <li>Enforcing multi-capability objects</li>
  <li>Extending library types</li>
</ul>

<h5>✔ Summary</h5>

<ul>
  <li>Intersection types combine multiple types using <code>&</code>.</li>
  <li>Resulting type must include all members of all types.</li>
  <li>Useful for mixins and capability modeling.</li>
  <li>Incompatible intersections collapse into <code>never</code>.</li>
</ul>
`,
  32: `
<h3>Optional Modifier ( ? )</h3>

<h4>What is the Optional Modifier?</h4>

<p>
The optional modifier <code>?</code> in TypeScript allows you to mark properties,
parameters, or object fields as optional.  
This means the value **may or may not be present**.
</p>

<p>
It is used with:  
<ul>
  <li>Object properties</li>
  <li>Function parameters</li>
  <li>Interface or type definitions</li>
</ul>
</p>

<h5>✔ Optional Property Example</h5>

<pre><code>
type User = {
  id: number;
  name: string;
  age?: number;    // age is optional
};

const u1: User = { id: 1, name: "John" };         // valid
const u2: User = { id: 2, name: "Sam", age: 25 }; // valid
</code></pre>

<h5>✔ Optional Function Parameter</h5>

<p>
Function parameters with <code>?</code> are optional and default to <code>undefined</code> 
if not supplied.
</p>

<pre><code>
function greet(name?: string): void {
  console.log("Hello " + (name ?? "Guest"));
}

greet();        // Hello Guest
greet("Alice"); // Hello Alice
</code></pre>

<h5>✔ Optional Modifier Internally Means:</h5>

<pre><code>
age?: number

// is same as

age: number | undefined
</code></pre>

<h5>✔ Using Optional with Interfaces</h5>

<pre><code>
interface Car {
  model: string;
  mileage?: number;
}
</code></pre>

<h5>✔ Optional Chaining vs Optional Modifier</h5>

<p><code>?</code> in TypeScript is different based on where it's used:</p>

<ul>
  <li><b>Optional modifier</b>: <code>age?: number</code></li>
  <li><b>Optional chaining</b>: <code>user?.address?.city</code></li>
</ul>

<h5>✔ Optional With Default Values</h5>

<pre><code>
function multiply(a: number, b?: number) {
  return a * (b ?? 1);
}

multiply(5);      // 5
multiply(5, 2);   // 10
</code></pre>

<h5>✔ Optional in Class Constructor</h5>

<pre><code>
class Person {
  constructor(
    public name: string,
    public age?: number
  ) {}
}

const p1 = new Person("Alex");
const p2 = new Person("Alex", 30);
</code></pre>

<h5>✔ Summary</h5>

<ul>
  <li><code>?</code> marks a property or parameter as optional.</li>
  <li>Optional means the value can be missing or undefined.</li>
  <li>Optional parameter defaults to <code>undefined</code>.</li>
  <li>Very common in function design, API responses, and flexible object structures.</li>
</ul>
`,
  33: `
<h3>Non-null Assertion Operator ( ! )</h3>

<p>
The <code>!</code> operator in TypeScript is called the
<b>Non-Null Assertion Operator</b>.  
It tells the compiler:  
<strong>“I am sure this value is NOT null or undefined — trust me!”</strong>
</p>

<p>
This operator is useful when TypeScript cannot guarantee non-null values,  
but <em>you know</em> (based on logic) that the value definitely exists.
</p>

<hr/>

<h4>✔ Why is it needed?</h4>

<p>
TypeScript has strict null checking.  
If a variable may be <code>null</code> or <code>undefined</code>, TS gives an error:
</p>

<pre><code>
let el = document.getElementById("title");

console.log(el.innerText); 
// ❌ Error: Object is possibly 'null'
</code></pre>

<p>
Using <code>!</code>, we tell TypeScript that <code>el</code> is NOT null:
</p>

<pre><code>
let el =<b> document.getElementById("title")!</b>;
console.log(el.innerText); // ✔ OK
</code></pre>

<hr/>

<h4>✔ Common Use Cases</h4>

<h5>1. DOM Access</h5>

<pre><code>
const input = document.querySelector("input#email")!;
input.value = "test@example.com";
</code></pre>

<h5>2. Variables Initialized Later</h5>

<pre><code>
let username!: string;  // will be assigned later

function init() {
  username = "John";
}

init();
console.log(username.toUpperCase());
</code></pre>

<h5>3. Optional Fields You Know Are Present</h5>

<pre><code>
type User = { id: number; email?: string };

const u: User = { id: 1, email: "a@b.com" };

console.log(u.email!.toUpperCase());
</code></pre>

<hr/>

<h4>✔ What Non-null Assertion is NOT</h4>

<p>
It does NOT check anything at runtime.  
It only removes TypeScript's safety checks.
</p>

<p><b>If you're wrong → your program will crash!</b></p>

<pre><code>
const person = { name: null as any };

console.log(person.name!.toUpperCase());
// ❌ RUNTIME ERROR: Cannot read properties of null
</code></pre>

<hr/>

<h4>✔ Use With Caution</h4>

<p>
The <code>!</code> operator bypasses TypeScript safety.  
Use it only when you are 100% sure the value is not null.
</p>

<hr/>

<h4>✔ Safer Alternatives</h4>

<h5>1. Optional Chaining</h5>
<pre><code>
console.log(user.email?.toUpperCase());
</code></pre>

<h5>2. Null Check</h5>
<pre><code>
if (el !== null) {
  console.log(el.innerText);
}
</code></pre>

<h5>3. Type Narrowing</h5>
<pre><code>
function print(text: string | null) {
  if (text) {
    console.log(text.toUpperCase());
  }
}
</code></pre>

<hr/>

<h4>✔ Summary</h4>

<ul>
  <li><code>!</code> tells TypeScript “this value is never null”.</li>
  <li>Useful for DOM, late initialization, optional fields.</li>
  <li>Removes compiler safety — dangerous if misused.</li>
  <li>Prefer narrowing and optional chaining when possible.</li>
</ul>
`,
  34: `
<h3>Interfaces in TypeScript</h3>

<p>
An <b>interface</b> in TypeScript is a way to define the <b>shape of an object</b>.  
It describes the structure (properties, methods, types) that an object must follow.
</p>

<p>
Interfaces help provide strong typing, ensure consistency, and improve code readability.
</p>

<hr/>

<h4>✔ Basic Interface Example</h4>

<pre><code>
interface User {
  id: number;
  name: string;
}

const u: User = {
  id: 1,
  name: "Alice"
};
</code></pre>

<p>
If any property is missing or incorrect, TypeScript throws an error.
</p>

<hr/>

<h4>✔ Optional Properties ( ? )</h4>

<p>Use <code>?</code> when a property may or may not exist.</p>

<pre><code>
interface Product {
  id: number;
  name: string;
  description?: string;  // optional
}

const p: Product = { id: 10, name: "Laptop" }; // ✔ OK
</code></pre>

<hr/>

<h4>✔ Readonly Properties</h4>

<p>
Prevents changing a value after initialization.
</p>

<pre><code>
interface Config {
  readonly apiKey: string;
}

const cfg: Config = { apiKey: "XYZ123" };
cfg.apiKey = "ABC"; // ❌ Error: cannot assign to readonly property
</code></pre>

<hr/>

<h4>✔ Method Definitions in Interfaces</h4>

<pre><code>
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  name = "Buddy";
  speak() {
    console.log("Woof!");
  }
}
</code></pre>

<p>The class must implement all properties and methods.</p>

<hr/>

<h4>✔ Interface Extending Another Interface</h4>

<p>Interfaces support inheritance using <code>extends</code>.</p>

<pre><code>
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}

const e: Employee = {
  name: "Bob",
  salary: 50000
};
</code></pre>

<hr/>

<h4>✔ Multiple Interface Inheritance</h4>

<pre><code>
interface A { a: string; }
interface B { b: number; }

interface C extends A, B {}

const obj: C = {
  a: "hello",
  b: 42
};
</code></pre>

<hr/>

<h4>✔ Interfaces for Function Types</h4>

<pre><code>
interface AddFunc {
  (x: number, y: number): number;
}

const add: AddFunc = (a, b) => a + b;
</code></pre>

<hr/>

<h4>✔ Interfaces for Index Signatures</h4>

<pre><code>
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  name: "Alice",
  city: "Delhi"
};
</code></pre>

<hr/>

<h4>✔ Interfaces vs Objects</h4>

<p>Interfaces are only used at <b>compile time</b>.  
They do not exist in JavaScript output.</p>

<p>
They help developers by enforcing structure and type checks.
</p>

<hr/>

<h4>✔ Summary</h4>

<ul>
  <li>Interfaces define object shapes.</li>
  <li>Support optional & readonly properties.</li>
  <li>Can define objects, functions, classes, arrays, and dictionaries.</li>
  <li>Support inheritance and multiple inheritance.</li>
  <li>Used only for type-checking (not runtime).</li>
</ul>
`,
  35: `
    <h3>Interface Declaration Merging</h3>

    <p>
      <b>Interface Declaration Merging</b> is a TypeScript feature where 
      multiple interfaces with the <b>same name</b> automatically combine 
      into a single interface. Only <b>interfaces</b> support merging — 
      <code>type</code> aliases <b>do NOT merge</b>.
    </p>

    <hr/>

    <h4>✔ How Merging Works</h4>
    <p>
      When two or more interfaces share the same name, TypeScript merges all 
      their properties into one final interface.
    </p>

    <pre><code>
interface User {
  id: number;
}

interface User {
  name: string;
}

const u: User = {
  id: 1,
  name: "Abhishek"
};
    </code></pre>

    <p>
      The final interface becomes:
      <code>{ id: number; name: string }</code>
    </p>

    <hr/>

    <h4>✔ Method Overload Merging</h4>
    <p>If two interfaces define methods with the same name, TypeScript merges them as overloads.</p>

    <pre><code>
interface Api {
  call(endpoint: string): void;
}

interface Api {
  call(endpoint: string, method: string): void;
}
    </code></pre>

    <p>Now, <code>call()</code> supports both overloads.</p>

    <hr/>

    <h4>✔ Conflicting Types Cause Errors</h4>

    <pre><code>
interface Box {
  size: number;
}

interface Box {
  size: string; // ❌ Error: conflicting types
}
    </code></pre>

    <p>Both interfaces must have compatible types to merge successfully.</p>

    <hr/>

    <h4>✔ Real Use Cases</h4>
    <ul>
      <li>Extending browser <code>Window</code> object</li>
      <li>Adding fields to Express <code>Request</code></li>
      <li>Customizing third-party library types</li>
      <li>Used heavily in <b>.d.ts</b> declaration files</li>
    </ul>

    <hr/>

    <h4>✔ Example – Extending Express Request</h4>

    <pre><code>
declare module "express" {
  interface Request {
    userId?: string;
  }
}
    </code></pre>

    <p>This merges with Express's original <code>Request</code> interface.</p>

    <hr/>

    <h4>✔ Summary</h4>
    <ul>
      <li>Interfaces with the same name merge automatically</li>
      <li>Useful for extending libraries and global objects</li>
      <li>Method overloads are merged too</li>
      <li>Conflicting types break merging</li>
      <li>Important when writing <b>.d.ts</b> files</li>
    </ul>
  `,
  36: `
    <h3>Types versus Interfaces</h3>

    <p>
      In TypeScript, both <b>type aliases</b> and <b>interfaces</b> are used to define the shape of objects, 
      but they have different capabilities and use cases. Understanding the differences helps you choose the right one.
    </p>

    <hr/>

    <h4>✔ Interfaces</h4>
    <p>Interfaces are mainly used to describe object shapes and class structures.</p>

    <ul>
      <li>Supports <b>declaration merging</b></li>
      <li>Can be <b>implemented</b> by classes</li>
      <li>Can extend interfaces and type aliases</li>
      <li>Best for OOP / structural design</li>
    </ul>

    <pre><code>
interface User {
  id: number;
}

interface User {
  name: string;
}

// Merged:
const u: User = { id: 1, name: "John" };
    </code></pre>

    <hr/>

    <h4>✔ Type Aliases</h4>
    <p>Type aliases can represent more than just objects.</p>

    <ul>
      <li>Can define unions</li>
      <li>Can define intersections</li>
      <li>Can define primitives and tuples</li>
      <li>Do <b>NOT</b> support declaration merging</li>
    </ul>

    <pre><code>
type Status = "pending" | "done";
type Point = { x: number; y: number };
type Pair = [number, string];
    </code></pre>

    <hr/>

    <h4>✔ Key Differences</h4>

    <table border="1" cellpadding="6">
      <tr>
        <th>Feature</th>
        <th>Interface</th>
        <th>Type Alias</th>
      </tr>
      <tr>
        <td>Declaration Merging</td>
        <td>✔ Yes</td>
        <td>❌ No</td>
      </tr>
      <tr>
        <td>Describe Objects</td>
        <td>✔ Yes</td>
        <td>✔ Yes</td>
      </tr>
      <tr>
        <td>Union / Intersection</td>
        <td>❌ No</td>
        <td>✔ Yes</td>
      </tr>
      <tr>
        <td>Classes can implement?</td>
        <td>✔ Yes</td>
        <td>✔ Yes</td>
      </tr>
      <tr>
        <td>Extends</td>
        <td>✔ Interface / Type</td>
        <td>✔ Interface / Type</td>
      </tr>
    </table>

    <hr/>

    <h4>✔ When to Use What?</h4>

    <ul>
      <li>Use <b>interface</b> when designing objects, classes, APIs</li>
      <li>Use <b>type</b> when using unions, primitives, tuples, or complex combinations</li>
    </ul>

    <hr/>

    <h4>✔ Examples</h4>

    <pre><code>
// Interface for object shape
interface Person {
  id: number;
  name: string;
}

// Type for union or combinations
type Result = Person | null;

// Type for primitives
type StringOrNumber = string | number;

// Interface for class implementation
class Employee implements Person {
  constructor(
    public id: number,
    public name: string
  ) {}
}
    </code></pre>

    <hr/>

    <h4>✔ Summary</h4>
    <ul>
      <li>Interfaces merge; types don't</li>
      <li>Types support unions and primitives; interfaces don't</li>
      <li>Both can be extended and implemented</li>
      <li>Interfaces are best for object and class structures</li>
      <li>Types are more flexible for advanced type compositions</li>
    </ul>
  `,
  37: `
    <h3>never type</h3>

    <p>
      In TypeScript, the <b>never</b> type represents a value that <u>never occurs</u>.  
      It is used for functions that never return or for code paths that are impossible.
    </p>

    <hr/>

    <h4>✔ When does <code>never</code> occur?</h4>

    <ul>
      <li>Functions that <b>never return</b> (infinite loop)</li>
      <li>Functions that <b>always throw an error</b></li>
      <li><b>Exhaustiveness checking</b> in union types</li>
      <li>Unreachable code paths</li>
    </ul>

    <pre><code>
// 1. Function that never returns
function loopForever(): never {
  while (true) {}
}

// 2. Function that always throws
function fail(message: string): never {
  throw new Error(message);
}
    </code></pre>

    <hr/>

    <h4>✔ never vs void</h4>

    <table border="1" cellpadding="6">
      <tr>
        <th>void</th>
        <th>never</th>
      </tr>
      <tr>
        <td>Function returns nothing</td>
        <td>Function does NOT return at all</td>
      </tr>
      <tr>
        <td>Function completes normally</td>
        <td>Function doesn't complete</td>
      </tr>
    </table>

    <pre><code>
function log(msg: string): void {
  console.log(msg); // completes normally
}

function crash(): never {
  throw new Error("App crashed"); // never returns
}
    </code></pre>

    <hr/>

    <h4>✔ never with Exhaustive Checks</h4>
    <p>
      <b>never</b> is useful in switch-case statements to ensure all possible union values are handled.
    </p>

    <pre><code>
type Shape = "circle" | "square" | "triangle";

function handleShape(s: Shape) {
  switch (s) {
    case "circle":
      return "Circle selected";
    case "square":
      return "Square selected";
    case "triangle":
      return "Triangle selected";
    default:
      const unexpected: never = s; // ❌ compile error if new type added
      return unexpected;
  }
}
    </code></pre>

    <p>
      This ensures TypeScript warns you if a new union member is added but not handled.
    </p>

    <hr/>

    <h4>✔ Why is never important?</h4>

    <ul>
      <li>Helps catch impossible code paths</li>
      <li>Makes union handling safer</li>
      <li>Improves compiler strictness</li>
      <li>Useful in “exhaustive pattern matching”</li>
    </ul>

    <hr/>

    <h4>✔ Summary</h4>
    <ul>
      <li><b>never</b> means “this should never happen.”</li>
      <li>Used when a function cannot return.</li>
      <li>Excellent for strict safety in switch-case over unions.</li>
      <li>More strict than void.</li>
    </ul>
  `,

  38: `
  <h4><code>implements</code> Keyword in TypeScript</h4>

  <p>
    The <b><code>implements</code></b> keyword is used by a class to guarantee 
    that it follows the structure defined by an interface.  
    It ensures the class provides all required properties and methods declared in the interface.
  </p>

  <h5>Why <code>implements</code> is useful?</h5>
  <ul>
    <li>Provides strong compile-time type checking.</li>
    <li>Ensures a class follows a specific contract (shape).</li>
    <li>Helps maintain consistency in larger codebases.</li>
    <li>Makes classes predictable and easier to maintain.</li>
  </ul>

  <h5>Example: Basic Usage</h5>
  <pre><code>
interface Person {
  name: string;
  age: number;
  speak(): void;
}

class Employee implements Person {
  constructor(public name: string, public age: number) {}

  speak() {
    console.log("Hello, I am " + this.name);
  }
}
  </code></pre>

  <p>
    If the class does not implement all properties or methods from the interface, 
    TypeScript will give a compile-time error.
  </p>

  <h5>Error Example</h5>
  <pre><code>
interface Shape {
  width: number;
  height: number;
}

class Rectangle implements Shape {
  width: number = 10;
  // ❌ Missing: height -> Error!
}
  </code></pre>

  <h5>Implementing Multiple Interfaces</h5>
  <pre><code>
interface A { a: number; }
interface B { b: number; }

class Test implements A, B {
  a = 1;
  b = 2;
}
  </code></pre>

  <p>
    A class can implement multiple interfaces, ensuring it satisfies all of them.
  </p>

  <h5>implements vs extends</h5>
  <ul>
    <li><code>extends</code> → Inherits functionality from another class.</li>
    <li><code>implements</code> → Enforces structure from an interface.</li>
  </ul>

  <pre><code>
// extends = real inheritance
class Manager extends Employee {}

// implements = structural contract
class Admin implements Person {}
  </code></pre>

  <p>
    The <code>implements</code> keyword is purely a TypeScript feature and has no effect at runtime, 
    but it greatly enhances code reliability.
  </p>
`,

39: `
  <h4>Definite Assignment Assertion (<code>!</code>) in TypeScript</h4>

  <p>
    The <b>Definite Assignment Assertion</b> is a TypeScript feature that tells the compiler:
    <br><b>“Trust me — this variable will be assigned before it is used.”</b>
  </p>

  <p>
    It is used by placing a <code>!</code> after a variable declaration.  
    This is helpful when TypeScript cannot analyze the assignment flow, but the developer knows it will be initialized.
  </p>

  <h5>Why Do We Need It?</h5>
  <ul>
    <li>Avoids “variable not initialized” errors.</li>
    <li>Useful when initialization happens indirectly (e.g., inside methods, callbacks).</li>
    <li>Common in class fields, dependency injection, and event-driven code.</li>
  </ul>

  <h5>Basic Example</h5>
  <pre><code>
let username!: string; // tells TS: "it WILL be assigned later"

function init() {
  username = "Abhishek";
}

init();
console.log(username.toUpperCase()); // OK
  </code></pre>

  <p>
    Without <code>!</code>, the above code would cause:
  </p>

  <pre><code>
Error: Variable 'username' is used before being assigned.
  </code></pre>

  <h5>Class Property Example</h5>
  <pre><code>
class User {
  name!: string; // definite assignment assertion

  constructor() {
    this.initialize();
  }

  initialize() {
    this.name = "John";
  }
}
  </code></pre>

  <p>
    TypeScript normally expects all properties to be initialized in the constructor.  
    The <code>!</code> tells it the value is guaranteed.
  </p>

  <h5>With Optional Initialization Logic</h5>
  <pre><code>
class Service {
  config!: object;

  loadConfig() {
    // logic eventually assigns config
    this.config = { url: "api/data" };
  }

  start() {
    console.log(this.config); // safe
  }
}
  </code></pre>

  <h5>Important Notes</h5>
  <ul>
    <li>It does <b>not</b> assign a value — only suppresses the compiler warning.</li>
    <li>It can hide real bugs if used carelessly.</li>
    <li>Use only when you are absolutely sure initialization happens.</li>
  </ul>

  <h5>When to Use</h5>
  <ul>
    <li>Class properties initialized in lifecycle methods.</li>
    <li>Variables assigned inside callbacks or async code.</li>
    <li>Dependency injection patterns.</li>
  </ul>

  <p>
    The Definite Assignment Assertion helps TypeScript understand that a variable will be initialized, 
    even if it cannot analyze the assignment path automatically.
  </p>
`,

40: `
  <h4>User Defined Type Guards in TypeScript</h4>

  <p>
    <b>User Defined Type Guards</b> allow you to create custom functions that help TypeScript
    understand the actual type of a value at runtime.
    These functions return a <b>type predicate</b> using the syntax:
    <code>value is Type</code>.
  </p>

  <p>
    They are extremely useful when working with <b>union types</b>, <b>unknown values</b>,
    or <b>API responses</b> where runtime shape checking is needed.
  </p>

  <h5>Why Use User Defined Type Guards?</h5>
  <ul>
    <li>Provide custom logic to check types at runtime.</li>
    <li>Help TypeScript narrow union types correctly.</li>
    <li>Improve safety when dealing with external data (API, user input, etc.).</li>
    <li>Make code cleaner and more predictable.</li>
  </ul>

  <h5>Basic Syntax</h5>
  <pre><code>
function isType(value: any): value is SomeType {
  return &lt;boolean_expression&gt;;
}
  </code></pre>

  <h5>Example 1: Primitive Type Guard</h5>
  <pre><code>
function isNumber(value: any): value is number {
  return typeof value === "number";
}

function printValue(v: number | string) {
  if (isNumber(v)) {
    console.log(v.toFixed(2)); // v is number here
  } else {
    console.log(v.toUpperCase()); // v is string here
  }
}
  </code></pre>

  <h5>Example 2: Object Type Guard</h5>
  <pre><code>
interface User {
  name: string;
  age: number;
}

function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.age === "number"
  );
}

const data: unknown = { name: "Abhi", age: 24 };

if (isUser(data)) {
  console.log(data.age + 1);  // Safe: TS knows data is User
}
  </code></pre>

  <h5>Important Points</h5>
  <ul>
    <li>The function <b>must return</b> a boolean.</li>
    <li>The return type must be a <b>type predicate</b> (value is Type).</li>
    <li>Used heavily with union types and runtime validation.</li>
    <li>Very useful for API responses where type is unknown.</li>
  </ul>

  <p>
    User Defined Type Guards combine <b>runtime checks</b> with TypeScript’s
    <b>static type safety</b>, giving you precise control over types.
  </p>
`,

41: `
  <h4>Assertion Functions in TypeScript</h4>

  <p>
    <b>Assertion Functions</b> are special functions that throw an error when a condition 
    is not met, and inform TypeScript that after the function runs successfully, 
    a value can be treated as a specific type.
  </p>

  <p>
    They use a special return type syntax called 
    <b>assertion signature</b>:
    <code>asserts condition</code> or <code>asserts value is Type</code>.
  </p>

  <h5>Why Assertion Functions?</h5>
  <ul>
    <li>Ensure a value meets certain criteria at runtime.</li>
    <li>Help TypeScript narrow types after the assertion.</li>
    <li>Useful for validating API responses or external inputs.</li>
    <li>Replace <code>as</code> type assertions with safer runtime checks.</li>
  </ul>

  <h5>Basic Syntax</h5>
  <pre><code>
function assert(condition: any, msg: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
  </code></pre>

  <h5>Example 1: Simple Assertion</h5>
  <pre><code>
function assertNumber(value: any): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Value must be a number");
  }
}

let x: unknown = 42;

assertNumber(x); 
// After this line, TypeScript knows: x is number
console.log(x.toFixed(2));
  </code></pre>

  <h5>Example 2: Object Validation</h5>
  <pre><code>
interface User {
  name: string;
  age: number;
}

function assertUser(obj: any): asserts obj is User {
  if (!obj || typeof obj.name !== "string" || typeof obj.age !== "number") {
    throw new Error("Invalid User");
  }
}

const data: unknown = { name: "Rahul", age: 25 };

assertUser(data);
// Now TS knows data is User
console.log(data.name.toUpperCase());
  </code></pre>

  <h5>Types of Assertion Signatures</h5>
  <ul>
    <li><code>asserts condition</code> — Tells TS the condition is true after the call.</li>
    <li><code>asserts value is Type</code> — Narrows a variable to a specific type.</li>
  </ul>

  <h5>Important Points</h5>
  <ul>
    <li>Assertion functions must <b>throw an error</b> when validation fails.</li>
    <li>They provide both runtime safety and compile-time narrowing.</li>
    <li>Used heavily in validation layers and API input checking.</li>
  </ul>

  <p>
    Assertion Functions combine JavaScript runtime validation with TypeScript’s 
    powerful type narrowing, making code safer and more predictable.
  </p>
`,
42: `
  <h4>Function Overloading in TypeScript</h4>

  <p>
    <b>Function Overloading</b> in TypeScript allows you to define multiple function 
    signatures for the same function name. This provides better type safety and 
    allows the function to behave differently based on the parameter types.
  </p>

  <p>
    Overloads define <b>what combinations of parameters are allowed</b>, while the 
    final implementation handles all logic internally.
  </p>

  <h5>Why Function Overloading?</h5>
  <ul>
    <li>Allows multiple valid call patterns.</li>
    <li>Improves type safety by restricting valid arguments.</li>
    <li>Makes APIs more flexible and expressive.</li>
    <li>TypeScript enforces correct return type depending on input type.</li>
  </ul>

  <h5>Function Overload Structure</h5>
  <pre><code>
// 1. Write multiple overload signatures
function example(x: number): number;
function example(x: string): string;

// 2. One actual implementation
function example(x: any): any {
  return x;
}
  </code></pre>

  <h5>Example 1: Overloading with number and string</h5>
  <pre><code>
function format(x: number): string;
function format(x: string): string;

function format(x: number | string): string {
  return "Value: " + x;
}

console.log(format(10));       // ✔ OK
console.log(format("Hello"));  // ✔ OK
// format(true);  // ❌ Error: No overload matches this call
  </code></pre>

  <h5>Example 2: Function that behaves differently based on input</h5>
  <pre><code>
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  return a + b;
}

add(2, 3);        // returns number
add("hi", " ts"); // returns string
  </code></pre>

  <h5>Example 3: Overloading for Arrays</h5>
  <pre><code>
function first(arr: number[]): number;
function first(arr: string[]): string;

function first(arr: any[]): any {
  return arr[0];
}

first([1, 2, 3]);        // number
first(["a", "b", "c"]);  // string
  </code></pre>

  <h5>Important Rules</h5>
  <ul>
    <li>Overload signatures appear <b>above</b> the implementation.</li>
    <li>Implementation must be compatible with all overloads.</li>
    <li>Only the overload signatures are visible to callers.</li>
    <li>Implementation uses union types or <code>any</code>.</li>
  </ul>

  <p>
    Function Overloading helps you design cleaner, safer APIs by providing 
    different call signatures for different behaviors.
  </p>
`,

43: `
  <h4>Call Signatures in TypeScript</h4>

  <p>
    A <b>Call Signature</b> describes what a function looks like inside an object or type.
    It defines the parameter types and return type, but without writing an actual function implementation.
    Think of it as a "function type blueprint".
  </p>

  <p>
    Call signatures are used when:
    <ul>
      <li>You want to describe an object that contains callable behavior.</li>
      <li>You want to enforce function parameter and return type without defining the function itself.</li>
      <li>You want to create reusable function types.</li>
    </ul>
  </p>

  <h5>Basic Call Signature Syntax</h5>
  <pre><code>
type Add = {
  (a: number, b: number): number;
};
  </code></pre>

  <p>
    This means any value of type <code>Add</code> must be a function that takes two numbers and returns a number.
  </p>

  <h5>Example 1: Using Call Signature with a Variable</h5>
  <pre><code>
type Logger = {
  (msg: string): void;
};

const log: Logger = (msg) => {
  console.log("LOG:", msg);
};

log("Hello"); // ✔ valid
  </code></pre>

  <h5>Example 2: Object with Properties + Call Signature</h5>
  <pre><code>
type Counter = {
  count: number;
  (value: number): number;
};

const myCounter: Counter = (value: number) => value + 1;
myCounter.count = 10;

console.log(myCounter(5)); // 6
console.log(myCounter.count); // 10
  </code></pre>

  <p>
    Here, <code>myCounter</code> is both a function <b>and</b> an object with properties.
  </p>

  <h5>Example 3: Call Signature in Interface</h5>
  <pre><code>
interface SearchFn {
  (source: string, sub: string): boolean;
}

const search: SearchFn = (src, sub) => {
  return src.includes(sub);
};
  </code></pre>

  <h5>Why Call Signatures Matter</h5>
  <ul>
    <li>Allows describing “function-like objects”.</li>
    <li>Improves readability of complex function types.</li>
    <li>Enables APIs where functions have properties (common in JS libraries).</li>
    <li>Better for reusable functional type definitions.</li>
  </ul>

  <p>
    Call Signatures give you a clean way to describe a function’s shape without writing concrete code,
    making your types more powerful and expressive.
  </p>
`,
44: `
  <h4>Abstract Classes in TypeScript</h4>

  <p>
    An <b>abstract class</b> is a class that cannot be instantiated directly.
    It is used as a base class and must be inherited by another class.
    Abstract classes often contain shared logic + method definitions that subclasses must implement.
  </p>

  <p>
    They allow you to define a common structure while forcing child classes to provide specific behavior.
  </p>

  <h5>Key Features</h5>
  <ul>
    <li><b>Cannot create objects</b> from abstract classes.</li>
    <li>Can contain <b>abstract methods</b> (no body, only declaration).</li>
    <li>Can also contain <b>concrete methods</b> (with implementation).</li>
    <li>Used for designing reusable and enforceable class hierarchies.</li>
  </ul>

  <h5>Basic Example</h5>
  <pre><code>
abstract class Animal {
  abstract makeSound(): void; // abstract method

  move() {
    console.log("Animal moving...");
  }
}

// ❌ const a = new Animal(); // Error - cannot instantiate abstract class

class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}

const d = new Dog();
d.makeSound(); // Woof!
d.move(); // Animal moving...
  </code></pre>

  <h5>Abstract Properties</h5>
  <pre><code>
abstract class Shape {
  abstract area: number;
  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;
  constructor(r: number) {
    super();
    this.radius = r;
    this.area = this.calculateArea();
  }

  area: number;

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}
  </code></pre>

  <h5>Why Use Abstract Classes?</h5>
  <ul>
    <li>To enforce subclasses to follow a certain structure.</li>
    <li>To provide base logic while requiring specific implementations.</li>
    <li>Useful in large applications for designing class-based architecture.</li>
    <li>Helps achieve partial abstraction (unlike interfaces which are fully abstract).</li>
  </ul>

  <h5>Abstract Class vs Interface</h5>
  <ul>
    <li><b>Abstract class</b> → can have implementation + abstract members.</li>
    <li><b>Interface</b> → only describes structure; no implementation.</li>
    <li>A class can extend <b>only one abstract class</b> but can implement <b>multiple interfaces</b>.</li>
  </ul>

  <p>
    Abstract classes allow powerful object-oriented patterns by mixing reusable logic with forced structure.
  </p>
`,

45: `
  <h4>Index Signatures in TypeScript</h4>

  <p>
    An <b>index signature</b> allows you to define the shape of objects
    when you don't know all their property names in advance.
    It is useful when creating objects with dynamic keys.
  </p>

  <p>
    Index signatures specify:
    <ul>
      <li>The type of the key (string or number)</li>
      <li>The type of the value</li>
    </ul>
  </p>

  <h5>Basic Syntax</h5>
  <pre><code>
type StringMap = {
  [key: string]: string;
};

const user: StringMap = {
  name: "Abhishek",
  city: "Hyderabad"
};
  </code></pre>

  <h5>Number Index Signature</h5>
  <pre><code>
type ScoreArray = {
  [index: number]: number;
};

const scores: ScoreArray = [90, 85, 95];
  </code></pre>

  <h5>Example: Dynamic Object</h5>
  <pre><code>
type Settings = {
  [key: string]: boolean;
};

const config: Settings = {
  darkMode: true,
  notifications: false,
  autoSave: true
};
  </code></pre>

  <h5>Restricting Known + Dynamic Keys</h5>
  <p>You can combine fixed and dynamic keys together.</p>

  <pre><code>
type User = {
  id: number;          // fixed key
  [key: string]: any;  // dynamic keys
};

const u: User = {
  id: 1,
  name: "John",
  role: "admin"
};
  </code></pre>

  <h5>Using Index Signature with Union Value Types</h5>
  <pre><code>
type ResponseData = {
  [key: string]: string | number | boolean;
};

const apiResponse: ResponseData = {
  status: "ok",
  code: 200,
  success: true,
};
  </code></pre>

  <h5>Important Rules</h5>
  <ul>
    <li>Index signature keys can only be <b>string</b> or <b>number</b>.</li>
    <li>If both exist, numeric keys are converted to strings internally.</li>
    <li>All property values must match the declared value type.</li>
    <li>Useful for maps, dictionaries, and dynamic objects.</li>
  </ul>

  <p>
    Index signatures make TypeScript powerful by allowing flexible yet type-safe dynamic objects.
  </p>
`,

46: `
  <h4>Readonly Arrays and Tuples</h4>

  <p>
    TypeScript provides <b>readonly</b> versions of arrays and tuples to prevent modification.
    These are extremely useful when you want to protect data from accidental changes.
  </p>

  <hr/>

  <h4>Readonly Arrays</h4>
  <p>A <b>readonly array</b> ensures that no element can be modified, added, or removed.</p>

  <h5>Syntax</h5>
  <pre><code>
const numbers: readonly number[] = [1, 2, 3];

// Invalid operations:
numbers.push(4);    // ❌ Error
numbers[0] = 10;    // ❌ Error
numbers.pop();      // ❌ Error
  </code></pre>

  <p>
    Useful when you want to expose array data without allowing mutation.
  </p>

  <h5>Readonly Array with ReadonlyArray&lt;T&gt;</h5>
  <pre><code>
const fruits: ReadonlyArray<string> = ["apple", "banana"];

// All mutation attempts cause errors
fruits[1] = "mango";   // ❌
fruits.push("grape");  // ❌
  </code></pre>

  <hr/>

  <h4>Readonly Tuples</h4>
  <p>
    A <b>readonly tuple</b> ensures the tuple structure and its values cannot be changed.
  </p>

  <h5>Example</h5>
  <pre><code>
const person: readonly [string, number] = ["Abhishek", 25];

// Invalid:
person[0] = "Kumar";  // ❌
person.push("new");   // ❌
  </code></pre>

  <p>
    This guarantees that tuple data stays constant after creation.
  </p>

  <hr/>

  <h4>Why Use Readonly?</h4>
  <ul>
    <li>Prevents accidental mutations</li>
    <li>Improves reliability of data flow</li>
    <li>Makes functions safer by ensuring input is not mutated inside them</li>
  </ul>

  <h5>Example: Function Safety</h5>
  <pre><code>
function logNames(names: readonly string[]) {
  // names.push("test");  ❌ can't modify
  console.log(names);
}

logNames(["a", "b", "c"]);
  </code></pre>

  <p>
    Using <b>readonly</b> makes APIs more predictable and prevents bugs caused by mutation.
  </p>
`,
47: `
  <h4>Double Assertion in TypeScript</h4>

  <p>
    <b>Double Assertion</b> (also called <b>double casting</b>) is when a value is first cast to <code>unknown</code>
    (or <code>any</code>) and then cast again to the desired type.  
    It allows you to force TypeScript to accept a conversion that it normally wouldn't allow.
  </p>

  <hr/>

  <h4>Why Double Assertion Exists?</h4>
  <p>
    TypeScript safely controls which types can be cast to each other.  
    Sometimes, you want to override the type system—such as when dealing with unusual data, legacy code,
    or when you absolutely know a conversion is safe but TypeScript does not.
  </p>

  <p>Double assertions bypass these restrictions.</p>

  <hr/>

  <h4>Syntax</h4>
  <pre><code>
// value as unknown as TargetType
const value = "hello" as unknown as number;
  </code></pre>

  <p>This forces the compiler to accept any type conversion.</p>

  <hr/>

  <h4>Example 1: Impossible Conversion (Normal Assertion Fails)</h4>
  <pre><code>
let x = "typescript";

// ❌ Error – string cannot be cast to number
// let num = x as number;

// ✅ Allowed using double assertion
let num = x as unknown as number;
  </code></pre>

  <hr/>

  <h4>Example 2: Converting Between Unrelated Object Types</h4>
  <pre><code>
interface User { name: string }
interface Product { price: number }

const u: User = { name: "Abhi" };

// ❌ Invalid:
// const p = u as Product;

// ✅ Valid via double assertion
const p = u as unknown as Product;
  </code></pre>

  <p>This is sometimes used when transforming API data.</p>

  <hr/>

  <h4>Why It’s Dangerous</h4>
  <ul>
    <li>Bypasses type safety completely</li>
    <li>May cause runtime errors</li>
    <li>Should be avoided unless absolutely necessary</li>
  </ul>

  <hr/>

  <h4>When to Use Double Assertion?</h4>
  <ul>
    <li>Migrating JS → TS where legacy code is messy</li>
    <li>Working with dynamic JSON or third-party APIs</li>
    <li>When refactoring but want quick compatibility</li>
  </ul>

  <p>
    <b>Rule:</b> Use double assertion only as a last resort.  
    Prefer proper type refinement, type guards, or safe type transformations.
  </p>
`,

48:`
<h4>Const Assertion in TypeScript</h4>
<p>
  <b>Const Assertion</b> (using <code>as const</code>) tells TypeScript to treat a value as a 
  <b>literal</b> and <b>deeply readonly</b>.  
  It prevents TypeScript from widening types like <code>"red"</code> → <code>string</code> or 
  <code>10</code> → <code>number</code>.  
  With <code>as const</code>, values become exact and cannot be modified.
</p>

<h5>🔹 Why Use Const Assertion?</h5>
<ul>
  <li>Keeps the <b>exact literal type</b> instead of widening.</li>
  <li>Makes objects and arrays <b>deeply readonly</b>.</li>
  <li>Useful for configurations, constants, and discriminated unions.</li>
</ul>

<h5>🔹 Examples</h5>

<p><b>1. Literal value locked</b></p>
<pre>
const direction = "north" as const;
// direction: "north"
</pre>

<p><b>2. Deeply readonly object</b></p>
<pre>
const settings = {
  retries: 3,
  mode: "auto"
} as const;

// settings.retries = 5;  // ❌ Error
</pre>

<p><b>3. Readonly array / tuple</b></p>
<pre>
const nums = [10, 20, 30] as const;
// readonly [10, 20, 30]
</pre>

<p><b>4. Use in function arguments</b></p>
<pre>
function move(dir: "up" | "down") {}

const d = "up" as const;
move(d); // ✔ Works
</pre>

<hr/>

`,
49: `
  <h4>49. this parameter in TypeScript</h4>

  <p>
  The <code>this</code> parameter in TypeScript is a special, explicit first parameter
  that lets you define what <code>this</code> should refer to inside a function.
  This helps TypeScript catch incorrect usage where <code>this</code> becomes undefined or mismatched.
  </p>

  <h4>Why do we use the this parameter?</h4>
  <ul>
    <li>Prevents accidental <code>this = undefined</code> situations</li>
    <li>Makes function calls type-safe</li>
    <li>Ensures correct binding when passing methods as callbacks</li>
  </ul>

  <h4>Basic Example</h4>
  <pre><code>
function greet(this: { name: string }) {
  console.log("Hello " + this.name);
}

greet.call({ name: "Abhishek" }); // ✔ Valid
greet();                          // ❌ Error — this must have 'name'
  </code></pre>

  <h4>Class Example</h4>
  <pre><code>
class Counter {
  count = 0;

  increment(this: Counter) {
    this.count++;
  }
}

const c = new Counter();
const inc = c.increment;

inc();          // ❌ Error — incorrect 'this'
c.increment();  // ✔ Valid
  </code></pre>

  <h4>Key Points</h4>
  <ul>
    <li>The this parameter exists only in TypeScript — removed during compilation.</li>
    <li>Must be the <b>first</b> parameter in the function.</li>
    <li>Prevents “lost this” issues common in JavaScript.</li>
  </ul>
`,
50: `
  <h4>50. Generic Constraints in TypeScript</h4>

  <p>
  Generic Constraints allow you to <b>restrict</b> the types that can be passed to a generic.
  This is done using the <code>extends</code> keyword.  
  Constraints ensure that the generic type has certain properties or structure.
  </p>

  <hr/>

  <h4>Why use Generic Constraints?</h4>
  <ul>
    <li>To ensure the generic type supports specific properties.</li>
    <li>To avoid runtime errors like <i>property does not exist</i>.</li>
    <li>To enforce structure (e.g., object shapes, interfaces).</li>
  </ul>

  <hr/>

  <h4>Basic Example</h4>
  <p>Restrict a generic to types that have a <code>length</code> property.</p>

  <pre><code>
function logLength&lt;T extends { length: number }&gt;(value: T) {
  console.log(value.length);
}

logLength("Hello");        // ✔ Valid
logLength([1, 2, 3]);      // ✔ Valid
logLength(100);            // ❌ Error — number has no length
  </code></pre>

  <hr/>

  <h4>Using Constraints with Interfaces</h4>

  <pre><code>
interface Person {
  name: string;
}

function greet&lt;T extends Person&gt;(obj: T) {
  console.log("Hello " + obj.name);
}

greet({ name: "Abhishek" });        // ✔ Valid
greet({ age: 25 });                 // ❌ Error — missing 'name'
  </code></pre>

  <hr/>

  <h4>Using Multiple Constraints</h4>
  <p>You can also constrain a generic to multiple types using <code>&</code> (intersection).</p>

  <pre><code>
function combine&lt;T extends A & B, A, B&gt;(value: T) {
  return value;
}
  </code></pre>

  <hr/>

  <h4>Key Points</h4>
  <ul>
    <li><code>extends</code> is used to restrict generic types.</li>
    <li>Constraints improve type safety and prevent invalid usage.</li>
    <li>You can constrain generics to interfaces, classes, or object shapes.</li>
  </ul>
`,
51: `
  <h4>51. Dealing with Temporal Uncertainty in TypeScript</h4>

  <p>
  <b>Temporal Uncertainty</b> refers to values that are <b>not available immediately</b> or may become 
  available at a later point in time — typically when dealing with asynchronous operations  
  (APIs, timers, promises, background tasks).
  </p>

  <p>
  TypeScript provides strong typing tools to safely handle values that are 
  <i>unknown now but expected later</i>.
  </p>

  <hr/>

  <h4>Common Sources of Temporal Uncertainty</h4>
  <ul>
    <li>Fetching data from an API</li>
    <li>Reading files</li>
    <li>Database queries</li>
    <li>setTimeout, setInterval, event listeners</li>
    <li>Promises and async/await</li>
  </ul>

  <hr/>

  <h4>1. Using <code>Promise&lt;T&gt;</code></h4>
  <p>Promises represent a value that will exist in the future.</p>

  <pre><code>
function fetchUser(): Promise&lt;string&gt; {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; resolve("Abhishek"), 1000);
  });
}
  </code></pre>

  <p>
  TypeScript ensures that the resolved value is always a <code>string</code>.
  </p>

  <hr/>

  <h4>2. Using <code>async/await</code> for Handling Uncertainty</h4>

  <pre><code>
async function loadUser() {
  const user = await fetchUser(); // user: string
  console.log(user);
}
  </code></pre>

  <p>
  <b>await</b> tells TypeScript: “The value will exist later — treat it as the specified type.”
  </p>

  <hr/>

  <h4>3. Using <code>undefined</code> or <code>null</code> for Maybe-Later Values</h4>

  <pre><code>
let data: string | undefined;

setTimeout(() =&gt; {
  data = "Loaded!";
}, 2000);
  </code></pre>

  <p>
  TypeScript warns you if you try to use <code>data</code> before it’s set.
  </p>

  <hr/>

  <h4>4. Using Type Narrowing</h4>
  <p>Before using a value that may not exist yet, narrow the type.</p>

  <pre><code>
if (data !== undefined) {
  console.log(data.toUpperCase());
}
  </code></pre>

  <hr/>

  <h4>5. Optional Chaining for Temporally Uncertain Values</h4>

  <pre><code>
console.log(data?.toUpperCase());
  </code></pre>

  <p>
  Safe access — doesn't crash if the value isn't available yet.
  </p>

  <hr/>

  <h4>6. Non-null Assertion (Use Carefully)</h4>

  <pre><code>
console.log(data!.toUpperCase());
  </code></pre>

  <p>
  This tells TypeScript: “I am sure the value is not null or undefined.”  
  <b>Should be used rarely.</b>
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Temporal uncertainty occurs when values arrive later (async work).</li>
    <li>Use <code>Promise&lt;T&gt;</code> and <code>async/await</code> for future values.</li>
    <li>Type unions like <code>T | undefined</code> model maybe-not-yet values.</li>
    <li>Use narrowing (<code>if</code> checks) to safely access them.</li>
    <li>Optional chaining avoids crashes before the value arrives.</li>
    <li>Non-null assertion should be last resort.</li>
  </ul>
`,
  52: `
  <h4>52. typeof Type Operator in TypeScript</h4>

  <p>
  The <code>typeof</code> type operator lets you extract the <b>type</b> of a variable, function, or object 
  and reuse it elsewhere.  
  It is used only at <b>type level</b> (not runtime) to reference the <i>type</i> of a value.
  </p>

  <hr/>

  <h4>Why We Use <code>typeof</code>?</h4>
  <ul>
    <li>To avoid duplicating type definitions</li>
    <li>To infer type from an existing variable</li>
    <li>To build type-safe references to configuration objects</li>
    <li>To ensure refactoring safety (changing the value updates the type automatically)</li>
  </ul>

  <hr/>

  <h4>Basic Usage</h4>

  <pre><code>
const message = "Hello TypeScript";
type MsgType = typeof message; 
// MsgType = string
  </code></pre>

  <p>
  Here, <code>typeof message</code> extracts the type <code>string</code>.
  </p>

  <hr/>

  <h4>Using typeof with Objects</h4>

  <pre><code>
const user = {
  id: 1,
  name: "Abhishek",
  active: true
};

type User = typeof user;
  </code></pre>

  <p>
  <code>User</code> is now an object type that exactly matches the structure of <code>user</code>.
  </p>

  <hr/>

  <h4>Using typeof with Functions</h4>

  <pre><code>
function add(a: number, b: number) {
  return a + b;
}

type AddFn = typeof add;
// AddFn: (a: number, b: number) =&gt; number
  </code></pre>

  <p>
  This extracts the <b>type signature</b> of the function.
  </p>

  <hr/>

  <h4>typeof + ReturnType</h4>

  <pre><code>
function getUser() {
  return { id: 1, name: "Abhishek" };
}

type User = ReturnType&lt;typeof getUser&gt;;
  </code></pre>

  <p>
  Using <code>typeof</code> with <code>ReturnType</code> gives the return type of the function.
  </p>

  <hr/>

  <h4>Important Notes</h4>
  <ul>
    <li><code>typeof</code> at runtime gives values; in TypeScript it gives types.</li>
    <li>It only works on values — not on types.</li>
    <li>Useful when defining types directly from real data.</li>
  </ul>

  `,
  53: `
  <h4>53. Lookup Types in TypeScript</h4>

  <p>
  <b>Lookup Types</b> let you access the type of a specific property from another type  
  using the <code>T[K]</code> syntax — similar to accessing a property on an object, 
  but at the <b>type level</b>.
  </p>

  <p>
  They allow you to <b>extract</b> specific property types from complex objects, interfaces, 
  or mapped types.
  </p>

  <hr/>

  <h4>Basic Example</h4>

  <pre><code>
type User = {
  id: number;
  name: string;
  active: boolean;
};

type UserName = User["name"]; 
// UserName = string
  </code></pre>

  <p>
  <code>User["name"]</code> extracts the type of the <code>name</code> property (which is <code>string</code>).
  </p>

  <hr/>

  <h4>Using Lookup Types with Union Keys</h4>

  <pre><code>
type UserProps = User["id" | "active"];
// number | boolean
  </code></pre>

  <p>
  When multiple keys are used, TypeScript creates a <b>union</b> of those property types.
  </p>

  <hr/>

  <h4>Lookup Types with <code>keyof</code></h4>

  <pre><code>
type Keys = keyof User; 
// "id" | "name" | "active"

type ValueTypes = User[Keys];
// number | string | boolean
  </code></pre>

  <p>
  <code>keyof</code> + lookup types allow you to reference all value types dynamically.
  </p>

  <hr/>

  <h4>Nested Lookup Types</h4>

  <pre><code>
type Product = {
  info: {
    title: string;
    price: number;
  };
};

type PriceType = Product["info"]["price"];
// number
  </code></pre>

  <p>
  Lookup types work for deep nested properties.
  </p>

  <hr/>

  <h4>Use Case: Enforcing Property Access</h4>

  <pre><code>
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const u: User = { id: 1, name: "Abhishek", active: true };

const n = getValue(u, "name"); 
// n: string
  </code></pre>

  <p>
  The return type becomes <code>T[K]</code> — a perfect real-world use of lookup types.
  </p>

  <hr/>

  <h4>Key Points</h4>
  <ul>
    <li>Lookup types extract the type of a specific property using <code>T[K]</code>.</li>
    <li>They work with unions, nested structures, and <code>keyof</code>.</li>
    <li>Useful for building reusable, type-safe utility functions.</li>
    <li>A core part of advanced TypeScript type manipulation.</li>
  </ul>
  `,
  54: `
  <h4>54. <code>keyof</code> Type Operator in TypeScript</h4>

  <p>
    The <code>keyof</code> operator returns a union of all property names (keys) of a given type.  
    It is used to create <b>type-safe key references</b>, allowing TypeScript to ensure that 
    only valid property names are used.
  </p>

  <p>
    In simple words:  
    <b><code>keyof T</code> gives you all keys of the type <code>T</code> as a union of string literal types.</b>
  </p>

  <hr/>

  <h4>Basic Example</h4>

  <pre><code>
type User = {
  id: number;
  name: string;
  active: boolean;
};

type UserKeys = keyof User;
// "id" | "name" | "active"
  </code></pre>

  <p>
    <code>UserKeys</code> becomes a union of the keys inside <code>User</code>.
  </p>

  <hr/>

  <h4>Working with Index Signatures</h4>

  <pre><code>
type StringMap = {
  [key: string]: string;
};

type Keys = keyof StringMap;
// string
  </code></pre>

  <p>
    When a type uses index signatures, <code>keyof</code> returns the index type.
  </p>

  <hr/>

  <h4>Using <code>keyof</code> with Functions</h4>

  <pre><code>
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Abhishek", active: true };

const value = getValue(user, "name");
// value: string
  </code></pre>

  <p>
    The key parameter is restricted to valid property names, providing strong type safety.
  </p>

  <hr/>

  <h4>Using <code>keyof</code> with Classes</h4>

  <pre><code>
class Product {
  title: string = "";
  price: number = 0;
}

type ProductKeys = keyof Product;
// "title" | "price"
  </code></pre>

  <p>
    Classes behave like object types when used with <code>keyof</code>.
  </p>

  <hr/>

  <h4>Using <code>keyof</code> with Mapped Types</h4>

  <pre><code>
type Options = {
  darkMode: boolean;
  animations: boolean;
};

type OptionKeys = keyof Options;
// "darkMode" | "animations"
  </code></pre>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li><code>keyof T</code> returns a union of keys of the type <code>T</code>.</li>
    <li>Useful for building type-safe dynamic property access.</li>
    <li>Often used with generics and utility functions.</li>
    <li>Works with objects, classes, mapped types, and index signatures.</li>
  </ul>
  `,

  55: `
  <h4>58. Conditional Types in TypeScript</h4>

  <p>
    Conditional Types allow you to apply <b>type logic</b> (if-else) inside TypeScript.
    They follow the pattern:
  </p>

  <pre><code>
T extends U ? X : Y
  </code></pre>

  <p>
    Meaning:<br/>
    ✔ If <code>T</code> is assignable to <code>U</code> → result is <code>X</code> <br/>
    ❌ Otherwise → result is <code>Y</code>
  </p>

  <hr/>

  <h4>1. Basic Conditional Type</h4>

  <pre><code>
type IsString&lt;T&gt; = T extends string ? "yes" : "no";

type A = IsString&lt;string&gt;;  // "yes"
type B = IsString&lt;number&gt;;  // "no"
  </code></pre>

  <hr/>

  <h4>2. Converting Any Type to Array</h4>

  <pre><code>
type ToArray&lt;T&gt; = T extends any ? T[] : never;

type A1 = ToArray&lt;number&gt;;   // number[]
type A2 = ToArray&lt;string&gt;;   // string[]
  </code></pre>

  <hr/>

  <h4>3. Conditional Type on Union</h4>

  <pre><code>
type Check&lt;T&gt; = T extends string ? "string" : "other";

type R = Check&lt;string | number&gt;;
// "string" | "other"
  </code></pre>

  <hr/>

  <h4>4. Removing <code>null</code> and <code>undefined</code></h4>

  <pre><code>
type Clean&lt;T&gt; = T extends null | undefined ? never : T;

type X = Clean&lt;string | null&gt;;   // string
  </code></pre>

  <hr/>

  <h4>5. Using <code>infer</code> Inside Conditional Types</h4>

  <pre><code>
type GetReturn&lt;T&gt; =
  T extends (...args: any[]) =&gt; infer R
    ? R
    : never;

function test() {
  return 100;
}

type Result = GetReturn&lt;typeof test&gt;;  // number
  </code></pre>

  <hr/>

  <h4>Key Takeaways</h4>

  <ul>
    <li>Conditional types allow type-level decision making.</li>
    <li>Syntax: <code>T extends U ? X : Y</code></li>
    <li>Works beautifully with unions and generics.</li>
    <li><code>infer</code> helps extract types like return types or parameter types.</li>
  </ul>
  `,
  56: `
  <h4>56. Conditional Types with Unions and <code>never</code></h4>

  <p>
    When conditional types interact with <b>union types</b>, TypeScript applies the condition
    to each member of the union individually.  
    This behavior is called <b>distributive conditional types</b>.
  </p>

  <hr/>

  <h4>1. Basic Example of Distribution</h4>

  <pre><code>
type Check&lt;T&gt; = T extends string ? "str" : "other";

type R = Check&lt;string | number&gt;;
// Result:
// "str" | "other"
  </code></pre>

  <p>
  The conditional type runs separately on <code>string</code> and <code>number</code>.
  </p>

  <hr/>

  <h4>2. Filtering Types Using <code>never</code></h4>

  <p>
    Using <code>never</code> in conditional types lets us <b>remove</b> unwanted types from unions.
  </p>

  <pre><code>
type RemoveString&lt;T&gt; =
  T extends string ? never : T;

type R1 = RemoveString&lt;string | number | boolean&gt;;
// number | boolean
  </code></pre>

  <p>
    <code>string</code> becomes <code>never</code>, and <code>never</code> is removed from unions.
  </p>

  <hr/>

  <h4>3. Extracting Specific Types from a Union</h4>

  <pre><code>
type ExtractString&lt;T&gt; =
  T extends string ? T : never;

type R2 = ExtractString&lt;string | number | boolean&gt;;
// string
  </code></pre>

  <p>
    Only <code>string</code> passes the condition. Others resolve to <code>never</code>.
  </p>

  <hr/>

  <h4>4. Understanding Why <code>never</code> Disappears</h4>

  <p>
    <code>never</code> represents an impossible type.  
    When merged into a union, it automatically gets removed:
  </p>

  <pre><code>
type X = string | never | number;
// string | number
  </code></pre>

  <hr/>

  <h4>5. Preventing Distribution (Important!)</h4>

  <p>
    Wrapping the type in a tuple <b>stops distribution</b>.
  </p>

  <pre><code>
type NoDistribute&lt;T&gt; =
  [T] extends [string] ? "yes" : "no";

type R3 = NoDistribute&lt;string | number&gt;;
// "no"
  </code></pre>

  <p>
    Since <code>[string | number] extends [string]</code> is false → result is only <code>"no"</code>.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>

  <ul>
    <li>Conditional types distribute over unions by default.</li>
    <li><code>never</code> is automatically removed from unions.</li>
    <li>You can use conditional types to filter or extract union members.</li>
    <li>Use tuple wrapping <code>[T]</code> to prevent distribution.</li>
  </ul>
  `,
  57:`<h4>Using <code>infer</code> Inside Conditional Types</h4>

<p>
  The <code>infer</code> keyword allows TypeScript to <b>capture</b> a type from within another type during conditional type evaluation.  
  It is commonly used for extracting return types, parameter types, array element types, and more.
</p>

<hr/>

<h4>1. Basic Example of <code>infer</code></h4>

<pre><code>
type GetReturn&lt;T&gt; =
  T extends (...args: any[]) =&gt; infer R ? R : never;

type R = GetReturn&lt;() =&gt; string&gt;;
// string
</code></pre>

<p>
  <code>infer R</code> tells TypeScript:  
  “If <code>T</code> is a function, extract its return type as <code>R</code>.”
</p>

<hr/>

<h4>2. Inferring from Arrays</h4>

<pre><code>
type ElementOf&lt;T&gt; =
  T extends (infer U)[] ? U : never;

type R1 = ElementOf&lt;number[]&gt;;
// number
</code></pre>

<p>
  Here, <code>infer U</code> extracts the array’s element type.
</p>

<hr/>

<h4>3. Inferring Function Parameters</h4>

<pre><code>
type FirstArg&lt;T&gt; =
  T extends (arg: infer A, ...rest: any[]) =&gt; any ? A : never;

type R2 = FirstArg&lt;(x: boolean, y: number) =&gt; void&gt;;
// boolean
</code></pre>

<p>
  The first function parameter is extracted using <code>infer A</code>.
</p>

<hr/>

<h4>4. Inferring Inner Types from Promises</h4>

<pre><code>
type UnwrapPromise&lt;T&gt; =
  T extends Promise&lt;infer U&gt; ? U : T;

type R3 = UnwrapPromise&lt;Promise&lt;string&gt;&gt;;
// string
</code></pre>

<p>
  <code>infer U</code> lets us access the resolved value type of a promise.
</p>

<hr/>

<h4>5. Multiple <code>infer</code> Clauses</h4>

<pre><code>
type InferFn&lt;T&gt; =
  T extends (a: infer A, b: infer B) =&gt; infer R
    ? [A, B, R]
    : never;

type R4 = InferFn&lt;(x: number, y: string) =&gt; boolean&gt;;
// [number, string, boolean]
</code></pre>

<p>
  Multiple inferred types can be extracted at once from a function signature.
</p>

<hr/>

<h4>Key Takeaways</h4>

<ul>
  <li><code>infer</code> can extract types inside conditional types.</li>
  <li>Useful for return types, parameters, array elements, and promises.</li>
  <li>Can use multiple <code>infer</code> statements in the same conditional.</li>
  <li><code>infer</code> only works inside conditional types.</li>
</ul>
`
,
  58: `
  <h4>58. Mapped Types in TypeScript</h4>

  <p>
    <b>Mapped Types</b> allow you to create new types by transforming each property 
    of an existing type.  
    They “map over” keys and apply rules such as making them optional, readonly, or changing types.
  </p>

  <hr/>

  <h4>1. Basic Mapped Type</h4>

  <pre><code>
type MyMapped&lt;T&gt; = {
  [K in keyof T]: T[K];
};

type User = { name: string; age: number };
type Copy = MyMapped&lt;User&gt;;
// Same as User
  </code></pre>

  <p>
    Here, <code>K in keyof T</code> loops over all keys of <code>T</code>.
  </p>

  <hr/>

  <h4>2. Making All Properties Optional</h4>

  <pre><code>
type MyPartial&lt;T&gt; = {
  [K in keyof T]?: T[K];
};

type P = MyPartial&lt;User&gt;;
// { name?: string; age?: number }
  </code></pre>

  <p>
    This is exactly how TypeScript’s built-in <code>Partial&lt;T&gt;</code> works.
  </p>

  <hr/>

  <h4>3. Making All Properties Readonly</h4>

  <pre><code>
type MyReadonly&lt;T&gt; = {
  [K in keyof T]: Readonly&lt;T[K]&gt;;
};

type R = MyReadonly&lt;User&gt;;
// { readonly name: string; readonly age: number }
  </code></pre>

  <p>
    Same concept as TypeScript's <code>Readonly&lt;T&gt;</code>.
  </p>

  <hr/>

  <h4>4. Changing Property Types</h4>

  <pre><code>
type ToBoolean&lt;T&gt; = {
  [K in keyof T]: boolean;
};

type Flags = ToBoolean&lt;User&gt;;
// { name: boolean; age: boolean }
  </code></pre>

  <p>
    Every property becomes a <code>boolean</code>.
  </p>

  <hr/>

  <h4>5. Using <code>as</code> for Key Remapping (Advanced)</h4>

  <pre><code>
type PrefixKeys&lt;T&gt; = {
  [K in keyof T as \`my_\${string & K}\`]: T[K];
};

type NewUser = PrefixKeys&lt;User&gt;;
// { my_name: string; my_age: number }
  </code></pre>

  <p>
    Key remapping lets you <b>rename</b> properties dynamically.
  </p>

  <hr/>

  <h4>6. Removing Keys with <code>never</code></h4>

  <pre><code>
type RemoveAge&lt;T&gt; = {
  [K in keyof T as K extends "age" ? never : K]: T[K];
};

type NoAge = RemoveAge&lt;User&gt;;
// { name: string }
  </code></pre>

  <p>
    Keys mapped to <code>never</code> are removed.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>

  <ul>
    <li>Mapped types let you transform each property of a type.</li>
    <li><code>[K in keyof T]</code> loops through each key.</li>
    <li>Used to create utility types like <code>Partial</code>, <code>Readonly</code>, <code>Record</code>.</li>
    <li>You can modify types, make properties optional, readonly, or remap key names.</li>
    <li>Using <code>as</code> with mapped types allows key renaming.</li>
  </ul>
  `,
  59: `
  <h4>59. Mapped Type Modifiers in TypeScript</h4>

  <p>
    Mapped Type Modifiers allow you to <b>add or remove</b> property modifiers 
    such as <code>readonly</code> and <code>?</code> (optional) when transforming types.
    They give fine-grained control over how each property of a mapped type behaves.
  </p>

  <hr/>

  <h4>Available Modifiers</h4>
  <ul>
    <li><code>readonly</code> — makes a property immutable</li>
    <li><code>-readonly</code> — removes the readonly flag</li>
    <li><code>?</code> — makes a property optional</li>
    <li><code>-?</code> — makes a property required</li>
  </ul>

  <hr/>

  <h4>1. Adding <code>readonly</code> to All Properties</h4>

  <pre><code>
type ReadonlyAll&lt;T&gt; = {
  readonly [K in keyof T]: T[K];
};

type User = { name: string; age: number };
type R = ReadonlyAll&lt;User&gt;;
// { readonly name: string; readonly age: number }
  </code></pre>

  <hr/>

  <h4>2. Removing <code>readonly</code> Using <code>-readonly</code></h4>

  <pre><code>
type Mutable&lt;T&gt; = {
  -readonly [K in keyof T]: T[K];
};

type UserRO = { readonly name: string; readonly age: number };
type M = Mutable&lt;UserRO&gt;;
// { name: string; age: number }
  </code></pre>

  <p>
    The <code>-readonly</code> prefix removes the readonly modifier.
  </p>

  <hr/>

  <h4>3. Adding Optional Modifier <code>?</code></h4>

  <pre><code>
type MakeOptional&lt;T&gt; = {
  [K in keyof T]?: T[K];
};

type O = MakeOptional&lt;User&gt;;
// { name?: string; age?: number }
  </code></pre>

  <hr/>

  <h4>4. Removing Optional Modifier <code>-?</code></h4>

  <pre><code>
type MakeRequired&lt;T&gt; = {
  [K in keyof T]-?: T[K];
};

type PartialUser = { name?: string; age?: number };
type R2 = MakeRequired&lt;PartialUser&gt;;
// { name: string; age: number }
  </code></pre>

  <p>
    <code>-?</code> forces all properties to be required.
  </p>

  <hr/>

  <h4>5. Combining Modifiers</h4>

  <pre><code>
type MutableRequired&lt;T&gt; = {
  -readonly [K in keyof T]-?: T[K];
};

type X = MutableRequired&lt;UserRO&gt;;
// { name: string; age: number }
  </code></pre>

  <p>
    Here we remove both <code>readonly</code> and <code>optional</code>.
  </p>

  <hr/>

  <h4>6. Example: Making All Properties Readonly & Optional</h4>

  <pre><code>
type ReadonlyOptional&lt;T&gt; = {
  readonly [K in keyof T]?: T[K];
};

type Test = ReadonlyOptional&lt;User&gt;;
// { readonly name?: string; readonly age?: number }
  </code></pre>

  <hr/>

  <h4>Key Takeaways</h4>

  <ul>
    <li>Mapped Type Modifiers help control optional/readonly properties in mapped types.</li>
    <li><code>readonly</code> adds immutability; <code>-readonly</code> removes it.</li>
    <li><code>?</code> adds optionality; <code>-?</code> removes it.</li>
    <li>Modifiers can be combined for powerful type transformations.</li>
  </ul>
  `,
  60: `
  <h4>60. Template Literal Types in TypeScript</h4>

  <p>
    Template Literal Types allow you to build <b>string types dynamically</b> using 
    template literal syntax (similar to JavaScript template strings).  
    They are extremely useful for creating <b>precise string patterns, unions, and strongly-typed APIs</b>.
  </p>

  <hr/>

  <h4>1. Basic Template Literal Type</h4>

  <pre><code>
type Greeting = \`Hello \${string}\`;

let a: Greeting;

a = "Hello Abhishek";  // ✔ valid
a = "Hello TypeScript"; // ✔ valid
a = "Hi Abhishek";      // ❌ Error
  </code></pre>

  <p>
    The type must start with "Hello " followed by any string.
  </p>

  <hr/>

  <h4>2. Combining Union Types with Template Literals</h4>

  <pre><code>
type Size = "small" | "medium" | "large";
type Status = "success" | "error";

type Message = \`\${Status}-\${Size}\`;

// expands to:
// "success-small" | "success-medium" | "success-large" |
// "error-small"   | "error-medium"   | "error-large"
  </code></pre>

  <p>
    Template literal types generate all combinations automatically.
  </p>

  <hr/>

  <h4>3. Creating Strict API Routes</h4>

  <pre><code>
type Method = "get" | "post";
type Route = "/users" | "/products";

type ApiEndpoint = \`\${Method} \${Route}\`;

let e1: ApiEndpoint = "get /users";     // ✔
let e2: ApiEndpoint = "post /products"; // ✔
let e3: ApiEndpoint = "delete /users";  // ❌ Error
  </code></pre>

  <hr/>

  <h4>4. Using <code>Uppercase</code>, <code>Lowercase</code>, <code>Capitalize</code>, <code>Uncapitalize</code></h4>

  <pre><code>
type User = "abhi";

type Upper = Uppercase&lt;User&gt;;       // "ABHI"
type Capital = Capitalize&lt;User&gt;;    // "Abhi"
  </code></pre>

  <p>
    You can transform string literal types using built-in helpers.
  </p>

  <hr/>

  <h4>5. Building Property Names Dynamically</h4>

  <pre><code>
type EventName&lt;T&gt; = \`on\${Capitalize&lt;T&gt;}\`;

type E = EventName&lt;"click" | "submit"&gt;;
// "onClick" | "onSubmit"
  </code></pre>

  <p>Useful for UI event systems and strictly-typed DOM APIs.</p>

  <hr/>

  <h4>6. Template Literal Types with Inferred Types</h4>

  <pre><code>
function makeKey&lt;T extends string&gt;(key: T) {
  return \`app-\${key}\` as const;
}

const k = makeKey("config");
// type of k = "app-config"
  </code></pre>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Template Literal Types let you construct string types dynamically.</li>
    <li>Useful for strongly-typed routes, events, messages, and UI patterns.</li>
    <li>They work well with unions, producing all combinations automatically.</li>
    <li>Can be combined with string manipulation types like <code>Uppercase</code>.</li>
  </ul>
  `,
  61: `
  <h4>61. Partial&lt;T&gt; in TypeScript</h4>

  <p>
    <code>Partial&lt;T&gt;</code> is a built-in utility type that makes <b>all properties of a type optional</b>.  
    This is useful when you want to create objects with only some fields of another object type.
  </p>

  <hr/>

  <h4>1. What Partial&lt;T&gt; Does</h4>

  <p>
    It converts this:
  </p>

  <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
}
  </code></pre>

  <p>
    Into this:
  </p>

  <pre><code>
{
  id?: number;
  name?: string;
  email?: string;
}
  </code></pre>

  <p>
    Every property becomes optional (<code>?:</code>).
  </p>

  <hr/>

  <h4>2. Using Partial&lt;T&gt; in Functions</h4>

  <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(data: Partial&lt;User&gt;) {
  console.log(data);
}

updateUser({ name: "Abhi" });       // ✔ Only name provided
updateUser({ });                    // ✔ Empty object allowed
updateUser({ id: 1, email: "a@b.com" }); // ✔ Works
  </code></pre>

  <p>
    Any combination of properties is allowed because all fields are optional.
  </p>

  <hr/>

  <h4>3. How Partial&lt;T&gt; Works Internally</h4>

  <pre><code>
type Partial&lt;T&gt; = {
  [P in keyof T]?: T[P];
};
  </code></pre>

  <p>
    A mapped type adds <code>?:</code> to every property in <code>T</code>.
  </p>

  <hr/>

  <h4>4. Practical Example — Updating a Config Object</h4>

  <pre><code>
interface Config {
  host: string;
  port: number;
  secure: boolean;
}

const defaultConfig: Config = {
  host: "localhost",
  port: 8080,
  secure: false
};

function setConfig(update: Partial&lt;Config&gt;) {
  return { ...defaultConfig, ...update };
}

const newConfig = setConfig({ secure: true });
  </code></pre>

  <p>
    Only the fields you want to override are provided.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Makes all properties optional.</li>
    <li>Useful for update operations or patch objects.</li>
    <li>Implemented using mapped types.</li>
    <li>Allows partial construction of complex objects.</li>
  </ul>
  `,
  62: `
  <h4>62. Required&lt;T&gt; in TypeScript</h4>

  <p>
    <code>Required&lt;T&gt;</code> is a built-in utility type that makes <b>all properties of a type mandatory</b>.  
    It is the opposite of <code>Partial&lt;T&gt;</code>.
  </p>

  <hr/>

  <h4>1. What Required&lt;T&gt; Does</h4>

  <p>It converts this:</p>

  <pre><code>
interface User {
  id?: number;
  name?: string;
  email?: string;
}
  </code></pre>

  <p>Into this:</p>

  <pre><code>
{
  id: number;
  name: string;
  email: string;
}
  </code></pre>

  <p>
    All optional <code>?:</code> properties become required again.
  </p>

  <hr/>

  <h4>2. Using Required&lt;T&gt; in Practice</h4>

  <pre><code>
interface User {
  id?: number;
  name?: string;
  email?: string;
}

function saveUser(user: Required&lt;User&gt;) {
  console.log("Saving:", user);
}

saveUser({
  id: 1,
  name: "Abhi",
  email: "a@b.com"
}); // ✔ Works

saveUser({ id: 1 }); // ❌ Error — name & email missing
  </code></pre>

  <p>
    TypeScript enforces that all fields must be passed.
  </p>

  <hr/>

  <h4>3. How Required&lt;T&gt; Works Internally</h4>

  <pre><code>
type Required&lt;T&gt; = {
  [P in keyof T]-?: T[P];
};
  </code></pre>

  <p>
    The <code>-?</code> removes the optional modifier from each property.
  </p>

  <hr/>

  <h4>4. Practical Example — Making Config Fully Mandatory</h4>

  <pre><code>
interface PartialConfig {
  host?: string;
  port?: number;
  secure?: boolean;
}

type FullConfig = Required&lt;PartialConfig&gt;;

const config: FullConfig = {
  host: "localhost",
  port: 3000,
  secure: true
}; // ✔ All fields required
  </code></pre>

  <p>
    Useful when you want to ensure all configuration fields are provided.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Makes all optional properties required.</li>
    <li>Inverse of <code>Partial&lt;T&gt;</code>.</li>
    <li>Uses mapped type modifier <code>-?</code> to enforce mandatory fields.</li>
    <li>Useful for enforcing complete objects like configs or API payloads.</li>
  </ul>
  `,
  63: `
  <h4>63. Readonly&lt;T&gt; in TypeScript</h4>

  <p>
    <code>Readonly&lt;T&gt;</code> is a built-in utility type that makes <b>all properties of an object immutable</b>.  
    Once assigned, the values cannot be changed.  
    It is useful for ensuring data safety and preventing accidental mutations.
  </p>

  <hr/>

  <h4>1. What Readonly&lt;T&gt; Does</h4>

  <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly&lt;User&gt;;
  </code></pre>

  <p>The properties of <code>ReadonlyUser</code> become:</p>

  <pre><code>
{
  readonly id: number;
  readonly name: string;
  readonly email: string;
}
  </code></pre>

  <p>
    You <b>cannot reassign</b> any of these properties.
  </p>

  <hr/>

  <h4>2. Attempting to Modify a Readonly Property</h4>

  <pre><code>
const user: ReadonlyUser = {
  id: 1,
  name: "Abhi",
  email: "a@b.com"
};

user.name = "Kumar"; 
// ❌ Error: Cannot assign to 'name' because it is a read-only property.
  </code></pre>

  <p>
    TypeScript prevents accidental modifications.
  </p>

  <hr/>

  <h4>3. How Readonly&lt;T&gt; Works Internally</h4>

  <pre><code>
type Readonly&lt;T&gt; = {
  [P in keyof T]: T[P];
};
  </code></pre>

  <p>
    It adds the <code>readonly</code> modifier to all properties of <code>T</code>.
  </p>

  <hr/>

  <h4>4. Real-World Use Case — Locking Configuration Objects</h4>

  <pre><code>
interface Config {
  url: string;
  timeout: number;
}

const config: Readonly&lt;Config&gt; = {
  url: "https://api.com",
  timeout: 5000
};

config.timeout = 10000; 
// ❌ Not allowed
  </code></pre>

  <p>
    Ensures your app’s config cannot be mutated at runtime.
  </p>

  <hr/>

  <h4>5. Readonly Works Only Shallowly</h4>

  <pre><code>
interface Nested {
  id: number;
  details: {
    active: boolean;
  };
}

const n: Readonly&lt;Nested&gt; = {
  id: 1,
  details: { active: true }
};

n.id = 2;              // ❌ Error
n.details.active = false; // ✔ Allowed (nested object is NOT readonly)
  </code></pre>

  <p>
    <b>Readonly&lt;T&gt; does NOT deeply freeze objects.</b>  
    For deep immutability, custom types are needed.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Readonly&lt;T&gt; makes all object properties immutable.</li>
    <li>Prevents accidental value changes.</li>
    <li>Works shallowly (nested objects remain mutable).</li>
    <li>Useful for constants, configurations, API responses, and DTOs.</li>
  </ul>
  `,
  64: `
  <h4>64. Record&lt;K, V&gt; in TypeScript</h4>

  <p>
    <code>Record&lt;K, V&gt;</code> is a utility type that lets you create an object type  
    where <b>keys are of type K</b> and <b>values are of type V</b>.  
    It is commonly used when you want to define a strict, predictable object structure.
  </p>

  <hr/>

  <h4>1. Basic Example</h4>

  <pre><code>
type Roles = "admin" | "user" | "guest";

type RoleStatus = Record&lt;Roles, boolean&gt;;

const status: RoleStatus = {
  admin: true,
  user: false,
  guest: true
};
  </code></pre>

  <p>
    Every key in the <code>Roles</code> union must appear in the object,  
    and all values must be <code>boolean</code>.
  </p>

  <hr/>

  <h4>2. Record with Number Keys</h4>

  <pre><code>
type IdMap = Record&lt;number, string&gt;;

const users: IdMap = {
  1: "Abhi",
  2: "Kumar"
};
  </code></pre>

  <p>
    Number keys get converted to string keys at runtime,  
    but TypeScript enforces the typing.
  </p>

  <hr/>

  <h4>3. Record with Complex Value Types</h4>

  <pre><code>
type User = {
  id: number;
  active: boolean;
};

type UserMap = Record&lt;string, User&gt;;

const data: UserMap = {
  a1: { id: 1, active: true },
  b2: { id: 2, active: false }
};
  </code></pre>

  <p>
    <code>Record</code> works well for dictionaries and lookup tables.
  </p>

  <hr/>

  <h4>4. Record vs Index Signature</h4>

  <pre><code>
// Using Record
type A = Record&lt;string, number&gt;;

// Using index signature
type B = { [key: string]: number };
  </code></pre>

  <p>
    Both are similar, but <code>Record</code> is more explicit and  
    works better with key unions.
  </p>

  <hr/>

  <h4>5. Enforcing Strict Key Sets</h4>

  <pre><code>
type Pages = "home" | "settings" | "profile";

type PageTitles = Record&lt;Pages, string&gt;;

const titles: PageTitles = {
  home: "Home Page",
  settings: "Settings Page",
  profile: "Profile Page"
};
  </code></pre>

  <p>
    Ensures no missing or extra keys are allowed.
  </p>

  <hr/>

  <h4>6. How Record&lt;K, V&gt; Works Internally</h4>

  <pre><code>
type Record&lt;K extends keyof any, V&gt; = {
  [P in K]: V;
};
  </code></pre>

  <p>
    It creates a mapped type where every key in <code>K</code> points to a value of type <code>V</code>.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Record&lt;K, V&gt; creates an object type with fixed keys and consistent value types.</li>
    <li>Useful for dictionaries, mappings, and lookup tables.</li>
    <li>Works perfectly with union types for strict key enforcement.</li>
    <li>Internally implemented as a mapped type.</li>
  </ul>
  `,
  65: `
  <h4>65. AutoComplete Literal Unions with Primitives in TypeScript</h4>

  <p>
    TypeScript provides strong autocomplete support when working with 
    <b>literal union types</b>.  
    This allows the editor to suggest valid string, number, or boolean literal values  
    and prevents invalid ones from being used.
  </p>

  <p>
    Literal union types help you create <b>restricted sets of allowed primitive values</b>,  
    enabling safer APIs, cleaner enums, and predictable configuration objects.
  </p>

  <hr/>

  <h4>1. Basic String Literal Union</h4>

  <pre><code>
type Theme = "light" | "dark" | "system";

let t: Theme;

t = "light";   // ✔ autocomplete shows: light | dark | system
t = "blue";    // ❌ Error
  </code></pre>

  <p>
    When assigning <code>t</code>, the editor shows allowed values automatically.
  </p>

  <hr/>

  <h4>2. Number Literal Union</h4>

  <pre><code>
type Port = 3000 | 4000 | 5000;

let p: Port;

p = 3000;  // ✔
p = 8080;  // ❌ Not part of union
  </code></pre>

  <p>
    Useful when only fixed numeric constants are allowed.
  </p>

  <hr/>

  <h4>3. Boolean Literal Union</h4>

  <pre><code>
type Flag = true | false;  // same as boolean but fully literal

let f: Flag = true;   // ✔
f = "yes";            // ❌
  </code></pre>

  <p>
    Normal <code>boolean</code> does NOT give autocomplete — literal unions do.
  </p>

  <hr/>

  <h4>4. Autocomplete with Function Parameters</h4>

  <pre><code>
function setMode(mode: "auto" | "manual" | "off") {
  console.log(mode);
}

setMode("auto");   // ✔ autocomplete shows all valid modes
setMode("xyz");    // ❌
  </code></pre>

  <p>
    Literal unions make APIs more discoverable.
  </p>

  <hr/>

  <h4>5. Using <code>as const</code> for Autocomplete Enforcement</h4>

  <pre><code>
const sizes = ["small", "medium", "large"] as const;

type Size = typeof sizes[number];

let s: Size;
s = "medium";   // ✔
s = "big";      // ❌
  </code></pre>

  <p>
    <code>as const</code> locks array elements as literal types.
  </p>

  <hr/>

  <h4>6. Dynamic Literal Union Using Objects</h4>

  <pre><code>
const Routes = {
  home: "/home",
  about: "/about",
  login: "/login"
} as const;

type Route = typeof Routes[keyof typeof Routes];

let r: Route;
r = "/login";   // ✔
r = "/unknown"; // ❌
  </code></pre>

  <p>
    Object values become a literal union automatically.
  </p>

  <hr/>

  <h4>7. When to Use Literal Unions?</h4>

  <ul>
    <li>Configuration options (theme, mode, sizes, filters)</li>
    <li>Strict API routes</li>
    <li>Event names</li>
    <li>Button variants in UI components</li>
    <li>Typed key/value mappings</li>
  </ul>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Literal unions give autocomplete for strings, numbers, and booleans.</li>
    <li>Used for strict sets of allowed values.</li>
    <li><code>as const</code> extracts literal types automatically.</li>
    <li>Improves API safety, readability, and prevents typos.</li>
  </ul>
  `,
  66: `
  <h4>66. Project References in TypeScript</h4>

  <p>
    <b>Project References</b> allow one TypeScript project to depend on another.  
    They help in creating <b>modular, scalable, and faster-building</b> codebases — especially useful for monorepos and large enterprise apps.
  </p>

  <p>
    With project references, TypeScript can <b>build only what changed</b> and reuse previous outputs, improving speed significantly.
  </p>

  <hr/>

  <h4>Why Use Project References?</h4>
  <ul>
    <li>Splits a large codebase into multiple smaller TS projects.</li>
    <li>Enables incremental builds (faster compilation).</li>
    <li>Creates clear dependency boundaries.</li>
    <li>Improves maintainability and structure.</li>
  </ul>

  <hr/>

  <h4>1. Creating Referenced Projects</h4>

  <p>
    Each referenced project must have its own <code>tsconfig.json</code> and <b>output folder</b>.
  </p>

  <pre><code>
// project structure
/core
  tsconfig.json
/utils
  tsconfig.json
/app
  tsconfig.json
  </code></pre>

  <hr/>

  <h4>2. Enabling <code>composite</code></h4>

  <p>
    A project must enable <code>"composite": true</code> to be referenced.
  </p>

  <pre><code>
// core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
  </code></pre>

  <hr/>

  <h4>3. Referencing Another Project</h4>

  <pre><code>
// app/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../core" },
    { "path": "../utils" }
  ]
}
  </code></pre>

  <p>
    This means the <code>app</code> project depends on <code>core</code> and <code>utils</code>.
  </p>

  <hr/>

  <h4>4. Building with References</h4>

  <pre><code>
tsc --build
// or
tsc -b
  </code></pre>

  <p>
    <code>--build</code> compiles in the correct order and uses incremental caching.
  </p>

  <hr/>

  <h4>5. Incremental Build Behavior</h4>

  <ul>
    <li>Only changed projects are rebuilt.</li>
    <li>Outputs of unchanged projects are reused.</li>
    <li>Dependencies are built before dependents.</li>
  </ul>

  <hr/>

  <h4>6. Cleaning</h4>

  <pre><code>
tsc -b --clean
  </code></pre>

  <p>
    Removes all built output from referenced projects.
  </p>

  <hr/>

  <h4>7. Example Usage</h4>

  <pre><code>
// core/src/math.ts
export function add(a: number, b: number) {
  return a + b;
}

// app/src/index.ts
import { add } from "../../core/dist/math";

console.log(add(2, 3));
  </code></pre>

  <p>
    The <code>app</code> project can now safely use compiled output from <code>core</code>.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Project References help organize large TypeScript systems.</li>
    <li>Require <code>"composite": true</code> in each referenced project.</li>
    <li>Use <code>tsc -b</code> for efficient incremental builds.</li>
    <li>Improve structure and build performance in monorepos.</li>
  </ul>
  `,
  67: `
  <h4>67. undefined vs optional in TypeScript</h4>

  <p>
    In TypeScript, <b>undefined</b> and <b>optional properties</b> look similar but behave differently.  
    Understanding the distinction is important for type-safety and API design.
  </p>

  <hr/>

  <h4>1. Optional Property (<code>?</code>)</h4>

  <p>
    An optional property means the property may be <b>missing entirely</b> from the object.
  </p>

  <pre><code>
interface User {
  name: string;
  age?: number;  // optional
}

let u1: User = { name: "Abhi" };          // ✔ age missing
let u2: User = { name: "Abhi", age: 25 }; // ✔
  </code></pre>

  <p>
    If a property is optional, TypeScript treats its type as:
    <b>(T | undefined)</b> but ALSO allows the property to be absent.
  </p>

  <hr/>

  <h4>2. Explicit <code>undefined</code> Property</h4>

  <p>
    A property typed as <code>undefined</code> must exist but may contain <code>undefined</code> value.
  </p>

  <pre><code>
interface User {
  name: string;
  age: number | undefined; // must exist
}

let u3: User = { name: "Abhi", age: undefined }; // ✔
let u4: User = { name: "Abhi" };                 // ❌ Error (age is required)
  </code></pre>

  <p>
    The property cannot be missing — it must appear, even if its value is <code>undefined</code>.
  </p>

  <hr/>

  <h4>3. Key Difference</h4>

  <table border="1" cellpadding="6">
    <tr>
      <th>Feature</th>
      <th>Optional ( age? )</th>
      <th>Undefined Type ( age: number | undefined )</th>
    </tr>
    <tr>
      <td>Property can be missing?</td>
      <td>✔ Yes</td>
      <td>❌ No</td>
    </tr>
    <tr>
      <td>Property value can be undefined?</td>
      <td>✔ Yes</td>
      <td>✔ Yes</td>
    </tr>
    <tr>
      <td>Must appear in object?</td>
      <td>❌ No</td>
      <td>✔ Yes</td>
    </tr>
  </table>

  <hr/>

  <h4>4. Optional becomes <code>T | undefined</code> automatically</h4>

  <pre><code>
interface User {
  age?: number;
}

type A = User["age"]; 
// A = number | undefined
  </code></pre>

  <p>
    Optional properties implicitly include <code>undefined</code>.
  </p>

  <hr/>

  <h4>5. Function Parameter Optional vs Undefined</h4>

  <pre><code>
function log1(x?: number) {}
log1();         // ✔ allowed
log1(undefined); // ✔ allowed

function log2(x: number | undefined) {}
log2();          // ❌ Error (argument missing)
log2(undefined); // ✔ allowed
  </code></pre>

  <p>
    Optional parameters may be omitted; <code>number | undefined</code> parameters cannot.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li><code>age?: number</code> → property may be missing.</li>
    <li><code>age: number | undefined</code> → property must exist.</li>
    <li>Optional automatically becomes <b>T | undefined</b>.</li>
    <li>Optional parameters can be omitted; <code>T | undefined</code> parameters cannot.</li>
  </ul>
  `,
  68: `
  <h4>68. <code>satisfies</code> Operator in TypeScript</h4>

  <p>
    The <b><code>satisfies</code></b> operator ensures that a value conforms to a specific type  
    <b>without widening</b> the actual inferred type.  
    It provides stronger type checking while preserving precise inference.
  </p>

  <hr/>

  <h4>1. Basic Example</h4>

  <pre><code>
type User = {
  name: string;
  age: number;
};

const u = {
  name: "Abhi",
  age: 25
} satisfies User;
  </code></pre>

  <p>
    <b>Meaning:</b> The object must match <code>User</code>,  
    but TypeScript keeps the exact types of <code>"Abhi"</code> and <code>25</code>.
  </p>

  <hr/>

  <h4>2. Difference Between <code>satisfies</code> and <code>as</code></h4>

  <pre><code>
// Using "as"
const person1 = {
  name: "Abhi",
  age: 25
} as User;

// Using "satisfies"
const person2 = {
  name: "Abhi",
  age: 25
} satisfies User;
  </code></pre>

  <ul>
    <li><code>as</code> performs a type assertion (you can force wrong types).</li>
    <li><code>satisfies</code> ensures the type is correct (no wrong types allowed).</li>
  </ul>

  <hr/>

  <h4>3. Preventing Excess Property Errors</h4>

  <pre><code>
type Config = {
  url: string;
  timeout?: number;
};

const cfg = {
  url: "api/test",
  timeout: 3000,
  extra: true
} satisfies Config;   // ❌ Error: "extra" not allowed
  </code></pre>

  <p>
    <code>satisfies</code> enforces strict checking — no extra properties allowed.
  </p>

  <hr/>

  <h4>4. Best Use Case: Narrowing + Constraints</h4>

  <pre><code>
type Sizes = "small" | "medium" | "large";

const btnSizes = {
  small: 12,
  medium: 16,
  large: 20
} satisfies Record&lt;Sizes, number&gt;;

// btnSizes.small → 12 (narrow type preserved)
  </code></pre>

  <p>
    Type stays accurate (<code>12 | 16 | 20</code>) instead of widening to <code>number</code>.
  </p>

  <hr/>

  <h4>5. Using with Unions</h4>

  <pre><code>
type Routes = "/home" | "/login";

const routes = {
  "/home": "Home Page",
  "/login": "Login Page"
} satisfies Record&lt;Routes, string&gt;;
  </code></pre>

  <p>
    Ensures all routes are covered with no missing or extra keys.
  </p>

  <hr/>

  <h4>Why <code>satisfies</code> is powerful?</h4>
  <ul>
    <li>Validates type shape without losing literal types.</li>
    <li>Stricter and safer than <code>as</code>.</li>
    <li>Allows full inference for object keys and values.</li>
    <li>Great for config objects, mappings, and enums.</li>
  </ul>
  `,
  69: `
  <h4>69. <code>PropertyKey</code> in TypeScript</h4>

  <p>
    <b><code>PropertyKey</code></b> is a built-in TypeScript type that represents all valid  
    JavaScript object property names.  
    It is a union of:
  </p>

  <pre><code>
type PropertyKey = string | number | symbol;
  </code></pre>

  <p>
    These three are the only possible types that can be used as object keys in JavaScript.
  </p>

  <hr/>

  <h4>1. Why <code>PropertyKey</code> Exists?</h4>

  <p>
    When writing generic utilities, you often want to say:
    “This type can be used as a key in an object.”
  </p>

  <p><code>PropertyKey</code> expresses exactly that.</p>

  <hr/>

  <h4>2. Basic Usage</h4>

  <pre><code>
function getValue(obj: Record&lt;PropertyKey, any&gt;, key: PropertyKey) {
  return obj[key];
}
  </code></pre>

  <p>
    This ensures the function can accept <b>string</b>, <b>number</b>, or <b>symbol</b> keys.
  </p>

  <hr/>

  <h4>3. Using <code>PropertyKey</code> in Generics</h4>

  <pre><code>
function pick&lt;K extends PropertyKey&gt;(obj: Record&lt;K, any&gt;, key: K) {
  return obj[key];
}
  </code></pre>

  <p>
    This keeps keys strongly typed and ensures only valid JS property names are allowed.
  </p>

  <hr/>

  <h4>4. Example: Strongly Typed Record</h4>

  <pre><code>
const obj: Record&lt;PropertyKey, string&gt; = {
  "name": "Abhi",
  100: "value",
  [Symbol("id")]: "secret"
};
  </code></pre>

  <p>
    All three valid key types work.
  </p>

  <hr/>

  <h4>5. Why Not Just Use <code>string</code>?</h4>

  <p>
    Because JavaScript objects can also have:
  </p>
  <ul>
    <li><b>number keys</b> (array-like objects)</li>
    <li><b>symbol keys</b> (private metadata)</li>
  </ul>

  <p>
    <code>PropertyKey</code> covers all cases.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li><code>PropertyKey</code> = <code>string | number | symbol</code>.</li>
    <li>Represents all valid JavaScript object property names.</li>
    <li>Useful in generics, utility types, and mapping functions.</li>
    <li>Helps build safer and more flexible APIs.</li>
  </ul>
  `,
  70: `
  <h4>70. <code>ThisType&lt;T&gt;</code> Utility in TypeScript</h4>

  <p>
    The <b><code>ThisType&lt;T&gt;</code></b> utility type is a special TypeScript feature that provides  
    <b>strong typing for <code>this</code> inside object literals</b>.  
    It is mainly used with <code>noImplicitThis</code> enabled, and becomes extremely powerful when  
    combined with object mixins.
  </p>

  <p>
    <b>Important:</b> <code>ThisType</code> does not create a real type.  
    Instead, it changes how TypeScript interprets <code>this</code> inside an object.
  </p>

  <hr/>

  <h4>1. Basic Example</h4>

  <pre><code>
type Obj = {
  x: number;
} & ThisType&lt;{ y: number }&gt;;

const obj: Obj = {
  x: 10,
  
  print() {
    console.log(this.y); // 'this' is typed as { y: number }
  }
};
  </code></pre>

  <p>
    The <code>this</code> inside <code>print()</code> now has type <code>{ y: number }</code>.
  </p>

  <hr/>

  <h4>2. Using <code>ThisType</code> in Mixins</h4>

  <pre><code>
type Mixin = {
  log(): void;
} & ThisType&lt;{ count: number }&gt;;

const mixin: Mixin = {
  log() {
    console.log(this.count);
  }
};
  </code></pre>

  <p>
    <code>this.count</code> becomes type-safe inside the mixin.
  </p>

  <hr/>

  <h4>3. Full Example: Creating a Fluent Object</h4>

  <pre><code>
type Methods = {
  inc(): void;
  log(): void;
} & ThisType&lt;{ value: number }&gt;;

const methods: Methods = {
  inc() {
    this.value++;
  },
  log() {
    console.log(this.value);
  }
};

const obj = {
  value: 1,
  ...methods
};

obj.inc();
obj.log();
  </code></pre>

  <p>
    <code>this.value</code> inside <code>inc()</code> and <code>log()</code> is properly typed.
  </p>

  <hr/>

  <h4>4. Important Notes</h4>
  <ul>
    <li><code>ThisType</code> only works inside object literals.</li>
    <li>It requires <code>noImplicitThis</code> to be <b>true</b>.</li>
    <li>It does not change runtime behavior — only TypeScript typing.</li>
    <li>Great for frameworks like Vue.js, which rely on <code>this</code>-based APIs.</li>
  </ul>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li><code>ThisType&lt;T&gt;</code> allows strong typing for <code>this</code> inside objects.</li>
    <li>Mainly used in mixins and framework-like patterns.</li>
    <li>Does not affect runtime — only improves static typing.</li>
    <li>Used with object literals and <code>noImplicitThis</code>.</li>
  </ul>
  `,
  71: `
  <h4>71. <code>Awaited&lt;T&gt;</code> Utility in TypeScript</h4>

  <p>
    The <b><code>Awaited&lt;T&gt;</code></b> utility type extracts the <b>resolved value type</b>  
    from a <code>Promise</code> or any <b>thenable</b> object.  
    It is used internally in TypeScript to accurately type <code>async/await</code>.
  </p>

  <p>
    It allows TypeScript to understand what value you get after using <code>await</code>.
  </p>

  <hr/>

  <h4>1. Basic Example</h4>

  <pre><code>
type P = Promise&lt;string&gt;;

type R = Awaited&lt;P&gt;;  
// R = string
  </code></pre>

  <p>
    <code>Awaited&lt;T&gt;</code> unwraps the promise and returns the final type.
  </p>

  <hr/>

  <h4>2. Nested Promises</h4>

  <pre><code>
type P = Promise&lt;Promise&lt;number&gt;&gt;;

type R = Awaited&lt;P&gt;;
// R = number
  </code></pre>

  <p>
    <code>Awaited</code> automatically unwraps <b>multiple layers</b>.
  </p>

  <hr/>

  <h4>3. Awaited Works with Thenables</h4>

  <pre><code>
type Thenable = {
  then: (cb: (n: number) =&gt; void) =&gt; void;
};

type R = Awaited&lt;Thenable&gt;;
// R = number
  </code></pre>

  <p>
    Any object with a <code>then</code> method behaves like a Promise and is supported.
  </p>

  <hr/>

  <h4>4. Real Example with Async Functions</h4>

  <pre><code>
async function fetchValue() {
  return 42;
}

type Result = Awaited&lt;ReturnType&lt;typeof fetchValue&gt;&gt;;
// Result = number
  </code></pre>

  <p>
    When combined with <code>ReturnType&lt;T&gt;</code>, it extracts the <b>actual awaited value</b>.
  </p>

  <hr/>

  <h4>5. Example with API Response</h4>

  <pre><code>
async function getUser() {
  return {
    id: 1,
    name: "Abhishek"
  };
}

type User = Awaited&lt;ReturnType&lt;typeof getUser&gt;&gt;;
// { id: number; name: string }
  </code></pre>

  <hr/>

  <h4>6. Why Use Awaited?</h4>
  <ul>
    <li>Accurately unwraps Promise types.</li>
    <li>Supports nested Promises.</li>
    <li>Works with thenables.</li>
    <li>Helps derive correct async return types.</li>
    <li>Used internally by TypeScript for <code>async/await</code> inference.</li>
  </ul>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li><code>Awaited&lt;T&gt;</code> extracts the final resolved value of a Promise.</li>
    <li>Handles deep nested Promises automatically.</li>
    <li>Useful with <code>ReturnType&lt;T&gt;</code> for async functions.</li>
    <li>Supports both Promises and thenables.</li>
  </ul>
  `,
  72: `
  <h4>72. String Manipulation Utility Types in TypeScript</h4>

  <p>
    TypeScript provides several built-in <b>string transformation utilities</b>  
    that allow you to manipulate string literal types at the type level.
  </p>

  <p>
    These utilities help create more expressive, type-safe APIs and patterns.
  </p>

  <hr/>

  <h4>1. <code>Uppercase&lt;T&gt;</code></h4>

  <pre><code>
type A = Uppercase<"hello">;
// "HELLO"
  </code></pre>

  <p>
    Converts all characters in a string literal type to upper case.
  </p>

  <hr/>

  <h4>2. <code>Lowercase&lt;T&gt;</code></h4>

  <pre><code>
type A = Lowercase<"HELLO">;
// "hello"
  </code></pre>

  <p>
    Converts all characters to lower case.
  </p>

  <hr/>

  <h4>3. <code>Capitalize&lt;T&gt;</code></h4>

  <pre><code>
type A = Capitalize<"typescript is awesome">;
// "Typescript is awesome"
  </code></pre>

  <p>
    Capitalizes the <b>first character</b> of a string.
  </p>

  <hr/>

  <h4>4. <code>Uncapitalize&lt;T&gt;</code></h4>

  <pre><code>
type A = Uncapitalize<"Hello World">;
// "hello World"
  </code></pre>

  <p>
    Converts the first letter to lower case.
  </p>

  <hr/>

  <h4>5. Combining Utilities</h4>

  <pre><code>
type A = Uppercase<Capitalize<"typescript">>;
// "TYPESCRIPT"
  </code></pre>

  <p>
    String utilities can be composed to form transformations.
  </p>

  <hr/>

  <h4>6. Template Literal Example</h4>

  <pre><code>
type EventName = \`on\${Capitalize<"click">}\`;
// "onClick"
  </code></pre>

  <p>
    These utilities work extremely well with template literal types.
  </p>

  <hr/>

  <h4>7. Real-World Example: API Route Names</h4>

  <pre><code>
type Method = "get" | "post";

type Route<M extends string> = \`\${Uppercase<M>}/user\`;

type R = Route<"get">;
// "GET/user"
  </code></pre>

  <p>
    Easily transform strings for typed routing systems.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>String utility types allow compile-time string transformations.</li>
    <li>Useful for template literal types and type-safe APIs.</li>
    <li>Includes <code>Uppercase</code>, <code>Lowercase</code>, <code>Capitalize</code>, <code>Uncapitalize</code>.</li>
    <li>Can be composed for more complex type-level string logic.</li>
  </ul>
  `,
  73: `
  <h4>73. Mapped Types as Clauses in TypeScript</h4>

  <p>
    <b>Mapped Types as Clauses</b> refers to using mapped types directly  
    inside other types — especially conditional types — as reusable  
    <b>"clauses"</b> to transform or filter object shapes.
  </p>

  <p>
    This pattern lets you build advanced type-level logic using  
    <b>key remapping</b>, <b>conditional key selection</b>,  
    and <b>mapped transformations</b>.
  </p>

  <hr/>

  <h4>1. Basic Clause-Style Mapped Type</h4>

  <pre><code>
type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
  </code></pre>

  <p>
    Here the mapped type acts as a reusable clause to transform any object  
    into an optional version.
  </p>

  <hr/>

  <h4>2. Using Clauses Inside Conditional Types</h4>

  <pre><code>
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
  </code></pre>

  <p>
    The mapped type filters keys using a conditional clause.  
    Only properties with <code>string</code> values remain.
  </p>

  <hr/>

  <h4>3. Example: Remove Functions</h4>

  <pre><code>
type RemoveFunctions<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
  </code></pre>

  <p>
    Uses a mapped type clause to exclude all function properties.
  </p>

  <hr/>

  <h4>4. Clauses with Template Literal Key Mapping</h4>

  <pre><code>
type AddPrefix<T> = {
  [K in keyof T as \`api_\${string & K}\`]: T[K];
};
  </code></pre>

  <p>
    A mapped clause produces new string-based keys.
  </p>

  <hr/>

  <h4>5. Clauses Inside Complex Conditional Logic</h4>

  <pre><code>
type Flatten<T> =
  T extends object
    ? { [K in keyof T]: T[K] }
    : T;
  </code></pre>

  <p>
    The mapped type acts as the <b>then-clause</b> of a conditional type.
  </p>

  <hr/>

  <h4>6. Real Example: Extract Readonly Keys</h4>

  <pre><code>
type ReadonlyKeys<T> = {
  [K in keyof T]-?: 
    (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends
    (<U>() => U extends { -readonly [P in K]: T[K] } ? 1 : 2)
      ? never 
      : K
}[keyof T];
  </code></pre>

  <p>
    Uses a mapped-type clause to compare readonly vs non-readonly behavior.
  </p>

  <hr/>

  <h4>7. Real Example: API Response Transformer</h4>

  <pre><code>
type SnakeCase<T> = {
  [K in keyof T as K extends string 
      ? \`\${Lowercase<K>}_res\` 
      : never]: T[K];
};

type API = {
  UserName: string;
  UserAge: number;
};

type Result = SnakeCase<API>;
// { username_res: string; userage_res: number }
  </code></pre>

  <p>
    Mapped clauses generate new keys using string manipulation utilities.
  </p>

  <hr/>

  <h4>Key Takeaways</h4>
  <ul>
    <li>Mapped types can act as powerful clauses inside conditional types.</li>
    <li>Allow filtering, remapping, and restructuring object types.</li>
    <li>Enable advanced type-level logic such as key removal and key transformation.</li>
    <li>Work seamlessly with <code>as</code> key remapping and template literal types.</li>
    <li>Essential for writing reusable, expressive utility types.</li>
  </ul>
  `,
  74: `
  <h4>74. TypeScript Unions vs Intersections — Mental Model</h4>

  <p>
    Understanding <b>Union</b> (<code>|</code>) and <b>Intersection</b> (<code>&</code>) types is critical in TypeScript.  
    They behave very differently, and the correct <b>mental model</b> helps avoid confusion.
  </p>

  <hr/>

  <h3>🔹 Union Types — “OR”</h3>

  <p>
    A <b>Union</b> type means the value can be <b>any one</b> of the given types.  
    Think of union as a <b>set of possibilities</b>.
  </p>

  <pre><code>
type A = { a: number };
type B = { b: string };

type U = A | B;
  </code></pre>

  <p>
    <code>U</code> can be <b>A</b> or <b>B</b>, but not required to have properties of both.
  </p>

  <p><b>Mental model:</b> Union = “at least one of these shapes.”</p>

  <hr/>

  <h4>Example: Union Behavior</h4>

  <pre><code>
let x: U;

x = { a: 10 };     // ✔ valid
x = { b: "hi" };   // ✔ valid
x = { a: 10, b: "hi" }; // ✔ also valid (contains both)
x = {};            // ❌ invalid
  </code></pre>

  <p>
    A union accepts any object that satisfies <b>at least one</b> member of the union.
  </p>

  <hr/>

  <h3>🔹 Intersection Types — “AND”</h3>

  <p>
    An <b>Intersection</b> type requires the value to satisfy <b>all</b> types.  
    Think of intersection as <b>merged requirements</b>.
  </p>

  <pre><code>
type I = A & B;
  </code></pre>

  <p><b>Mental model:</b> Intersection = “must contain everything from both.”</p>

  <hr/>

  <h4>Example: Intersection Behavior</h4>

  <pre><code>
let y: I;

y = { a: 10, b: "hi" }; // ✔ valid
y = { a: 10 };          // ❌ missing b
y = { b: "hi" };        // ❌ missing a
  </code></pre>

  <p>
    An intersection merges all members and requires every field.
  </p>

  <hr/>

  <h3>🔹 Visual Mental Model</h3>

  <h4>Union (OR)</h4>
  <pre><code>
[A] or [B]
Possible values = A | B
  </code></pre>

  <h4>Intersection (AND)</h4>
  <pre><code>
[A] + [B]
Merged into = A & B
  </code></pre>

  <hr/>

  <h3>🔹 Real-World Examples</h3>

  <h4>1. Union Example (API Response)</h4>
  <pre><code>
type Response =
  | { success: true; data: string }
  | { success: false; error: string };
  </code></pre>

  <p>A value must match at least one shape exactly.</p>

  <hr/>

  <h4>2. Intersection Example (Mixin/Composition)</h4>
  <pre><code>
type WithId = { id: number };
type WithName = { name: string };

type User = WithId & WithName;
// { id: number; name: string }
  </code></pre>

  <p>Used for combining behaviors or traits.</p>

  <hr/>

  <h3>🔹 Important Mental Notes</h3>

  <ul>
    <li><b>Union</b> WIDENS possibilities.</li>
    <li><b>Intersection</b> NARROWS to what satisfies all types.</li>
    <li>Union = flexibility.</li>
    <li>Intersection = strict combination.</li>
    <li>Union = “either.”</li>
    <li>Intersection = “both.”</li>
  </ul>

  <hr/>

  <h3>Key Takeaways</h3>

  <ul>
    <li>Union <code>|</code> = Accepts any one of multiple shapes.</li>
    <li>Intersection <code>&</code> = Requires all shapes at once.</li>
    <li>Use unions for input variability.</li>
    <li>Use intersections for composition/mixins.</li>
    <li>Union increases choices; intersection increases requirements.</li>
  </ul>
  `,
  75: `
  <h4>75. Why Many Developers Say “TypeScript Enums Are Bad”</h4>

  <p>
    TypeScript’s <b>Enums</b> look convenient, but they come with several serious drawbacks.  
    Modern TS developers often avoid them in favor of <b>union types</b> or <b>const objects</b>.
  </p>

  <hr/>

  <h4>1. Enums Emit JavaScript (Extra Runtime Code)</h4>

  <p>
    Unlike most TypeScript features, <b>Enums generate JavaScript</b> in the compiled output.
    This increases bundle size and adds unnecessary runtime complexity.
  </p>

  <pre><code>
// TS enum
enum Status {
  Success,
  Error
}

// JS output (~100 bytes for 2 values!)
var Status;
(function (Status) {
  Status[Status["Success"] = 0] = "Success";
  Status[Status["Error"] = 1] = "Error";
})(Status || (Status = {}));
  </code></pre>

  <p><b>Problem:</b> More JS → slower load times → unnecessary overhead.</p>

  <hr/>

  <h4>2. They Behave Weirdly with Reverse Mapping</h4>

  <p>Numeric enums create “reverse lookups” which cause unexpected behavior.</p>

  <pre><code>
enum Role {
  User = 1,
  Admin = 2
}

console.log(Role[1]); // "User" ❗
  </code></pre>

  <p>This rarely makes sense in real applications.</p>

  <hr/>

  <h4>3. Enums Break Tree-Shaking</h4>

  <p>
    Because enums produce runtime objects, bundlers like Webpack/Vite cannot remove unused enums.
  </p>

  <pre><code>
// Even if you never use this enum, it stays in JS output ⛔
enum X { A, B, C }
  </code></pre>

  <p>This increases bundle size for no benefit.</p>

  <hr/>

  <h4>4. They Don’t Work Well with Type Narrowing</h4>

  <p>Sometimes narrowing fails or becomes confusing due to enum runtime values.</p>

  <pre><code>
enum Status {
  Ok = "ok",
  Fail = "fail"
}

function log(s: Status) {
  if (s === "ok") { /* ❌ Error: "ok" is not Status */ }
}
  </code></pre>

  <p>The type system becomes messy.</p>

  <hr/>

  <h4>5. They Encourage Magic Numbers</h4>

  <pre><code>
enum Color {
  Red,   // 0
  Blue   // 1
}

Color.Red === 0; // ✔ works but unintuitive
  </code></pre>

  <p>
    Numeric enums silently behave like normal numbers, creating debugging confusion.
  </p>

  <hr/>

  <h4>6. Better Alternatives Exist</h4>

  <h4>✔ String Literal Unions (Most Recommended)</h4>
  <pre><code>
type Status = "success" | "error";
  </code></pre>

  <ul>
    <li>No JS output</li>
    <li>Fully tree-shakeable</li>
    <li>Best type inference</li>
    <li>Easier to read and maintain</li>
  </ul>

  <h4>✔ Const Objects (When You Need Values + Type)</h4>

  <pre><code>
const Status = {
  Success: "success",
  Error: "error"
} as const;

type Status = typeof Status[keyof typeof Status];
  </code></pre>

  <ul>
    <li>Zero JS bloat</li>
    <li>No reverse mapping</li>
    <li>Predictable and simple</li>
    <li>Works perfectly with autocomplete</li>
  </ul>

  <hr/>

  <h4>7. Summary: Why Enums Are Considered Bad</h4>

  <ul>
    <li>Emit unnecessary JavaScript</li>
    <li>Break tree-shaking</li>
    <li>Cause weird runtime behaviors</li>
    <li>Numeric enums create confusing reverse lookup</li>
    <li>Worse type narrowing</li>
    <li>Literal unions and const objects are cleaner and safer</li>
  </ul>

  <hr/>

  <h4>Key Takeaways</h4>

  <ul>
    <li>Prefer <b>union types</b> or <b>const objects</b> instead of enums.</li>
    <li>Enums add runtime cost and complicate debugging.</li>
    <li>Enums are one of the few TS features that output JS — avoid when possible.</li>
  </ul>
  `





















    };

    return topicContent;

}
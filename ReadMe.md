# Robus
Robus is a personal library built on top of ts-results and functional Object-Oriented Programming (OOP) principles, designed to enhance and simplify development in TypeScript. It includes a collection of utilities, React components, and helpers that make it easier to work with TypeScript in a FOOP.

Note: This library may contain breaking changes at times, so please use it with caution in production environments. If you're interested in contributing or adapting other libraries to this style, feel free to reach out! Contributions and feedback are always welcome.

# Installation
#### Example
```
bun install robus
```

#### Example Class Convension
```typescript
/// NOTE: Async constructors are allowed, and returning the result 
/// is also supported. This approach enhances type safety and 
/// flexibility by ensuring errors are handled explicitly through `Result`, 
/// enabling a more predictable flow and better error management.

type MyClassR = Result<MyClassT, MyClassE>;
type MyClassT = 
type MyClassE = 
    | TypeError
    | "ERR_SOMETHING_WENT_WRONG";
type MyClass = {
    name(): string;
};
async function MyClass(_name: string): Promise<MyClassR> {
    /** @constructor */ {
        if (/** */) return Err("ERR_SOMETHING_WENT_WRONG");
        return Ok({name});
    }

    function name(): string {
        return _string;
    }
}
```
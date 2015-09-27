# Redefine Properties
Merge multiple objects' properties into target by redefining properties using extracted property descriptors.

- Works with multiple sources.
- Copies all own properties including nonenumerable ones.
- Uses `Object.defineProperty` for all properties.
- In case of conflict the last source of a property wins.

*NB: Mutates the first argument!*

## Example
```javascript
var redefine = require('redefine-properties');

var source = {
  get a() {
    return 42;
  }
};
var target = {};

redefine(target, source);

target.a === 42;

```

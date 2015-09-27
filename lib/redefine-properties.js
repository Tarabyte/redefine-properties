var getPropertyNames = Object.getOwnPropertyNames,
  getDescriptor = Object.getOwnPropertyDescriptor,
  defineProperties = Object.defineProperties,
  slice = [].slice;

function collectDescriptors(cache, from) {
  return getPropertyNames(from).reduce(function(cache, name) {
    return cache[name] = getDescriptor(from, name), cache;
  }, cache);
}

module.exports = function redefineProperties(target, source1, source2, source3 /*... sourceN*/) {
  var sources, descriptor;
  if(!target) {
    throw new Error('Target is required.');
  }

  //extract sources
  switch(arguments.length) {
    case 1: throw new Error('Atleast one source object is required.');
    case 2: sources = [source1]; break;
    case 3: sources = [source1, source2]; break;
    case 4: sources = [source1, source2, source3]; break;
    default: sources = slice.call(arguments, 1);
  }

  //collect all fields to a single descriptor
  descriptor = sources.reduce(collectDescriptors, {});

  //define all properies at once
  defineProperties(target, descriptor);

  return target;
};
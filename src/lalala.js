var chunks = function(array, size) {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
};

const getSequence = (n, _r = 3.68, _p = 0.1) => {
  var p = _p;
  var r = _r;

  function myRandom() {
    p = r * p * (1 - p);
    return p;
  }

  return Array(n)
    .fill()
    .map(myRandom);
};
const stringToBinarySequence = input =>
  input
    .split("")
    .map(el => el.charCodeAt(0).toString(2))
    .map(bin => {
      const symbolSize = 8;
      const diff = Array(symbolSize - bin.toString().length).fill(0);

      return [...diff, ...bin].join("");
    })
    .reduce((acc, el) => [...acc, ...el.split("")], []);

// input - chanked by 8 bits array
const chankedSequenceToString = input => {
  const decimals = input.map(chunk => parseInt(chunk.join(""), 2));
  return decimals.map(n => String.fromCharCode(n)).join("");
};

const toBin = val => (val < 0.5 ? 0 : 1);

const xorSequences = (s1, s2) => {
  if (s1.length !== s2.length) throw new Error("Sequences should have same length");

  return Array(s1.length)
    .fill()
    .map((_, i) => s1[i] ^ s2[i]);
};

const encrypt = (input, rValue) => {
  const binaryInputString = stringToBinarySequence(input);
  const binaryArray = getSequence(binaryInputString.length, rValue).map(toBin);
  const encrypted = xorSequences(binaryInputString, binaryArray);
  return encrypted.join();
};
const binaryStringTOBinaryArray = input => {
  return Array(input.length / 8)
    .fill()
    .map((_, i) => input.slice(8 * i, 8 * i + 8));
};

const decode = (input, rValue) => {
  const binaryInputString = input.split(",");
  const binaryArray = getSequence(binaryInputString.length, rValue).map(toBin);
  const encrypted = xorSequences(binaryInputString.join(""), binaryArray);
  const byteArray = binaryStringTOBinaryArray(encrypted);
  return chankedSequenceToString(byteArray);
};

export default { encrypt, decode };

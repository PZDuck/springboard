function unroll(squareArray, out = []) {
  // "Pythonic" way, doesn't work since modulus division for negative numbers works differently in JS

  // const out = [];

  // let i = 0;
  // let j = 0;
  // let nextI = 0;
  // let nextJ = 1;

  // for (let k = 0; k <= squareArray.length * squareArray.length; k++) {
  //   out.push(squareArray[i][j]);
  //   squareArray[i][j] = "X";
  //   console.log(
  //     (i + nextI) % squareArray.length,
  //     (j + nextJ) % squareArray.length
  //   );

  //   if (
  //     squareArray[(i + nextI) % squareArray.length][
  //       (j + nextJ) % squareArray.length
  //     ] === "X"
  //   ) {
  //     [nextI, nextJ] = [nextJ, -nextI];
  //   }

  //   i += nextI;
  //   j += nextJ;
  // }

  /** We get the first row and the last column, then we rotate the matrix */

  if (squareArray.length && squareArray[0].length) {
    squareArray[0].forEach((num) => out.push(num));
    squareArray.shift();
    squareArray.forEach((row) => out.push(row.pop()));
    unroll(reverse(squareArray), out);
  }
  return out;
}

function reverse(matrix) {
  matrix.forEach((row) => row.reverse());
  matrix.reverse();
  return matrix;
}

console.log(
  unroll([
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ])
);

module.exports = unroll;

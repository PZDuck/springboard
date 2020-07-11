function addCommas(num) {
  // get num's absolute value to work with it further
  let n = Math.abs(num);

  // convert original num to string and check whether it is negative or not
  num = num.toString();
  const isNegative = num[0] === "-";

  // create an array out of the number and additional array to keep track
  // of indexes we will need to insert a comma to
  const out = num.split("");
  const idxs = [];

  if (out[0] === "-") out.shift();

  while (true) {
    n = Math.floor(n / 1000);
    if (n > 0) {
      // mathematical way of getting the length of the number
      idxs.push(Math.ceil(Math.log10(n + 1)));
    } else {
      break;
    }
  }
  for (let idx of idxs) {
    out.splice(idx, 0, ",");
  }

  if (isNegative) out.splice(0, 0, "-");

  return out.join("");
}

addCommas(1234);
addCommas(1000000);
addCommas(9876543210);
addCommas(6);
addCommas(-10);
addCommas(-5678);
addCommas(12345.678);
addCommas(-3141592.65);
/**
 * 1234 = 1,234
 * 1000000 = 1,000,000
 * 8989898989 = 8,989,898,989
 */

module.exports = addCommas;

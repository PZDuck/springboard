const unroll = require("./unroll");

describe("#unroll", function () {
  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("should return correct values", function () {
    expect(
      unroll([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
      ])
    ).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"]);

    expect(
      unroll([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ])
    ).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });
});

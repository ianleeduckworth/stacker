import * as React from "react";

const getNewPieces = (
  currentFirst: number,
  currentLast: number,
  previousFirst: number,
  previousLast: number
): number => {
  const currentPieces = currentLast - currentFirst + 1;

  const leftOverhang = Math.max(0, previousFirst - currentFirst);
  const rightOverhang = Math.max(0, currentLast - previousLast);

  return currentPieces - Math.abs(leftOverhang - rightOverhang);
};

describe("Board", () => {
  it("getPieces works when the piece goes over the right side", () => {
    const currentFirst = 4;
    const currentLast = 8;
    const previousFirst = 2;
    const previousLast = 7;

    const result = getNewPieces(
      currentFirst,
      currentLast,
      previousFirst,
      previousLast
    );

    expect(result).toBe(5);
  });

  it("getPieces works when the pieces sit right on top of each other", () => {
    const currentFirst = 3;
    const currentLast = 8;
    const previousFirst = 3;
    const previousLast = 8;

    const result = getNewPieces(
      currentFirst,
      currentLast,
      previousFirst,
      previousLast
    );

    expect(result).toBe(6);
  });

  it("getPieces works with the piece goes over to the left side", () => {
    const currentFirst = 2;
    const currentLast = 7;
    const previousFirst = 3;
    const previousLast = 8;

    const result = getNewPieces(
      currentFirst,
      currentLast,
      previousFirst,
      previousLast
    );

    expect(result).toBe(5);
  });
});

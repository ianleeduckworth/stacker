export const buildEmptyGameBoard = () => {
  let emptyBoard = [
    [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  ];

  for (let i = 0; i < 11; i++) {
    emptyBoard.push([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  }

  return emptyBoard;
};

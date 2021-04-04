const solveMathProblem = (inputString) => {
  let inputArry = inputString.split(" ");

  let leftNumber;
  let rightNumber;
  let onlyPlusOrMinus = [];
  let i = 0;
  while (i < inputArry.length) {
    if (inputArry[i] === "*") {
      leftNumber = onlyPlusOrMinus.slice(-1);

      if (inputArry[i + 1] === "-") {
        rightNumber = inputArry[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = inputArry[i + 1];
        i += 2;
      }

      onlyPlusOrMinus.splice(-1, 1, leftNumber * rightNumber);
    } else if (inputArry[i] === "/") {
      leftNumber = onlyPlusOrMinus.slice(-1);

      if (inputArry[i + 1] === "-") {
        rightNumber = inputArry[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = inputArry[i + 1];
        i += 2;
      }

      onlyPlusOrMinus.splice(-1, 1, leftNumber / rightNumber);
    } else {
      onlyPlusOrMinus.push(inputArry[i]);
      i += 1;
    }
  }
  let solution = onlyPlusOrMinus[0];
  i = 1;
  while (i < onlyPlusOrMinus.length) {
    if (onlyPlusOrMinus[i] === "+") {
      leftNumber = solution;

      if (onlyPlusOrMinus[i + 1] === "-") {
        rightNumber = onlyPlusOrMinus[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = onlyPlusOrMinus[i + 1];
        i += 2;
      }
      solution = +leftNumber + +rightNumber;
    } else if (onlyPlusOrMinus[i] === "-") {
      leftNumber = solution;

      if (onlyPlusOrMinus[i + 1] === "-") {
        rightNumber = onlyPlusOrMinus[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = onlyPlusOrMinus[i + 1];
        i += 2;
      }
      solution = +leftNumber - +rightNumber;
    }
  }

  return solution;
};

export default solveMathProblem;

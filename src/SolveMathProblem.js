const solveMathProblem = (inputString) => {
  /* To solve the problem we will loop over the string two times. this will allow
    for proper order of operations. First loop we will perform any multiplication or
    division. Second loop over will perform and addition or subtraction. 
  */
  const operatorRegex = new RegExp("[-*+/]");

  // First split the input on spaces. resulting array will hold only
  // entered numbers, and operators.
  let inputArray = inputString.split(" ");

  // if the final element of the inputArray is an operator, drop it from the array.
  if (operatorRegex.test(inputArray.slice(-1)[0])) {
    inputArray = inputArray.slice(0, -1);
  }

  let leftNumber;
  let rightNumber;
  let onlyPlusOrMinus = []; // will hold calculation after '*' and '/' have been computed
  let i = 0;

  while (i < inputArray.length) {
    // if we encounter a '*' we need to take the last number we saw, and multiply
    // it by the next number in the array.
    if (inputArray[i] === "*") {
      leftNumber = onlyPlusOrMinus.slice(-1); // get last seen number

      // conditional to allow for the presence of a negating operator.
      if (inputArray[i + 1] === "-") {
        rightNumber = inputArray[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = inputArray[i + 1];
        i += 2;
      }

      // once we have leftNumber and RigthNumber we can overwrite the end of onlyPlusOrMinus
      // with the resulting multiplication.
      onlyPlusOrMinus.splice(-1, 1, leftNumber * rightNumber);
    } else if (inputArray[i] === "/") {
      // Uses same logic as above only divdes the resulting leftNumber and rightNumber
      leftNumber = onlyPlusOrMinus.slice(-1);
      if (inputArray[i + 1] === "-") {
        rightNumber = inputArray[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = inputArray[i + 1];
        i += 2;
      }
      onlyPlusOrMinus.splice(-1, 1, leftNumber / rightNumber);
    } else {
      // if the element isn't a '*' or '/' we simlpy push it to onlyPlusOrMinus. This
      // indicates the element is either a number, a '+' or a '-'
      onlyPlusOrMinus.push(inputArray[i]);
      i += 1;
    }
  }
  // assign solution to the first element of onlyPlusOrMinus
  let solution = onlyPlusOrMinus[0];
  i = 1;

  while (i < onlyPlusOrMinus.length) {
    // simillar logic as above. loop over onlyPlusOrMinus.
    // If encounter a '+' add the next number to solution.
    // continuing to look ahead to check for negative operators wihich will function
    // as negation of the next number.
    if (onlyPlusOrMinus[i] === "+") {
      leftNumber = solution;

      if (onlyPlusOrMinus[i + 1] === "-") {
        rightNumber = onlyPlusOrMinus[i + 2] * -1;
        i += 3;
      } else {
        rightNumber = onlyPlusOrMinus[i + 1];
        i += 2;
      }
      // Use the '+' to handle the string to number conversion.
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
  // at this point solution will house the result of the calculation, and we can
  // return it to be displayed on the #display component.
  return solution;
};

export default solveMathProblem;

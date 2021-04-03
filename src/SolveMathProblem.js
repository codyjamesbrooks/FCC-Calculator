const solveMathProblem = (inputString) => {
  const operatorRegex = "[+*/]";
  let inputedComputation = inputString.split(" ");
  // Remove any operators in a row, convert strings into numbers '-' into negative numbers
  let removedExtraOperators = [];
  for (let i = 0; i < inputedComputation.length; i++) {
    if (operatorRegex.test(inputedComputation[i])) {
      // look at the end of removedExtraOperators. If the end is an operator we can overwrite it
      operatorRegex.test(removedExtraOperators.slice(-1))
        ? removedExtraOperators.splice(-1, 1, inputedComputation[i])
        : removedExtraOperators.push(inputedComputation[i]);
    } else if (inputedComputation[i] === "-") {
    } else {
      removedExtraOperators.push(+inputedComputation[i]);
    }
  }
};

export default solveMathProblem;

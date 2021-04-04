import React from "react";
import "./App.css";

import solveMathProblem from "./SolveMathProblem.js";

// Regex used to manage user inputs
const operatorRegex = new RegExp("[-*+/]$");
const negativeComputationRegex = new RegExp("[-*+/] -");

class App extends React.Component {
  constructor(props) {
    super(props);
    /* State Variables: 
      1. input will hold the user inputed string.
      2. output will hold the result of a user calculation. Resets at every new calculation. 
    */
    this.state = {
      input: "",
      output: 0,
    };

    // Button click function bindings
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handleZeroClick = this.handleZeroClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
  }

  handleEqualClick() {
    // call function solveMathProblem on the input string. Update state variables accordingly
    let answer = solveMathProblem(this.state.input);
    this.setState({
      input: "",
      output: answer,
    });
  }

  handleClearClick() {
    // Reset state variables back to default state.
    this.setState({
      input: "",
      output: 0,
    });
  }

  handleZeroClick() {
    /* Use Regex to check and see if the last entered element was an operator. 
      if so add in a space for padding and a zero
      if it isn't, a zero will be appended to the input provided that the last entered element
        doesn't equal '0'. This will prevent a number from starting with multiple zeros. 
    */
    let lastEntered = this.state.input.split(" ").slice(-1)[0];
    if (operatorRegex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + " 0",
        output: 0,
      }));
    } else if (lastEntered !== "0") {
      this.setState((state) => ({
        input: state.input + "0",
        output: 0,
      }));
    }
  }

  handleDecimalClick() {
    /* Use Regex to check and see if the last entered element was an operator. 
      if so add in a space for padding and a '0.'
      if not, and input is totall empty, we can add '0.' to input. 
      if input isn't empty, we need to determine if the last entered element already has a decimal. 
        so we split the laste entered element on '.' and then measure the lenght of the resulting array. 
        if it is less then or equal to 1, the number doensn't have a decimal, so we can append one to input. 
      We also can clear the output.
      */
    let lastEntered = this.state.input.split(" ").slice(-1)[0];
    if (operatorRegex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + " 0.",
        output: 0,
      }));
    } else if (this.state.input === "") {
      this.setState({ input: "0.", output: 0 });
    } else if (lastEntered.split(".").length <= 1) {
      this.setState((state) => ({
        input: state.input + ".",
        output: 0,
      }));
    }
  }

  handleNumberClick(number) {
    /* Use Regex to check and see if the last entered element was an operator. 
      if so add in a space for padding and the number that the user clicked. 
      if not we can simply add the number to the input string. 
      in both cases we can clear the output, becuase we are starting a new calculation.
    */
    operatorRegex.test(this.state.input)
      ? this.setState((state) => ({
          input: state.input + " " + number,
          output: 0,
        }))
      : this.setState((state) => ({
          input: state.input + number,
          output: 0,
        }));
  }

  handleOperatorClick(operator) {
    /* if the state.output has a value, we will transfer that to input and 
      then append the entered operator to the input. 

      if not, we need to look at the end of the input string. if it alreay has 
      an operator, we can overwrite the operator, this will handle multiple 
      operators inputs in a row.

      if the end of input is not a operator, we simply append the entered operator onto the 
      end of input with a space for padding. 

      note that the minus operator is handled in its own function. This will allow for the
      negation of numbers. But if a minus is entered, and then followed by a different 
      operator, the minus will be overwritten.
    */
    let endOfInput = this.state.input.slice(-1);
    if (this.state.output !== 0) {
      this.setState((state) => ({
        input: state.output + " " + operator,
        output: 0,
      }));
    } else if (operatorRegex.test(endOfInput)) {
      this.setState((state) => ({
        input: state.input.replace(/[-+* /]*$/, ` ${operator}`),
      }));
    } else {
      this.setState((state) => ({
        input: state.input + " " + operator,
      }));
    }
  }

  handleMinusClick() {
    /* if the state.output has a value, we will transfer that to input and 
      then append the minus operator to the input. 

      if not we will look at the last three entered input elements. We will append a 
      minus onto the input provided that the end of the input doesn't already contain
      an operator and a minus. This will allow for negative numbers, but will prevent
      the user from entering a repeating string of negative operators. 
    */
    let endOfInput = this.state.input.slice(-3);
    if (this.state.output !== 0) {
      this.setState((state) => ({
        input: state.output + " -",
        output: 0,
      }));
    } else if (negativeComputationRegex.test(endOfInput) === false) {
      this.setState((state) => ({
        input: state.input + " -",
      }));
    }
  }

  render() {
    return (
      <div id="calculator-body">
        <div id="outer-display-container">
          <div id="inner-display-container">
            <label id="display">
              {this.state.input === "" ? this.state.output : this.state.input}
            </label>
          </div>
        </div>
        <button id="clear" onClick={this.handleClearClick}>
          Clear
        </button>
        <button id="equals" onClick={this.handleEqualClick}>
          =
        </button>
        <button
          id="divide"
          onClick={(operator) => this.handleOperatorClick("/")}
        >
          ÷
        </button>

        <button
          id="multiply"
          onClick={(operator) => this.handleOperatorClick("*")}
        >
          ×
        </button>
        <button id="add" onClick={(operator) => this.handleOperatorClick("+")}>
          +
        </button>
        <button id="subtract" onClick={this.handleMinusClick}>
          -
        </button>
        <button id="decimal" onClick={this.handleDecimalClick}>
          .
        </button>
        <button id="nine" onClick={(number) => this.handleNumberClick(9)}>
          9
        </button>
        <button id="eight" onClick={(number) => this.handleNumberClick(8)}>
          8
        </button>
        <button id="seven" onClick={(number) => this.handleNumberClick(7)}>
          7
        </button>
        <button id="six" onClick={(number) => this.handleNumberClick(6)}>
          6
        </button>
        <button id="five" onClick={(number) => this.handleNumberClick(5)}>
          5
        </button>
        <button id="four" onClick={(number) => this.handleNumberClick(4)}>
          4
        </button>
        <button id="three" onClick={(number) => this.handleNumberClick(3)}>
          3
        </button>
        <button id="two" onClick={(number) => this.handleNumberClick(2)}>
          2
        </button>
        <button id="one" onClick={(number) => this.handleNumberClick(1)}>
          1
        </button>
        <button id="zero" onClick={this.handleZeroClick}>
          0
        </button>
      </div>
    );
  }
}

export default App;

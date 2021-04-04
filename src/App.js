import React from "react";
import "./App.css";

import solveMathProblem from "./SolveMathProblem.js";

const operatorRegex = new RegExp("[-*+/]$");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: 0,
    };
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handleZeroClick = this.handleZeroClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
  }

  handleEqualClick() {
    let answer = solveMathProblem(this.state.input);
    this.setState({
      input: "",
      output: answer,
    });
  }

  handleClearClick() {
    // Clear all values held in state.
    this.setState({
      input: "",
      output: 0,
    });
  }

  handleZeroClick() {
    let lastEntered = this.state.input.split(" ").slice(-1)[0];
    const zeroStartEndRegEx = new RegExp("^0$");
    if (operatorRegex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + " 0",
        output: 0,
      }));
    } else if (zeroStartEndRegEx.test(lastEntered) === false) {
      this.setState((state) => ({
        input: state.input + "0",
      }));
    }
  }

  handleDecimalClick() {
    let lastEntered = this.state.input.split(" ").slice(-1)[0];
    if (operatorRegex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + " 0.",
      }));
    } else if (this.state.input === "") {
      this.setState({ input: "0." });
    } else if (lastEntered.split(".").length <= 1) {
      this.setState((state) => ({
        input: state.input + ".",
      }));
    }
  }

  handleNumberClick(number) {
    /* Add the number on to the end of the input String. if the end of
    the input string is an opperator add in a space */
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
    /* Append the clicked operator onto the end of the input string. 
    adding one spaced padding around any operator. conditionally the end of input
    is already an operator we will overwitte said operator with a new one. */
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
    // For minus we will simply add a minus onto the end of the input.
    let endOfInput = this.state.input.slice(-3);
    if (this.state.output !== 0) {
      this.setState((state) => ({
        input: state.output + " -",
        output: 0,
      }));
    } else if (endOfInput !== "- -") {
      this.setState((state) => ({
        input: state.input + " -",
      }));
    }
  }

  render() {
    return (
      <div id="calculator-body">
        <label id="display">
          {this.state.input === "" ? this.state.output : this.state.input}
        </label>
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
          /
        </button>
        <button
          id="multiply"
          onClick={(operator) => this.handleOperatorClick("*")}
        >
          *
        </button>
        <button id="add" onClick={(operator) => this.handleOperatorClick("+")}>
          +
        </button>
        <button id="minus" onClick={this.handleMinusClick}>
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

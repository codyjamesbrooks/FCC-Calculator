import React from "react";
import "./App.css";

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
  }

  handleClearClick() {
    // Clear all values held in state.
    this.setState({
      input: "",
      output: 0,
    });
  }

  handleNumberClick(number) {
    /* Add the number on to the end of the input String. if the end of
    the input string is an opperator add in a space */
    const operatorRegex = new RegExp("[-*+/]$");
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
    adding one spaced padding around any operator. conditionally if there is a value in 
    output, and input is empty */
    if (this.state.output !== 0) {
      this.setState((state) => ({
        input: state.output + " " + operator,
        output: 0,
      }));
    } else {
      this.setState((state) => ({
        input: state.input + " " + operator,
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
        <button id="equals">=</button>

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
        <button
          id="minus"
          onClick={(operator) => this.handleOperatorClick("-")}
        >
          -
        </button>

        <button id="decimal">.</button>

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
        <button id="zero">0</button>
      </div>
    );
  }
}

export default App;

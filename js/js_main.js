const previousOperationText = document.querySelector("#previous_operation");
const currentOperationText = document.querySelector("#current_operation");
const buttons = document.querySelectorAll("#buttons_container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Add digit to calculator screen
  addDigit(digit) {
    console.log(digit);
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // process all calculator operations
  processOperation(operation) {
    // Check if current is empty

    if(this.currentOperationText.innerText === "" && operation !== "C"){
      // Change operation
      if(this.previousOperationText.innerText !== ""){
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous values
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      // Math operation
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;        
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;        
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;        
         
      case "DEL":
        this.processDelOperation();
        break;     
      case "CE":
        this.processClearCurrentOperation();
        break;     
      case "C":
        this.processClearAllOperation();
        break;     
      case "=":
        this.processEqualOperation();
        break;     

      default:
        return;
    }
  }

  // Delet the lest digit
  processDelOperation(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }
  // Clear current operation
  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  // Clear all operations
  processClearAllOperation(){
    this.previousOperationText.innerText = "";
    this.currentOperationText.innerText = "";
  }

  // Process all operation
  processEqualOperation(){
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }

  // Change values of calculator screen
  updateScreen(
    operationValue = null, operation = null, current = null, previous = null ) {
      if (operationValue === null) {
        // Append number to current value
        this.currentOperationText.innerText += this.currentOperation;
      } else {
        // Check if value is zero, if is just add current value
        if (previous === 0) {
          operationValue = current;
        }
        // Add current value to previous
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
    }
  }

  // Change math operation
  changeOperation(operation){
    const mathOperation = ["+", "-", "*", "/"]

    if(!mathOperation.includes(operation)){
      return
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

function fechar(){
  document.getElementById("previous_operation").innerHTML = "";
  document.getElementById("current_operation").innerHTML = "";
  document.getElementById("calc").style.display = "none";
  document.getElementById("calc_icon").style.display = "block";
}

function abrir(){
  document.getElementById("calc").style.display = "block";
  document.getElementById("calc_icon").style.display = "none";
}
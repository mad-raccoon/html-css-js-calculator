let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".calc-screen");
document.querySelector(".calc-buttons").addEventListener("click", function (e) {
  buttonClick(e.target.innerText);
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}
function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    default:
      handleMath(value);
      break;
  }
  rerender();
}
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(value) {
  if (previousOperator === "+") {
    runningTotal += value;
  } else if (previousOperator === "-") {
    runningTotal += value;
  } else if (previousOperator === "×") {
    runningTotal *= value;
  } else if (previousOperator === "÷") {
    runningTotal /= value;
  }
}

function rerender() {
  screen.innerHTML = buffer;
}

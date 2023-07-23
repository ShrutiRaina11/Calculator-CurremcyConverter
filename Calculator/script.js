// Get the elements
const cal = document.getElementById('Cal');
const exg = document.getElementById('Exg');

cal.addEventListener("click",function handleClcick(){
  document.getElementById("exgRate").style.display = "none";
  document.getElementById("calculator").style.display = "grid";
})

exg.addEventListener("click",function handleClcick(){
  document.getElementById("calculator").style.display = "none";
  document.getElementById("exgRate").style.display = "grid";
})

// Get the display element
const display = document.getElementById('display');

// Function to update the display
function updateDisplay(value) {
  display.value += value;
}

// Function to clear the display
function clearDisplay() {
  display.value = '';
}

function deleteLastChar() {
  let result = document.getElementById('display').value;
  result = result.slice(0, -1);
  display.value = result;
}

// Function to calculate the result
function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

function calculatePercent(){
  try{
    let result = document.getElementById('display').value;
    let percent = parseFloat(result)
    percent /= 100
    display.value = percent
  } catch (error) {
    display.value = 'Error';
  }
}

// Add event listeners to the buttons
const buttons = document.querySelectorAll(".btnCal");
console.log(buttons)
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    if (buttonText === '=') {
      calculateResult();
    } else if (buttonText === 'C') {
      clearDisplay();
    } else if (buttonText === 'CE') {
      deleteLastChar()
    } else if (buttonText === '%') {
      calculatePercent()
    } else {
      updateDisplay(buttonText);
    }
  });
});

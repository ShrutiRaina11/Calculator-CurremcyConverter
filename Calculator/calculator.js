// Code for Calculator

// Get the Calculator body element
const cal = document.getElementById('Cal');

cal.addEventListener("click",function handleClcick(){
  document.getElementById("exgRate").style.display = "none";
  document.getElementById("calculator").style.display = "grid";
})

// Get the display element
const display = document.getElementById('display');

// Function to update the display
function updateCalDisplay(value) {
  console.log("control is here")
  console.log(value)
  display.value += value;
  console.log(display.value)
}

// Function to clear the display
function clearCalDisplay() {
  display.value = '';
}

// Function to delete the last Character
function deleteCalLastChar() {
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

// Function To calculate the percentage
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

// Add event listeners to the calculator buttons
const buttonsCal = document.querySelectorAll(".btnCal");
// console.log(buttonsCal)
buttonsCal.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    if (buttonText === '=') {
      calculateResult();
    } 
    else if (buttonText === 'C') {
      clearCalDisplay();
    } 
    else if (buttonText === 'DEL') {
      deleteCalLastChar()
    } 
    else if (buttonText === '%') {
      calculatePercent()
    } 
    else {
      console.log(buttonText);
      updateCalDisplay(buttonText);
    }
  });
});
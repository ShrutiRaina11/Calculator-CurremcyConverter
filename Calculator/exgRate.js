// Code for Exchange Rate

// API key
const API_KEY = "nd968YCiiPnZvfmW238D23OPumiZq0DH"

// Function For loading dropdowns with currencies list
const loadCurrencyData = async()=>{
  let headers = new Headers();
  headers.append("apikey", API_KEY)

  const requestOptions = {
      method: "GET", // put post delete 
      redirect: 'follow',
      headers, 
  }
  try{
    let response = await  fetch("https://api.apilayer.com/exchangerates_data/symbols&limit=10", requestOptions)
    const {symbols} = await response.json();
    const selectFrom = document.getElementById("firstCur")
    const selectTo = document.getElementById("secondCur")
    for(const symb in symbols){
        var optionFrom = document.createElement("option");
        optionFrom.text = symbols[symb];
        optionFrom.value = symb;
        var optionTo = document.createElement("option");
        optionTo.text = symbols[symb];
        optionTo.value = symb;
        if(symb == "INR"){
            selectFrom.add(optionFrom, selectFrom[0]);
            selectTo.add(optionTo);
        }
        else if(symb == "USD"){
            selectTo.add(optionTo, selectTo[0]);
            selectFrom.add(optionFrom);
        }
        else{
            selectFrom.add(optionFrom);
            selectTo.add(optionTo);
        }
    }
    selectFrom.selectedIndex = 0;
    selectTo.selectedIndex = 0;
    // console.log("end of function")
  }catch(error){
    console.log(error)
  }finally{
    // console.log("finally block")
  }
}

// Get the Exchange Rate body element
const exg = document.getElementById('Exg');

exg.addEventListener("click",function handleClcick(){
  document.getElementById("calculator").style.display = "none";
  document.getElementById("exgRate").style.display = "block";
  loadCurrencyData();
})

// Function for Converting Currency
const convertCurrency = async(amount,from,to,display)=>{

  let headers = new Headers();
  headers.append("apikey", API_KEY)

  const requestOptions = {
    method: "GET", // put post delete
    redirect: 'follow',
    headers, 
  }

  try{
    let response = await  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.valueAsNumber}`, requestOptions)
    let {result} = await response.json();
    display.value = result.toFixed(2)
    // console.log("end of function2")
  }catch(error){
    console.log(error)
  }finally{
    // console.log("finally block")
  }
}

// Get the input/display elements
const firstCur = document.getElementById('firstCur');
const secondCur = document.getElementById('secondCur');
const coverterAmount1 = document.getElementById('coverterAmount1');
const coverterAmount2 = document.getElementById('coverterAmount2');

// Function to update the display
function updateExgDisplay(display,value) {
  if(display.value === '0.0'){
    display.value = ''
  }
  display.value += value;
}

// Function to clear the display
function clearExgDisplay() {
  coverterAmount1.value = '0.0';
  coverterAmount2.value = '0.0';  
}

// Function to delete the last Character
function deleteExgLastChar(display) {
  let result = display.value;
  result = result.slice(0, -1);
  if(result.length <= 0){
    clearExgDisplay()
  }
  else{
    display.value = result;
  }
}

// Function to keep check which input field is focused
let activeElement = 'ConverterAmount1'
function updateFocus(input) {
  activeElement = input;
  clearExgDisplay();
}

//Function to handle the change of dropdowns
function handleChange(){
  clearExgDisplay();
}

// Add event listeners to the exgRate buttons
const buttonsExg = document.querySelectorAll(".btnExg");
buttonsExg.forEach(button =>{
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    if(activeElement === 'coverterAmount2'){
      if (buttonText === 'AC') {
        clearExgDisplay();
      }
      else if (buttonText === 'DEL') {
        deleteExgLastChar(coverterAmount2);
        convertCurrency(coverterAmount2, secondCur, firstCur, coverterAmount1)
      }
      else{
        updateExgDisplay(coverterAmount2,buttonText);
        convertCurrency(coverterAmount2, secondCur, firstCur, coverterAmount1)
      }
    }
    else{
      if (buttonText === 'AC') {
        clearExgDisplay();
      }
      else if (buttonText === 'DEL') {
        deleteExgLastChar(coverterAmount1);
        convertCurrency(coverterAmount1, firstCur, secondCur, coverterAmount2)
      }
      else{
        updateExgDisplay(coverterAmount1,buttonText);
        convertCurrency(coverterAmount1, firstCur, secondCur, coverterAmount2)
      }
    }
  })
  });
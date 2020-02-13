
document.addEventListener('DOMContentLoaded', () => {
	init();
}, false);

let equation = ['0'];
let firstObjectIsResult = false;

function lastObject(array) {
	return array[array.length-1];
}





function init() {

	const numButtons = document.getElementsByClassName("number-button");
	const operatorButtons = document.getElementsByClassName("operator-button");
	const decimalButton = document.querySelector('.decimal-button');
	const equalsButton = document.querySelector('.equals-button');
	const clearButton = document.querySelector('.clear-button');
	const negativeButton = document.querySelector('.negative-button');
 
	keyDownSetUp();

	const keys = document.querySelectorAll('.key');
	console.log(keys);
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));


	for (i  =  0; i < numButtons.length; i++) {
		numButtons[i].addEventListener('click', (e) => {
				addNumber(e.target.textContent);
		});
		
	};
	


	for (i  =  0; i < operatorButtons.length; i++) {
		operatorButtons[i].addEventListener('click', (e) => {
			addOperator(e.target.innerText);
		 //function to add operator if ok to display and equation.
		});
	};

	decimalButton.addEventListener("click", (e) => {
			addDecimal(e.target.textContent);
	});

	equalsButton.addEventListener('click', (e) => {
			runCalculation();
	});

	clearButton.addEventListener('click', (e) => {
			allClear();
	});

	negativeButton.addEventListener('click', (e) => {
			toggleNegative();
	});

	updateDisplay(equation);

};

let sum = (a, b) => Math.floor((a + b)*100) / 100;

let multiply = (a, b) => Math.floor((a*b)*100) / 100;

let minus = (a, b) => Math.floor((a-b)*100) / 100;

let divide = (a, b) => Math.floor((a/b)*100) / 100;

const testEq = [12, "+", 12, "*", 3, '/', 2, "-", 4];

const testEq2 = [12, "-", 12, "*", 3, '+', 12, "/", 4];


function calculateEquation(array) {
	convertNumbers(array);
	if (array.length < 2) {

		equation = array.map(x => x.toString()); //converts array back to strings
		firstObjectIsResult = true;

	} else {

		array.forEach(evaluateEquation); //  first pass should evaluate * and minus /
		let newArray = array.filter(function(e){return e!==null; }); // removes nulls
		calculateEquation(newArray); // call function again to evaluate + and -
	};
};

function evaluateEquation(item, index, array) {

	if (isNaN(item)) {
		if (item == "*" || item == '/') {
			let multiProduct = doCalculation(array[index-1], item, array[index+1]);
			array[index+1] = multiProduct;
			array[index] = null;
			array[index-1] = null;
			

		} else if (!array.includes("*") && !array.includes("/"))  {
			let sumProduct = doCalculation(array[index-1], item, array[index+1]);
			array[index+1] = sumProduct; // replace one of array object with result of sum
			array[index] = null; // remove the other 2 objects - turn them to null they will be filtered by calculateEquation function
			array[index-1] = null;


		};
	}
};

function doCalculation(a, operator, b ) {
	let result = 0;
	switch(operator) {
		case '*':
		result = multiply(a, b);
		break
		case  '/':
		result = divide(a, b);
		break
		case '+':
		result = sum(a, b);
		break
		case '-':
		result = minus(a, b);
		break
	};
	return result;

};


	function updateDisplay(equation) {
		const displayScreen = document.querySelector('.screen');
		screenOutput = equation.join(" ")
		displayScreen.textContent = screenOutput;
	}


	function addNumber(number) {
		if (isNaN(equation[equation.length-1]/1)) {
			equation.push(number);
		}
		else if( equation[equation.length-1] == '0' || firstObjectIsResult == true) {
			equation[equation.length-1] = number;
		}
		else {
			equation[equation.length-1] += number
		}
		firstObjectIsResult = false;
		updateDisplay(equation);
	};

	function addDecimal(point) {
		//doesn't work for 0
		if (firstObjectIsResult == true) {
			equation[equation.length-1] = '0.';
		} 
		if(!isNaN(equation[equation.length-1]) && !equation[equation.length-1].includes(point)) {
			equation[equation.length-1] += point
		}
		firstObjectIsResult = false;
		updateDisplay(equation);
	}

	function addOperator(operator) {
	if (!isNaN(equation[equation.length-1])) {
		equation.push(operator);
	}
	firstObjectIsResult = false;
	updateDisplay(equation);
	}

	function runCalculation() {

		calculateEquation(equation);
		updateDisplay(equation);
	}


	function convertNumbers(array) {
			array.forEach(function(object, index) {		
				if (!isNaN(object)) {
					array[index] = parseFloat(object);			
			}; 	
		});
		if (isNaN(lastObject(array))) {
			array.pop();  // if user leaves operator as last element this removes it before calculation eg 5 + 6 + =
		};	
	};

	function allClear() {
		equation = [0];
		updateDisplay(equation);
	};

	function toggleNegative() {
		x = lastObject(equation)
		if (!isNaN(x)) {
			console.log(x);
			x.indexOf("-") == 0 ? x = x.replace("-", "") : x = "-" + x;
			equation[equation.length-1] =  x;
			//equation[equation.length-1] *= -1;
			updateDisplay(equation);
		};
	};
	//to do what to do if operator then equals pressed
	//what to do with result
	//ac

	//function numberPressed(code) {
	//	switch (code) {
	//		case: 
	//	}
	//}

	function keyDownSetUp() {
		document.addEventListener('keydown', e => {
  switch (e.key) {
    case '+':
      let plusKeyPressed = document.querySelector(`.operator-button[data-key="${e.key}"]`); 
    	plusKeyPressed.classList.add('key-press');
      addOperator(e.key);
      break;
    case '-':
    	let minusKeyPressed = document.querySelector(`.operator-button[data-key="${e.key}"]`); 
    	minusKeyPressed.classList.add('key-press');
      addOperator(e.key);
      break;
    case '*':
    	let timesKeyPressed = document.querySelector(`.operator-button[data-key="${e.key}"]`); 
    	timesKeyPressed.classList.add('key-press');
      addOperator(e.key);
      break;
    case '/':
      let divideKeyPressed = document.querySelector(`.operator-button[data-key="${e.key}"]`); 
    	divideKeyPressed.classList.add('key-press');
      addOperator(e.key);
      break;
    case '.':
      let decimalKeyPressed = document.querySelector(`.decimal-button[data-key="${e.key}"]`); 
    	decimalKeyPressed.classList.add('key-press');
      addDecimal(e.key);
      break;
    case 'Enter':
    case '=':
      let enterKeyPressed = document.querySelector(`.equals-button[data-key="="]`); 
    	enterKeyPressed.classList.add('key-press');
      runCalculation();
      break;
    case 'Delete':
    	console.log(e.key)
    	let deleteKeyPressed = document.querySelector(`.clear-button[data-key="AC"]`); 
    	deleteKeyPressed.classList.add('key-press');
    	allClear();
    	break;	
    	  
   // case 'Backspace':
     //// document.querySelector(`.bAC`).classList.add('active')
     // backspace();
      //break;
   // case 'Delete':
     // document.querySelector(`.bC`).classList.add('active')
    //  clear();
     // break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    	let numKeyPressed = document.querySelector(`.number-button[data-key="${e.key}"]`); 
    	numKeyPressed.classList.add('key-press');
      addNumber(e.key);
  		}
		});



	};

	function removeTransition(e) {
		console.log("called");
		this.classList.remove('key-press');
	}
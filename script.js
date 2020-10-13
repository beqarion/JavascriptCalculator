
$(document).ready(function() {
    
    $(".btn").mouseup(function(){
    	console.log( "ready!" );
	    $(this).blur();
	})
});


function clearDisplay(input){
	let formula = document.getElementById("formula");
	let display = document.getElementById("display");

	formula.innerText = "";
	display.innerText = input;
}
function updateDisplay(input){
	let formula = document.getElementById("formula");
	let display = document.getElementById("display");



	//MAKING SURE TO NO MORE THAN ONE '.' ARE ADDED
	let currText = display.innerText;
	if (input === "." && /\./g.test(currText)) {
		return
	}
	//*********************************************



	//NO MORE THAN ONE "-"
	if (input === "-" && /\-$/.test(formula.innerText)){
		return
	}//******************************************

	//CHANGE PREVIOUS operator with new one
	if ((input === "+" ||
		input === "*" ||
		input === "/") &&
		(currText === "+" ||
		currText === "*" ||
		currText === "-" ||
		currText === "/")) {
		formula.innerText = formula.innerText.replace(/[\+\/\-\*]+$/g, input);
		display.innerText = display.innerText.replace(/[\+\/\-\*]+$/g, input);
		return
	}//******************************************



	//MAKING SURE ON INPUTTING OPERATORS RESET 
	//DISPLAY BAR AND FORMULA BAR STAYS UNTOUCHED
	if (input === "+" ||
		input === "*" ||
		input === "-" ||
		input === "/") {
		formula.innerText += input;
		display.innerText = input;
		return
	}//******************************************




	//IF THERE IS NO NUMBER AND PRESS DECIMAL DOT, 0 WILL APPEAR FRONT OF IT
	if(formula.innerText === "" && input === "."){
		formula.innerText = "0" + input;
	} else {
		formula.innerText += input;
	}
	
	if ((display.innerText === "0" ||
		display.innerText === "-" ||
		display.innerText === "+" ||
		display.innerText === "*" ||
		display.innerText === "/")
		 && input != "."){
		display.innerText = input;
	} else {
		display.innerText += input;
	}//******************************************
}
function handleSubmit(){
	let formula = document.getElementById("formula");
	let display = document.getElementById("display");
	
	let txt = (/\=/g.test(formula.innerText)) ? formula.innerText.match(/(?<=\=)[^\=]+$/g)[0] : formula.innerText;
	
	if (formula.innerText === '') {
		return
	}

	if (display.innerText === "+" ||
		display.innerText === "-" ||
		display.innerText === "*" ||
		display.innerText === "/") {

		txt = txt + txt.match(/\d(\.\d)?(?=[\+\-\*\/])/)[0];
		console.log(txt.match(/\d(\.\d)?(?=[\+\-\*\/])/)[0]);

		let num = Math.round(1000000000000 * eval(txt)) / 1000000000000;

		formula.innerText += txt.match(/\d(\.\d)?(?=[\+\-\*\/])/)[0] + "=" + num;
		display.innerText = num;

		return
	}

	let num = Math.round(1000000000000 * eval(txt)) / 1000000000000;

	formula.innerText += "=" + num;
	display.innerText = num;

}


const calcScreen = document.querySelector('.screen');
calcScreen.addEventListener('keydown',checkValidInput);

function checkValidInput(e){
	if(e.ctrlKey||e.altKey||typeof e.key!=='string'||e.key.length!==1) //if special buttons, let it pass
        return;

    if(!(/[\d\+\u00D7\u00F7\u2212]/.test(e.key)))
        e.preventDefault(); //filter out invalid input
}

const buttons=document.querySelector('.buttons');
buttons.addEventListener('click',buttonPressed);

function buttonPressed(e){
    console.log(e.target.value);
    calcScreen.value+=e.target.value;
}
// function add(a,b) {
// 	return a+b;
// }

// function subtract(a,b) {
// 	return a-b;
// }

// function multiply(array) {
//   return array.reduce((tally,curr)=>tally*curr);
// }

// function divide(a,b) {
// 	return a/b;
// }
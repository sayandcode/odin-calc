const calcScreen = document.querySelector('.screen');
calcScreen.addEventListener('keydown',checkValidInput); //check for clicks anywhere on the body

function checkValidInput(e){
	if(e.ctrlKey||e.altKey||typeof e.key!=='string'||e.key.length!==1) //if special buttons, let it pass
        return;

    if(!(/[\d\+\u2212\u00D7\u00F7]/.test(e.key)))
        e.preventDefault(); //filter out invalid input
}

const buttons=document.querySelector('.buttons');
buttons.addEventListener('click',e=>buttonPressed(e.target));

function buttonPressed(button){
    switch(button.id){
        case 'backspace': calcScreen.value=calcScreen.value.substr(0,calcScreen.value.length-1);
            break;

        case "": break; //remove clicks on calc body

        case 'minus': calcScreen.value+='\u2212';
            break;

        case 'into': calcScreen.value+='\u00D7';
            break;

        case 'divide': calcScreen.value+='\u00F7';
            break;

        case 'equals': calculate();
            break;

        default: calcScreen.value+=button.value;
    }
    calcScreen.focus();//moves cursor to end
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
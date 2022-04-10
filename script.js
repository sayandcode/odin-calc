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

let cursorPos=0;
let valueReplaced=false;

function buttonPressed(button){
    switch(button.id){
        case 'backspace': calcScreen.value=calcScreen.value.substr(0,calcScreen.value.length-1);
            break;

        case "": break; //remove clicks on calc body

        case 'minus': insert('\u2212');
            break;

        case 'into': insert('\u00D7');
            break;

        case 'divide': insert('\u00F7');
            break;

        case 'equals': calculate();
            break;

        default: insert(button.value);
    }
}

function insert(letter){
    if(valueReplaced){
        calcScreen.selectionStart=cursorPos;
        calcScreen.selectionEnd=cursorPos;
    }

    if (calcScreen.selectionStart==calcScreen.value.length){//if the cursor at the end
        calcScreen.value+=letter;
        cursorPos++;
    }

    else{
        cursorPos=calcScreen.selectionStart+1;
        let ourText=calcScreen.value;
        ourText=ourText.split('');
        ourText.splice(calcScreen.selectionStart,0,letter)
        ourText=ourText.join('');
        calcScreen.value=ourText;
        valueReplaced=true;
    }
}

function repositionCursor(e){
    calcScreen.selectionStart = e.detail.newPos;
    calcScreen.selectionEnd = e.detail.newPos;
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
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
calcScreen.addEventListener('click',repositionCursor);

let cursorPos=0;

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

        case 'equals': calcScreen.value+='=';   //equals always evaluates the current expression
            break;

        default: insert(button.value);
    }
    if(calcScreen.value.match(/([\+\u2212\u00D7\u00F7=].*){2,}/g)){     //more than one operator
        let finalOutput='';
        if(/\d/.test(calcScreen.value.substr(-1))){    //if the operator is in the middle somewhere
            //recursively simplify the contents
            let [num,operators]=splitOperators(calcScreen.value);
            let firstPart=num[0]+operators[0]+num[1]+'=';
            firstPart=simplifyCalc(firstPart);
            let secondPart=operators[1]+num[2]+'=';
            finalOutput=simplifyCalc(firstPart+secondPart);

        } 
        else
            finalOutput= simplifyCalc(calcScreen.value);
        calcScreen.value=finalOutput;
    }  
       
}

function insert(letter){
    let ourText=calcScreen.value;
    ourText=ourText.split('');
    ourText.splice(cursorPos,0,letter)
    ourText=ourText.join('');
    calcScreen.value=ourText;
    cursorPos++;
}

function repositionCursor(e){
    cursorPos=calcScreen.selectionStart;
}

function simplifyCalc(str){
    let [num,operators]=splitOperators(str);
    num=num.map(Number);
    const result=operate(num[0],operators[0],num[1]);
    return result+( operators[1]=='=' ? '' : operators[1]);
}

function splitOperators(str){
    const num=str.split(/[\+\u2212\u00D7\u00F7=]/);
    const operators=str.match(/[\+\u2212\u00D7\u00F7=]/g);
    return [num, operators]
}

function findNth(str,subStr,count){
    return str.split(subStr, count).join(subStr).length;

}

function operate(a,operator,b){
    switch(operator){
        case '+': return add(a,b);
        
        case '\u2212': return subtract(a,b);
        
        case '\u00D7': return multiply([a,b]);
        
        case '\u00F7': return divide(a,b);   
    }
}




//Math functions

function add(a,b) {
	return a+b;
}

function subtract(a,b) {
	return a-b;
}

function multiply(array) {
  return array.reduce((tally,curr)=>tally*curr);
}

function divide(a,b) {
	return a/b;
}
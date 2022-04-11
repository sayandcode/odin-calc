const calcScreen = document.querySelector('.screen');
calcScreen.addEventListener('keydown',checkValidInput);

const buttons=document.querySelector('.buttons');
buttons.addEventListener('click',e=>buttonPressed(e.target)); //check for clicks anywhere on the body
calcScreen.addEventListener('click',repositionCursor);

/*______________________ Input control START ______________________*/

function checkValidInput(e){
    cursorPos=calcScreen.selectionStart;
	if(e.ctrlKey||e.altKey||typeof e.key!=='string'||e.key=='Backspace') //if special buttons, let it pass
        return;
    
    switch(e.key){
        case '-':
            simulatePress('minus');
            break;
    
        case '*':
            simulatePress('into');
            break;
    
        case '/':
            simulatePress('divide');
            break;

        case 'Enter':simulatePress('equals');
            break;

        case ' ':simulatePress('equals');
            break;
    }
    if(!(/[\d\+\u2212\u00D7\u00F7]/.test(e.key)))
        e.preventDefault(); //filter out invalid input
    prevButtonID=e.id;  
}

let cursorPos=0;    //starting conditions
let prevButtonID=''; //
let pointFirstPress=true;

function buttonPressed(button){
    if((/(plus|minus|into|divide|point)/.test(prevButtonID))&&(/(plus|minus|into|divide)/.test(button.id))){  //if second consecutive operator, just remove the previous operator
        simulatePress('backspace');
        prevButtonID='';
    }  

    switch(button.id){
        case 'backspace': calcScreen.value=calcScreen.value.substr(0,calcScreen.value.length-1);
            break;

        case "": break; //remove clicks on calc body

        case 'plus': insert('+');
            document.querySelector('#point').disabled=false;
            break;

        case 'minus': insert('\u2212');
            document.querySelector('#point').disabled=false;
            break;

        case 'into': insert('\u00D7');
            document.querySelector('#point').disabled=false;
            break;

        case 'divide': insert('\u00F7');
            document.querySelector('#point').disabled=false;
            break;

        case 'equals': 
            if(calcScreen.value.search(/[\+\u2212\u00D7\u00F7]/g) !== -1){  //add '=' only if theres some operation to be done, otherwise just display whatevers there
                calcScreen.value+='=';  //add to the end so that it can get evaluated
                document.querySelector('#point').disabled=false;
            }    
            break;

        default: //number or decimal point
            if(prevButtonID=='equals'){   //if result of previous calc is on screen
                calcScreen.value='';
            }
            if(button.id=='point'){     //deactivate while current operand contains a decimal point
                document.querySelector('#point').disabled=true;
            }    
            insert(button.value);
    }
    if(calcScreen.value.match(/([\+\u2212\u00D7\u00F7=].*){2,}/g)){     //more than one operator
        let finalOutput='';
        if(/\d/.test(calcScreen.value.substr(-1))){    //if the last operator is in the middle somewhere
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
    prevButtonID=button.id;  
}

function simulatePress(buttonID){   //creates a fake button and passes it to buttonPressed
    const tempButton=document.createElement('button');
    tempButton.setAttribute('id',buttonID)   
    buttonPressed(tempButton);
    tempButton.remove();
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

/*______________________ Input Control END ______________________*/
/*______________________ Calculations logic START ______________________*/

function simplifyCalc(str){
    let [num,operator]=splitOperators(str);
    num=num.map(Number);
    if((operator[0]=='\u00F7')&&(num[1]==0)){
        alert("Can't divide by zero");
        return num[0]+operator[0]+num[1];
    }
    const result=operate(num[0],operator[0],num[1]);
    return result+( operator[1]=='=' ? '' : operator[1]);
}

function splitOperators(str){
    const num=str.split(/[\+\u2212\u00D7\u00F7=]/);
    const operators=str.match(/[\+\u2212\u00D7\u00F7=]/g);
    return [num, operators]
}

function operate(a,operator,b){
    let result;
    switch(operator){
        case '+': result= a+b;
            break;
        
        case '\u2212': result= a-b;
            break;
        
        case '\u00D7': result= a*b;
            break;
        
        case '\u00F7': result= a/b;
            break;
    }
    return Number(Math.round(result+"e+4")+"e-4");
}

/*______________________ Calculations logic END ______________________*/

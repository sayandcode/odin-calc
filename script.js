const screen = document.querySelector('.screen');
screen.addEventListener('keydown',checkValidInput);


function checkValidInput(e){
	if(e.ctrlKey||e.altKey||typeof e.key!=='string'||e.key.length!==1)
        return;

    if(!(/[\d\+\u00D7\u00F7\u2212]/.test(e.key))){
		console.log('invalid');
        e.preventDefault();
    }
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
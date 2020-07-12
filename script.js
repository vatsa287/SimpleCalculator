function getHistory(){
	return document.getElementById("history-value").innerText;
}

function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

function getOutput(){
	return document.getElementById("output-value").innerText;
}

function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

// Adds with comma separated values
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

// Removes comma present in values
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operators");
for(var i =0; i<operator.length; i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
            // If output has a value
            if(output){        
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
            var history=getHistory();
            // Backspace for operator present at end of history
			if(output == "" && history != ""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output != "" || history != ""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

var number = document.getElementsByClassName("numbers");
for(var i =0; i<number.length; i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
        // If output is a number [Nan - Not a number]
        if(output!=NaN){ 
			output=output+this.id;
			printOutput(output);
		}
	});
}

var microphone = document.getElementById('microphone');
microphone.onclick=function(){

	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.start();
	operations = {
					"one" : "1",
					"two" : "2",
					"three" : "3",
					"four" : "4",
					"five" : "5",
					"six" : "6",
					"seven" : "7",
					"eight" : "8",
					"nine" : "9",
					
					"plus":"+",
					"minus":"-",
					"into" : "*",
					"multiply":"*",
					"multiplied by":"*",
					"divide":"/",
					"divided by":"/",
					"remainder":"%"
				}
	
	recognition.onresult = function(event){
		var input = event.results[0][0].transcript;

		for(property in operations){
			input= input.replace(property, operations[property]);
		}
		document.getElementById("output-value").innerText = input;
		printHistory(input);

		setTimeout(function(){
			evaluate(input);
		},2000);
		
	}
	
}
function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("output-value").innerText = getFormattedNumber(result);
	}
	catch(e){
		console.log(e);
		document.getElementById("output-value").innerText = "";
	}
}


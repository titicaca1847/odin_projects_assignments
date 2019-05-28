function add(x,y){  //input: string
    
    return Number(x)+Number(y);
}

function substract(x,y){
    return Number(x)-Number(y);
}

function multiply(x,y){
    return Number(x)*Number(y);
}

function divide(x,y){
    if (Number(y)===0){
        return "Error";
    } else{
        return Number(x)/Number(y);
    }
}


function operator(func, x,y){
    return func(x,y);
}
//console.log(operator(add,5,8));

//This function is to erase all division in expression, change them to multiplication.
//  eg. 5/2=5*(1/2). Input: str, a string of expression. output: a string of expression in which "÷" replaced by "x" sign. 
function changeDivToMulti(str){ 
   let array=str.split("÷");
   let firstNum;
   if (array.length!==1){
       result=array[0];
       
       for (let i=1; i<array.length; i++){
           firstNum=array[i].split(/[+ − ×]/)[0]
           if (Number(firstNum)===0){
            return "Error";
        }
           if (array[i].split(/[+ − ×]/).length!==1){
            result+="×"+divide(1,firstNum)+array[i].slice(array[i].search(/[+ − ×]/));
           } else{
            result+="×"+divide(1,firstNum);
           }
         }
       return result;
   } else{
       return str;
   }

}

// var str="2+5÷2×3−3÷1";
// console.log("str=",str);
// console.log("changeDivToMulti(str):", changeDivToMulti(str));

function eraseMinus(str){
    let array=str.split("−");
    return array.join("+-")
}

var str="2+5−2×3−3−1";
console.log("str=",str);
console.log("eraseMinus(str)",eraseMinus(str));

let display=document.querySelector("#display");    
let input=document.querySelectorAll(".input");
let clear=document.querySelector("#clear");
let backspace=document.querySelector("#backspace");
let equals=document.querySelector("#equals");

let output="";
let sum=0;
let operators=["+","−","×","÷"];
input.forEach ((key)=>{
    key.onclick=function(){
        //console.log(key.textContent);
        
        //if the last and current input are both operators, replace the old one with the oprator input.
        if (isOperator(output[output.length-1])
         &&isOperator(key.textContent)){
            output=output.slice(0,output.length-1)+key.textContent; 
            console.log(output);  
        }else{
            output+=key.textContent;
             }
        display.textContent=output; 
        }
    
});

//console.log(output);


clear.onclick=function(){
    output="";
    display.textContent="0";
    // console.log(typeof (display.textContent));
}

backspace.onclick=function(){
    if (output!=="0"&& output.length!==1&&output!==""){
        output=output.slice(0,output.length-1);
        display.textContent=output;
    } else{
        output="";
        display.textContent="0";
        console.log("output: "+output);
        console.log("display: "+display.textContent);
    }
    //console.log("output: "+output);
}


equals.onclick=function(){
    console.log(output);

    if (isOperator(display.textContent[display.textContent.length-1])){
      display.textContent="Error"; //display error message if the last input is operator.
      output="";
      return;
    }
    let outMulti=output.split("×");
    let multiRemoved="";
    if (outMulti.length!==1){
        let lastNum=outMulti[0].split(/[+ − ÷]/)[outMulti[0].split(/[+ − ÷]/).length-1];
        let firstNum;
        let secondNumIndex;
        let lastNumIndex;

        multiRemoved=outMulti[0].slice(0, outMulti[0].lastIndexOf(lastNum));
        console.log("firstNum=",firstNum, "lastNum=",lastNum);
        console.log(multiRemoved);
        for (i=1; i<outMulti.length; i++){
            console.log(outMulti[i]);
            firstNum=multiply(lastNum, outMulti[i].split(/[+ − ÷]/)[0]);
            lastNum=outMulti[i].split(/[+ − ÷]/)[outMulti[i].split(/[+ − ÷]/).length-1];
            secondNumIndex=outMulti[i].search(/[+ − ÷]/);
            lastNumIndex=outMulti[i].lastIndexOf(lastNum);
          
            multiRemoved+=firstNum.toString()+outMulti[i].slice(secondNumIndex,lastNumIndex)
            
            console.log("firstNum=",firstNum, "lastNum=",lastNum);
            console.log(multiRemoved);
        }
        if (outMulti[outMulti.length-1].split(/[+ − ÷]/).length!==1){
            multiRemoved+=lastNum;
        } 
        output=multiRemoved;
        console.log(multiRemoved);
   
    }else{
        console.log(outMulti);
    }
}


function isOperator(str){
    if (operators.indexOf(str)!==-1){
        return true;
    }else{
        return false;
    }
}
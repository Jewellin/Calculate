  //一个创建元素的函数
  function createEle(childEleName, parentEleName, className, idName) {
    childEleName.className = className;
    childEleName.id = idName;
    parentEleName.appendChild(childEleName);
  }
  
  function sum(temp, nextNum, result) {
    temp += parseInt(calculator.numList[a]);
    calculator.result = temp; 
  }

  function Calculator(part) {           
   //这个part参数是计算器在哪个DOM元素中生成
   this.part = part;  
    
   this.init = function() {             
    this.numInput();
    this.signInput();  
    calculator.clear.onclick = this.clearClick;
    calculator.back.onclick = this.backClick;
    calculator.equal.onclick = this.equalClick;
   }

   //动态添加元素
   this.creator = function() {  
    let wrapper = document.createElement("div");  
    let screen = document.createElement("div");   
    let showResult = document.createElement("div");   
    let sign = document.createElement("div"); 
    let num = document.createElement("div");
    let div1 = document.createElement("div");   
    let div2 = document.createElement("div");
    let div3 = document.createElement("div"); 
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    
    createEle(wrapper, this.part, "wrapper", "");           
    createEle(screen, wrapper, "screen", "screen");         
    createEle(showResult, wrapper, "showResult", "showResult");           
    createEle(sign, wrapper, "sign", "");            
    createEle(num, wrapper, "num", "")
    
    //sign区域中的span元素
    for (let i = 0; i < 5; i++) {
      let signList = ["*", "/", "+", "-", "="];  
      let spanSign = document.createElement("span");      
      if (i === 4) {      
        spanSign.innerHTML = signList[4];        
        createEle(spanSign, sign, "equal", "equal");
      } else {      
        spanSign.innerHTML = signList[i];        
        createEle(spanSign, sign, "", "");
      }  
    }
    
    //num区域中的span元素    
    span1.innerHTML = 0;    
    span2.innerHTML = "&lt;";        
    span3.innerHTML = "C";
    createEle(span3, div1, "clear", "clear");    
    createEle(span2, div1, "back", "back");
    createEle(span1, div1, "", "");
    createEle(div1, num, "zero", "");
    
    //数字7，8，9
    for (let i = 0; i < 3; i++) {
      let spanList = [7, 8, 9];
      let span = document.createElement("span");
      span.innerHTML = spanList[i];      
      createEle(span, div2, "", "");
    }    
    createEle(div2, num, "", "");
        
    //数字4，5，6
    for (let i = 0; i < 3; i++) {
      let spanList = [4, 5, 6];
      let span = document.createElement("span");
      span.innerHTML = spanList[i];      
      createEle(span, div3, "", "");
    }    
    createEle(div3, num, "", "");
  
    //数字1，2，3
    let div4 = document.createElement("div");
    for (let i = 0; i < 3; i++) {
      let spanList = [1, 2, 3];
      let span = document.createElement("span");
      span.innerHTML = spanList[i];      
      createEle(span, div4, "", "");
    }    
    createEle(div4, num, "", "");
   }

   //数字键点击出现在屏幕上
   this.numInput = function() {
    for (let i = 0; i < calculator.num.length; i++) {
      const numItem = calculator.num;
      numItem[i].onclick = function() {
        if (calculator.content !== "" && calculator.result !== null) {
          let temp = calculator.content.split('');
          //是否进行连续计算
          if (temp[temp.length - 1] === "*" || temp[temp.length - 1] === "/" || temp[temp.length - 1] === "+" || temp[temp.length - 1] === "-") {          
            calculator.content += this.innerHTML;
            calculator.result = null;
            calculator.screen.innerHTML = calculator.content;                      
          } else {
            calculator.content = "";
            calculator.content += this.innerHTML;
            calculator.result = null;
            calculator.showResult.innerHTML = "";
            calculator.screen.innerHTML = calculator.content;
          }                      
        } else {
          calculator.content += this.innerHTML; 
          calculator.screen.innerHTML = calculator.content;
          return calculator.content;        
        }
      }
     }
   }
      
   //运算符键点击出现在屏幕上
   this.signInput = function() {
    for (let j = 0; j < calculator.sign.length; j++) {
      const signItem = calculator.sign;
      signItem[j].onclick = function() {
       if (calculator.result === null) {
        calculator.content += this.innerHTML;
        calculator.screen.innerHTML = calculator.content;
        return calculator.content;
       } else {         
         calculator.content = calculator.result + this.innerHTML;
         calculator.screen.innerHTML = calculator.content;
         return calculator.content;
       }
      }
     }
   }
         
   //清除键点击
   this.clearClick = function() {  
    calculator.result = null;
    calculator.content = "";    
    calculator.screen.innerHTML = "";    
    calculator.showResult.innerHTML = "";       
   }
   
   //后退键点击
   this.backClick = function() {  
    calculator.content = calculator.content.split('').slice(0, (calculator.content.split('').length - 1)).join('');
    calculator.screen.innerHTML = calculator.content;
   }  
   
   //等号键点击
   this.equalClick = function() {
    let content = calculator.content;
    let reg = /(\d+)/g;  
    let regSign = /([\+\-\*\/]+)/g; 
    calculator.numList = [];
    calculator.signList = [];
    calculator.allList = [];
  
    //将字符串中的数字通过正则表达式分离出来，存入一个数组numList中
    while(reg.test(content)) {  
     calculator.numList.push(RegExp.$1);
    }
  
    //将字符串中的运算符通过正则表达式分离出来，存入一个数组signList中
    while (regSign.test(content)) {
     calculator.signList.push(RegExp.$1);
    }  
  
    //将数字数组与字符数组按顺序拼接成一个数组
    for (let i = 0; i < calculator.signList.length; i++) {
     calculator.allList.push(calculator.numList[i]);
     calculator.allList.push(calculator.signList[i]);
    }
    calculator.allList.push(calculator.numList[calculator.numList.length-1])
    
    //判断是简单运算还是混合运算，flag为true时为混合运算，false时为简单运算
    for (let i = 0; i < calculator.signList.length; i++) {   
     let temp = calculator.signList[0];
     if (temp !== calculator.signList[i]) {
      calculator.flag = true;
     }
    }
  
    //将混合运算和简单运算分离开来
    if (calculator.flag) {
     for (let a = 0; a < calculator.allList.length; a++) {
      if (calculator.allList[a] === "*") {
       calculator.result = parseInt(calculator.allList[a-1]) * parseInt(calculator.allList[a+1]);
       calculator.allList.splice(a-1, 2);
       calculator.allList[a-1] = calculator.result;           
       for (let b = 0; b < calculator.allList.length; b++) {
        if (calculator.allList[b] === "+") {           
         calculator.result = parseInt(calculator.allList[b-1]) + parseInt(calculator.allList[b+1]);      
        }
        if (calculator.allList[b] === "-") {      
         calculator.result = parseInt(calculator.allList[b-1]) - parseInt(calculator.allList[b+1]);
        }
       }
      }
      if (calculator.allList[a] === "/") {
       calculator.result = parseInt(calculator.allList[a-1]) / parseInt(calculator.allList[a+1]);
       calculator.allList.splice(a-1, 2);       
       calculator.allList[a-1] = calculator.result;    
       // alert(calculator.allList);
       for (let b = 0; b < calculator.allList.length; b++) {
        if (calculator.allList[b] === "+") {      
         calculator.result = parseInt(calculator.allList[b-1]) + parseInt(calculator.allList[b+1]);
        }
        if (calculator.allList[b] === "-") {      
         calculator.result = parseInt(calculator.allList[b-1]) - parseInt(calculator.allList[b+1]);
        }
       }
      }    
     }
    } else {
     let temp = parseInt(calculator.numList[0]);
     for (let a = 1; a < calculator.numList.length; a++) {   
      if (calculator.signList[0] === "+") {    
      //  temp += parseInt(calculator.numList[a]);
      //  calculator.result = temp;    
      sum(temp, calculator.numList[a]
        , calculator.result);
      }
      if (calculator.signList[0] === "-") {
       temp -= parseInt(calculator.numList[a]);
       calculator.result = temp;  
      }
      if (calculator.signList[0] === "*") {
       temp *= parseInt(calculator.numList[a]);
       calculator.result = temp;  
      }
      if (calculator.signList[0] === "/") {       
       temp /= parseInt(calculator.numList[a]);              
       calculator.result = temp;  
      }
     }
    }
  
    //将结果显示出来
    if (calculator.result === Infinity) { //如果一个数除以0，js中的结果Infinity
      calculator.showResult.innerHTML = "不能除以0";
     } else {
      calculator.showResult.innerHTML = calculator.content + "=" + calculator.result;
     }
    
   }

   this.creator();
   const calculator = {
    screen: this.part.getElementsByClassName("screen")[0],
    showResult: this.part.getElementsByClassName("showResult")[0],
    num: this.part.querySelector(".num").getElementsByTagName("span"),
    sign: this.part.querySelector(".sign").getElementsByTagName("span"),
    equal: this.part.getElementsByClassName("equal")[0],
    back: this.part.getElementsByClassName("back")[0],
    clear: this.part.getElementsByClassName("clear")[0],
    content: "", 
    numList: [], 
    signList: [],
    allList: [],    
    result: null,
    flag: false,
    index: 10,
   };          
  };

  
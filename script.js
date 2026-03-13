// REGISTER USER
function registerUser(){

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(name === "" || email === "" || password === ""){
alert("Please fill all fields");
return;
}

localStorage.setItem("name", name);
localStorage.setItem("email", email);
localStorage.setItem("password", password);

alert("Registration Successful");

window.location.href = "login.html";

}



// LOGIN USER
function loginUser(){

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

let savedEmail = localStorage.getItem("email");
let savedPassword = localStorage.getItem("password");

if(email === savedEmail && password === savedPassword){

window.location.href = "dashboard.html";

}
else{

alert("Invalid Email or Password");

}

}



// DASHBOARD WELCOME
window.onload = function(){

let name = localStorage.getItem("name");

let welcome = document.getElementById("welcomeText");

if(welcome && name){
welcome.innerText = "Welcome " + name;
}

};



// LOGOUT
function logout(){

localStorage.clear();

window.location.href = "login.html";

}



// AI TUTOR CHAT
function askQuestion(){

let questionInput = document.getElementById("question");

if(!questionInput) return;

let question = questionInput.value.trim().toLowerCase();

if(question === "") return;

let chatbox = document.getElementById("chatbox");

chatbox.innerHTML += "<p><b>Student:</b> " + question + "</p>";

let answer = "";

// AI knowledge responses
if(question.includes("array")){
answer = "An array is a data structure that stores multiple elements of the same type in contiguous memory locations.";
}

else if(question.includes("binary search")){
answer = "Binary search is an efficient algorithm that works on sorted arrays by repeatedly dividing the search range in half.";
}

else if(question.includes("linked list")){
answer = "A linked list is a data structure where each element (node) contains data and a pointer to the next node.";
}

else if(question.includes("stack")){
answer = "A stack is a data structure that follows the Last In First Out (LIFO) principle.";
}

else if(question.includes("queue")){
answer = "A queue is a data structure that follows the First In First Out (FIFO) principle.";
}

else if(question.includes("java")){
answer = "Java is an object-oriented programming language used for web applications, Android apps, and enterprise systems.";
}

else if(question.includes("python")){
answer = "Python is a high-level programming language known for its simplicity and powerful libraries for AI and data science.";
}

else{
answer = "I am still learning this topic. Try asking about arrays, stacks, queues, binary search, Java, or Python.";
}

chatbox.innerHTML += "<p><b>AI Tutor:</b> " + answer + "</p>";

questionInput.value = "";

chatbox.scrollTop = chatbox.scrollHeight;

}

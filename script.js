function registerUser(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

localStorage.setItem("name",name)
localStorage.setItem("email",email)
localStorage.setItem("password",password)

alert("Registration successful")

window.location="login.html"

}

function loginUser(){

let email=document.getElementById("loginEmail").value
let password=document.getElementById("loginPassword").value

let savedEmail=localStorage.getItem("email")
let savedPassword=localStorage.getItem("password")

if(email===savedEmail && password===savedPassword){

window.location="dashboard.html"

}else{

alert("Invalid login")

}

}

window.onload=function(){

let name=localStorage.getItem("name")

let welcome=document.getElementById("welcomeText")

if(welcome && name){

welcome.innerText="Welcome "+name

}

}

function logout(){

localStorage.clear()

window.location="login.html"

}

function askQuestion(){

let question=document.getElementById("question").value.toLowerCase()

let chatbox=document.getElementById("chatbox")

chatbox.innerHTML+="<p><b>Student:</b> "+question+"</p>"

let answer=""

if(question.includes("array")){
answer="Arrays store elements in contiguous memory locations."
}
else if(question.includes("binary search")){
answer="Binary search divides the search range in half each time."
}
else if(question.includes("java")){
answer="Java is an object oriented programming language."
}
else{
answer="I am still learning this topic."
}

chatbox.innerHTML+="<p><b>AI Tutor:</b> "+answer+"</p>"

document.getElementById("question").value=""

}

function checkAnswer(ans){

if(ans==="b"){

document.getElementById("result").innerText="Correct Answer"

localStorage.setItem("quizScore","1")

}else{

document.getElementById("result").innerText="Wrong Answer"

}

}

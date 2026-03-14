function registerUser(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

localStorage.setItem("name",name)
localStorage.setItem("email",email)
localStorage.setItem("password",password)

alert("Registration successful")

window.location.href="login.html"

}


function loginUser(){

let email=document.getElementById("loginEmail").value
let password=document.getElementById("loginPassword").value

let savedEmail=localStorage.getItem("email")
let savedPassword=localStorage.getItem("password")

if(email===savedEmail && password===savedPassword){

window.location.href="dashboard.html"

}else{

alert("Invalid email or password")

}

}


function logout(){

localStorage.clear()

window.location.href="login.html"

}


function askQuestion(){

let question=document.getElementById("question").value

let chatbox=document.getElementById("chatbox")

chatbox.innerHTML += "<p><b>You:</b> "+question+"</p>"

chatbox.innerHTML += "<p><b>AI:</b> I am still learning. AI response coming soon.</p>"

document.getElementById("question").value=""

}

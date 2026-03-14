function registerUser(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

localStorage.setItem("name",name)
localStorage.setItem("email",email)
localStorage.setItem("password",password)

alert("Registered Successfully")

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

alert("Invalid Login")

}

}



window.onload=function(){

let name=localStorage.getItem("name")

let welcome=document.getElementById("welcomeText")

if(welcome){

welcome.innerText="Welcome "+name

}

}



function logout(){

localStorage.clear()

window.location="login.html"

}



async function askQuestion(){

let question=document.getElementById("question").value

let chatbox=document.getElementById("chatbox")

chatbox.innerHTML+="<p><b>You:</b> "+question+"</p>"

const API_KEY="AIzaSyCAmOssbPvoxnr_VodqVJpSdMsMv3mLWmA"

const response=await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[{text:question}]
}
]
})
}
)

const data=await response.json()

let answer=data.candidates[0].content.parts[0].text

chatbox.innerHTML+="<p><b>AI:</b> "+answer+"</p>"

document.getElementById("question").value=""

}

async function askQuestion(){

let question = document.getElementById("question").value.trim()

if(question === "") return

let chatbox = document.getElementById("chatbox")

chatbox.innerHTML += "<div class='user'>You: " + question + "</div>"

document.getElementById("question").value=""

const API_KEY = "AIzaSyCAmOssbPvoxnr_VodqVJpSdMsMv3mLWmA"

try{

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text: question }
]
}
]
})
}
)

const data = await response.json()

let answer = "No response"

if(data.candidates){
answer = data.candidates[0].content.parts[0].text
}

chatbox.innerHTML += "<div class='ai'>AI: " + answer + "</div>"

}catch(error){

chatbox.innerHTML += "<div class='ai'>AI: Error connecting to Gemini API</div>"

}

chatbox.scrollTop = chatbox.scrollHeight

}

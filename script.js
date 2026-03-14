async function askQuestion(){

let question=document.getElementById("question").value
let chatbox=document.getElementById("chatbox")

chatbox.innerHTML += "<div class='user'>"+question+"</div>"

const API_KEY="AIzaSyCAmOssbPvoxnr_VodqVJpSdMsMv3mLWmA"

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
parts:[{text:question}]
}
]
})
}
)

const data = await response.json()

let answer=data.candidates[0].content.parts[0].text

chatbox.innerHTML += "<div class='ai'>"+answer+"</div>"

}catch(e){

chatbox.innerHTML += "<div class='ai'>Error connecting to AI</div>"

}

document.getElementById("question").value=""
chatbox.scrollTop=chatbox.scrollHeight

}

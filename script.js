async function askQuestion(){

let question=document.getElementById("question").value

if(question==="") return

let chatbox=document.getElementById("chatbox")

chatbox.innerHTML+="<p><b>Student:</b> "+question+"</p>"

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
parts:[
{ text: question }
]
}
]
})
}
)

const data=await response.json()

let answer=data.candidates[0].content.parts[0].text

chatbox.innerHTML+="<p><b>AI Tutor:</b> "+answer+"</p>"

document.getElementById("question").value=""

chatbox.scrollTop=chatbox.scrollHeight

}

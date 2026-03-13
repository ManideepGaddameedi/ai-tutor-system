```javascript id="wqdyu6"
// REGISTER USER
function registerUser(){

let name=document.getElementById("name").value.trim();
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value.trim();

if(name=="" || email=="" || password==""){
alert("Please fill all fields");
return;
}

let users=JSON.parse(localStorage.getItem("users")) || [];

let exists=users.find(user=>user.email===email);

if(exists){
alert("User already registered");
return;
}

let newUser={
name:name,
email:email,
password:password
};

users.push(newUser);

localStorage.setItem("users",JSON.stringify(users));

alert("Registration successful");

window.location.href="login.html";
}


// LOGIN USER
function loginUser(){

let email=document.getElementById("loginEmail").value.trim();
let password=document.getElementById("loginPassword").value.trim();

let users=JSON.parse(localStorage.getItem("users")) || [];

let validUser=users.find(user=>user.email===email && user.password===password);

if(validUser){

localStorage.setItem("loggedInUser",JSON.stringify(validUser));

window.location.href="dashboard.html";

}else{

alert("Invalid email or password");

}

}


// QUIZ FUNCTION
function submitQuiz(){

let q1=document.querySelector('input[name="q1"]:checked');
let q2=document.querySelector('input[name="q2"]:checked');

if(!q1 || !q2){
alert("Please answer all questions");
return;
}

let score=0;

if(q1.value==="correct") score++;
if(q2.value==="correct") score++;

localStorage.setItem("quizScore",score);

alert("Quiz submitted! Your score: "+score);

window.location.href="dashboard.html";

}


// LOGOUT
function logout(){

localStorage.removeItem("loggedInUser");

window.location.href="login.html";

}


// SESSION + RESULT DISPLAY
window.onload=function(){

let user=JSON.parse(localStorage.getItem("loggedInUser"));
let welcome=document.getElementById("welcomeText");

if(welcome){

if(!user){
window.location.href="login.html";
}

welcome.innerHTML="Welcome "+user.name;

}

let score=localStorage.getItem("quizScore");
let result=document.getElementById("quizResult");

if(result && score){
result.innerHTML="Your Skill Assessment Score: "+score;
}

}
```

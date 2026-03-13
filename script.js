```javascript id="hp48iq"

// REGISTER
function registerUser(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(name==""||email==""||password==""){
alert("Fill all fields");
return;
}

let users=JSON.parse(localStorage.getItem("users"))||[];

users.push({name,email,password});

localStorage.setItem("users",JSON.stringify(users));

alert("Registered successfully");

window.location.href="login.html";

}


// LOGIN
function loginUser(){

let email=document.getElementById("loginEmail").value;
let password=document.getElementById("loginPassword").value;

let users=JSON.parse(localStorage.getItem("users"))||[];

let user=users.find(u=>u.email===email && u.password===password);

if(user){

localStorage.setItem("loggedInUser",JSON.stringify(user));

window.location.href="dashboard.html";

}else{

alert("Invalid login");

}

}


// QUIZ
function submitQuiz(){

let q1=document.querySelector('input[name="q1"]:checked');
let q2=document.querySelector('input[name="q2"]:checked');

if(!q1||!q2){
alert("Answer all questions");
return;
}

let score=0;

if(q1.value==="correct") score++;
if(q2.value==="correct") score++;

localStorage.setItem("quizScore",score);

window.location.href="dashboard.html";

}


// DASHBOARD
window.onload=function(){

let user=JSON.parse(localStorage.getItem("loggedInUser"));

let welcome=document.getElementById("welcomeText");

if(welcome && user){
welcome.innerHTML="Welcome "+user.name;
}

let score=localStorage.getItem("quizScore");

let result=document.getElementById("quizResult");

if(result && score){
result.innerHTML="Quiz Score: "+score;
}

}


// LOGOUT
function logout(){

localStorage.removeItem("loggedInUser");

window.location.href="login.html";

}
```

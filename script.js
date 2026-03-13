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


// LOGOUT
function logout(){

localStorage.removeItem("loggedInUser");

window.location.href="login.html";

}


// SESSION CHECK
window.onload=function(){

let user=JSON.parse(localStorage.getItem("loggedInUser"));

let welcome=document.getElementById("welcomeText");

if(welcome){

if(!user){
window.location.href="login.html";
}

welcome.innerHTML="Welcome "+user.name;

}

}

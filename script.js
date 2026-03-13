function registerUser(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(name=="" || email=="" || password==""){
alert("Please fill all fields");
return;
}

let user={
name:name,
email:email,
password:password
};

localStorage.setItem(email,JSON.stringify(user));

alert("Registration successful");

window.location.href="login.html";

}


function loginUser(){

let email=document.getElementById("loginEmail").value;
let password=document.getElementById("loginPassword").value;

let storedUser=localStorage.getItem(email);

if(storedUser==null){
alert("User not found");
return;
}

let user=JSON.parse(storedUser);

if(user.password===password){

localStorage.setItem("loggedInUser",email);

alert("Login successful");

window.location.href="dashboard.html";

}
else{

alert("Wrong password");

}

}


function logout(){

localStorage.removeItem("loggedInUser");

window.location.href="login.html";

}


window.onload=function(){

let email=localStorage.getItem("loggedInUser");

if(email){

let user=JSON.parse(localStorage.getItem(email));

let info=document.getElementById("userInfo");

if(info){
info.innerHTML="Logged in as: "+user.name;
}

}

}
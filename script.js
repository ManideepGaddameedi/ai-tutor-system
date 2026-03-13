```javascript id="7g31si"

// =====================
// REGISTER USER
// =====================
function registerUser(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(name=="" || email=="" || password==""){
alert("Please fill all fields");
return;
}

let users=JSON.parse(localStorage.getItem("users")) || [];

let exists=users.find(user=>user.email===email);

if(exists){
alert("User already exists");
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



// =====================
// LOGIN USER
// =====================
function loginUser(){

let email=document.getElementById("loginEmail").value;
let password=document.getElementById("loginPassword").value;

let users=JSON.parse(localStorage.getItem("users")) || [];

let validUser=users.find(user=>user.email===email && user.password===password);

if(validUser){

localStorage.setItem("loggedInUser",JSON.stringify(validUser));

alert("Login successful");

window.location.href="dashboard.html";

}else{

alert("Invalid email or password");

}

}
```

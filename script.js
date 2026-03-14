// Registration
function registerUser(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if(name && email && password){
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("quizScore", "0");
        localStorage.setItem("level", "Beginner");
        alert("Registration Successful!");
        window.location.href = "login.html";
    } else {
        alert("Please fill all fields");
    }
}

// Login
function loginUser(){
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");
    
    if(email === savedEmail && password === savedPassword){
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login Credentials");
    }
}

// Dashboard welcome message
window.onload = function(){
    let name = localStorage.getItem("name");
    let welcome = document.getElementById("welcomeText");
    let levelDisplay = document.getElementById("studentLevel");
    let quizScoreDisplay = document.getElementById("quizScore");
    
    if(welcome && name){
        welcome.innerText = "Welcome, " + name + "!";
    }
    
    if(levelDisplay){
        let level = localStorage.getItem("level") || "Beginner";
        levelDisplay.innerText = "Your Learning Level: " + level;
    }
    
    if(quizScoreDisplay){
        let score = localStorage.getItem("quizScore") || 0;
        quizScoreDisplay.innerText = "Quiz Score: " + score + "%";
    }
}

// Logout
function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}

// Quiz submission
function submitQuiz(){
    let score = 0;
    let total = 3;
    
    // Check each question
    for(let i=1; i<=3; i++){
        let selected = document.querySelector(`input[name="q${i}"]:checked`);
        if(selected && selected.value === "correct"){
            score++;
        }
    }
    
    let percentage = Math.round((score/total) * 100);
    localStorage.setItem("quizScore", percentage);
    
    // Set learning level based on score
    let level;
    if(percentage >= 80) level = "Advanced";
    else if(percentage >= 60) level = "Intermediate";
    else level = "Beginner";
    
    localStorage.setItem("level", level);
    
    let resultDiv = document.getElementById("quizResult");
    resultDiv.innerHTML = `
        <div style="padding:15px; background:#e8f5e8; border-radius:5px;">
            <h3>Your Score: ${percentage}%</h3>
            <p>Your Level: <strong>${level}</strong></p>
            <button class="btn" onclick="window.location.href='tutor.html'">Continue to AI Tutor</button>
        </div>
    `;
}

// AI Tutor Chat
function askQuestion(){
    let question = document.getElementById("question").value;
    let chatbox = document.getElementById("chatbox");
    
    if(question.trim() === "") return;
    
    // Add user question
    chatbox.innerHTML += `<p><b>You:</b> ${question}</p>`;
    
    // Generate AI response based on level and question
    let level = localStorage.getItem("level") || "Beginner";
    let score = localStorage.getItem("quizScore") || 0;
    let response = generateAIResponse(question, level, score);
    
    setTimeout(() => {
        chatbox.innerHTML += `<p><b>AI Tutor:</b> ${response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
    
    document.getElementById("question").value = "";
}

function generateAIResponse(question, level, score){
    question = question.toLowerCase();
    
    // Simple keyword-based responses (replace with real AI API later)
    if(question.includes("array")){
        if(level === "Beginner"){
            return "An array is like a row of boxes where each box holds one piece of data. You can access any box directly using its position (index). Example: let fruits = ['apple', 'banana']; fruits[0] gives 'apple'.";
        } else {
            return "Arrays store elements in contiguous memory locations, allowing O(1) random access. In JavaScript: let arr = new Array(10); arr[5] = 'value';";
        }
    }
    
    if(question.includes("stack")){
        return "A stack follows LIFO (Last In, First Out). Think of plates - you add/remove from the top only. Methods: push(), pop(), peek().";
    }
    
    if(question.includes("practice") || question.includes("exercise")){
        return `Based on your ${level} level (${score}% quiz), here's a practice problem: Write a function to reverse an array without using built-in methods. Try it and share your code!`;
    }
    
    return `Great question about "${question}"! Based on your ${level} level, I recommend practicing arrays and stacks first. Your quiz score was ${score}%. What specific concept would you like explained?`;
}

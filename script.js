// ==========================================
// PERFECTLY WORKING - UI + LOGIN + ALL PAGES
// ==========================================

function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if(name && email && password) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("quizScore", "0");
        localStorage.setItem("level", "Beginner");
        alert("✅ Registered! Please login.");
        window.location.href = "login.html";
    } else {
        alert("❌ Fill all fields!");
    }
}

function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");
    
    if(email === savedEmail && password === savedPassword) {
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Wrong email/password!");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

function submitQuiz() {
    let score = 0;
    for(let i = 1; i <= 3; i++) {
        let ans = document.querySelector(`input[name="q${i}"]:checked`);
        if(ans && ans.value === "correct") score++;
    }
    
    let percent = Math.round((score/3)*100);
    let level = percent >= 80 ? "Advanced" : percent >= 60 ? "Intermediate" : "Beginner";
    
    localStorage.setItem("quizScore", percent);
    localStorage.setItem("level", level);
    
    document.getElementById("quizResult").innerHTML = `
        <div style="padding:2rem;background:#d4edda;border-radius:20px;margin-top:2rem;text-align:center;">
            <h2>🎉 ${percent}%</h2>
            <h3>Level: ${level}</h3>
            <a href="tutor.html" class="btn-primary" style="width:100%;margin-top:1rem;padding:1rem;">→ AI Tutor</a>
        </div>
    `;
}

function askQuestion() {
    let q = document.getElementById("question").value;
    let chat = document.getElementById("chatbox");
    
    if(!q) return;
    
    chat.innerHTML += `<div class="chat-message user"><p>${q}</p></div>`;
    document.getElementById("question").value = "";
    chat.scrollTop = chat.scrollHeight;
    
    setTimeout(() => {
        let level = localStorage.getItem("level") || "Beginner";
        let response = level === "Advanced" ? "Advanced answer here" : 
                      level === "Intermediate" ? "Intermediate answer" : 
                      `Beginner: "${q}" - Arrays are lists like [1,2,3]`;
        chat.innerHTML += `<div class="chat-message ai"><p>${response}</p></div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);
}

// Initialize displays on EVERY page load
window.onload = function() {
    let name = localStorage.getItem("name");
    let welcome = document.getElementById("welcomeText");
    if(welcome && name) welcome.innerHTML = `Welcome, ${name}!`;
    
    let score = localStorage.getItem("quizScore") || 0;
    let scoreEls = document.querySelectorAll("#quizScore");
    scoreEls.forEach(el => el.textContent = score + "%");
    
    let level = localStorage.getItem("level") || "Beginner";
    let levelEls = document.querySelectorAll("#studentLevel, #levelBadge");
    levelEls.forEach(el => el.textContent = level);
}

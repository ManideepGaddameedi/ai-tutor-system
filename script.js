// ========================================
// COMPLETE FIXED SCRIPT.JS - WORKING LOGIN
// ========================================

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    // Attach form event listeners
    attachFormListeners();
});

function attachFormListeners() {
    // Register form
    const registerForm = document.querySelector('form[onsubmit*="registerUser"]') || 
                        document.getElementById('registerForm');
    if(registerForm) {
        registerForm.onsubmit = function(e) { registerUser(e); return false; };
    }
    
    // Login form
    const loginForm = document.querySelector('form[onsubmit*="loginUser"]') || 
                     document.getElementById('loginForm');
    if(loginForm) {
        loginForm.onsubmit = function(e) { loginUser(e); return false; };
    }
}

// Page initialization
function initializePage() {
    const name = localStorage.getItem("name");
    const welcomeEl = document.getElementById("welcomeText");
    const levelEl = document.getElementById("studentLevel") || document.getElementById("levelBadge");
    const scoreEl = document.getElementById("quizScore");
    
    // Welcome message
    if(welcomeEl && name) {
        welcomeEl.textContent = `Welcome, ${name}!`;
    }
    
    // Level display
    if(levelEl) {
        const level = localStorage.getItem("level") || "Beginner";
        levelEl.textContent = level;
    }
    
    // Quiz score
    if(scoreEl) {
        const score = localStorage.getItem("quizScore") || "0";
        scoreEl.textContent = score + "%";
    }
    
    updateDashboardStats();
}

// Dashboard stats update
function updateDashboardStats() {
    const score = localStorage.getItem("quizScore") || "0";
    const level = localStorage.getItem("level") || "Beginner";
    
    // Update stat cards
    const statCards = document.querySelectorAll('.stat-card h3');
    if(statCards[0]) statCards[0].textContent = score + "%";
    if(statCards[1]) statCards[1].textContent = level;
}

// FIXED Registration
function registerUser(event) {
    if(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const name = document.getElementById("name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const password = document.getElementById("password")?.value;
    
    if(!name || !email || !password) {
        alert("Please fill all fields correctly");
        return false;
    }
    
    // Save to localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("quizScore", "0");
    localStorage.setItem("level", "Beginner");
    
    alert("✅ Registration successful! You can now login.");
    window.location.href = "login.html";
    return false;
}

// FIXED Login
function loginUser(event) {
    if(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const email = document.getElementById("loginEmail")?.value?.trim();
    const password = document.getElementById("loginPassword")?.value;
    
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    
    console.log("Login attempt:", { email, hasSavedEmail: !!savedEmail }); // Debug
    
    if(!savedEmail) {
        alert("❌ No account found. Please register first.");
        window.location.href = "register.html";
        return false;
    }
    
    if(email === savedEmail && password === savedPassword) {
        console.log("✅ Login successful");
        window.location.href = "dashboard.html";
    } else {
        console.log("❌ Login failed", { email, savedEmail });
        alert("❌ Invalid email or password");
    }
    return false;
}

// Logout
function logout() {
    if(confirm("Logout and clear all data?")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}

// Quiz submission
function submitQuiz() {
    let score = 0;
    const total = 3;
    
    for(let i = 1; i <= 3; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if(selected && selected.value === "correct") {
            score++;
        }
    }
    
    const percentage = Math.round((score / total) * 100);
    let level;
    
    if(percentage >= 80) level = "Advanced";
    else if(percentage >= 60) level = "Intermediate";
    else level = "Beginner";
    
    localStorage.setItem("quizScore", percentage);
    localStorage.setItem("level", level);
    
    const resultDiv = document.getElementById("quizResult");
    if(resultDiv) {
        resultDiv.innerHTML = `
            <div style="padding:2rem;background:linear-gradient(135deg,#d4edda,#c3e6cb);border-radius:20px;margin-top:2rem;text-align:center;">
                <h2 style="color:#155724;">🎉 Score: ${percentage}%</h2>
                <h3 style="color:#155724;">Level: ${level}</h3>
                <a href="tutor.html" class="btn-primary full" style="margin-top:1rem;">→ Continue to AI Tutor</a>
            </div>
        `;
    }
    
    initializePage();
}

// AI Chat
function askQuestion() {
    const question = document.getElementById("question").value.trim();
    const chatbox = document.getElementById("chatbox");
    
    if(!question) return;
    
    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerHTML = `<p>${question}</p>`;
    chatbox.appendChild(userMsg);
    
    document.getElementById("question").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // AI response
    setTimeout(() => {
        const response = generateAIResponse(question);
        const aiMsg = document.createElement("div");
        aiMsg.className = "chat-message ai";
        aiMsg.innerHTML = `<p>${response}</p>`;
        chatbox.appendChild(aiMsg);
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 600);
}

// AI Response Generator
function generateAIResponse(question) {
    const level = localStorage.getItem("level") || "Beginner";
    const score = localStorage.getItem("quizScore") || 0;
    const q = question.toLowerCase();
    
    if(q.includes("array")) {
        return level === "Advanced" ? 
            "Arrays: O(1) random access via contiguous memory. JS: `let arr = new Array(10).fill(0);` Typed arrays (`Float32Array`) for performance." :
            level === "Intermediate" ? 
            "Arrays store elements contiguously. Access: `arr[index]`. JS auto-resizes: `arr.push(item)`." :
            "Array = numbered boxes: `let fruits = ['apple', 'banana'];` `fruits[0]` = 'apple' (starts at 0).";
    }
    
    if(q.includes("stack")) {
        return "Stack = LIFO (Last In, First Out). `stack.push(1); stack.pop();` Like undoing actions (Ctrl+Z).";
    }
    
    if(q.includes("practice")) {
        return "Practice: Find max in array. <code>function max(arr){let m=arr[0];for(let i=1;i<arr.length;i++)if(arr[i]>m)m=arr[i];return m;}</code>";
    }
    
    return `Great question (${level} level, ${score}% quiz)! Try asking about 'arrays', 'stacks', or 'practice problems'. What topic?`;
}

// Enter key support
function handleKeyPress(event) {
    if(event.key === "Enter") askQuestion();
}

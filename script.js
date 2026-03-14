// ========================================
// PERFECT SCRIPT.JS - UI + LOGIN WORKING
// ========================================

// Use window.onload to ensure CSS loads first (KEEPS UI)
window.onload = function() {
    initializePage();
};

// Initialize all page elements
function initializePage() {
    // Welcome message
    let name = localStorage.getItem("name");
    let welcome = document.getElementById("welcomeText");
    if(welcome && name) {
        welcome.textContent = "Welcome, " + name + "!";
    }
    
    // Level displays
    let levelDisplays = document.querySelectorAll('#studentLevel, #levelBadge');
    let level = localStorage.getItem("level") || "Beginner";
    levelDisplays.forEach(el => {
        if(el) el.textContent = level;
    });
    
    // Quiz score displays
    let scoreDisplays = document.querySelectorAll('#quizScore');
    let score = localStorage.getItem("quizScore") || "0";
    scoreDisplays.forEach(el => {
        if(el) el.textContent = score + "%";
    });
    
    // Dashboard stats
    updateDashboardStats();
}

// Dashboard statistics
function updateDashboardStats() {
    let score = localStorage.getItem("quizScore") || "0";
    let level = localStorage.getItem("level") || "Beginner";
    
    // Stat cards
    let statCards = document.querySelectorAll('.stat-card h3');
    if(statCards[0]) statCards[0].textContent = score + "%";
    if(statCards[1]) statCards[1].textContent = level;
}

// 🔥 PERFECT Registration (works with your HTML onclick)
function registerUser(event) {
    if(event) event.preventDefault();
    
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    if(!name || !name.value || !email || !email.value || !password || !password.value) {
        alert("❌ Please fill all fields");
        return;
    }
    
    localStorage.setItem("name", name.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    localStorage.setItem("quizScore", "0");
    localStorage.setItem("level", "Beginner");
    
    alert("✅ Registration successful!");
    window.location.href = "login.html";
}

// 🔥 PERFECT Login (works with your HTML onclick)
function loginUser(event) {
    if(event) event.preventDefault();
    
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    
    if(!loginEmail || !loginPassword) {
        alert("❌ Login fields not found");
        return;
    }
    
    let email = loginEmail.value;
    let password = loginPassword.value;
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");
    
    if(email === savedEmail && password === savedPassword && savedEmail) {
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid email or password");
    }
}

// Logout
function logout() {
    if(confirm("Logout?")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}

// Quiz submission
function submitQuiz() {
    let score = 0;
    let total = 3;
    
    for(let i = 1; i <= 3; i++) {
        let selected = document.querySelector(`input[name="q${i}"]:checked`);
        if(selected && selected.value === "correct") score++;
    }
    
    let percentage = Math.round((score/total)*100);
    let level = percentage >= 80 ? "Advanced" : percentage >= 60 ? "Intermediate" : "Beginner";
    
    localStorage.setItem("quizScore", percentage);
    localStorage.setItem("level", level);
    
    let resultDiv = document.getElementById("quizResult");
    if(resultDiv) {
        resultDiv.innerHTML = `
            <div style="padding:2rem;background:linear-gradient(135deg,#d4edda,#c3e6cb);border-radius:20px;margin-top:2rem;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="color:#155724;">🎉 ${percentage}%</h2>
                <h3 style="color:#155724;">${level}</h3>
                <a href="tutor.html" class="btn-primary full" style="margin-top:1rem;">Continue to AI Tutor</a>
            </div>
        `;
    }
    
    initializePage();
}

// AI Chat
function askQuestion() {
    let questionInput = document.getElementById("question");
    let chatbox = document.getElementById("chatbox");
    
    if(!questionInput || !chatbox) return;
    
    let question = questionInput.value.trim();
    if(!question) return;
    
    // User message
    let userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerHTML = `<p>${question}</p>`;
    chatbox.appendChild(userMsg);
    
    questionInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // AI response
    setTimeout(() => {
        let response = generateAIResponse(question);
        let aiMsg = document.createElement("div");
        aiMsg.className = "chat-message ai";
        aiMsg.innerHTML = `<p>${response}</p>`;
        chatbox.appendChild(aiMsg);
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 600);
}

// Smart AI responses
function generateAIResponse(question) {
    let level = localStorage.getItem("level") || "Beginner";
    let score = localStorage.getItem("quizScore") || 0;
    let q = question.toLowerCase();
    
    if(q.includes("array")) {
        return level === "Advanced" ? 
            "📚 <strong>Arrays:</strong> O(1) access via contiguous memory. <code>let arr = new Float32Array(100);</code>" :
            "📦 Array = numbered boxes: <code>let fruits = ['apple', 'banana']; fruits[0] = 'apple'</code>";
    }
    
    if(q.includes("stack")) return "🗃️ Stack = LIFO. <code>stack.push(1); stack.pop();</code>";
    if(q.includes("practice")) return "✍️ Find max: <code>function max(arr){let m=arr[0];for(let i=1;i<arr.length;i++)if(arr[i]>m)m=arr[i];return m;}</code>";
    
    return `🤖 Hi (${level}, ${score}%)! Ask about 'arrays', 'stacks', or 'practice'. What's your question?`;
}

// Enter key in chat
function handleKeyPress(event) {
    if(event.key === "Enter") askQuestion();
}

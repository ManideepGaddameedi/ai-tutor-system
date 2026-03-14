// Global initialization
window.onload = function() {
    initializePage();
};

// Page-specific initialization
function initializePage() {
    let name = localStorage.getItem("name");
    let welcome = document.getElementById("welcomeText");
    let levelDisplay = document.getElementById("studentLevel");
    let levelBadge = document.getElementById("levelBadge");
    let quizScoreDisplay = document.getElementById("quizScore");
    
    // Welcome message on dashboard
    if(welcome && name) {
        welcome.innerText = "Welcome, " + name + "!";
    }
    
    // Level display on tutor page
    if(levelDisplay) {
        let level = localStorage.getItem("level") || "Beginner";
        levelDisplay.innerText = "Level: " + level;
    }
    
    if(levelBadge) {
        let level = localStorage.getItem("level") || "Beginner";
        levelBadge.innerText = level;
    }
    
    // Quiz score display
    if(quizScoreDisplay) {
        let score = localStorage.getItem("quizScore") || "0";
        quizScoreDisplay.innerText = score + "%";
    }
    
    // Dashboard stats
    updateDashboardStats();
}

// Update dashboard statistics
function updateDashboardStats() {
    let score = localStorage.getItem("quizScore") || "0";
    let scoreElement = document.querySelector(".stat-card h3");
    let level = localStorage.getItem("level") || "Beginner";
    
    if(scoreElement) {
        scoreElement.innerText = score + "%";
    }
    
    let levelElement = document.querySelectorAll(".stat-card h3")[1];
    if(levelElement) {
        levelElement.innerText = level;
    }
}

// Registration (Updated for form submission)
function registerUser(event) {
    if(event) event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if(name && email && password) {
        // Store user data
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("quizScore", "0");
        localStorage.setItem("level", "Beginner");
        localStorage.setItem("lessonsCompleted", "0");
        
        alert("Registration Successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert("Please fill all fields");
    }
}

// Login (Updated for form submission)
function loginUser(event) {
    if(event) event.preventDefault();
    
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");
    
    if(email === savedEmail && password === savedPassword && savedEmail) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login Credentials");
    }
}

// Logout
function logout() {
    if(confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}

// Quiz submission
function submitQuiz() {
    let score = 0;
    let total = 3;
    
    // Check each question
    for(let i = 1; i <= 3; i++) {
        let selected = document.querySelector(`input[name="q${i}"]:checked`);
        if(selected && selected.value === "correct") {
            score++;
        }
    }
    
    let percentage = Math.round((score / total) * 100);
    let level;
    
    // Determine learning level
    if(percentage >= 80) {
        level = "Advanced";
    } else if(percentage >= 60) {
        level = "Intermediate";
    } else {
        level = "Beginner";
    }
    
    // Save results
    localStorage.setItem("quizScore", percentage);
    localStorage.setItem("level", level);
    
    // Display results
    let resultDiv = document.getElementById("quizResult");
    if(resultDiv) {
        resultDiv.innerHTML = `
            <div style="padding: 2rem; background: linear-gradient(135deg, #e8f5e8, #d4edda); border-radius: 20px; margin-top: 2rem; text-align: center;">
                <h2 style="color: #155724; margin-bottom: 1rem;">🎉 Your Score: ${percentage}%</h2>
                <h3 style="color: #155724;">Learning Level: <strong>${level}</strong></h3>
                <p style="color: #495057; margin: 1rem 0;">Great job! Your personalized learning path is ready.</p>
                <a href="tutor.html" class="btn-primary full" style="margin-top: 1rem;">Continue to AI Tutor</a>
            </div>
        `;
    }
    
    // Update page stats
    initializePage();
}

// AI Tutor Chat (Enhanced responses)
function askQuestion() {
    let question = document.getElementById("question").value;
    let chatbox = document.getElementById("chatbox");
    
    if(!question.trim()) return;
    
    // Add user message
    let userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerHTML = `<p>${question}</p>`;
    chatbox.appendChild(userMessage);
    
    // Clear input
    document.getElementById("question").value = "";
    
    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // Simulate typing and generate AI response
    setTimeout(() => {
        let response = generateAIResponse(question);
        let aiMessage = document.createElement("div");
        aiMessage.className = "chat-message ai";
        aiMessage.innerHTML = `<p>${response}</p>`;
        chatbox.appendChild(aiMessage);
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 800);
}

// Generate intelligent AI responses based on level
function generateAIResponse(question) {
    let level = localStorage.getItem("level") || "Beginner";
    let score = localStorage.getItem("quizScore") || 0;
    question = question.toLowerCase();
    
    // Programming concepts
    if(question.includes("array") || question.includes("arrays")) {
        if(level === "Beginner") {
            return "An <strong>array</strong> is like a row of numbered boxes. Each box holds one piece of data. Example: <code>let fruits = ['apple', 'banana', 'orange'];</code> fruits[0] gives 'apple' (index starts at 0).";
        } else if(level === "Intermediate") {
            return "Arrays store elements in <strong>contiguous memory</strong> allowing O(1) access. JavaScript: <code>let arr = new Array(5).fill(0);</code> Dynamic arrays resize automatically.";
        } else {
            return "Arrays provide <strong>O(1) random access</strong>. Advanced: Multi-dimensional arrays or typed arrays like <code>Float32Array</code> for performance-critical applications.";
        }
    }
    
    if(question.includes("stack") || question.includes("lifo")) {
        return "A <strong>stack</strong> follows LIFO (Last In, First Out). Operations: <code>push()</code> adds to top, <code>pop()</code> removes from top. JavaScript example: <code>let stack = []; stack.push(1); stack.pop();</code>";
    }
    
    if(question.includes("queue") || question.includes("fifo")) {
        return "A <strong>queue</strong> follows FIFO (First In, First Out). JavaScript: <code>let queue = []; queue.push(1); let item = queue.shift();</code> Use <code>unshift/push</code> for efficient deque.";
    }
    
    if(question.includes("practice") || question.includes("exercise") || question.includes("problem")) {
        if(level === "Beginner") {
            return "Practice: Write a function to find the largest number in an array. <br><code>function findMax(arr) { let max = arr[0]; for(let i=1; i<arr.length; i++) { if(arr[i]>max) max=arr[i]; } return max; }</code>";
        } else {
            return "Challenge: Reverse an array in-place without extra space. Hint: Use two pointers from both ends! Share your solution.";
        }
    }
    
    if(question.includes("quiz") || question.includes("score")) {
        return `Your current quiz score is <strong>${score}%</strong> (${level} level). Want another practice quiz or explanation of any topic?`;
    }
    
    // General guidance
    return `Great question about "${question}"! Based on your ${level} level (${score}% quiz score), I recommend focusing on ${level === "Advanced" ? "advanced data structures" : level === "Intermediate" ? "algorithms" : "arrays and stacks"} first. What specific topic interests you most?`;
}

// Handle Enter key in chat input
function handleKeyPress(event) {
    if(event.key === 'Enter') {
        askQuestion();
    }
}

// Smooth scroll for anchor links (if needed)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

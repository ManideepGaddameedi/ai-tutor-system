function registerUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if(name && email && password) {
        localStorage.name = name;
        localStorage.email = email;
        localStorage.password = password;
        localStorage.quizScore = 0;
        localStorage.level = "Beginner";
        alert("Registered! Go login.");
        window.location.href = "login.html";
    }
}

function loginUser() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    
    if(email == localStorage.email && password == localStorage.password) {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong email/password");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

function submitQuiz() {
    var score = 0;
    if(document.querySelector('input[name="q1"]:checked').value == "correct") score++;
    if(document.querySelector('input[name="q2"]:checked').value == "correct") score++;
    if(document.querySelector('input[name="q3"]:checked').value == "correct") score++;
    
    var percent = Math.round(score/3*100);
    localStorage.quizScore = percent;
    localStorage.level = percent >= 80 ? "Advanced" : percent >= 60 ? "Intermediate" : "Beginner";
    
    document.getElementById("quizResult").innerHTML = 
        "<h2>" + percent + "%</h2><h3>" + localStorage.level + "</h3><a href='tutor.html' class='btn'>AI Tutor</a>";
}

function askQuestion() {
    var q = document.getElementById("question");
    var chat = document.getElementById("chatbox");
    chat.innerHTML += "<p><b>You:</b> " + q.value + "</p>";
    q.value = "";
    
    setTimeout(function() {
        var level = localStorage.level;
        chat.innerHTML += "<p><b>AI:</b> " + (level == "Beginner" ? "Arrays = lists [1,2,3]" : "Advanced answer") + "</p>";
    }, 500);
}

window.onload = function() {
    if(localStorage.name) {
        var welcome = document.getElementById("welcomeText");
        if(welcome) welcome.innerHTML = "Welcome " + localStorage.name;
    }
    
    if(localStorage.quizScore) {
        var scoreEls = document.querySelectorAll("#quizScore");
        for(var i=0; i<scoreEls.length; i++) {
            scoreEls[i].innerHTML = localStorage.quizScore + "%";
        }
    }
    
    if(localStorage.level) {
        var levelEls = document.querySelectorAll("#studentLevel, #levelBadge");
        for(var i=0; i<levelEls.length; i++) {
            levelEls[i].innerHTML = localStorage.level;
        }
    }
}

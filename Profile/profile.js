document.querySelector("button").addEventListener("click", loginfun);

var userdata = JSON.parse(localStorage.getItem("userarr")) || [];

function loginfun() {
    var in_mob = document.querySelector("#mob").value;

    if (in_mob == "") {
        alert("Enter mobile to login");
        return;
    }

    var userFound = false;
    for (var a = 0; a < userdata.length; a++) {
        if (in_mob == userdata[a].mob) {
            userFound = true;
            if (checkpass(a)) {
                alert("Login successful");
                document.querySelector("#mob").value = "";
                document.querySelector("#pass").value = "";
                window.location.href = "../Landingpage/index.html";
                return;
            } else {
                alert("Wrong password");
                document.querySelector("#pass").value = "";
                return;
            }
        }
    }

    if (!userFound) {
        alert("You don't have an account, sign up first");
        window.location.href = "signup.html";
    }
}

function checkpass(a) {
    var in_pass = document.querySelector("#pass").value;
    return userdata[a].password == in_pass;
}

// HYPERLINKS
document.getElementById('profile').addEventListener('click', function() {
    window.location.href = "signup.html";
});
document.getElementById('landingPage').addEventListener('click', function() {
    window.location.href = "../Landingpage/index.html";
});
document.getElementById('signUp').addEventListener('click', function() {
    window.location.href = "../Profile/signup.html";
});

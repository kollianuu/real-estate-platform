function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error("Error:", error));
}

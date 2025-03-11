function addProperty() {
    const user_id = localStorage.getItem("user_id");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const property_type = document.getElementById("property_type").value;
    const image_url = document.getElementById("image_url").value;

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll("nav ul li a").forEach(anchor => {
            anchor.addEventListener("click", function(event) {
                event.preventDefault();
                const targetId = this.getAttribute("href").split(".")[0]; // Extract target without ".html"
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: "smooth"
                    });
                } else {
                    window.location.href = this.getAttribute("href"); // Redirect if not found
                }
            });
        });
    });
    
    fetch("http://localhost:5000/properties/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, title, description, price, location, property_type, image_url })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.reload();
    })

    
    .catch(error => console.error("Error:", error));
}

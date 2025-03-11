document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/properties")
        .then(response => response.json())
        .then(data => {
            const propertiesDiv = document.getElementById("properties");
            data.forEach(property => {
                let propHTML = `
                    <div style="border: 1px solid #ddd; padding: 10px; width: 200px; background: white;">
                        <img src="${property.image_url}" alt="Property Image" style="width: 100%;">
                        <h3>${property.title}</h3>
                        <p>Price: $${property.price}</p>
                        <p>Location: ${property.location}</p>
                    </div>
                `;
                propertiesDiv.innerHTML += propHTML;
            });
        })
        .catch(error => console.error("Error fetching properties:", error));
});

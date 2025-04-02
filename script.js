// Handle Image Upload
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector(".container").style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
});

// Handle Text Change
function updateText() {
    let userText = document.getElementById("textInput").value;
    document.getElementById("previewText").textContent = userText || "Embossed Text";
}

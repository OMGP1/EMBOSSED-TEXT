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

document.getElementById("textInput").addEventListener("input", function() {
    document.getElementById("previewText").textContent = this.value || "Embossed Text";
});

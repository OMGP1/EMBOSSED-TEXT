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
    let textElement = document.getElementById("previewText");

    textElement.textContent = userText || "Embossed Text";
}

// Make Text Draggable Inside Image
const textElement = document.getElementById("previewText");
const container = document.querySelector(".container");

textElement.addEventListener("mousedown", function(event) {
    let shiftX = event.clientX - textElement.getBoundingClientRect().left;
    let shiftY = event.clientY - textElement.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        let containerRect = container.getBoundingClientRect();
        let textWidth = textElement.offsetWidth;
        let textHeight = textElement.offsetHeight;

        let newLeft = pageX - shiftX;
        let newTop = pageY - shiftY;

        // Ensure text stays inside the container
        if (newLeft < containerRect.left) newLeft = containerRect.left;
        if (newTop < containerRect.top) newTop = containerRect.top;
        if (newLeft + textWidth > containerRect.right) newLeft = containerRect.right - textWidth;
        if (newTop + textHeight > containerRect.bottom) newTop = containerRect.bottom - textHeight;

        textElement.style.left = newLeft - containerRect.left + "px";
        textElement.style.top = newTop - containerRect.top + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    textElement.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", onMouseMove);
    }, { once: true });
});

textElement.ondragstart = function() {
    return false; // Prevent default drag behavior
};

// Ensure text positioning is relative to the container
textElement.style.position = "absolute";
textElement.style.cursor = "grab";
textElement.style.userSelect = "none";

// Function to Download Image
function downloadImage() {
    html2canvas(document.querySelector(".container")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "edited-image.png";
        link.click();
    });
}

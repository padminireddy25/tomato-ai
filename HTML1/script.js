const imageInput = document.getElementById("imageInput");

const uploadArea = document.getElementById("uploadArea");

const previewContainer =
    document.getElementById("previewContainer");

const previewImage =
    document.getElementById("previewImage");

const detectButton =
    document.getElementById("detectButton");

const resultContent =
    document.getElementById("resultContent");

const statusBadge =
    document.getElementById("statusBadge");


// ================= IMAGE UPLOAD =================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    showImage(file);

});


function showImage(file) {

    if (!file.type.startsWith("image/")) {

        alert("Please upload an image file.");

        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        previewImage.src = event.target.result;

        uploadArea.style.display = "none";

        previewContainer.style.display = "block";

        detectButton.disabled = false;

        statusBadge.textContent = "Image Ready";

    };


    reader.readAsDataURL(file);
}


// ================= REMOVE IMAGE =================

function removeImage() {

    imageInput.value = "";

    previewImage.src = "";

    uploadArea.style.display = "flex";

    previewContainer.style.display = "none";

    detectButton.disabled = true;

    statusBadge.textContent = "Waiting";


    resultContent.innerHTML = `

        <div class="result-placeholder">

            <div>🌱</div>

            <h3>No Detection Yet</h3>

            <p>
                Upload a tomato leaf image and
                click "Detect Disease".
            </p>

        </div>

    `;
}


// ================= DETECT DISEASE =================

function detectDisease() {

    if (!imageInput.files.length) {

        alert("Please upload an image first.");

        return;
    }


    // Loading state

    detectButton.disabled = true;

    detectButton.textContent = "🔄 Analyzing...";

    statusBadge.textContent = "Analyzing";


    resultContent.innerHTML = `

        <div class="result-placeholder">

            <div>🤖</div>

            <h3>Analyzing Image...</h3>

            <p>
                Our AI model is analyzing the
                tomato leaf.
            </p>

        </div>

    `;


    // Temporary simulation

    setTimeout(function () {

        showPrediction();

    }, 2000);

}


// ================= SHOW RESULT =================

function showPrediction() {

    const disease = "Tomato Early Blight";

    const confidence = 94.7;


    statusBadge.textContent = "Completed";

    detectButton.disabled = false;

    detectButton.textContent = "🔬 Detect Again";


    resultContent.innerHTML = `

        <div class="prediction">

            <div class="prediction-icon">
                🍂
            </div>

            <h2>${disease}</h2>


            <div class="confidence">

                <div class="confidence-top">

                    <span>Confidence</span>

                    <span>${confidence}%</span>

                </div>


                <div class="confidence-bar">

                    <div
                        class="confidence-fill"
                        style="width: ${confidence}%"
                    ></div>

                </div>

            </div>


            <div class="info-box">

                <strong>Possible symptoms:</strong>

                <br><br>

                Dark circular spots may appear on
                older leaves, often surrounded by
                yellowing tissue.

            </div>

        </div>

    `;
}


// ================= DRAG & DROP =================

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.style.borderColor = "#1d8c46";

});


uploadArea.addEventListener("dragleave", function () {

    uploadArea.style.borderColor = "#b8d6c0";

});


uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadArea.style.borderColor = "#b8d6c0";


    const file = event.dataTransfer.files[0];


    if (!file) {
        return;
    }


    imageInput.files = event.dataTransfer.files;

    showImage(file);

});
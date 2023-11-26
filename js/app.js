const yourName = document.querySelector("#YourName");
const yourEmail = document.querySelector("#email");
const yourNote = document.querySelector("#YourNote");
const btn = document.querySelector("#addInfo");
const pictureInput = document.querySelector("#picture");
const content = document.querySelector("#content")
const data = [];
let selectedPicture = null;
const picture = pictureInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    selectedPicture = event.target.files[0];
    if (selectedPicture) {
        console.log("selectedFile", selectedPicture);
    } else {
        console.log('No file selected.');
    }
}

btn.addEventListener("click", function () {
    const name = yourName.value.trim()
    const email = yourEmail.value.trim()
    const note = yourNote.value.trim()
    if (name && email && note) {
        let myObj = {
            name,
            email,
            note,
            selectedPicture,
            created: new Date().getMilliseconds()
        }
        data.push(myObj)
        showNotification("success", "Infos added successfully");
        updateContent()
        yourName.value = "";
        yourEmail.value = "";
        yourNote.value = "";
        selectedPicture = null;
        console.log("data", data)
    } else {
        showNotification("error", 'Please fill out all fields!');
    }

})

// Toasify message
const showNotification = (type, message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: type === "error" ? "#ff4d4d" : 'linear-gradient(to right, #00b09b, #96c93d)'
    }).showToast();
};
// Delete Card
const deleteCard = (id) => {
    const index = data.findIndex(item => item.created === id);
    if (index !== -1) {
        data.splice(index, 1);
        showNotification("success", "Card deleted successfully");
        updateContent();
    } else {
        showNotification("error", 'Card not found');
    }
}
// Updata Content
const updateContent = () => {
    content.innerHTML = data
        .map((item) => {
            return `
          <div class="card" style="width: 18rem;">
            ${item.selectedPicture ? `<img src=${item.selectedPicture} class="card-img-top" alt="...">` : `<span class="text-danger text-center fs-3">No image!</span>`}
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.email}</p>
              <p class="card-text">${item.note}</p>
              <a href="#" class="btn btn-danger" onclick="deleteCard(${item.created})">Delete Card</a>
            </div>
          </div>
        `;
        })
        .join('');
};


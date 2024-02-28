const emailInput = document.querySelector('.email'),
    usernameInput = document.querySelector('.name'),
    messageInput = document.querySelector('.message');


let errorSpan = document.querySelector('.error');
const acceptBlock = document.querySelector('.accept');
const overlay = document.querySelector('#overlay');
let spinner = document.querySelector(".spinner");

function accept() {
    setTimeout(() => {
        acceptBlock.style.opacity = "1";
        overlay.style.display = "block";
        acceptBlock.style.zIndex = "1546654"
    }, 2000);
};

document.querySelector(".close-outline").onclick = () => {
    acceptBlock.style.opacity = "0";
    overlay.style.display = "none";
    acceptBlock.style.zIndex = "-70";
};

document.querySelector(".send-button").onclick = (e) => {
    e.preventDefault();
    validateInput();
};

function validateInput() {
    let username = usernameInput.value;
    let email = emailInput.value;
    let message = messageInput.value;
    email = email.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username === "" || email === "" || message === "") {
        displayError("Please input all fields");
        return;
    } else if (username.length < 6) {
        displayError("Please enter your full name");
        return;
    } else if (!emailRegex.test(email)) {
        displayError("Invalid email address");
        return;
    } else if (message.length < 20) {
        displayError("Message should contain at least 20 characters");
        return;
    } else {
        sendEmail();
        showSpinner();
        accept();
    }
console.log(`Full name: ${username},Email: ${email} ,message : ${message}`)
}
function showSpinner() {
    spinner.style.display = "block";
    
    setTimeout(() => {
        spinner.style.display = "none";
    }, 1900);
};

function displayError(error) {
    errorSpan.textContent = error;

    setTimeout(() => {
        errorSpan.textContent = ""
    }, 2000)
};

function sendEmail() {
    const serviceId = "service_wd8xmzg";
}

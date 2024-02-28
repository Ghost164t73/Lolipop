let inputBox = document.querySelector('.input-box');
const toTopBtn = document.querySelector('.to-top');
const header = document.querySelector('.header');
const bars = document.querySelector('.bars');
const images = document.querySelector('.image');
const overlay = document.getElementById('overlay');

// DROP DOWN 
const dropDown = document.querySelector('.drop-down-menu');
const isOpen = dropDown.classList.contains("open");
bars.onclick = () => {
    dropDown.classList.toggle("open");
}

function show() {
//SHOW STICKY HEADER
    const windowPosition = window.scrollY;

    if (windowPosition > 100 ) {
        header.classList.add('sticky-header')
    } else {
        header.classList.remove('sticky-header')
    };

    console.log(windowPosition)
//SHOW BACK TO TOP 
    if (windowPosition > 400) {
        toTopBtn.style.transform = 'translateY(0%)';
    } else {
        toTopBtn.style.transform = 'translateY(300%)';
    };

};

window.addEventListener('scroll', () => {
    show();
    fadeInElement();
    dropDown.classList.remove("open");
    activeLink();
});


//MAKE THE INPUT BOX VISIBLE AND DISABLE SCROLLING
const visible = () => {
    setTimeout(() => {
        showInputBox();
    }, 3000);
};


//LOADER
let loader = document.querySelector('.loader');
let second = document.querySelector('.second-section');

window.onscroll = function () {
    const windowScroll = window.scrollY;
    const element = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const scrolled = (windowScroll / (element - windowHeight)) * 100;
    loader.style.width = `${scrolled}%`;
};
//END LOADER

//FADE IN IMAGES AND OTHER ELEMENTS
const fadeIntoPosition = document.querySelectorAll('.fade-in');

function fadeInElement() {
    fadeIntoPosition.forEach(element => {
        const imagePosition = element.getBoundingClientRect().top;
        let windowScroll = window.scrollY - 300;
         
        if (imagePosition < windowScroll) {
            element.classList.add('fade-in-active');
        };

    });
   
};

console.log(module)

//BEGINNING OF INPUTBOX 
let alertSpan = document.querySelector('.alert');
let changeName = document.querySelector('.change-name')
let nameInput = document.querySelector('.name-input');
const submitBtn = document.querySelector('.submit');
const h1 = document.querySelector('.input-heading');
let inputSec = document.querySelector('.input-section');
const span = document.querySelectorAll('.name');

function showInputBox() {
    document.body.style.overflow = 'hidden';
    inputSec.style.visibility = 'visible';
    overlay.style.display = 'block';
};

changeName.addEventListener('click', () => {
    showInputBox();
});

const typeOutName = (name) => {
    setTimeout(() => {
        const typed = new Typed(".name", {
            strings: [`${name}`],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            showCursor: false
        });
    }, 4000);
};

function validateName(name) {
    span.forEach(sp => {
        name = nameInput.value.trim();
        console.log(name)
        
        if (/\d/.test(name)) {
            displayAlert("Name should not contain numbers", "red");
            return;
        };
        
        if (name) {
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            // Store the name in localStorage
            localStorage.setItem('user_name', name);
        };

        if (/[^a-zA-Z]/.test(name) || name.length < 4) {
            displayAlert("Name should be at least 4 letters", "red");
            return;
        }
        
        if (name === "") {
            displayAlert("Please enter your name", "red");
            return
        } else {
            typeOutName(name)
            setTimeout(function () {
                sp.innerText = `${name}`;
            }, 7000);
            displayAlert("Just a sec...", "limegreen")
            accept(name);
            setTimeout(() => {
                removeInputBox();
                h1.textContent = `Hey there! ${name}😊`
            }, 4000);
        };
    });

    nameInput.value = "";
};

submitBtn.addEventListener('click', () => {
    validateName();
});

document.body.addEventListener("keypress", (e) => {

    if (inputSec.style.visibility === "visible") {
        if (e.key === "Enter") {
            validateName();
    }
    };
});


//SET INPUT BOX BACK TO HOW IT WAS
function backToDefault() {
    nameInput.style.display = "block";
    inputBox.style.padding = "30px";
    submitBtn.style.display = "block";
}

// Check if there's a stored name on page load
document.addEventListener('DOMContentLoaded', () => {
    span.forEach(sp => {
        let storedName = localStorage.getItem('user_name');
        if (storedName) {
            sp.innerText = `${storedName}`;
            h1.innerText = `Hey there! ${storedName} 😊`;
            h1.style.color = 'green';
            submitBtn.textContent = "change name";
        } else {
            visible();
        };
    });
});


const closePop = document.querySelector('.x-mark');

closePop.addEventListener('click', removeInputBox);


function displayAlert(alert, color) { 
    alertSpan.innerText = alert;
    alertSpan.style.display = "block";
    alertSpan.style.backgroundColor = `${color}`;

    setTimeout(() => {
        alertSpan.style.display = "none";
    }, 2000); 
};

function accept(name) { 
    setTimeout(() => {
        h1.style.color = 'green';
        h1.innerText = `Thank you! ${name} 😊`;
        nameInput.style.display = "none";
        inputBox.style.padding = "50px";
        submitBtn.style.display = "none"
    }, 2000);
};

//remove INPUT BOX 
function removeInputBox() {
    document.body.style.overflow = 'auto';
    inputSec.style.visibility = 'hidden';
    alertSpan.style.display = "none";
    overlay.style.display = 'none';
    backToDefault();
};



//END OF INPUT BOX

// scroll reveal
ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200,
});
 
ScrollReveal().reveal('.gallery', { origin: "bottom" });
ScrollReveal().reveal('.heading ', { origin: "top" });


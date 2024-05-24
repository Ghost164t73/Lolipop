

window.addEventListener("load", function () {
    document.querySelector(".preloader").style.display = "none";
    document.querySelector(".content").style.display = "block";
});

let verticalLine = document.querySelector(".vertical-line");    
const API_URL = "http://localhost:3500/articles";
const popUp = document.querySelector(".pop-up");
const toTop = document.querySelector(".top");
const content = document.querySelector(".content")

const getArticles = async (articles) => {
    let articleContent = "";
    
    articles.reverse();
    articles.forEach((article)=> {
        let date = new Date;
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
    
        date = `${day}th ${month} ${year} `
        articleContent += `
            <div class="article">
            <i class="ri-star-fill star"></i>
            <img src="image/${article.image}" alt="read read read" class="read">
            <div class="link">
                <span><h1 class="title">${article.title}</h1></span>
                <span class="date">Date: ${date}</span><br>
                <span class="views">● ${article.views} views</span>
            </div>
            <div class="options">
                <button class="read-later"><i class="ri-add-circle-fill"></i>Add to favorites</button>
                <a href="" class="read-now">Read now<i class="ri-arrow-right-up-line arrow"></i></a>
            </div>
            </div>
            `;
        
        document.querySelector(".article-place").innerHTML += articleContent;
        const artic = document.querySelectorAll(".read");
        artic.forEach((art, i) => {
            let item = articles[i];
            art.onclick = () => {
                showClickedArticle(item);
                showLink();
                readInNewTab(articles,i)
            };
        });
    
        addToReadLater(articles);
    readNow(articles);
    articles ? verticalLine.style.display = "block" : verticalLine.style.display = "none";
    
};

getArticles();    

//LOADER
let loader = document.querySelector('.loader');

 function addLoader() {
    const windowScroll = window.scrollY;
     const element = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const scrolled = (windowScroll / (element - windowHeight)) * 100;
     loader.style.width = `${scrolled}%`;
     
    if (verticalLine.style.height !== '90%') {
        verticalLine.style.height = `${scrolled - 10}%`;
     }
     
     scrolled > 50 ? document.querySelector(".vertical-line span").style.display = "block" : null

};
    
//END LOADER

function addToReadLater(articles) {            
    document.querySelectorAll('.read-later').forEach((readLater, index) => {
        readLater.addEventListener('click', () => {
            const selectedArticle = articles[index];
            
            const existingData = JSON.parse(localStorage.getItem('readLater')) || [];
            const isAlreadyAdded = existingData.some(article => article.id === selectedArticle.id);
            
            if (!isAlreadyAdded) {
                existingData.push(selectedArticle);
                localStorage.setItem('readLater', JSON.stringify(existingData));
                showAlert(`<i class="ri-checkbox-fill"></i> Added` ,"green");
            } else {
                showAlert(`${(selectedArticle.title).toUpperCase()} has already been added` , "red");
            };
        });
    });
};

const poem = document.querySelector(".poem");

const fonts = ["Dancing scripts", "monospace", "sans-serif", "Montserrat","Poppins" ,"Pacifico"]
let randomNumber = 0 ;
function changeFont() {
    randomNumber++;
    if (randomNumber > fonts.length - 1) {
        randomNumber = 0
    }

    const font = fonts[randomNumber]
    poem.style.fontFamily =font;

    font === "Montserrat" ? poem.style.fontWeight = "bold" : "400"
}

document.querySelector(".change-font").onclick = () => {
    changeFont();
}

const main = document.querySelector(".main");
const header = document.querySelector("header");
const image = document.querySelector(".image");
const closeBtn = document.querySelector("#close");


//Reading section of the page
function readNow(articles) {
    document.querySelectorAll('.read-now').forEach((readNow, i) => {
        let item = articles[i];
        if (item.image) {
            readNow.addEventListener('click', (e) => {
                e.preventDefault()
                if (popUp.classList.contains("show-popup")) {
                    popUp.classList.remove("show-popup");                    
                }

                showClickedArticle(item)
                showLink();
                readInNewTab(articles, i)
            });
        };
        document.querySelector(".change-font").style.opacity = "1";
    });

    //show change font button
    //cancel reading section
    closeBtn.onclick = () => {
        closeArticle();
    }
};


const mainOverlay = document.querySelector("#overlay");
const sidebarOverlay = document.querySelector("#sidebar-overlay");

const blurMain = () => {
    mainOverlay.style.visibility = "visible";
    console.log("blurred")
};

const unblurMain = () => {
    mainOverlay.style.visibility = "hidden";
};

const blurSidebar = () => {
    sidebarOverlay.style.visibility = "visible";
};

const unblurSidebar = () => {
    sidebarOverlay.style.visibility = "hidden";
};

const menuBtn = document.querySelector(".menu");
menuBtn.onclick = (e) => {
    e.stopPropagation();
    popUp.classList.toggle("show-popup");
    blurMain(); // Blur the main content
    blurSidebar(); // Blur the sidebar
};

function closeSideBar() {
    popUp.classList.remove("show-popup");
    unblurMain(); // Unblur the main content
    unblurSidebar(); // Unblur the sidebar
}

function closeArticle() {
    main.classList.remove("show-main")
    image.classList.remove("show-image")
    closeBtn.style.display = "none";
    document.body.style.overflow = "auto";
    hideLink();
}

const productKey = "4NWXJ-XXTB2-VTBX3-86Y37-T29HP";
console.log(productKey);

window.onscroll = () => {
    if (!main.classList.contains("show-main")) {
        addLoader();
        toTop.style.opacity = window.scrollY > 400 ? "1" : null;
    };

    closeSideBar();
    removeWelcomeSection()
   
};

document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.pop-up')) {
        closeSideBar();
    }
});


const alertSpan = document.querySelector(".alert")

//show any alert
function showAlert(content,color) {
    alertSpan.innerHTML = content;
    alertSpan.style.color = color;
    alertSpan.classList.add("show-alert")

    setTimeout(() => {
        alertSpan.classList.remove("show-alert")
    } , 1500)
};

function showClickedArticle(item) {
    if (popUp.classList.contains("show-popup")) {
        popUp.classList.remove("show-popup");                    
    }
    
    main.classList.add("show-main")
    image.classList.add("show-image")
    closeBtn.style.display = "block";
    document.body.style.overflow = "hidden";
    document.querySelector(".heading-big").innerHTML = item.title;
    image.src = `image/${item.image}`
    
    let randomNumber = Math.floor(Math.random() * 2);
    let br = randomNumber == 1 ? "br" : "br><br"
    let poem = item.poem;
    poem = poem.replace(/\./g, `<${br}>`)
    document.querySelector(".poem").innerHTML = poem;
    
}

document.body.onkeydown = (e) => {
    if (e.key == "Escape") {
        closeArticle()
    }
}

function readInNewTab(articles, index) {
    document.querySelector(".read-in-link").onclick = (e) => {
        const selectedArticle = articles[index];
        
        const existingData = JSON.parse(localStorage.getItem('readInNewTab')) || [];
        existingData.splice(0, existingData.length, selectedArticle);
        localStorage.setItem('readInNewTab', JSON.stringify(existingData));

        console.log(existingData);
    };
};


function showLink() {
    document.querySelector(".read-in-link")
        .style.visibility = "visible"
}

function hideLink() {
    document.querySelector(".read-in-link")
        .style.visibility = "hidden";
}

const overlayclass = document.querySelector(".overlay");

function blurr() {
    overlayclass.style.display = "block"
}

function unblurr() {
    overlayclass.style.display = "none"
}

function stabilizeScreen() {
    document.body.style.overflow = "hidden"
}

function unStabilizeScreen() {
    document.body.style.overflow = "auto"
}

function showCase(whatToShow) {
    const showCaseElement = document.createElement("div");
    showCaseElement.classList.add("showcase");
    showCaseElement.innerHTML = whatToShow;
    content.append(showCaseElement)
    blurr()
    stabilizeScreen();

    
}

function closeShowCase(showCaseElement) {
    showCaseElement.classList.add("showcase-hidden")
    unblurr()
    unStabilizeScreen();
}
 
overlayclass.onclick = () => {
    document.querySelectorAll(".showcase").forEach(showcase => closeShowCase(showcase))
    unblurr();
    unStabilizeScreen();
}

function removeWelcomeSection() {
    const articleSection = document.querySelector(".articles");
    const articleSectionPosition = articleSection.getBoundingClientRect().top;
    if (articleSectionPosition < 0) {
        document.querySelector(".welcome").style.display = "none";
    }
}

function closeShowCaseOnDrag(showCaseElement) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const showCaseRect = showCaseElement.getBoundingClientRect();
    const showCaseWidth = showCaseRect.width;
    const showCaseHeight = showCaseRect.height;
    const showCaseLeft = showCaseRect.left;
    const showCaseTop = showCaseRect.top;

    const rightCornerX = windowWidth - showCaseWidth;
    const rightCornerY = windowHeight - showCaseHeight;

    if (showCaseLeft >= rightCornerX && showCaseTop <= rightCornerY) {
        closeShowCase(showCaseElement);
    }
}

const buttonText = ["Dark", "White"]
let number = 0;
const buttonSpan = document.querySelector(".dark span")

const toggleButton = document.querySelector('.dark');
const body = document.body;
toggleButton.addEventListener('click', () => {
    buttonSpan.classList.toggle("dark-button");
    renderTheme();
});

function renderTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

renderTheme()

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme + '-theme');
} else {
    body.classList.add('light-theme');
}

function closeByEscape() {
    document.addEventListener("keydown", () => {
        document.querySelectorAll(".showcase").forEach(showcase => closeShowCase(showcase))
    })
}

closeByEscape();

function createElement(element = "div", content= "", className = null, appendTo = null) {
    const div = document.createElement(element);
    div.innerHTML = content;
    div.classList.add(className);
    appendTo !== null ? appendTo.append(div) :null
  
}

createElement()

let names = "yunus";
console.log(names)

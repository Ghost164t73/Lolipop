document.addEventListener("DOMContentLoaded", () => {
    let articleContent = "";

    articles.forEach(article => {
        let date = new Date;
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
    
        date = `${day}th ${month} ${year} `
        articleContent += `
            <div class="article">
            <i class="ri-star-fill star"></i>
            <img src="image/${article.image}" alt="read read read">
            <div class="link">
                <span><h1 class="title">${article.title}</h1></span>
                <span class="date">Date: ${date}</span><br>
                <span class="views">● ${article.views} views </span>
            </div>
            <div class="options">
                <button class="read-later"><i class="ri-add-circle-fill"></i>Add to favorites</button>
                <a href="" class="read-now">Read now<i class="ri-arrow-right-up-line arrow"></i></a>
            </div>
            </div>
            `;
        
        document.querySelector(".article-place").innerHTML = articleContent;

        addToReadLater();

        readNow();

    });
});

//LOADER
let loader = document.querySelector('.loader');

 function addLoader() {
    const windowScroll = window.scrollY;
    const element = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const scrolled = (windowScroll / (element - windowHeight)) * 100;
    loader.style.width = `${scrolled}%`;
};
//END LOADER

function addToReadLater() {            
    document.querySelectorAll('.read-later').forEach((readLater, index) => {
        readLater.addEventListener('click', () => {
            const selectedArticle = articles[index];
            
            const existingData = JSON.parse(localStorage.getItem('readLater')) || [];
            const isAlreadyAdded = existingData.some(article => article.id === selectedArticle.id);
            
            if (!isAlreadyAdded) {
                existingData.push(selectedArticle);
                localStorage.setItem('readLater', JSON.stringify(existingData));
                showAlert("✔ Added");
            } else {
                showAlert(`"${(selectedArticle.title).toUpperCase()}" has already been added`)
            };
        });
    });
};

const main = document.querySelector(".main");
const header = document.querySelector("header");
const image = document.querySelector(".image");
const closeBtn = document.querySelector("#close")


//Reading section of the page
function readNow() {
    document.querySelectorAll('.read-now').forEach((readNow, i) => {
        let item = articles[i];
        if (item.image) {
            readNow.addEventListener('click', (e) => {
                e.preventDefault()
                item.views = item.views++;
                console.log(item.views)
                
                main.classList.add("show-main")
                image.classList.add("show-image")
                closeBtn.style.display = "block";
                header.classList.remove("sticky-header")
                document.body.style.overflow = "hidden";
                document.querySelector(".heading-big").innerHTML = articles[i].title
                image.src = `image/${articles[i].image}`
                
                document.querySelector(".poem").innerHTML = item.poem;
            });
        };
    });

    //cancel reading section
    closeBtn.onclick = () => {
        main.classList.remove("show-main")
        image.classList.remove("show-image")
        closeBtn.style.display = "none";
        header.classList.add("sticky-header")
        document.body.style.overflow = "auto";
    }
};

const toTop =  document.querySelector(".top")


window.onscroll = () => {
    if (main.style.transform !== "translate(300%)") {
        if (window.scrollY > 200) {
            header.classList.add("sticky-header")
        } else {
            header.classList.remove("sticky-header")
        };

        addLoader();
        toTop.style.opacity = window.scrollY > 400 ? "1" : "0"
    };
};

const alertSpan = document.querySelector(".alert")

//show any alert
function showAlert(content) {
    alertSpan.textContent = content;
    alertSpan.classList.add("show-alert")

    setTimeout(() => {
        alertSpan.classList.remove("show-alert")
    } , 1500)
}

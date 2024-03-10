const main = document.querySelector(".main")
    image = document.querySelector(".image"),
    closeBtn = document.querySelector("#close"),
    section = document.querySelector(".section-read-later");

function removeFromReadLater(indexToRemove) {
    const removedArticle = readlater.splice(indexToRemove, 1)[0];
    localStorage.setItem('readLater', JSON.stringify(readlater));
    showAlert(`"${(removedArticle.title).toUpperCase()}" was removed`)

    renderReadLaterSection();
}


function renderReadLaterSection() {
    let sectionContent = "";
   
    readlater.forEach(read => {
        sectionContent += `
        <div class="article-read">
        <img src="image/${read.image}" alt="read read read" class="image-read">
        <div class="margin"> 
        <div class="link">
                    <span><h1 class="title read-title">${read.title}</h1></span>
                    <span class="date">Date: 19th march 2023</span><br>
                    <span class="views">● ${read.views} views </span>
                </div>
                <div class="options-read">
                    <a href="#" class="read-now" target="_blank">Read now<i class="ri-arrow-right-up-line arrow"></i></a>
                    <button class="remove">Remove</button>
                    </div>
                    </div>
                    </div>  
                    `;
                });
                
    section.innerHTML = sectionContent;
    if (!sectionContent) {
        let empty = document.createElement("div");
        empty.classList.add("empty");
        empty.textContent = "Your favorite list is empty";
        section.appendChild(empty);
    }
    const articleRead = document.querySelectorAll(".image-read")
    articleRead.forEach((art, i) => {
        let item = readlater[i]
        art.onclick = () => {
            showClickedArticle(item)
        }
    })

    
    document.querySelectorAll(".remove").forEach((remove, index) => {
        remove.onclick = () => {
            removeFromReadLater(index);
        };
    });
    
    readNow(); 
}

renderReadLaterSection();

function readNow() {
    document.querySelectorAll('.read-now').forEach((readNow, i) => {
        let item = readlater[i]
        readNow.addEventListener('click', (e) => {
            e.preventDefault()
           showClickedArticle(item)
        });
    });
    
    closeBtn.onclick = () => {
        main.classList.remove("show-main")
        image.classList.remove("show-image")
        closeBtn.style.display = "none";
        document.body.style.overflow = "auto";
    };
};

const alertSpan = document.querySelector(".alert")

function showAlert(content) {
    alertSpan.textContent = content;
    alertSpan.classList.add("show-alert");

    setTimeout(() => {
        alertSpan.classList.remove("show-alert")
    } , 1500)
}


function showClickedArticle(item) {    
    main.classList.add("show-main")
    image.classList.add("show-image")
    closeBtn.style.display = "block";
    document.body.style.overflow = "hidden";
    document.querySelector(".heading-big").innerHTML = item.title;
    image.src = `image/${item.image}`
    
    document.querySelector(".poem").innerHTML = item.poem;
}

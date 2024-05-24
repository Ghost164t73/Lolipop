let lengthNum = readNewTab.length;
let showedArticle = readNewTab[lengthNum -1];
console.log(showedArticle);
const API_URL = "http://localhost:3500/articles";

function updateHTML() {
    let html = " ";
    html += `
    <div class="information">
    <div class="title-read">
        <h1>${(showedArticle.title).toUpperCase()}</h1>
    </div>
    <div class="info">
        By <span class="author text-bold">Lolipop</span>
        <div class="date">11th March 2024</div>
    </div>
</div>
<div class="poem">
    ${showedArticle.poem}
</div>
    `;

    document.querySelector(".content-read")
        .innerHTML = html
};

updateHTML();

document.title = showedArticle.title;

async function suggest(articles) {
    let suggested = "";

    const response = await fetch(API_URL);
    if (!response.ok) throw Error("Something went wrong..")
    articles = await response.json();

    articles.reverse();
    articles.forEach(article => {
        suggested += `
        <li><a href="readArticle.html" class="article-feed">
            <img src="image/${article.image}" alt="">
            <div class="info">
                <h3>${article.title}</h3>
                <div class="views">${article.views} views✨</div>
            </div>    
        </a></li>
        `;

        document.querySelector(".articles-feed").innerHTML = suggested
    });

    console.log(articles)

    document.querySelectorAll(".article-feed").forEach((link, i) => {
        link.onclick = (e) => {
            readInNewTab(articles, i)
        };
    });
};

suggest();

function readInNewTab(articles, index) {
    const selectedArticle = articles[index];
    
    const existingData = JSON.parse(localStorage.getItem('readInNewTab')) || [];
    existingData.splice(0, existingData.length, selectedArticle);
    localStorage.setItem('readInNewTab', JSON.stringify(existingData));

    //redifine showed article
    showedArticle = selectedArticle;

};

const recommended = document.querySelector(".recommended");
const title = document.querySelector(".title")

const password = "RJZIpTQJc6gVpriy";
const databaseLink = "mongodb+srv://yunus:RJZIpTQJc6gVpriy@cluster0.k2ijn9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Apilink = "mongodb+srv://yunus:RJZIpTQJc6gVpriy@cluster0.k2ijn9u.mongodb.net/";


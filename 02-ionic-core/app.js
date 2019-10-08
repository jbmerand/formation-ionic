'use strict';

let contentElement = document.getElementById("content");
let contentToInclude = '';

const URL_BASE_IMG = 'https://devfest2018.gdgnantes.com';

if (window.fetch) {
    fetch('https://devfest-nantes-2018-api.cleverapps.io/blog')
        .then((response) => {
            return response.json();
        })
        .then((json) => creerContenuHTML(json))
        .catch((error) =>
            console.log('Une erreur s\'est produite : ', error)
        )
} else {
    console.log("Votre navigateur est trop ancien : il ne gère pas le fetch.")
}

function creerContenuHTML(json) {

    json.forEach((post) => {
        let html =
        `<ion-card>
            <img src=${URL_BASE_IMG}${post.image} alt="Image du post">
            <ion-card-header>
            <ion-card-title>
                ${post.title}
            </ion-card-title>
            </ion-card-header>
        
            <ion-card-content>
                ${post.brief}
            </ion-card-content>
        </ion-card>`;
        contentToInclude = contentToInclude.concat(html);
    });

    contentElement.innerHTML = contentToInclude;
}

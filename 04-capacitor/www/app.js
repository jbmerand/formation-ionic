'use strict';

let contentElement = document.getElementById("content");
let contentToInclude = '';
let photoURL = '';

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

function prendreUnePhoto() {
    capacitorExports.Plugins.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.Plugins.CameraResultType.Uri
    })
        .then(
            response => {
                photoURL = response.base64String;
                let html2 = `<img src="data:image/png;base64, ${photoURL}" />`;
                document.getElementById('maPhoto').innerHTML = html2;
            }
        );

}


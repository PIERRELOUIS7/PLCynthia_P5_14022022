/*Pour récupérer l'API des produits dans la fonction callProduct*/
const callProduct = function () {
    //la méthode fetch avec la requête GET
    fetch("http://localhost:3000/api/products") 
        //S'il y a une réponse => la mettre au format JSON
        .then(res => res.json()) 
        //Pour renvoyer un tableau
        .then((array) => { 
            kanap(array); 
        })
        //Sinon renvoyer un message d'erreur
        .catch(function (err) {
            console.log("erreur");
            alert('il y a une erreur!');
            if(array) return;
        });
 }

/*La fonction kanap stocke tous les produits dans un tableau*/
const kanap = (array) => {
    const entrerpoint = document.querySelector("#items")
    const premierkanap = array[0]
    const template = `<a href="./product.html?id=42">
            <article>
              <img src="${premierkanap.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${premierkanap.name}</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`
    //Le tableau
    console.log(premierkanap)
    entrerpoint.innerHTML = template
}

    callProduct()
    
        const a = document.createElement('a');
        a.href = "somelink url"
        /*Création de l'objet article*/
        const article = document.createElement('article');
        //les articles sont les enfants des liens a
        a.appendChild(article);

        /*Création de l'objet img*/
        const imge = document.createElement("img");
        //les images sont les enfants des articles
        article.appendChild(imge);
        //Récupération des données des images : image et texte
        imge.src = product.imageUrl;
        imge.alt = product.altTxt;

        /*Création de l'objet h3*/
        const h3 = document.createElement("h3");
        //la class productName est ajoutée aux titres h3 
        h3.classList.add("productName");
        //Les h3 sont les enfants des articles
        article.appendChild(h3);
        //Récupération du texte des h3
        h3.textContent = product.name;
        
        /*Création de l'objet p*/
        const p = document.createElement("p");
        //La class productDescription est ajoutée au paragraphe p
        p.classList.add("productDescription");
        //les paragraphes sont les enfants des articles
        article.appendChild(p);
        //Récupération du texte de description
        p.textContent = product.description;
        }
}

/*onload pour exécuter le script après le chargement de la page*/
window.onload = callProduct();

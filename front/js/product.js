//Stockage des informations de chaque produit dans une constante
const getArticle = (product) => {

    //////////L'image
	//Création d'une image
    let imagesKanap = document.createElement('img');
	//Récupération des données de chaque image : image et texte
    imagesKanap.src = product.imageUrl;
    imagesKanap.alt = product.altTxt; 
	//Les images sont les enfants de la div item__img
    document.querySelector('.item__img').appendChild(imagesKanap);

    //////////Le titre
	//Récupération de l'attribut title
	//Récupération du titre (texte affiché)
    document.getElementById('title').textContent = product.name;

    //////////Le prix
	//Récupération de l'attribut price
	//Récupération du prix(texte affiché)
    document.getElementById('price').textContent = product.price;

    //////////La description
	//Récupération de l'attribut description
	//Récupération du texte de description
    document.getElementById('description').textContent = product.description;

    //////////La couleur souhaitée
	//Les couleurs de chaque product ou canapé
    for(let colors of product.colors) {
        //récupération de l'élément colors : la balise select qui gère la couleur
        let elementColor = document.getElementById('colors');
        //Création de la balise option
        let optionColor = document.createElement("option");
        //La balise option devient l'enfant de l'élément elementColor
        elementColor.appendChild(optionColor);
        //récupération de la couleur
        optionColor.value = colors;
        //récupération de la couleur (affichage du texte)
        optionColor.textContent = colors;
    }

	//////////Le panier
	//Récupération de l'attribut addToCart
	let button = document.getElementById("addToCart");
	//Création d'un évènement sur la variable button
	button.addEventListener("click", function(event) {
		//Récupération de l'attribut quantity
		let quantity = document.getElementById("quantity");
		//Récupération de la valeur; la quantité de canapé souhaitée
		let q = quantity.value;
		//Récupération de l'attribut colors
		let options = document.getElementById("colors");
		//Récupération de la valeur; la couleur du canapé
		let o = options.value;

		//Condition : si le nombre de canapé est supérieur à 0 et que la couleur est supérieur à 0
		if (+q>0 && o.length>0) {
			//On stocke l'adresse de chaque produit(id), les couleurs(o) et le nombre de canapé(q) dans la variable product
			let cart_product = { 
				id:product._id,
				option : o,
				quantity : +q
			}

			//On récupère les données du local storage du panier (basket)
			let ls = localStorage.getItem("basket");
			//S'il y a un local storage
			if (ls) {
				//les données du local storage sont transformées en valeur
				let products = JSON.parse(ls);
				//la variable productInBasket doit trouver : le produit et la couleur
				let productInBasket = products.find(p => p.id==product._id && p.option==o); 
				//Condition 
				if(productInBasket) { 
					productInBasket.quantity = +productInBasket.quantity + +q; 
				}
				//Sinon
				else {
					//envoit des produits du panier 
					products.push(cart_product);
				}
				//On stocke les valeurs du local storage, transformées en chaîne de caractères, dans product
				localStorage.setItem("basket", JSON.stringify(products));
			}
			else {
				//On stocke les valeurs du local storage, transformées en chaîne de caractères, dans product
				localStorage.setItem("basket", JSON.stringify([cart_product]));
			}
			//message de confirmation
			if(confirm("Article ajouté, valider votre panier (OK), ou retourner à l'accueil (ANNULER)")) {
				//redirection vers la page cart.html
				window.location.href="cart.html"
			}
			else {
				//redirection vers la page index.html
				window.location.href="index.html"
			}
		}

	})
}

//On récupère les données de l'API grâce à la méthode fetch
//onload pour exécuter le script après le chargement de la page
window.onload = function() {

	//On récupère l'adresse url des produits dans la variable id
	//L'URLSearchParams renvoie la première valeur associée au paramètre de recherche donné avec la méthode get.
	let id = new URLSearchParams(window.location.search).get("id");

	if(id) {
		//requête GET pour récupérer les produits
		fetch("http://localhost:3000/api/products/" + id)
			//S'il y a une réponse => la mettre au format JSON
			.then(res => res.json()) 
			//Pour renvoyer un tableau
			.then((array) => {
				getArticle(array);
			})
			//Sinon renvoyer un message d'erreur
			.catch(function(err) {
				alert('il y a une erreur!');
			});
	}
	//Sinon alerte avec message
	else {
		alert("id not found");
		window.location.href="index.html"
	}
}
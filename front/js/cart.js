//On récupère les produits du local storage dans la fonction getLS 
function getLS(key) {
    //On stocke les produits dans la variable ls
	let ls = localStorage.getItem(key)
	//Si il y a un local storage, on retourne null
	if(!ls) return null;

    //On retourne les valeurs dans la variable ls
	return JSON.parse(ls);
}

//On stocke le nombre de paires clé/valeur dans la fonction saveLS
function saveLS(key, value) {
    //On transforme les valeurs de value en chaîne de caractères 
	localStorage.setItem(key, JSON.stringify(value));
}

//La fonction display est affectée à la section cart__items, avec comme argument data
function display(data) {
    //On récupère les produits du local storage basket dans la variable products
	let products = getLS("basket");

    //On récupère l'élément cart__items dans le DOM
	let container = document.getElementById("cart__items");

    //Le texte stocké dans la variable container est déclaré null (ou vide)
	container.innerHTML = "";

	//S'il y a un ou des éléments dans le panier
	if (products){
		//Accès au tableau products dans la fonction fléchée p
		products.map(p => {
			//Dans la variable obj
			let obj = data.find(productData => productData._id === p.id);
			//Si l'objet est différent, le script s'interrompt
			if (!obj) throw "erreur";
			displayProduct(data, p,obj);
		})
	}
	//Contient tous les produits du tableau
	displayTotal(data);
}

//La fonction displayProduct
function displayProduct(data, BasketItem, DataItem) {

    //On récupère l'élément cart__items dans le DOM
	let container = document.getElementById("cart__items");

    //On crée une balise article
	let element = document.createElement("article");
        //On ajoute la class cart__item à article
		element.classList.add("cart__item");
        //On affecte à l'article les attributs data-id et data-color
		element.setAttribute("data-id", BasketItem.id);
		element.setAttribute("data-color", BasketItem.option);

    //On récupère le texte du produit affiché dans la balise article
	element.innerHTML +=
        //Dans la div cart__item__img : on affecte les données (texte, image)
		`<div class="cart__item__img">
				<img src="${DataItem.imageUrl}" alt="${DataItem.altTxt}">
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__description">
				<h2>${DataItem.name}</h2>
				<p>${BasketItem.option}</p>
				<p>${DataItem.price} €</p>
				</div>
				<div class="cart__item__content__settings">
				<div class="cart__item__content__settings__quantity">
					<p>Qté : </p>
					<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${BasketItem.quantity}">
				</div>
				<div class="cart__item__content__settings__delete">
					<p class="deleteItem">Supprimer</p>
				</div>
				</div>
			</div>
		`;

        //On récupère l'input (quantité) du DOM
		let elementInput = element.querySelector("input");
        //On récupère l'identifiant du produit
		elementInput.id = BasketItem.id;
        //On récupère la couleur du produit
		elementInput.option = BasketItem.option;

        //On crée un évènement lors du changement des valeurs
		elementInput.addEventListener("change", function(event) {
			let products = getLS("basket");
			if(products!=null){
				let obj = products.find(p=>p.id===elementInput.id && p.option===elementInput.option);
				obj.quantity = +this.value;
				saveLS("basket", products);
			}
            //Produit final
			displayTotal(data);
		});
		
        //On récupère l'input (quantité) du DOM
		let elementDelete = element.querySelector(".deleteItem");
        //On récupère l'identifiant du produit
		elementDelete.id = BasketItem.id;
        //On récupère la couleur du produit
		elementDelete.option = BasketItem.option;
		elementDelete.container = element;
        //On crée un évènement lors du changement des valeurs
		elementDelete.addEventListener("click", function(event) {
			if (window.confirm("suppression ?")){
				//On affiche dans la console la nouvelle valeur
				console.log("delete item "+elementDelete.id);
				let products = getLS("basket");
				if (products!=null){
					products = products.filter(p=>p.id!=elementDelete.id || p.option!=elementDelete.option);
					saveLS("basket", products);
					container.removeChild(elementDelete.container);
				}
				//Produit final
				displayTotal(data);
			}
		});

    //element (l'article) est l'enfant de container (la section cart__items)
	container.appendChild(element);
}

//Dans la fonction displayTotal
function displayTotal(data) {
	let totalQuantity = 0;
	let totalPrice = 0;
	let products = getLS("basket");

	if (!(products && products.length>0)){
		document.getElementById("cart__items").innerHTML = '<H2 class="titles">Panier vide</H2>';
		document.querySelector(".cart__order").style.display = "none";
	}else{
		//Tableau des produits
		products.map(p => {
			let q = +p.quantity;
			//Dans la variable obj, on doit trouver que les produits sont identiques (même valeur et même objet)
			let obj = data.find(productData => productData._id === p.id);
			//Prix total est égal au prix fois la quantité
			totalPrice += +obj.price * q;
			//totalQuantity est égal à la variable q
			totalQuantity += q;
			//On affiche dans la console la quantité et le prix
			console.log(q, obj.price);
		})
	}

    //On récupère l'élément totalQuantity du DOM
	let elementQuantity = document.getElementById("totalQuantity");
    //On récupère le texte qui lui est affecté
	elementQuantity.textContent = totalQuantity;
     //On récupère l'élément totalPrice du DOM
	let elementPrice = document.getElementById("totalPrice");
    //On récupère le texte qui lui est affecté
	elementPrice.textContent = totalPrice;
}

const ValidCharactersName = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBNéèàêâîôû -";
const RegExpAdress = /([0-9]*)?([a-zA-Z,\.]*)?([0-9]{5})?([a-zA-Z])*/;
const RegExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ValidateName = (pName, errorMsg)=>{
	//Si la valeur est supérieur à 1
	if (pName.length<1) {
		//On affecte le texte suivant :
		errorMsg.textContent = "Nom trop court";
		return false;
	}

	//Donc pour tous les c de cette valeur
	for (let c of pName) {
		//Si les caractères tapés ne renvoient pas vrai
		if (!ValidCharactersName.includes(c)) {
			//On affecte le texte suivant :
			errorMsg.textContent = "illegal character ["+c+"]";
			valid = false;
			return false;
		}
	}

	//On ne définit pas de texte
	errorMsg.textContent = "";
	return true;
}

const ValidateRegExp = (pName, errorMsg, pRegExp)=>{
	//Si la valeur est supérieur à 1
	if (pName.length<1) {
		//On affecte le texte suivant :
		errorMsg.textContent = "Nom trop court";
		return false;
	}

	//Si les caractères tapés ne renvoient pas vrai
	if (!pRegExp.test(pName)) {
		//On affecte le texte suivant :
		errorMsg.textContent = "caractère(s) invalide(s)";
		//On arrête la boucle
		return false;
	}

	//On ne définit pas de texte
	errorMsg.textContent = "";
	return true;
}


//Dans la fonction validateForm
function validateForm () { 
    //On déclare tous les caractères autorisés pour l'utilisateur
    
    //On récupère l'élément firstName du DOM
    let firstName = document.getElementById("firstName");
    //On récupère l'élément firstNameErrorMsg du DOM
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    //On crée un évènement au niveau du prénom sur le formulaire
    firstName.addEventListener("input", function(event) {
		ValidateName(this.value, firstNameErrorMsg);
    })

    //On récupère l'élément lastName du DOM
    let lastName = document.getElementById("lastName");
    //On récupère l'élément lastNameErrorMsg du DOM
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    //On crée un évènement au niveau du nom sur le formulaire
    lastName.addEventListener("input", function(event) {
		ValidateName(this.value, lastNameErrorMsg);
    })
    
    //On récupère l'élément address du DOM
    let address = document.getElementById("address");
    //On récupère l'élément addressErrorMsg du DOM
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    //On crée un évènement au niveau de l'adresse sur le formulaire
    address.addEventListener("input", function(event) {
		ValidateRegExp(this.value, addressErrorMsg, RegExpAdress);
    })

    //On récupère l'élément city du DOM
    let city = document.getElementById("city");
    //On récupère l'élément cityErrorMsg du DOM
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    //On crée un évènement au niveau de la ville sur le formulaire
    city.addEventListener("input", function(event) {
		ValidateName(this.value, cityErrorMsg);
    })

    //On récupère l'élément email du DOM
    let email = document.getElementById("email");
    //On récupère l'élément emailErrorMsg du DOM
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    email.addEventListener("input", function(event) {
		ValidateRegExp(this.value, emailErrorMsg, RegExpEmail);
    })
}

function testFields(){
    let firstName = document.getElementById("firstName");
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (!ValidateName(firstName.value, firstNameErrorMsg)) return false;

    let lastName = document.getElementById("lastName");
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (!ValidateName(lastName.value, lastNameErrorMsg)) return false;
    
    let address = document.getElementById("address");
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    if (!ValidateRegExp(address.value, addressErrorMsg, RegExpAdress)) return false;

    let city = document.getElementById("city");
    let cityErrorMsg = document.getElementById("cityErrorMsg");
	if (!ValidateName(city.value, cityErrorMsg)) return false;

    let email = document.getElementById("email");
    let emailErrorMsg = document.getElementById("emailErrorMsg");
	if (!ValidateRegExp(email.value, emailErrorMsg, RegExpEmail)) return false;

	return true;
}

function commander () {
    let order = document.querySelector('.cart__order__form'),
		ls = getLS("basket");
    order.addEventListener('submit', function(event) {
		event.preventDefault();

		if(testFields()){
			console.warn("all fields OK");
			if(ls) {
				let products = ls.map(i=>i.id);
				let firstName = document.getElementById("firstName");
				let lastName = document.getElementById("lastName");
				let address = document.getElementById("address");
				let city = document.getElementById("city");
				let email = document.getElementById("email");
				let order = {
					contact : {
								firstName:firstName.value,
								lastName:lastName.value,
								address:address.value,
								city:city.value,
								email:email.value
							},
					products : products
				}
				console.log(order);

				if(confirm("Confirmer votre panier (OK), ou Modifier votre panier (ANNULER)")) {
					fetch(	"http://localhost:3000/api/products/order",
							{
								method:'POST',
								body : JSON.stringify(order),
								headers : { 'Content-type' : 'application/json' }
							})
					.then(response=> response.json())
					.then(data=>{
						console.log(data);
						window.confirm("Votre commande a été passée\nVotre numéro de commande : "+data.orderId);
						localStorage.clear();
						window.location.href="index.html";
					})
					.catch(err=>console.error(err))

				} else {
					window.location.href="index.html"
				}
			}
		}else{
			console.warn("fields failed");
		}
    });
}

//On récupère les produits de l'API
const run = function () {
    //la méthode fetch avec la requête GET
    fetch("http://localhost:3000/api/products")
        //S'il y a une réponse => la mettre au format JSON
        .then(res => res.json())

        //Pour renvoyer un tableau
        .then((array) => {

			display(array);
			validateForm();
			commander();
        })
		
        //Sinon renvoyer un message d'erreur
        .catch(function(err) {
            console.log('il y a une erreur!',err);
        });
}

//onload pour exécuter le script après le chargement de la page
window.onload = run;

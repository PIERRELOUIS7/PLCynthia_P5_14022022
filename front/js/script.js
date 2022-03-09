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
    //Le tableau
    array.map(product => {
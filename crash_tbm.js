var arr = [];
var nom_unites = [];
var nombre_click = 0;
var temps = 15;
var numero_carte = [];

/**
* Lancer le JS avant HTMl
*/

$(document).ready(function () {
    DessineLaGrille();
    AjoutClick();
    PlacerBateau();
    Carte();
    Temps_Ordinateur();
});


/**
* Fonction qui dessine la grille en mettant que des 0
*/
function DessineLaGrille() {
    var str = "";
    for (var x = 0; x < 10; x++) {
        arr[x] = [];
        str += "<div class='colonne' colonne='" + x + "'>";
        for (var y = 0; y < 10; y++) {
            arr[x][y] = 0;
            str = str + "<div class='ligne' ligne='" + y + "'></div>";
        }
        str += "</div>"
    }

    $("#grille").html(str);

};


/**
 * Fonction qui ajoute le clique sur un élément
 */
function AjoutClick() {
    $(".ligne").click(function () { fait_le_click($(this)); });
}

/**
 * Fonction qui s'occupe du traitement après le clique (ajouter +1 au compteur, )
 * @param {any} obj
 */
function fait_le_click(obj) {
    var str = "";
    var ligne = obj.attr("ligne");
    var colonne = obj.parent().attr("colonne");
    var unite = arr[colonne][ligne];

    /*
    * Gestion Du Compteur de clique
    */

    nombre_click += 1;
    obj.off("click");
    $(".compteur").html("Compteur de clique: " + nombre_click + "");

    /*
    * Gesion du clique si j'ai touché une unité ou pas 
    */

    if (arr[colonne][ligne] == 0) {
        var numero_photo = Math.floor((Math.random() * 3) + 1);
        str = "<img src='img/reponse/happpy' + numero_photo + '.png' class='img-fluid' ";
        console.log('str');
        //obj.addClass("plouf");
    } else {
        str = "En plein dans le mile! ";
        obj.html("X");
        obj.addClass('success');
        arr[colonne][ligne] = 0;

        /*
        * Gestion s'il reste des unités correspond au numéro passé dans le clique
        */

        if (Encore_unite(unite) == false) {
            $("#truc").append(" " + nom_unites[unite] + ",");
            Gagne();
        } else {
            str = str + " encore " + nom_unites[unite];

        }
    }


    $("#coordonnees").html(str);
}

/**
 * Fonction qui vérifie s'il reste des bateaux, en prenant en paramètre le numéro de nunité
 * @param {any} numero_unite
 */
function Encore_unite(numero_unite) {
    for (var x = 0; x < 10; x++) {

        for (var y = 0; y < 10; y++) {
            if (arr[x][y] == numero_unite) {
                /* J'ai encore des bateaux*/
                return true;
            };
        }

    }
    /*J'en ai plus*/
    return false;
}


/**
 * Fonction qui positionne les bateaux de l'ordinateur
 */
function PlacerBateau() {

    //Tram
    nom_unites[1] = "tram";
    arr[4][1] = 1;
    arr[5][1] = 1;
    arr[6][1] = 1;
    arr[7][1] = 1;
    arr[8][1] = 1;

    //Bus
    nom_unites[2] = "bus";
    arr[2][3] = 2;
    arr[3][3] = 2;
    arr[4][3] = 2;
    arr[5][3] = 2;

    //Vélo 1
    nom_unites[3] = "velo 1";
    arr[8][4] = 3;
    arr[8][5] = 3;
    arr[8][6] = 3;

    nom_unites[4] = "velo 2";
    arr[5][6] = 4;
    arr[5][7] = 4;
    arr[5][8] = 4;

    //Scooter 
    nom_unites[5] = "scooter";
    arr[1][4] = 5;
    arr[1][5] = 5;
}


/**
 * Fonction qui vérifie, s'il il y a que des 0
 */
function Gagne() {
    var total = 0;
    for (var x = 0; x < 10; x++) {

        for (var y = 0; y < 10; y++) {
            total = total + arr[x][y];
        }

    }

    if (total == 0) {
        alert("Gagné !");
    }
}

/**
 * Fonction qui gère le temps avant l'ordinateur
 * */
function Temps_Ordinateur() {
    var interval = setInterval(function () {
        temps = temps - 1;
        $(".temps_ordinateur_JS").html('<p>Il reste  ' + temps + ' seconde(s) avant que l\'ordinateur vous joue un tour');
        if (temps == 0) {
            clearInterval(interval);
            $(".temps_ordinateur_JS").replaceWith(' ');
            Jouer_Ordinateur();
        }
    },1000);
}

/**
 * Fonction qui fait jouer l'ordinateur
 * */

function Jouer_Ordinateur() {
    numero_carte_random = Math.floor((Math.random() * 5) + 1);
    console.log('')
    console.log(numero_carte[numero_carte_random]);
}

/**
 * Fonction qui permet de cliquer sur une image et lancer les effets correspondants
 */
function Carte() {
    $("#geste_barriere_JS").click(function () {
        Malus(2);
    });
    $("#boite_outil_JS").click(function () {
        Malus(-1);
    });
    $("#otage_JS").click(function () {
        Montre_Unite();
    });
    $("#reseau_JS").click(function () {
        Montre_Unite();
    });
    $("#controleur_JS").click(function () {
        Malus(-1);
    });
    $("#covid_JS").click(function () {
        Malus(-1);
    });
    $("#greve_JS").click(function () {
        Malus(-1);
    });
    $("#heure_de_pointe_JS").click(function () {
        Malus(-1);
    });
    $("#intemperie_JS").click(function () {
        Malus(-1);
    });
    $("#ticket_JS").click(function () {
        Annulation_Malus();
    });
    $("#travaux_JS").click(function () {
        Malus(-1);
    });
}

/**
 * Fonction qui gère les malus des cartes, en prenant en paramètre le nombre de points
 * à enlever ou mettre 
 * @param {any} nombre_point
 * */
function Malus(nombre_point) {
    nombre_click = nombre_click + nombre_point;
    $(".compteur").html("Compteur de clique: " + nombre_click + "");
}

/**
 * Fonction qui révelle le nom d'une unité
 * */

function Montre_Unite() {
    numero_unite = Math.floor((Math.random() * 5) + 1);


    for (var x = 0; x < 10; x++) {

        for (var y = 0; y < 10; y++) {
            if (arr[x][y] == numero_unite) {

                /* Parcours le tableau à la recherche de la colonne correspondant au numéro tiré */
                var c = $("div [colonne=" + x + "]");

                /*Parcours dans la colonne trouvé la ligne correspondant au numéro tiré*/
                c.children().each(function () {
                    if ($(this).attr("ligne") == y) {
                        arr[x][y] = 0;
                        $(this).addClass("success");
                    }
                });  

                
            };
        }

    };

    /* Vérifie et Note le nom de l'unité trouvé*/
    if (Encore_unite(numero_unite) == false) {
        $("#truc").append(" " + nom_unites[numero_unite] + ",");
        Gagne();
    }
}



/**
 * Fonction qui annule la carte de l'ordinateur
 * */

function Annulation_Malus() {

}

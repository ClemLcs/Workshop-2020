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
    $(".compteur").html("Votre nombre(s) de clique(s) est de: " + nombre_click + "");

    /*
    * Gesion du clique si j'ai touché une unité ou pas 
    */

    if (arr[colonne][ligne] == 0) {
        var numero_photo = Math.floor((Math.random() * 3) + 1);
        str = "<img src='img/reponse/sad" + numero_photo + ".png' class='img-fluid'/> ";
        obj.addClass("plouf");
    } else {
        var numero_photo = Math.floor((Math.random() * 3) + 1);
        str = "<img src='img/reponse/happy" + numero_photo + ".png' class='img-fluid'/> ";
        obj.html("X");
        obj.addClass('success');
        arr[colonne][ligne] = 0;

        /*
        * Gestion s'il reste des unités correspond au numéro passé dans le clique
        */

        if (Encore_unite(unite) == false) {
            $("#unite_vendalisee").append(" " + nom_unites[unite] + ",");
            Gagne();
        }
    }

    $("#Communication_JS").html(str);
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
    nom_unites[3] = "velo_v1";
    arr[8][4] = 3;
    arr[8][5] = 3;
    arr[8][6] = 3;

    nom_unites[4] = "velo_n2";
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

    

    $('#exampleModal').on('show.bs.modal', function () {
        var modal = $(this)
        modal.find('.modal-title').text('Félicitation vous venez de faire crash le réseau TBM en découvrant toutes les unités. Votre score est de:  ' + nombre_click + ' cliques');
    })

    if (total == 0) {
        $("#Communication_JS").replaceWith("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Féliciation</button >")
        //$"";
    }
}

/**
 * Fonction qui gère le temps avant l'ordinateur
 * */
 function Temps_Ordinateur() {
 
     window.setInterval(function () {
         temps = temps - 1;
         $(".temps_ordinateur_JS").html('<p>Il reste  ' + temps + ' seconde(s) avant que l\'ordinateur vous joue un tour');
         if (temps < 1 ) {
             Jouer_Ordinateur();
             temps = 15;
         }
     }, 1000);
}

/*
 * Fonction de la carte Geste Barrière
 * */
function geste_barriere() {
    Malus(2);
    str = "<img src='img/reponse_carte/geste_barriere.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
    $("#geste_barriere_JS").replaceWith(" ");
}

/**
 * Fonction de la boite à outil
 * */
function boite_outil() {
    Malus(-1);
    str = "<img src='img/boite_outils.png' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
    $("#boite_outil_JS").replaceWith(" ");
}

/*
 * Fonction de la carte Otage
 * */
function otage() {
    Montre_Unite();
    str = "<img src='img/otage.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
    $("#otage_JS").replaceWith(" ");
}

/*
 * Fonction de la carte réseau
 * */
function reseau() {
    Montre_Unite();
    str = "<img src='img/reseau.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
    $("#reseau_JS").replaceWith(" ");
}

/*
 * Fonction de la carte controleur
 * */
function controleur() {
    Malus(-1);
    str = "<img src='img/reponse_carte/controleur.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
}

/*
 * Fonction de la carte covid
 * */
function covid() {
    Malus(-1);
    str = "<img src='img/reponse_carte/covid.PNG' class='img-fluid'/> ";
    ("#Communication_JS").html(str);
   
}

/*
 * Fonction de la carte grève
 * */
function greve() {
    Malus(-1);
    str = "<img src='img/reponse_carte/cgt.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
}

/**
 * Fonction de la carte heure de pointe
 * */
function heure_de_pointe() {
    Malus(-1);
    str = "<img src='img/reponse_carte/heure_de_pointe.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
}

/*
 * Fonction de la carte intempérie
 * */
function intemperie() {
    Malus(-1);
    str = "<img src='img/reponse_carte/intemperies.png' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
}

/*
 * Fonction de la carte travaux
 * */
function travaux() {
    Malus(-2);
    str = "<img src='img/reponse_carte/travaux.PNG' class='img-fluid'/> ";
    $("#Communication_JS").html(str);
}

/**
 * Fonction qui permet de cliquer sur une image et lancer les effets correspondants
 */
function Carte() {
    numero_carte[3] = $("#geste_barriere_JS").attr('numero_carte');

    numero_carte[8] = $("#boite_outil_JS").click(function () {
        boite_outil();
    }).attr('numero_carte');

    numero_carte[9] = $("#otage_JS").click(function () {
        otage();
    }).attr('numero_carte');

    numero_carte[10] = $("#reseau_JS").click(function () {
        reseau();
    }).attr('numero_carte');

    numero_carte[1] = $("#controleur_JS").attr('numero_carte');

    numero_carte[2] = $("#covid_JS").attr('numero_carte');

    numero_carte[4] = $("#greve_JS").attr('numero_carte');

    numero_carte[5] = $("#heure_de_pointe_JS").attr('numero_carte');

    numero_carte[6] = $("#intemperie_JS").attr('numero_carte');

    numero_carte[7] = $("#travaux_JS").attr('numero_carte');


}

/**
 * Fonction qui fait jouer l'ordinateur et tire une carte aléatoirement
 * */

function Jouer_Ordinateur() {
    numero_carte_random = Math.floor((Math.random() * 11) + 1);

    if (numero_carte_random == "8" || numero_carte_random == "9" || numero_carte_random == "10") {
        
    }

    
   
    if (numero_carte[numero_carte_random] == "3") {
       
            geste_barriere();
    }

       
    if(numero_carte[numero_carte_random] == "1"){
        
            controleur();
       
    }

    if (numero_carte[numero_carte_random] == "2") {
            covid();
    }

    if (numero_carte[numero_carte_random] == "4") {
       
            greve();
        
    }

    if (numero_carte[numero_carte_random] == "5") {
        
            heure_de_pointe();
       
    }

    if (numero_carte[numero_carte_random] == "6") {
        
            intemperie();
      
    }

    if (numero_carte[numero_carte_random] == "7") {
        
            travaux();
       
    }
}

/**
 * Fonction qui gère les malus des cartes, en prenant en paramètre le nombre de points
 * à enlever ou mettre 
 * @param {any} nombre_point
 * */
function Malus(nombre_point) {
    nombre_click = nombre_click + nombre_point;
    $(".compteur").html("Votre nombre(s) de clique(s) est de: " + nombre_click + "");
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
                        $(this).html("X");
                    }
                });


            };
        }

    };

    /* Vérifie et raille le nom de l'unité trouvé*/
    if (Encore_unite(numero_unite) == false) {


        if (nom_unites[numero_unite] == "velo_n1") {
            $("#velo_n1").addClass('trouve');
        }

        if (nom_unites[numero_unite] == "velo_n2") {
            $("#velo_n2").addClass('trouve');
        }

        if (nom_unites[numero_unite] == "tram") {
            $("#tram").addClass('trouve');
        }

        if (nom_unites[numero_unite] == "scooter") {
            $("#scooter").addClass('trouve');
        }

        if (nom_unites[numero_unite] == "bus") {
            $("#bus").addClass('trouve');
        }

        Gagne();
    }
}



// CONCEPTION
// en fr -> en JS
// simplifier le pb
// factorser le code (utilisation de boucle)

// DEBUGAGE ;)
// bug de syntaxe : utiliser le inspecteur  pour la localiser 
// bug de fonctionnement : utiliser les console.log pour la localiser (voir les différences entre le resultat obtenu et celui attendu
"use strict";
// function imgLoad(){
// 		var URL = window.webkitURL || window.URL;
// 		document.getElementById("photo").src = URL.createObjectURL(document.getElementById("file_input").files[0]);
// 	}
// function preloader() 

// {

// photo = new Image(); 

// photo.src = "Beelzebub.png";

// }
var tr, tg, tb, ta;
var width, height;
var photo, canvas;
var pix, imgd, context;
// imgd.crossOrigin = "Anonymous";

// function exemple() {

// 	// CHARGEMENT DES TABLEAUX DE PIXELS
// 	prefilter();
// 	
// 	for (var y = 0; y < height; y++) {
// 		for (var x = 0; x < width; x++) {

// 			tr[x][y] = 1;
// 			tg[x][y] = 1;
// 			tb[x][y] = 1;
// 			ta[x][y] = 255;
// 		}
// 	}
// 	// MISE À JOUR DE L'IMAGE
// 	postfilter();
// }


function prefilter() {

	photo = document.getElementById('photo');
	canvas = document.getElementById('mycanvas');
	context = canvas.getContext('2d');

	var x = 0;
	var y = 0;

	// redimensionne le canevas aux dimensions de l'image
	width = photo.width;
	height = photo.height;
	canvas.width = width;
	canvas.height = height;

	// recopie l'image dans le canevas
	context.drawImage(photo, 0, 0, width, height);


	// extrait le tableau de pixels du canevas
	imgd = context.getImageData(0, 0, photo.width, photo.height);

	pix = imgd.data;


	// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
	// 1 tab 1D -> 4 tab 2D (r,g,b,a) 
	// déclaration de 4 tableaux à 2 dim (de taille width * height)
	tr = new Array(width).fill().map(() => Array(height));
	tg = new Array(width).fill().map(() => Array(height));
	tb = new Array(width).fill().map(() => Array(height));
	ta = new Array(width).fill().map(() => Array(height));



	// copie des valeurs
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
			tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
			tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
			ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
		}
	}
}

function postfilter() {
	// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
	// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			pix[x * 4 + y * (width * 4) + 0] = tr[x][y];
			pix[x * 4 + y * (width * 4) + 1] = tg[x][y];
			pix[x * 4 + y * (width * 4) + 2] = tb[x][y];
			pix[x * 4 + y * (width * 4) + 3] = ta[x][y];
		}
	}

	// Draw the ImageData at the given (x,y) coordinates.
	context.putImageData(imgd, 0, 0);

	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}

function negatife() {

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();

	// 		//inversion des couleur (negatif)
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			tr[x][y] = 255 - tr[x][y];
			tg[x][y] = 255 - tg[x][y];
			tb[x][y] = 255 - tb[x][y];
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter();

}

function gris() {

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();
	// Rgb -> gris
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var moy = (tr[x][y] + tg[x][y] + tb[x][y]) / 3
			tr[x][y] = moy;
			tg[x][y] = moy;
			tb[x][y] = moy;
			ta[x][y] = 255;
		}
	}
	// MISE À JOUR DE L'IMAGE
	postfilter();
}

function rouge() {

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();


	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var moy = (tr[x][y] + tg[x][y] + tb[x][y]) / 3


			if (tr[x][y] > 100 & tg[x][y] < 100 & tb[x][y] < 100) {
				tr[x][y] = tr[x][y];
				tg[x][y] = tg[x][y];
				tb[x][y] = tb[x][y];
			} else {
				tr[x][y] = moy;
				tg[x][y] = moy;
				tb[x][y] = moy;

			}
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter();

}

function trigger() {
	prefilter();

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			if (tr[x][y] < 128) {
				tr[x][y] = 0;
			}

			else if (tr[x][y] > 128) {
				tr[x][y] = 255;
			}

			if (tg[x][y] < 128) {
				tg[x][y] = 0;
			}

			else if (tg[x][y] > 128) {
				tg[x][y] = 255;
			}

			if (tb[x][y] < 128) {
				tb[x][y] = 0;
			}

			else if (tb[x][y] > 128) {
				tb[x][y] = 255;
			}

		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter();
}

function unpeudetout() {

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var moy = (tr[x][y] + tg[x][y] + tb[x][y]) / 3
			tr[x][y] = moy;
			tg[x][y] = moy;
			tb[x][y] = moy;
			ta[x][y] = 255;
		}
	}

	for (var y = height / 2; y < height; y++) {
		for (var x = 0; x < width / 2; x = x + 5) {
			tr[x][y] = 255;
			tg[x][y] = 0;
			tb[x][y] = 0;
			ta[x][y] = 255;
		}
	}

	for (var y = 0; y < height / 2; y = y + 5) {
		for (var x = 0; x < width / 2; x = x + 1) {
			tr[x][y] = 0;
			tg[x][y] = 255;
			tb[x][y] = 0;
			ta[x][y] = 255;
		}
	}

	for (var y = height / 2; y < height; y = y + 1) {
		for (var x = width / 2; x < width; x = x + 1) {
			tr[x][y] = 0;
			tg[x][y] = 0;
			tb[x][y] = 255;
		}
	}

	for (var y = 0; y < height / 2; y = y + 1) {
		for (var x = width / 2; x < width; x = x + 1) {
			tr[x][y] = 255;
			ta[x][y] = ta[x][y] / 2;
		}
	}
	postfilter();

}

function rougespe() {

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();
	// 
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var moy = (tr[x][y] + tg[x][y] + tb[x][y]) / 3

			if( moy < 85){
				tr[x][y] = 0;
				tg[x][y] = 0;
				tb[x][y] = 0;
				
			} else if( moy> 85 & moy < 170){
				tr[x][y] = 50;
				tg[x][y] = 240;
				tb[x][y] = 250;
			} else if( moy>170)
				tr[x][y] = 255;
				tg[x][y] = 255;
				tb[x][y] = 255;
		}
	}

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			tr[x][y] = 255 - tr[x][y];
			tg[x][y] = 255 - tg[x][y];
			tb[x][y] = 255 - tb[x][y];
		}
	}
	
	// MISE À JOUR DE L'IMAGE
	postfilter();
}
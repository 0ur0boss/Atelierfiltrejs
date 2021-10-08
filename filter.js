(function() {
	var vinvertbutton = null;

	function myInvert(){
		var photo = document.getElementById('photo');
		var canvas = document.getElementById('mycanvas');
		var context = canvas.getContext('2d');
    
		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;
		
		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;


		console.log("height="+height+", width="+width);
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
		/*
		// EXEMPLE DE TRAITEMENT EN 1D
		// Loop over each pixel and invert the color.
		for (var i = 0; i < pix.length; i += 4) {
			pix[i  ] = 255 - pix[i  ]; // red
			pix[i+1] = 255 - pix[i+1  ]; // green
			pix[i+2] = 255 - pix[i+2  ]; // blue

			pix[i  ] = 255 ; // red
			pix[i+1] = 255 ; // green
			pix[i+2] = 0 ; // blue
			// i+3 is alpha (the fourth element)
		}
		*/

		// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
		// 1 tab 1D -> 4 tab 2D (r,g,b,a) 
		// déclaration de 4 tableaux à 2 dim (de taille width * height)
		var tr = new Array(width).fill().map(() => Array(height));
		var tg = new Array(width).fill().map(() => Array(height));
		var tb = new Array(width).fill().map(() => Array(height));
		var ta = new Array(width).fill().map(() => Array(height));

		// copie des valeurs
		for (var y = 0; y < height; y++) { 
			for (var x = 0; x < width; x++) {
				tr[x][y] = pix[x*4+y*(width*4)+0];
				tg[x][y] = pix[x*4+y*(width*4)+1];
				tb[x][y] = pix[x*4+y*(width*4)+2];
				ta[x][y] = pix[x*4+y*(width*4)+3];
			}
		}



		
		
		
		
		
		
		
		
		
		
		
		// TRAITEMENT / APPLICATION D'UN FILTRE
		// mise en rouge de la moitier gauche
		
		//inversion des couleur (negatif)
		// for (var y = 0; y < height; y++) { 
		// 	for (var x = 0; x < width; x++) {
		// 		tr[x][y] = 255-tr[x][y];
		// 		tg[x][y] = 255-tg[x][y];
		// 		tb[x][y] = 255-tb[x][y];
		// 	}
		// }

		// // Rgb -> gris
		// for (var y = 0; y < height; y++) { 
		// 	for (var x = 0; x < width; x++) {
		// 		var moy = (tr[x][y]+tg[x][y]+tb[x][y])/3
		// 		tr[x][y] = moy;
		// 		tg[x][y] = moy;
		// 		tb[x][y] = moy;
		// 		ta[x][y] = 255;
		// 	}
		// }

		// for (var y = height/2; y < height; y++) { 
		// 	for (var x = 0; x <width/2; x = x+5) {
		// 		tr[x][y] = 255;
		// 		tg[x][y] = 0;
		// 		tb[x][y] = 0;
		// 		ta[x][y] = 255;
		// 	}
		// }

		// for (var y = 0; y < height/2; y=y+5) { 
		// 	for (var x = 0; x <width/2; x = x+1) {
		// 		tr[x][y] = 0;
		// 		tg[x][y] = 255;
		// 		tb[x][y] = 0;
		// 		ta[x][y] = 255;
		// 	}
		// }

		// for (var y = height/2; y < height; y = y+1) { 
		// 	for (var x = width/2 ; x < width; x = x+1) {
		// 		tr[x][y] = 0;
		// 		tg[x][y] = 0;
		// 		tb[x][y] = 255;
		// 	}
		// }

		// for (var y = 0; y < height/2; y = y+1) { 
		// 	for (var x = width/2 ; x < width; x = x+1) {
		// 		tr[x][y] = 255;
		// 		ta[x][y] = ta[x][y]/2;
		// 	}
		// }

		// for (var y = height; y < height; y=y+1) { 
		// 	for (var x = width; x <width; x = x+1) {
		// 		tr[x][y] = tr[x][y]*5;
		// 		tg[x][y] = tg[x][y]*5;
		// 		tb[x][y] = bg[x][y]*5;
		// 		ta[x][y] = 255;
		// 	}
		// }


		
		// Enleve tous se qui n est pas blue 
		// for (var y = 0; y < height; y++) { 
		// 	for (var x = 0; x < width; x++) {
		// 		var moy = (tr[x][y]+tg[x][y]+tb[x][y])/3
		// 		tr[x][y] = 0;
		// 		tg[x][y] = 0;

		// 		if(tb[x][y] > 254 & tg[x][y] < 255 & tr[x][y] < 255){

		// 		tb[x][y] = 255;

		// 		}else if(tb[x][y] < 254){
		// 		tb[x][y] = 0;
		// 		}

		// 	}
		// }


		// 		for (var y = height; y < height; y=y+1) { 
		// 	for (var x = width; x <width; x = x+1) {
		// 		tr[x][y] = tr[x][y]*5;
		// 		tg[x][y] = tg[x][y]*5;
		// 		tb[x][y] = bg[x][y]*5;
		// 		ta[x][y] = 255;
		// 	}
		// }

		for (var y = 0; y < height; y++) { 
			for (var x = 0; x < width; x++) {
				var moy = (tr[x][y]+tg[x][y]+tb[x][y])/3
				tg[x][y] = moy;
				tb[x][y] = moy;
				ta[x][y] = 255;

				if(tr[x][y] > 150){
					tr[x][y] = tr[x][y];
				}else{
					tr[x][y] = moy;
				}
			}
		}

		// for (var y = 0; y < height; y++) { 
		// 	for (var x = 0; x < width; x++) {
		// 		tr[x][y] = 255-tr[x][y];
		// 		tg[x][y] = 255-tg[x][y];
		// 		tb[x][y] = 255-tb[x][y];
		// 		tb[x][y] = 255-tb[x][y];
		// 		tb[x][y] = 255-tb[x][y];
				
				


		// 	}
		// }

		// for (var y = 0; y < height; y++) { 
		// 	for (var x = 0; x < width; x++) {
		// 		tr[x][y] = tg[x][y] ;
		// 		tg[x][y] = tb[x][y] ;
		// 		tb[x][y] = tr[x][y] ;

		// 	}
		// }





















		// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
		// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
		for (var y = 0; y < height; y++) { 
			for (var x = 0; x < width; x++) {
				pix[x*4+y*(width*4)+0] = tr[x][y];
				pix[x*4+y*(width*4)+1] = tg[x][y];
				pix[x*4+y*(width*4)+2] = tb[x][y];
				pix[x*4+y*(width*4)+3] = ta[x][y];
			}
		}

		// Draw the ImageData at the given (x,y) coordinates.
		context.putImageData(imgd, 0, 0);
		
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);		
	}
	
	function afterload(){
		vinvertbutton = document.getElementById('idinvertbutton');

		// ICI je fais le lien entre ma fonction myInert() et l'évenement click du bouton innvert
		vinvertbutton.addEventListener('click', function(ev){myInvert();}, false);

	}
	window.addEventListener('load', afterload, false);
})();

import $ from 'jquery';

/*
* Objectif : récupérer une image aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une image de façon asynchrone à partir de l'API d'Unsplash (https://source.unsplash.com/)
* 3- Définir l'image comme fond
* */

export default class Background {

    constructor(country) {
		this.initEls(country);
	    this.initEvents();
	}

	initEls(country) {
		this.$els = {
			background: $('body')
		}

		this.url = 'https://source.unsplash.com';
		this.size = '1920x1080';
		this.param = country;
	}

	initEvents() {
		this.loadImage();
	}

	loadImage() {
		const promise = new Promise((resolve, reject) => {
			const image = new Image();
			image.src = `${this.url}/${this.size}/?${this.param},nature`;
			image.onload = () => {
				resolve(image);
			};

			image.onerror = (error) => {
				reject(error);
			};
		})

		promise.then((image) => {
			this.addBackground(image);
		});
		promise.catch((error) => {
			console.log('Error with the Unsplash image', error);
		});
	}

	addBackground(image) {
		
		this.$els.background.css('background-image', `url(${image.src})`);
		this.$els.background.addClass('is-ready');
	}

}
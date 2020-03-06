import $ from 'jquery';



/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */


export default class Map_countries {

	constructor(){
		this.initEls();
		this.initEvents();
	}

	initEls () {
		this.$els = {
			country: $('.country'),
			infos: $('.infos'),
		};
	}

	initEvents() {

		this.$els.country.on('click', ({currentTarget}) => {

       		let name = $(currentTarget).attr("data-name");
       		console.log(name);

       		this.getCountry(name);

    	});

		
	}

	getCountry(name){
		const api = {
			endpoint: 'http://restcountries.eu/rest/v2/name/'+name,
			// params: {
			// 	'per_page':1,
			// }
		};

		$.ajaxSetup({cache: false});

		$.getJSON(api.endpoint)
		.then((response) => {
			console.log(response);
			this.renderInfos(response[0].name);
		})
		.catch((e) => {
			console.log('error with the country :', e);
		});
	}

	renderInfos(country){
		this.$els.infos.text(country);
		// this.$els.quoteAuthor.text(author);
		// this.$els.container.addClass('is-ready');
	}
}
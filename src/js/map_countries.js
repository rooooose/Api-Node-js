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
			name: $('.name'),
			population: $('.pop'),
			flag: $('.flag'),
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
			params: {
				'per_page':1,
			}
		};

		$.ajaxSetup({cache: false});

		$.getJSON(api.endpoint)
		.then((response) => {
			console.log(response);
			this.renderInfos(response[0].name, response[0].population, response[0].flag);
		})
		.catch((e) => {
			console.log('error with the country :', e);
		});
	}

	show_image(src, alt) {
	    var img = $('img');
	    img.src = src;
	    img.alt = alt;
	    img.width = 200;

	    // This next line will just add it to the <body> tag
	}

	renderInfos(name, pop, flag){
		this.$els.name.text(name);
		this.$els.population.text(pop);
		this.makeCircle(pop);
		this.show_image(flag, name + " flag");
	}

	makeCircle(population){

    	$('span').css("width", Math.log(population)*10 + "px");
    	$('span').css("height", Math.log(population)*10 + "px");

	}

}
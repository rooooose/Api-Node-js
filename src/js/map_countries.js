import $ from 'jquery';

import Background from './background';
//import {countUpAnimation} from './helpers/populationHelper';

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
			language: $('.language'),
			capital: $('.capital'),
		};
	}

	initEvents() {

		this.$els.country.on('click', ({currentTarget}) => {

       		let name = $(currentTarget).attr("data-name");

       		console.log(name);
       		$('div.country_title').addClass('active');
       		$('div.capital_container').addClass('active');
       		$('div.language_container').addClass('active');
       		$('div.pop_container').addClass('active');
       		$('div.title').addClass('inactive');
       		
       		$(currentTarget).addClass('active');
       		this.$els.country.not($(currentTarget)).removeClass('active');

       		this.getCountry(name);

       		new Background(name);

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
			if(response[0].name == "British Indian Ocean Territory"){

				this.renderInfos(response[1].name, response[1].population, response[1].flag,  response[1].languages[0].name, response[1].capital);
			}
			else{
					this.renderInfos(response[0].name, response[0].population, response[0].flag, response[0].languages[0].name, response[0].capital);
			}
		})
		.catch((e) => {
			console.log('error with the country :', e);
		});
	}

	renderInfos(name, pop, flag, language, capital){
		this.$els.name.text(name);
		this.$els.population.text(pop);
		this.makeCircle(pop);
		$('img.flag').attr('src', flag);
		$('img.flag').attr('alt', name + " flag");
		this.$els.language.text(language);
		this.$els.capital.text(capital);
		
	}

	makeCircle(population){

    	$('span.pop').css("width", Math.log(population)*10 + "px");
    	$('span.pop').css("height", Math.log(population)*10 + "px");

	}



}
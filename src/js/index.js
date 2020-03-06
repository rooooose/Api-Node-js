import '../css/app.scss';
import Map_countries from './map_countries';
import * as d3 from "d3";


class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new Map_countries();
      
    }
}

new App();

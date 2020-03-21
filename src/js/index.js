import '../css/app.scss';
import Map_countries from './map_countries';



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

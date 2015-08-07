//import dispatcher from './../dispatcher.js';
import Request from './../services/Request.js';
//import Constants from './../constants/Constants.js';
//import assign from 'object-assign';

export default {

    baseURL : 'http://www.bbc.co.uk/radio1/playlist.json',

    testAction() {
        Request.get(this.baseURL, {}).then((data) => {
            console.log('data: ', data);
        });
    }

    //loadNewCandleChart(settings) {
        //let request = new Request(settings, function(data){
            //dispatcher.handleViewAction({
                //actionType: chartConstants.LOAD_NEW_CANDLE_CHART,
                //data: assign(settings, data)
            //});
        //});

        //request.sendRequest();
    //}

};

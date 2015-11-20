var viewmodel;

function Pic(data) {

    var self = this;

    self.generatedUrl = data.media.m

    self.generatedLink = data.link
};

function ViewModel(data) {

    var self = this;

    self.photosArr = ko.observableArray([]);
};

var controller = {

    fetch: function(params, callback){        

	// add base params
	params.api_key = 'f7419c7c353a4812a53523af90e255df';

	params.format = 'json';
	
	$.ajax({

	    url: 'http://api.flickr.com/services/feeds/photos_public.gne?id=23455178@N06',

	    type: 'GET',

	    dataType: 'jsonp',

	    data: params,

	    jsonp: 'jsoncallback',

	    success: function(data){

            $.each(data.items, function(idx, obj) {

                   viewmodel.photosArr.push( new Pic( obj ) );
            });
            
	    },	    
	    error: function() {

    		     callback();		
	    }
	});
    }
};

$(document).ready(function(){

  viewmodel = new ViewModel();

  ko.applyBindings( viewmodel );
 
  controller.fetch({})

})

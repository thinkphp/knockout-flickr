var viewmodel;

function Pic(data) {

    var self = this;

    self.generatedUrl = data.media.m

    self.generatedLink = data.link
};

function Pic2(data) {

    var self = this;

    self.id = data.id;

    self.farmid = data.farm;

    self.serverid = data.server;

    self.secret = data.secret;

    self.generatedLink = self.generatedUrl = "https://farm"+self.farmid+".staticflickr.com/"+self.serverid+"/"+self.id+"_"+self.secret+".jpg";
};

function ViewModel(data) {

    var self = this;

    self.photosArr = ko.observableArray([]);

    self.searchString = ko.observable('jQuery');
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

 $("#searchbtn").click(function(){

        viewmodel.photosArr([]);

        $.ajax({

          dataType: "jsonp",

          url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=613027bbd85c6531eb248c30795029fb&tags="+viewmodel.searchString()+"&safe_search=1&per_page=20&format=json&jsoncallback=?",

          success: function(data) {

              $.each(data.photos.photo, function(idx, obj) {

                     viewmodel.photosArr.push(new Pic2( obj ));
              });
          }
    });

  });

})

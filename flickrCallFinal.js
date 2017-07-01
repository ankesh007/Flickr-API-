

var Flickr = require("node-flickr");
var keys = {"api_key": "c8c4917dde572f01d4dd320a24b447fd"};
var secret= {"secret" : "8f2e62ded74d7223"};
flickr = new Flickr(keys,secret);//instance of Flickr
//Key | Secret generated online



//****************Setting up HASHTABLE for Duplicate Detection****************
var HashTable = require('hashtable');
var hashtable_photoid = new HashTable();
//****************Setting HashTable ENDED****************


//****************Setting PULL parameter****************
var exp=0;  
var exp_limit=70;
var PAGES = 3;
var IMAGES_PER_PAGE = 480;
var TAGS="cat,dogs,rats,myself,love,friend";
var unix_timestamp=1420070400;//01/01/2015
var slide_window=(6*86400);//6 days
//****************Setting PULL parameter ENDED****************


//****************Setting SCHEDULING parameter****************
var minutes=70
the_interval=minutes*60*1000
//****************Setting SCHEDULING parameter ENDED****************


//****************Setting FILE-WRITING parameter****************
var fs = require('fs');
var csv_FileName='URLs';
var extension='.csv';
//****************Setting FILE-WRITING parameter ENDED****************

var counter=0;

var interval=setInterval(function() {	
	exp++;

	if(exp==exp_limit)
	{
		clearInterval(interval);
	}

for(page=1;page<=PAGES;page++)
{

//******************Begin REQUEST1****************

(function(page,exp){

	flickr.get("photos.search", {"tags":TAGS,"per_page":IMAGES_PER_PAGE,"page":page,"min_upload_date":unix_timestamp,"max_upload_date":(unix_timestamp+slide_window)}, function(err, result){
    if (err) return console.error(err);


    var PULLED=result.photos.photo.length; 

  	for(i=0;i<PULLED;i++)
  	{
	var temp_photo=result.photos.photo[i];

	if(hashtable_photoid.has(temp_photo.id+"_"+temp_photo.secret))
		{
			continue;
		}
		else
		{

		counter++;

	hashtable_photoid.put((temp_photo.id+"_"+temp_photo.secret),{value:1});

	var dataToWrite="https://farm"+temp_photo.farm+".staticflickr.com/"+temp_photo.server+"/"+temp_photo.id+"_"+temp_photo.secret+".jpg";

(function(dataToWrite){
		flickr.get("photos.getInfo", {"photo_id":temp_photo.id,"secret":temp_photo.secret}, function(err2, result2){
    if (err2) return console.error(err2);

    dataToWrite=dataToWrite+","+result2.photo.views;

    (function(dataToWrite)
    {
    	flickr.get("people.getInfo",{"user_id":result2.photo.owner.nsid},function(err3,result3)
    	{
    		if(err3)return console.error(err3);
	
	dataToWrite=dataToWrite+","+result3.person.photos.count._content;
	
	fs.appendFile('CSV\'S/'+csv_FileName+'_'+page+'_'+exp+extension, dataToWrite+"\n", 'utf8', function (err) {
  	if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
    } 
	});//**************CLOSE FILE WRITING**********8
    	}); //*********END REQUEST3**************
    })(dataToWrite);//*********END REQUEST3 FUNC**************

});//*********END REQUEST2**************

	})(dataToWrite);//*********END REQUEST2 FUNC************

  	}	//*******END ELSE*********
  } //**********END PULLED LOOP **********

}); //****************END REQUEST1***********************
})(page,exp);//*********END REQUEST1 FUNC************

} //*********END PAGES LOOP***********

unix_timestamp+=slide_window;
console.log(exp);
},the_interval); //**********Scheduler Ends**********



var Flickr = require("node-flickr");
var keys = {"api_key": "c8c4917dde572f01d4dd320a24b447fd"};
var secret= {"secret" : "8f2e62ded74d7223"};
//Key generated online
flickr = new Flickr(keys,secret);

var HashTable = require('hashtable');
var hashtable_photoid = new HashTable();




var PAGES = 1;
//To pull per page
var IMAGES_PER_PAGE = 5;//450;
// var LoopTimes = 2;


var dataToWrite;
var fs = require('fs');
var csv_FileName='URLs';
var extension='.csv';

var counter=0;
var flag=true;
var unix_timestamp=1420070400;
var slide_window=(10*86400);
var exp=0;
var exp_limit=1;//40;

while(exp<exp_limit)
{
	exp++;
	//console.log(counter+"Counter\n");
	

for(page=1;page<=PAGES && flag;page++)
{

	flickr.get("photos.search", {"tags":"cat,dogs,rats,myself,love,friend","per_page":IMAGES_PER_PAGE+exp,"page":page,"min_upload_date":unix_timestamp,"max_upload_date":(unix_timestamp+slide_window)}, function(err, result){
    if (err) return console.error(err);


    // var delay2=1000;
    // while(delay2--){}

    

    var PULLED=result.photos.photo.length; 
    var pageNo=result.photos.page;
    var IMAGES_PER_PAGE2=result.photos.perpage;


  	//console.log(PULLED + " results found.");

  	//console.log(result);

  	for(i=0;i<PULLED;i++)
  	{
	var temp_photo=result.photos.photo[i];

	if(hashtable_photoid.has(temp_photo.id+"_"+temp_photo.secret))
		{
			//console.log("Duplicate");
			continue;
		}
		else
		{

		counter++;
		//console.log(counter);


	hashtable_photoid.put((temp_photo.id+"_"+temp_photo.secret),{value:1});

	dataToWrite="https://farm"+temp_photo.farm+".staticflickr.com/"+temp_photo.server+"/"+temp_photo.id+"_"+temp_photo.secret+".jpg";

(function(fileData,pageNo,IMAGES_PER_PAGE2){
		flickr.get("photos.getInfo", {"photo_id":temp_photo.id,"secret":temp_photo.secret}, function(err2, result2){
    if (err2) return console.error(err2);

    fileData=fileData+","+result2.photo.views;
    //console.log(fileData);
    // dataToWrite=dataToWrite+","+result2.photo.views;
    // console.log(dataToWrite);

    (function(fileData,pageNo,IMAGES_PER_PAGE2)
    {
    	flickr.get("people.getInfo",{"user_id":result2.photo.owner.nsid},function(err3,result3)
    	{
    		if(err3)return console.error(err3);
    		// console.log(result3.person.photos.count);
    		// console.log(result3.person.photos.count._content);
    		//fileData=fileData+

	fs.appendFile('CSV\'S/'+csv_FileName+'_'+pageNo+'_'+IMAGES_PER_PAGE2+extension, fileData+","+result3.person.photos.count._content+"\n", 'utf8', function (err) {
  	if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
    var delay=1000;
    while(delay--){}
  	} 
	});
    	});
    })(fileData,pageNo,IMAGES_PER_PAGE2);




});
		

	})(dataToWrite,pageNo,IMAGES_PER_PAGE2);

	//console.log("\n");
  	}	
  }
});

//console.log("Done page " +page+"\n");
}
unix_timestamp+=slide_window;
console.log(exp);
}
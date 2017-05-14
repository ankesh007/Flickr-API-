

var Flickr = require("node-flickr");
var keys = {"api_key": "3e68a0c966142796cb2e5ed4188edd5d"}
//Key generated online
flickr = new Flickr(keys);



var PAGES = 3;
//To pull per page
var IMAGES_PER_PAGE = 4;


var dataToWrite;
var fs = require('fs');
var csv_FileName='URLs.csv';


for(page=1;page<=PAGES;page++)
{

	flickr.get("photos.search", {"tags":"cat,dogs,rats,myself,love","per_page":IMAGES_PER_PAGE,"page":page}, function(err, result){
    if (err) return console.error(err);

    var PULLED=result.photos.photo.length; 


  	console.log(PULLED + " results found.");

  	//console.log(result);

  	for(i=0;i<PULLED;i++)
  	{
	var temp_photo=result.photos.photo[i];
	dataToWrite="https://farm"+temp_photo.farm+".staticflickr.com/"+temp_photo.server+"/"+temp_photo.id+"_"+temp_photo.secret+".jpg\n";
	console.log(dataToWrite);

	// fs.writeFile(csv_FileName, dataToWrite, 'utf8', function (err) {
	fs.appendFile(csv_FileName, dataToWrite, 'utf8', function (err) {
  	if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  	} 
	});
	//console.log("\n");
  	}	
    //console.log(result.photos);
});

console.log("Done page " +page+"\n");
}
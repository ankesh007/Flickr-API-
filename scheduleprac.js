var schedule = require('node-schedule');
var yo=5; 
var j = schedule.scheduleJob('* * * * * *', function(a){
	yo=yo+1;
	(function(a){console.log(a);})(yo);
  console.log('The answer to life, the universe, and everything!');
});

//Runs code every minute once as in 
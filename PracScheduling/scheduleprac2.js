var schedule = require('node-schedule');
 
var rule = new schedule.RecurrenceRule();
 rule.second = null;

let startTime = new Date(Date.now()+5000);
let endTime = new Date(startTime.getTime() + 5000);

var j = schedule.scheduleJob({start:startTime,end:endTime,rule:rule}, function(){
  console.log('The answer to life, the universe, and everything!');
});
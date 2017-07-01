the_interval = 2* 1000;
var i=0
var interval=setInterval(function() {
  i=i+1
  console.log(i)
  console.log("I am doing my 5 minutes check");
  if(i==5)
  {
  	clearInterval(interval);
  }
  // do your stuff here
}, the_interval);

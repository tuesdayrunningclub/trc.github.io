function init(){

getData();

function getData(){
//  $.ajax({
var data = bigjan;
          //url: "https://www.strava.com/api/v3/clubs/505946/activities?page=1&per_page=200" ,
          //url: "https://www.strava.com/api/v3/athlete/activities?after=1572644675&page=1&per_page=30"
          //beforeSend: function(xhr) {
          //     xhr.setRequestHeader("Authorization", "Bearer 5cede79d26005a34222d96858539b868bcdc8266")
          //}, success: function(data){

          //var  processed_data = [];

          var runners = [{name: "JonnyB.", distance : 0},{name: "JonathonD.", distance : 0},{name: "ChristopherG.", distance : 0},{name: "MarcusP.", distance : 0}, ];
              //alert(data);
              //process the JSON data etc

              var d0 = 0;
              var d1 = 0;
              var d2 = 0;
              var d3 = 0;

for (i in data){
  if (data[i].name.substring(0,7) == '2020-01'){
  var n = data[i].athlete.firstname + data[i].athlete.lastname
  if (n === runners[0].name){
   d0 += data[i].distance
  } else if (n === runners[1].name){
    d1 += data[i].distance
  } else if (n === runners[2].name){
    d2 += data[i].distance
  } else if (n === runners[3].name){
    d3 += data[i].distance
  }
}}
runners[0].distance = Math.round((d0/1000)*100)/100;
runners[1].distance = Math.round((d1/1000)*100)/100;
runners[2].distance = Math.round((d2/1000)*100)/100;
runners[3].distance = Math.round((d3/1000)*100)/100;

console.log(runners[0].name, runners[0].distance);
console.log(runners[1].name, runners[1].distance);
console.log(runners[2].name, runners[2].distance);
console.log(runners[3].name, runners[3].distance);

makeMonthGraph(runners);
getWinner(runners);

      }

}

function getWinner(obj){

 var winner = '';
 var max = 0;

 for (i in obj){

   if (obj[i].distance > max){
     max = obj[i].distance;
     winner = obj[i].name;
   }

 }
console.log(winner);
 return winner;

}

function makeMonthGraph(obj){

  names = [];
  distance = [];

  for (i in obj){
    names.push(obj[i].name);
    distance.push(obj[i].distance);

  }


  var ctx = document.getElementById("chart1").getContext('2d');
   var myChart = new Chart(ctx, {
   type: 'bar',
   data: {
   labels: names,
   datasets: [{
       label: 'distance',
       data: distance,
       backgroundColor: '#FFF258',
       borderColor: 'black',
       borderWidth: 1
   }]
   },
   options: {
   legend: {
       display: false
   },
   title: {
      display: true,
      text: 'Big January 2020 - Distance'
   },
   scales: {
       yAxes: [{
           gridLines:{ display: false},
           ticks: {
               beginAtZero:true
           }
       }],
       xAxes: [{gridLines: {display: false}}]
   }
   }
   });


    }

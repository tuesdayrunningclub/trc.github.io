var client = 40542;
var secret = "1fc60026f3944e660ee30541998dbbb9a53abf7e";
var tk = "decdfff2cc141076879d5959dc005fc3891aad2c"

// Average distance per runner
// Average time per runner

function StravaAccessToken() {

var client_id = client;
var secret_id = secret;
var auth_code = 'c1a8f4594d4aae0cad45bb312b31636fb12efe9d';


var url_get_access = "https://www.strava.com/oauth/authorize?client_id=40542&redirect_uri=https://localhost&response_type=code&scope=read"
// need to go to this site and get the access code each time

// var settings = {
//   "url": "https://www.strava.com/oauth/authorize?client_id=40542&redirect_uri=https://localhost&response_type=code&scope=read",
//   "method": "GET",
//   "timeout": 0,
// };
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });



// var grant_type = 'authorization_code';
//
// url_code = "https://www.strava.com/api/v3/oauth/token?client_id=" +
//   client_id +
//   "&client_secret=" +
//   secret_id +
//   "&code=" +
//   //'code' +
//   auth_code +
//   '&grant_type=' +
//   grant_type
//
//   console.log("" + url_code);
//
//   $.ajax({
//     url: url_code,
//     type: "POST",
//     success: function(result){
//       init(result.access_token);
//     },
//     error: function(error){
//     //  console.log('Error ${error}')
//     }
//
//   });

init(tk);

}

function init(token){




// FOR THIS I JUST NEED MY ACCESS TOKEN WHICH CHANGES EVERY 6 HOURS

  $.ajax({
          url: "https://www.strava.com/api/v3/clubs/505946/activities?page=1&per_page=200" ,
          //url: "https://www.strava.com/api/v3/athlete/activities?after=1572644675&page=1&per_page=30"
          beforeSend: function(xhr) {

               xhr.setRequestHeader("Authorization", "Bearer " + token)

          }, success: function(data){
            console.log(data);

          var  processed_data = [];


          var runners = [{name: "JonnyB.", distance : 0, cnt: 0, elevation: 0,timetaken: 0},
                         {name: "JonathonD.", distance : 0, cnt: 0, elevation: 0,timetaken: 0},
                         {name: "ChristopherG.", distance : 0, cnt: 0, elevation: 0,timetaken: 0},
                         {name: "MarcusP.", distance : 0, cnt: 0, elevation: 0,timetaken: 0}, ];
              //alert(data);
              //process the JSON data etc

              var d0 = 0;
              var d1 = 0;
              var d2 = 0;
              var d3 = 0;

              var c0 = 0;
              var c1 = 0;
              var c2 = 0;
              var c3 = 0;

              var e0 = 0;
              var e1 = 0;
              var e2 = 0;
              var e3 = 0;

              var s0 = 0;
              var s1 = 0;
              var s2 = 0;
              var s3 = 0;


for (i in data){
  if (data[i].name.substring(0,7) == "2020-01"){
    processed_data.push(data[i]);
  var n = data[i].athlete.firstname + data[i].athlete.lastname
  if (n === runners[0].name){
   d0 += data[i].distance
   c0+=1
   e0 += data[i].total_elevation_gain
   s0 += data[i].moving_time
  } else if (n === runners[1].name){
    d1 += data[i].distance
    c1+=1
    e1 += data[i].total_elevation_gain
    s1 += data[i].moving_time
  } else if (n === runners[2].name){
    d2 += data[i].distance
    c2+=1
    e2 += data[i].total_elevation_gain
    s2 += data[i].moving_time
  } else if (n === runners[3].name){
    d3 += data[i].distance
    c3+=1
    e3 += data[i].total_elevation_gain
    s3 += data[i].moving_time
  }
}}
runners[0].distance = (d0/1000).toFixed(2);
runners[1].distance = (d1/1000).toFixed(2);
runners[2].distance = (d2/1000).toFixed(2);
runners[3].distance = (d3/1000).toFixed(2);

runners[0].cnt = c0;
runners[1].cnt = c1;
runners[2].cnt = c2;
runners[3].cnt = c3;

runners[0].elevation = e0.toFixed(2);
runners[1].elevation = e1.toFixed(2);
runners[2].elevation = e2.toFixed(2);
runners[3].elevation = e3.toFixed(2);

runners[0].timetaken = (s0/3600).toFixed(2);
runners[1].timetaken = (s1/3600).toFixed(2);
runners[2].timetaken = (s2/3600).toFixed(2);
runners[3].timetaken = (s3/3600).toFixed(2);

console.log("avg distance - " + (d0/1000)/c0);
console.log("avg distance - " + (d1/1000)/c1);
console.log("avg distance - " + (d2/1000)/c2);
console.log("avg distance - " + (d3/1000)/c3);


makeMonthGraph(runners);
makeCountGraph(runners);
makeElevationGraph(runners);
makeSecondsGraph(runners);
//makeDailyGraph(processed_data);

      }

  })


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
   type: 'horizontalBar',
   data: {
   labels: names,
   datasets: [{
       label: 'distance',
       data: distance,
       backgroundColor: 'orange',
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
      text: 'Distance'
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


    function makeCountGraph(obj){

      names = [];
      cnt = [];

      for (i in obj){
        names.push(obj[i].name);
        cnt.push(obj[i].cnt);

      }


      var ctx = document.getElementById("chart2").getContext('2d');
       var myChart = new Chart(ctx, {
       type: 'bar',
       data: {
       labels: names,
       datasets: [{
           label: 'Run count',
           data: cnt,
           backgroundColor: 'orange',
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
          text: 'No. of Runs'
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

function makeElevationGraph(obj){

          names = [];
          elev = [];

          for (i in obj){
            names.push(obj[i].name);
            elev.push(obj[i].elevation);

          }


          var ctx = document.getElementById("chart3").getContext('2d');
           var myChart = new Chart(ctx, {
           type: 'bar',
           data: {
           labels: names,
           datasets: [{
               label: 'Elevation',
               data: elev,
               backgroundColor: 'orange',
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
              text: 'Elevation gain'
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

            function makeSecondsGraph(obj){

                      names = [];
                      secs = [];

                      for (i in obj){
                        names.push(obj[i].name);
                        secs.push(obj[i].timetaken);

                      }


                      var ctx = document.getElementById("chart4").getContext('2d');
                       var myChart = new Chart(ctx, {
                       type: 'bar',
                       data: {
                       labels: names,
                       datasets: [{
                           label: 'Hours',
                           data: secs,
                           backgroundColor: 'orange',
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
                          text: 'Total Moving Time (hours)'
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

    function makeDailyGraph(data){
      console.log(data);

      var xAx = Array.from(new Array(31), (x,i) => i + 1);

      var rnnrs = ["JonnyB.","JonathonD.","ChristopherG.","MarcusP."];

      var jb = [];

// need to loop through the data, names and days to find the matches




      var run_daily = [1,2,3,10];

    console.log(xAx);

    var ctx = document.getElementById("chartDaily").getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'line',
  data: {
  labels: xAx,
  datasets: [{
      label: rnnrs[0],
      data: jb,
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      borderColor: 'pink',
      pointBorderWidth: 1,
      pointRadius: 5,
      fill: false
  },{
    label: rnnrs[1],
    data: [1,2,3,4],
    pointBackgroundColor: 'blue',
    pointBorderColor: 'blue',
    borderColor: 'lightblue',
    pointBorderWidth: 1,
    pointRadius: 5,
    fill: false
  },{
    label: rnnrs[2],
    data: run_daily,
    pointBackgroundColor: 'green',
    pointBorderColor: 'green',
    borderColor: 'lightgreen',
    pointBorderWidth: 1,
    pointRadius: 5,
    fill: false
  }]
  },
  options: {
  legend: {
      display: true
  },
  title: {
     display: true,
     text: 'Distance per Day'
  },
  scales: {
      yAxes: [{
          gridLines:{ display: false},
          ticks: {
              beginAtZero:true
          }
      }],
      xAxes: [{
        gridLines: {display: false}}]
  }
  }
  });

}

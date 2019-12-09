var client = 40542;
var secret = "1fc60026f3944e660ee30541998dbbb9a53abf7e";



function StravaAccessToken() {

  var token = "";

var client_id = client;
var secret_id = secret;
var code = 'ae96a5cd1986be30e44d10fa07866f8c2acd3b9c';


var url_get_access = "https://www.strava.com/oauth/authorize?client_id=40542&redirect_uri=https://localhost&response_type=code&scope=read"

var grant_type = 'authorization_code';

//"https://www.strava.com/oauth/mobile/authorize?client_id=1234321&redirect_uri= YourApp%3A%2F%2Fwww.yourapp.com%2Fen-US&response_type=code&approval_prompt=auto&scope=activity%3Awrite%2Cread&state=test"

url_code = "https://www.strava.com/api/v3/oauth/token?client_id=" +
  client_id +
  "&client_secret=" +
  secret_id +
  "&code=" +
  //'code' +
  code +
  '&grant_type=' +
  grant_type

  //console.log(url_code);


  $.ajax({
    url: url_code,
    type: "POST",
    success: function(result){
    //  console.log(result, result.access_token);
      token = result.access_token;
      init(token);
    },
    error: function(error){
    //  console.log('Error ${error}')
    }

  });


    $().ready(function () {
  var url = url_get_access

  $.get(url, function (data) {
    // can use 'data' in here...
    console.log(data);
  });
});

/**


It worked for us in this way:
$http.post(‘https://your.url.com 17’, {
Post data
json: {
“prop1”: “val1”,
“prop2”: “val2”
},
headers: {
‘Content-Type’: ‘application/json’,
‘X-Api-Key’: key
}
},
// Callback
function (err, response, body) {
…

where key is variable containing the appropriate value. But node.js has various other methods to do an http-request.



**/


//  xhttp.open("POST", "demo_get2.asp?fname=Henry&lname=Ford", true);
//  xhttp.send();

// this is to get access code
//  "https://www.strava.com/oauth/authorize?client_id=40542&redirect_uri=http://localhost&response_type=code&scope=read"
// returns http://YOUR_CALLBACK_DOMAIN/?state=&code=AUTHORIZATION_CODE_FROM_STRAVA&scope=YOUR_SCOPE
// this is the access code needed for the access token for the bearer
/**
https://www.strava.com/oauth/token?client_id=YOUR_CLIENT_ID&
    client_secret=YOUR_CLIENT_SECRET&
    code=AUTHORIZATION_CODE_FROM_STRAVA&
    grant_type=authorization_code
**/


}

function init(token){
console.log(token);

  $.ajax({
          url: "https://www.strava.com/api/v3/clubs/505946/activities?page=1&per_page=200" ,
          //url: "https://www.strava.com/api/v3/athlete/activities?after=1572644675&page=1&per_page=30"
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer " + token)
          }, success: function(data){

          var  processed_data = [];

          var runners = [{name: "JonnyB.", distance : 0},{name: "JonathonD.", distance : 0},{name: "ChristopherG.", distance : 0},{name: "MarcusP.", distance : 0}, ];
              //alert(data);
              //process the JSON data etc

              var d0 = 0;
              var d1 = 0;
              var d2 = 0;
              var d3 = 0;

for (i in data){
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
}
runners[0].distance = d0/1000;
runners[1].distance = d1/1000;
runners[2].distance = d2/1000;
runners[3].distance = d3/1000;

console.log(runners[0].name, runners[0].distance);
console.log(runners[1].name, runners[1].distance);
console.log(runners[2].name, runners[2].distance);
console.log(runners[3].name, runners[3].distance);

makeMonthGraph(runners);

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
   type: 'bar',
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

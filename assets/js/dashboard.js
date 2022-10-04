/*!
* Created by: Danzz Coding | https://danzzcodingweb.vercel.app
*/

// Apikey
randomapikey = ["9286c1a775","9267ic6a0f1","927j59de9c","921n567ea6","921h5a4282","925n2c494","928b0323c9","927b0k3hp7o2","925b04ib0j","023l1qhbpk","92b1a0h7ts","92a70b789c","9291a7bk0p1","92a7o8pe9c","92y1a7l0a6","9221a7i9h2","921a7k3n94","92a0kk2bc9","921a7l9pho2","92a2n1kb0j","92b0a75k6f","92u1a7pr8s"];
const randomkeys = randomapikey[Math.floor(Math.random() * (randomapikey.length))]
document.getElementById("randomkey").textContent=randomkeys

// Visitor
$.getJSON("https://api.countapi.xyz/hit/danzz-api.herokuapp.com/visitor", function(response) {
    $("#visitors").text(response.value);
})

// User Login
$.getJSON("https://api.countapi.xyz/hit/danzz-api.herokuapp.com/userlogin", function(response) {
    $("#userlogin").text(response.value);
})

// Request Today
$.getJSON("https://api.countapi.xyz/hit/danzz-api.herokuapp.com/requesttoday1", function(response) {
    $("#requesttoday").text(response.value);
})

// Total Request
$.getJSON("https://api.countapi.xyz/hit/danzz-api.herokuapp.com/totalrequest", function(response) {
    $("#totalrequest").text(response.value);
})

// Ip Address
window.setTimeout("getip()",1000);
function getip(){
  var danzz=new XMLHttpRequest();
  var url='https://api.ipify.org?format=json';
  danzz.onloadend=function(){
  data=JSON.parse(this.responseText);
  document.getElementById("ip").textContent=data.ip
};
danzz.open("GET",url,true);
danzz.send();
}

//Baterry
tag_battery_status = document.querySelector('div#battery_status');
tag_battery_level = document.querySelector('div#battery_level');
     setInterval(function() {
         navigator.getBattery().then(battery=> {
             battery_level = String(battery.level).split('.')[1];
             tag_battery_level.innerHTML = `${(battery_level.length <= 1)? oud(Number(battery_level)): battery_level}% ${battery.charging ? 'charging': 'discharging'}`;
         });
     },
         10);

// User Agent
txt = "";
txt += "<p><b>Version Browser</b>: <br>" + navigator.appVersion + "</p>";
txt += "<p><b>Language</b>: " + navigator.language + "</p>";
txt += "<p><b>Browser</b>: " + navigator.appCodeName + "</p>";
txt += "<p><b>Vendor</b>: " + navigator.vendor + "</p>";
txt += "<p><b>Cookies</b>: " + navigator.cookieEnabled + "</p>";
txt += "<p><b>Platform</b>: " + navigator.platform + "</p>";

document.getElementById("webinfo").innerHTML = txt;

// Date
myMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
myDays = ['Week','Monday','Monday','Wednesday','Thursday','Friday','Saturday'];
var tgl = new Date();
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
ThisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy;

const tanggal = `${ThisDay}, ${day} ${myMonths[bulan]} ${year}`

document.getElementById("Date").innerHTML = tanggal;

// Count Time
var countDownDate = new Date("Jul 10, 2022 00:00:00").getTime();

// Update Hitungan Mundur Setiap 1 Detik
var x = setInterval(function() {

    // Get Time And Date
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Calculator
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("jadwaltime").innerHTML = days + "Hari  " + hours + "Jam " + minutes + "Menit " + seconds + "Detik ";

    // Expired Time
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("jadwaltime").innerHTML = "Berakhir";
    }
}, 1000);

// Time
let clock=document.querySelector("div#Clock");
let saying=document.querySelector("div#Saying");
setInterval(()=>{
var widthdeVicewidthXinitialscalesHrinkno=new Date();
const Jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const menit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Menit = widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Detik = widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const detik= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const jaM= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const mEnit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const detIk= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);

// Saying Time
if(Jam<4){saying.innerHTML="Good Early Days";}else
if(jam<11){saying.innerHTML="Good Morning";}else 
if(Jam<16){saying.innerHTML="Good Afternoon";}else 
if(jam<20){saying.innerHTML="Good Afternoon";}else
{saying.innerHTML="Good Night";}
clock.innerHTML=jaM+":"+mEnit+":"+detIk},250);

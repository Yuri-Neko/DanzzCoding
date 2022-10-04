require('../set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://danzzcodingweb.vercel.app
*/

// Module
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var { performance } = require('perf_hooks');

// Lib
var { runtime, fetchJson } = require('../lib/myfunc')

// Apikey
var listkey = ["danzz","9286c1a775","9267ic6a0f1","927j59de9c","921n567ea6","921h5a4282","925n2c494","928b0323c9","927b0k3hp7o2","925b04ib0j","023l1qhbpk","92b1a0h7ts","92a70b789c","9291a7bk0p1","92a7o8pe9c","92y1a7l0a6","9221a7i9h2","921a7k3n94","92a0kk2bc9","921a7l9pho2","92a2n1kb0j","92b0a75k6f","92u1a7pr8s"];
var listkeyprem = ["danzzgz"];


// Check Apikey
router.get('/checkapikey', async (req, res, next) => {
	var apikey = req.query.apikey

	if(!apikey) return res.json({message: 'apikey invalid' })
	if(listkey.includes(apikey))
	
	var keys = apikey
	if (keys) {
	json = JSON.stringify({
		status: true,
		creator: 'Danzz Coding',
		result: {
         apikey: keys
		},
	})
} else {
	json = JSON.stringify({
		status: false,
		apikey: 'Not Found'
	})
}
res.send(JSON.parse(json))
})

// Main Api
// Statistic
router.get('/main/statistic', async (req, res, next) => {
var date = new Date
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()
var neww = performance.now()
var old = performance.now()
var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
var cpu = require('os').cpus()
var json = await (await fetch('https://api.ipify.org/?format=json')).json()
var port = process.env.PORT || 8888 || 5000 || 3000 
    status = {
        status: true,
        memory: ram,
        cpu: cpu,
        port: port,
        ip: json.ip,
        time: `${hour} : ${minute} : ${second}`,        
        speed: `${old - neww}ms`,
        info:{       
            creator: 'Danzz Coding'
        }
    }
    res.json(status)
})

// Runtime
router.get('/main/runtime', async (req, res, next) => {
	runtim = {
		status: true,
		runtime: muptime(process.uptime()),
		info:{       
            creator: 'Danzz Coding'            
        }
    }
    res.json(runtim)
})

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/home.html')
})

router.get('/dash', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})

router.get('/profile', (req, res) => {
    res.sendFile(__path + '/views/profile.html')
})

router.get('/pricing', (req, res) => {
    res.sendFile(__path + '/views/pricing.html')
})

router.get('/donation', (req, res) => {
    res.sendFile(__path + '/views/donation.html')
})

router.get('/success-change', (req, res) => {
    res.sendFile(__path + '/views/success.html')
})

router.get('/nopremium', (req, res) => {
    res.sendFile(__path + '/views/nopremium.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__path + '/views/login.html')
})

router.get('/signup', (req, res) => {
    res.sendFile(__path + '/views/signup.html')
})


module.exports = router

// Func Runtime
function muptime(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ' : ' + pad(minutes) + ' : ' + pad(seconds)
}

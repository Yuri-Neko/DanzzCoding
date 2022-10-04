require('../set')
__path = process.cwd()

// Created by: Danzz Coding | danzzcodingweb.vercel.app

// Module
var express = require('express');
var router  = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var translate = require('translate-google-api');
var isUrl = require('is-url');
var TinyUrl = require('tinyurl');
var BitlyClient = require('bitly').BitlyClient

// Lib
var danzz = require("../lib/listapi");
var { fetchJson, runtime, getBuffer } = require('../lib/myfunc');

// Apikey
var listkey = ["danzz","9286c1a775","9267ic6a0f1","927j59de9c","921n567ea6","921h5a4282","925n2c494","928b0323c9","927b0k3hp7o2","925b04ib0j","023l1qhbpk","92b1a0h7ts","92a70b789c","9291a7bk0p1","92a7o8pe9c","92y1a7l0a6","9221a7i9h2","921a7k3n94","92a0kk2bc9","921a7l9pho2","92a2n1kb0j","92b0a75k6f","92u1a7pr8s"];
var listkeyprem = ["danzz"];


// Features
// Downloader
router.get('/downloader/ytplay', async (req, res, next) => {
	var apikey = req.query.apikey
	var query = req.query.query
	if (!query ) return res.json(loghandler.notquery) 

	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	let yts = require("yt-search")
	let search = await yts(query)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

	let { yta, ytv } = require('../lib/api/y2mate')
	let mp3 = await yta(anu.url, '320kbps')
	let mp4 = await ytv(anu.url, '360p')
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Link: anu.url,
				Title: anu.title,
				Description : anu.description,
				Idvideo: anu.videoId,
				Duration: anu.timestamp,
				Viewer: anu.views,
				UploadedOn : anu.ago,
				Author : anu.author.name,
				Channel : anu.author.url,
				linkdl: {
					mp3: mp3.dl_link,
					mp4:{ 
						link: mp4.dl_link,
						filesize: mp4.filesizeF
					}
				}

	} })
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/ytmp3', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl) 
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	let { yta, ytv } = require('../lib/api/y2mate')
	let mp3 = await yta(url, '320kbps')
	if (!mp3.title ) return res.json(loghandler.noturl)
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Title: mp3.title,
				thumb : mp3.thumb,
				filesize: mp3.filesizeF,
				Idaudio: mp3.id,
				mp3: mp3.dl_link

	} })
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/ytmp4', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl) 
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	let { yta, ytv } = require('../lib/api/y2mate')
	let mp4 = await ytv(url, '360p')
	if (!mp4.title ) return res.json(loghandler.noturl)
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Title: mp4.title,
				thumb : mp4.thumb,
				filesize: mp4.filesizeF,
				Idvideo: mp4.id,
				mp4: mp4.dl_link

	} })
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/facebook', async (req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey
	
	if (!url) return res.json(loghandler.noturl)  
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

danzz.fbdl(url)
.then(data => {
	if (!data.links) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/twitter', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)   
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
danzz.twdl(url)
.then(data => {
	if (!data.thumb ) res.json(loghandler.noturl)
var result = data
res.json({
status: true,
creator: `${creator}`,
result
})
})
.catch(e => {
res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/tiktok', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

danzz.ttdl(url)
.then(data => {
	if (!data.video ) return res.json(loghandler.noturl)
	var result = data
	res.json({
	status: true,
	creator: `${creator}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(loghandler.noturl)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/igstory', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(loghandler.notid)   
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.igstory(username)
	.then(data => {
		if (!data ) return res.json(loghandler.notfound)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {  
			 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/igreels', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	danzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {     
			 res.json(loghandler.error)	
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/downloader/instagram', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/downloader/soundcloud', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.soundcloud(url)
	.then(data => {
		if (!data.download ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Asupan
router.get('/asupan/random', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/asupan/santuy', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/santuy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/asupan/bocil', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/bocil.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/asupan/ukhty', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/ukhty.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/asupan/hijaber', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/asupan/gheayubi', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/gheayubi.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/asupan/rikagusriani', async (req, res, next) => {
        var apikey = req.query.apikey
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/rikagusriani.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Cecan
router.get('/cecan/random', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/hijaber', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/china', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/china.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/indonesia', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/indonesia.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/japan', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/japan.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/korea', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/korea.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/malaysia', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/malaysia.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/thailand', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/thailand.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/cecan/vietnam', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(loghandler.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/vietnam.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Search
router.get('/search/youtube', async (req, res, next) => {
	var apikey = req.query.apikey
	var query = req.query.query
	if (!query ) return res.json(loghandler.notquery) 

	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	let yts = require("yt-search")
	let search = await yts(query)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

	let { yta, ytv } = require('../lib/api/y2mate')
	let mp3 = await yta(anu.url, '320kbps')
	let mp4 = await ytv(anu.url, '360p')
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Link: anu.url,
				Title: anu.title,
				Description : anu.description,
				Idvideo: anu.videoId,
				Duration: anu.timestamp,
				Viewer: anu.views,
				UploadedOn : anu.ago,
				Author : anu.author.name,
				Channel : anu.author.url,
				linkdl: {
					mp3: mp3.dl_link,
					mp4:{ 
						link: mp4.dl_link,
						filesize: mp4.filesizeF
					}
				}

	} })
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/xxxxvideo', async(req, res, next) => {
  var query = req.query.query
  var apikey = req.query.apikey
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notapikeyprem)
  
  if(listkeyprem.includes(apikey)){
    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xvideo/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/search/xnxxvideo', async(req, res, next) => {
  var query = req.query.query
  var apikey = req.query.apikey
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notapikeyprem)
  
  if(listkeyprem.includes(apikey)){
    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xnxx/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/search/pornhub', async(req, res, next) => {  
  var query = req.query.query
  var apikey = req.query.apikey
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notapikeyprem)
  
  if(listkeyprem.includes(apikey)){
    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/pornhub/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.res;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/search/wikimedia', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
  
	if(!query) return res.json(loghandler.notquery)
	if(!apikey) return res.json(loghandler.notapikey)
	
	if(listkey.includes(apikey)){
	danzz.wikimedia(query)
	.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/pinterest', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(loghandler.notquery)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
danzz.pinterest(query)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/shoppe', async (req, res, next) => {
       	var query = req.query.query
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(loghandler.notquery)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/shoppe?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/gplaystore', async (req, res, next) => {
       	var query = req.query.query
       	var num = req.query.num
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(loghandler.notquery)
       	if (!num) return res.json(loghandler.notnum)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/gplaystore?query=${query}&num=${num}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/appstore', async (req, res, next) => {
       	var query = req.query.query
       	var num = req.query.num
       	var page = req.query.page
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(loghandler.notquery)
       	if (!num) return res.json(loghandler.notnum)
       	if (!page) return res.json(loghandler.notpage)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/appstore?query=${query}&num=${num}&page=${page}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/gsmarena', async (req, res, next) => {
       	var query = req.query.query
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(loghandler.notquery)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/gsmarena?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/wallpaper', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(loghandler.notquery)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
danzz.wallpaper(query)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/google', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(loghandler.notquery)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
googleIt({'query': query}).then(results => {
		if (!results[0]) return res.json(loghandler.notfound)
			res.json({
				status: true,
				creator: `${creator}`,
				result: results
			})

	}).catch(e => {	
		res.json(loghandler.notfound)
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/search/googleimage', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(loghandler.notquery)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
var gis = require('g-i-s')
gis(query, logResults)

function logResults(error, results) {
  if (error) {
	res.json(loghandler.notfound)
  }
  else {
	if (!results[0]) return res.json(loghandler.notfound)
	res.json({
		status: true,
		creator: `${creator}`,
		result:  results
	})
   
  }
}
} else {
  res.json(loghandler.notapikey)
}
})

// Film
router.get('/film/search', async (req, res, next) => {           
       	var query = req.query.query
       	var apikey = req.query.apikey
       	
       	if (!query) return res.json(loghandler.notquery)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://lk21-api-zahirr.herokuapp.com/search?query=${film}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/film/play', async (req, res, next) => {
           var query = req.query.query
       	var apikey = req.query.apikey
       	
       	if (!query) return res.json(loghandler.notquery)
       	if (!apikey) return res.json(loghandler.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://filmapik-api-zahirr.herokuapp.com/play?id=${film}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

// Text Pro
router.get('/textpro/pencil', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/glitch', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/blackpink', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/berry', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/neon', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})



router.get('/textpro/logobear', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/3dchristmas', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext) 
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/thunder', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/3dboxtext', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)   
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/textpro/glitch2', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)   
	if (!text2) return res.json(loghandler.nottext2) 
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/glitchtiktok', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/green-horror', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/magma', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/3d-neon-light', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/3d-orange-juice', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/textpro/strawberry', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Photo Oxy
router.get('/photooxy/flaming', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/shadow-sky', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/metallic', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/naruto', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/pubg', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/under-grass', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/harry-potter', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/flower-typography', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/picture-of-love', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/coffee-cup', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/butterfly', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/night-sky', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/carved-wood', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/photooxy/illuminated-metallic', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/photooxy/sweet-candy', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Canvas
router.get('/canvas/welcome', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/welcome?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/welcome2', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var gcicon = req.query.gcicon
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
if (!gcicon) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Icon Url"})
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/welcome2?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}&gcicon=${gcicon}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/goodbye', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/goodbye?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/goodbye2', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var gcicon = req.query.gcicon
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
if (!gcicon) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Icon Url"})
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/goodbye2?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}&gcicon=${gcicon}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/verify', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var sn = req.query.sn
var pp = req.query.pp
var bg = req.query.bg
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!sn) return res.json({ status : false, creator : `${creator}`, message : "Enter Seri"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Pp Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})

if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://hadi-api.herokuapp.com/api/card/verify?nama=${name}&member=${mem}&seri=${sn}&pp=${pp}&bg=${bg}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/verify2', async (req, res, next) => {

var name = req.query.name
var name2 = req.query.name2
var nameverify = req.query.nameverify
var pp = req.query.pp
var pp2 = req.query.pp2
var bg = req.query.bg
var apikey = req.query.apikey

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!name2) return res.json({ status : false, creator : `${creator}`, message : "Enter Name2"})
if (!nameverify) return res.json({ status : false, creator : `${creator}`, message : "Enter Verify Name"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Pp Url"})
if (!pp2) return res.json({ status : false, creator : `${creator}`, message : "Enter Pp2 Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})

if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://hadi-api.herokuapp.com/api/card/verify2?name=${name}&memverify=${nameverify}&gcname=${name2}&gcicon=${pp}&pp=${pp2}&bg=${bg}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/sadcat', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(loghandler.nottext) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/sadcat?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/facts', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(loghandler.nottext) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/facts?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/pikachu', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(loghandler.nottext) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/pikachu?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/biden', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(loghandler.nottext) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/biden?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/oogway', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(loghandler.nottext) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/oogway?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/wanted', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl)
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://hadi-api.herokuapp.com/api/canvas/wanted?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/gun', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/gun?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/greyscale', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/greyscale?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/ad', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/ad?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/blur', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/blur?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/uncover', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/uncover?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/invert', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/invert?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/canvas/alert', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(loghandler.noturl) 
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/alert?url=${url}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Maker
router.get('/maker/ttp', async(req, res, next) => {

  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://hadi-api.herokuapp.com/api/canvas/ttp?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/ttp.png', data)
  res.sendFile(__path +'/tmp/ttp.png')
  } else {
    res.json(loghandler.notapikey)
  }
})

router.get('/maker/attp', async(req, res, next) => {

  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://hadi-api.herokuapp.com/api/canvas/attp?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/attp.gif', data)
  res.sendFile(__path +'/tmp/attp.gif')
  } else {
    res.json(loghandler.notapikey)
  }
})

router.get('/maker/nulis', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://hadi-api.herokuapp.com/api/canvas/nulis?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/nulis.png', data)
  res.sendFile(__path +'/tmp/nulis.png')
  } else {
    res.json(loghandler.notapikey)
  }
});

router.get('/maker/nulis2', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://hadi-api.herokuapp.com/api/canvas/nulis2?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/nulis.png', data)
  res.sendFile(__path +'/tmp/nulis.png')
  } else {
    res.json(loghandler.notapikey)
  }
});

// Wallpaper
router.get('/wallpaper/random', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallrandom`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/wallpaper/ml', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallml`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/wallpaper/pubg', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallpubg`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/wallpaper/neon', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallneon`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/wallpaper/code', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallcode`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Game
router.get('/game/asahotak', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/asahotak.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/caklontong', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/caklontong.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/truth', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/truth.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/dare', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/dare.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/darkjoke', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/darkjoke.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/family100', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/family100.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	data: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/pantun', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/pantun.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/siapakahaku', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/siapakahaku.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/tebakgabut', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebakgabut.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/tebaklucu', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebaklucu.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: result
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/tebakgambar', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.tebakgambar()
.then((data) =>{ 
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.error)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/game/susunkata', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/susunkata.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/game/tebakbendera', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebakbendera.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})


router.get('/game/tebakgame', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebakgame.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/game/tebakkata', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebakkata.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/game/tebaklirik', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebaklirik.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/tebaklagu', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebaklagu.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})
router.get('/game/tebakkimia', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(loghandler.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/Danzzxcodes/scraper/main/fun/tebakkimia.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
	  
  res.json({
	status: true,
	creator: `${creator}`,
	result: tebak2
})
} else {
  res.json(loghandler.notapikey)
}
})

// Simi
router.get('/fun/simi', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
        var lang = req.query.lang
   
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(loghandler.nottext)
        if(!lang) return res.json({ message: 'Enter Lang' })

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=${lang}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/fun/simi-en', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=en`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/fun/simi-jp', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=jp`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/fun/simi-id', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=id`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/fun/simi-ar', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=ar`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})

// Sfw
router.get('/sfw/waifu', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/waifu`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/neko', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/neko`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/shinobu', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/shinobu`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/megumin', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/megumin`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/bully', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/bully`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/cuddle', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/cuddle`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/cry', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/cry`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/kiss', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/kiss`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/hug', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/hug`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/awoo', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/awoo`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/sfw/lick', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){
	
var requestSettings = {
url: `https://api-yogipw.herokuapp.com/api/sfw/lick`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.json(loghandler.notapikey)
}
})

// Nsfw
router.get('/nsfw/hentai', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/hentai.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/hentaigif', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/hentaigif.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/neko', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/neko.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	data
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/orgy', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/orgy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/panties', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/panties.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/foot', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/foot.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/cuckold', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/cuckold.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/pussy', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/pussy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	data
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/yuri', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/yuri.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/jahy', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/jahy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/ahegao', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/ahegao.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/bdsm', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/bdsm.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/blowjob', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/blowjob.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/cum', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/cum.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/ero', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/ero.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/nsfw/femdom', async (req, res, next) => {
          var apikey = req.query.apikey
          if (!apikey) return res.json(loghandler.notapikey)
          if(listkey.includes(apikey)){
		 fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/nsfw/femdom.json`))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.json(loghandler.notapikey)
}
})

// Random
router.get('/random/meme', async (req, res, next) => {  
var apikey = req.query.apikey

if (!apikey) return res.json(loghandler.notapikey)
if(listkey.includes(apikey)){

fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/random/meme`))
.then(response => response.json())
.then(data => { var result = data;
res.json({ result })
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/quotes', async (req, res, next) => {
        var apikey = req.query.apikey
            
		if(!apikey) return res.json(loghandler.notapikey)
		if(listkey.includes(apikey)){

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/quotes`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/random/couplepp', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(loghandler.notapikey)
	
	let resultt = await fetchJson('https://raw.githubusercontent.com/Ramdaniofficial/result-rest-api/main/kopel.json')
	let random = resultt[Math.floor(Math.random() * resultt.length)]

	res.json({
	status: true,
	creator: `${creator}`,
		result: {
			male: random.male,
			female: random.female
		}
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/dadu', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(loghandler.notapikey)
	
	let dadu = await fetchJson('https://raw.githubusercontent.com/Ramdaniofficial/result-rest-api/main/dadu.json')
	let random = dadu[Math.floor(Math.random() * dadu.length)]
	var result = await getBuffer(random.result)
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/coffee', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(loghandler.notapikey)
	
	var result = await getBuffer('https://coffee.alexflipnote.dev/random')
	res.set({'Content-Type': 'image/png'})
	res.send(result)
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/balikhuruf', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/balikhuruf?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/balikangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/balikangka?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/bilangangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/bilangangka?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/besarkecil', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/besarkecil?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/heleh', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/heleh?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/huluh', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/huluh?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/hilih', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/hilih?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/halah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/halah?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/kapital', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/kapital?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/katajago', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/katajago?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/resepmasakan', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/resepmasakan?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/jumblahhuruf', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/jumlahhuruf?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/jumblahangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/jumlahangka?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/random/detailhero', async (req, res, next) => {
	var text = req.query.hero
	if (!text ) return res.json(loghandler.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/heroml?query=${text}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Stalk
router.get('/stalker/github', async (req, res, next) => {
	var username = req.query.username
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!username) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let ghstalk = await fetchJson(`https://api.github.com/users/${username}`)
	if (!ghstalk.login) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ghstalk
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/tiktok', async (req, res, next) => {
	var username = req.query.username
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!username) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let ttstalk = await fetchJson(`https://zenzapis.xyz/stalker/tiktok?username=${username}&apikey=sonelstore`)
	if (!ttstalk.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ttstalk.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/instagram', async (req, res, next) => {
	var username = req.query.username
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!username) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let igstalk = await fetchJson(`https://zenzapis.xyz/stalker/ig?username=${username}&apikey=sonelstore`)
	if (!igstalk.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: igstalk.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/npm', async (req, res, next) => {
	var username = req.query.username
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!username) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let npmstalk = await fetchJson(`https://registry.npmjs.org/${username}`)

	res.json({
	status: true,
	creator: `${creator}`,
	result: npmstalk
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickhago', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let hg = await fetchJson(`https://zenzapis.xyz/stalker/nickhago?apikey=sonelstore&query=${id}`)
	if (!hg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: hg.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickccfun', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let cf = await fetchJson(`https://zenzapis.xyz/stalker/nickcocofun?apikey=sonelstore&query=${id}`)
	if (!cf.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: cf.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickbgl', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let bgl = await fetchJson(`https://zenzapis.xyz/stalker/nickbigolive?apikey=sonelstore&query=${id}`)
	if (!bgl.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: bgl.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nicknmtv', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let nmtv = await fetchJson(`https://zenzapis.xyz/stalker/nicknimotv?apikey=soneletore&query=${id}`)
	if (!nmtv.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: nmtv.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickpubg', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let pubg = await fetchJson(`https://zenzapis.xyz/stalker/nickpubg?apikey=sonelstore&query=${id}`)
	if (!pubg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: pubg.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickff', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let ff = await fetchJson(`https://zenzapis.xyz/stalker/nickff?apikey=sonelstore&query=${id}`)
	if (!ff.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ff.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickml', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!zoneid) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let ml = await fetchJson(`https://zenzapis.xyz/stalker/nickml?apikey=sonelstore&query=${id}&query2=${zoneid}`)
	if (!ml.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ml.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickmla', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!zoneid) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let mla = await fetchJson(`https://zenzapis.xyz/stalker/nickmladventure?apikey=sonelstore&query=${id}&query2=${zoneid}`)
	if (!mla.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: mla.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nicklokapala', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let lp = await fetchJson(`https://zenzapis.xyz/stalker/nicklokapala?apikey=sonelstore&query=${id}`)
	if (!lp.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: lp.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickdomino', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let dm = await fetchJson(`https://zenzapis.xyz/stalker/nickdomino?apikey=sonelstore&query=${id}`)
	if (!dm.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: dm.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickzepeto', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let jp = await fetchJson(`https://zenzapis.xyz/stalker/nickzepeto?apikey=sonelstore&query=${id}`)
	if (!jp.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: jp.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nicksausage', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let sg = await fetchJson(`https://zenzapis.xyz/stalker/nicksausage?apikey=sonelstore&query=${id}`)
	if (!sg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: sg.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickaov', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let aov = await fetchJson(`https://zenzapis.xyz/stalker/nickaov?apikey=sonelstore&query=${id}`)
	if (!aov.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: aov.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickcod', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let cod = await fetchJson(`https://zenzapis.xyz/stalker/nickcod?apikey=sonelstore&query=${id}`)
	if (!cod.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: cod.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/stalker/nickpb', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(loghandler.notid)
	if (!apikey) return res.json(loghandler.notapikey)
	
	let pb = await fetchJson(`https://zenzapis.xyz/stalker/nickpb?apikey=sonelstore&query=${id}`)
	if (!pb.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: pb.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Short Link
router.get('/shortlink/tinyurl', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)  

    var islink = isUrl(url)
	if (!islink ) return res.json(loghandler.noturl)  

	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

TinyUrl.shorten(url, function(url, err) {
  if (err) return res.json(loghandler.error)
	res.json({
		status: true,
		creator: `${creator}`,
		result: url
		})
});
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/shortlink/cuttly', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl) 
	
    var islink = isUrl(url)
	if (!islink ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	let randomapicuttly = apicuttly[Math.floor(Math.random() * apicuttly.length)]
	var hasil = await fetchJson(`https://cutt.ly/api/api.php?key=${randomapicuttly}&short=${url}`)
  if (!hasil.url.shortLink ) return res.json(loghandler.error)

	res.json({
		status: true,
		creator: `${creator}`,
		result: hasil.url.shortLink
		})
} else {
  res.json(loghandler.notapikey)
}
});

router.get('/shortlink/bitly', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl) 
	
    var islink = isUrl(url)
	if (!islink ) return res.json(loghandler.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	let randomapibitly = apibitly[Math.floor(Math.random() * apibitly.length)]
	const bitly = new BitlyClient(randomapibitly)
	bitly
	.shorten(url)
	.then(function(result) {
		res.json({
			status: true,
			creator: `${creator}`,
			result : result.link
			})
	 
	})
	.catch(function(error) {
	 res.json(loghandler.error)
	});
} else {
  res.json(loghandler.notapikey)
}
})

// Islamic
router.get('/islamic/randomimage', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/islamic/random_img.json`)
	var result = data[Math.floor(Math.random() * data.length)];
	res.json({
	status: true,
	creator: `${creator}`,
	result: result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/jadwalsholat', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.sholat()
.then((data) =>{ 
	if (!data ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/asmaulhusna', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/islamic/asmaul_husna.json`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/hadist', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/islamic/hadist`)
	if (!data.list ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/quran', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/islamic/quran`)
	if (!data.list ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/surah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.surah(text)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/tafsirsurah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.tafsirsurah(text)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)

})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/islamic/kisahnabi', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
		
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/islamic/kisahnabi`)
	if (!data.list ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.list
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Trending
router.get('/trending/bekasi', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/bekasi`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/depok', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/depok`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/pekanbaru', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/pekanbaru`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/surabaya', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/surabaya`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/makassar', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/makassar`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/bandung', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/bandung`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/jakarta', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/jakarta`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/medan', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/medan`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/palembang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/palembang`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/semarang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/semarang`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/trending/tangerang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/tangerang`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

// News
router.get('/news/inews', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/berita`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/news/kompas', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/kompas`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/news/okezone', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/okezone`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/news/antara', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/antara`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Information
router.get('/information/gempa', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/infogempa`)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/covidworld', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/info/covidworld`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/postalcode', async (req, res, next) => {
	var city = req.query.city
	if (!city ) return res.json({ status : false, creator : `${creator}`, message : "Enter City"})  
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/info/kodepos?kota=${city}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){

	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/hoax', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/infohoax`)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/jadwalbola', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jadwalbola`)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/clock', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jam`)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/worldclock', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jamdunia`)
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/kbbi', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(loghandler.notquery)
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/info/kbbi?kata=${query}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/information/wikipedia', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(loghandler.notquery)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/wikipedia?query=${query}`)
	if (!data.result ) return res.json(loghandler.notfound)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: data.result
	})
} else {
  res.json(loghandler.notapikey)
}
})

// Primbon
router.get('/primbon/ramalanjodoh', async (req, res, next) => {
    var date = req.query.date
    var month = req.query.month
    var years = req.query.years
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!date) return res.json({ status : false, creator : `${creator}`, message : "Enter Date"})
	if(!month) return res.json({ status : false, creator : `${creator}`, message : "Enter Month"})
	if(!years) return res.json({ status : false, creator : `${creator}`, message : "Enter Years"})
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/fun/ramaljadian?tanggal=${date}&bulan=${month}&tahun=${years}`)
	
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/primbon/artinama', async (req, res, next) => {
    var name = req.query.name
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson(`http://kocakz.herokuapp.com/api/primbon/artinama?name=${name}`)
	
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/primbon/tafsirmimpi', async (req, res, next) => {
    var dream = req.query.dream
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!dream) return res.json({ status : false, creator : `${creator}`, message : "Enter Dream"})
	if(!apikey) return res.json(loghandler.notapikey)
	
	let data = await fetchJson(`http://kocakz.herokuapp.com/api/primbon/tafsirmimpi?mimpi=${dream}`)
	
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
} else {
  res.json(loghandler.notapikey)
}
})

// Tools
router.get('/tools/ebase64', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/dbase64', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/ebase32', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/dbase32', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/ebinary', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
	function encodeBinary(char) {
		return char.split("").map(str => {
			 const converted = str.charCodeAt(0).toString(2);
			 return converted.padStart(8, "0");
		}).join(" ")
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				string: string,
				encode: encodeBinary(text)
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/dbinary', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.084 String!"})
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
		
	function dcodeBinary(char) {
		return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				string: string,
				decode: dcodeBinary(text)
				}
		})
}
else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/styletext', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text ) return res.json(loghandler.nottext)
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkeyprem.includes(apikey)){
	
	const { shortText } = require("limit-text-js")
	var text = shortText(text, 10000)
	danzz.styletext(text)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.error)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.error)

})
} else {
  res.json(loghandler.notapikeyprem)
}
})

router.get('/tools/translate', async (req, res, next) => {
	var text = req.query.text
    var lang = req.query.lang
    var apikey = req.query.apikey
    
	if(listkey.includes(apikey)){
	
	if (!text) return res.json(loghandler.nottext)  
	if (!lang) return res.json({ status : false, creator : `${creator}`, message : "Please Enter Lang. View Lang In https://cloud.google.com/translate/docs/languages"})
	if (!apikey) return res.json(loghandler.notapikey)
	
	const defaultLang = 'en'
	const tld = 'cn'
	

	let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        
    } finally {
		res.json({
			status: true,
			creator: `${creator}`,
			result: result[0]
		})
        
    }
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/tools/ssweb', async (req, res, next) => {
	var link = req.query.link
	var islink = isUrl(link)
	var apikey = req.query.apikey
	
	if (!link) return res.json(loghandler.noturl)  
	if (!islink) return res.json(loghandler.noturl)  
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ssweb(link)
	.then((data) =>{ 
		if (!data) return res.json(loghandler.notfound)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.json(loghandler.notfound)
	
	})
} else {
  res.json(loghandler.notapikey)
}
})

router.get('/tools/fakeaddress', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(loghandler.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/result/fake_address.json`)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
} else {
  res.json(loghandler.notapikey)
}
})

module.exports = router
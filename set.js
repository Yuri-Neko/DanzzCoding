/*
* Created by: Danzz Coding | https://danzzcodingweb.vercel.app
*/

// Name Creator
creator = 'Danzz Coding'

// Random Key
randomapikeys = ["9286c1a775","9267ic6a0f1","927j59de9c","921n567ea6","921h5a4282","925n2c494","928b0323c9","927b0k3hp7o2","925b04ib0j","023l1qhbpk","92b1a0h7ts","92a70b789c","9291a7bk0p1","92a7o8pe9c","92y1a7l0a6","9221a7i9h2","921a7k3n94","92a0kk2bc9","921a7l9pho2","92a2n1kb0j","92b0a75k6f","92u1a7pr8s"];
const randomkeys = randomapikeys[Math.floor(Math.random() * (randomapikeys.length))]

// List Key
listkey = ["danzz","9286c1a775","9267ic6a0f1","927j59de9c","921n567ea6","921h5a4282","925n2c494","928b0323c9","927b0k3hp7o2","925b04ib0j","023l1qhbpk","92b1a0h7ts","92a70b789c","9291a7bk0p1","92a7o8pe9c","92y1a7l0a6","9221a7i9h2","921a7k3n94","92a0kk2bc9","921a7l9pho2","92a2n1kb0j","92b0a75k6f","92u1a7pr8s"];

// List Key Prem
listkeyprem = ["danzzgz"];

// Api Cutty
apicuttly = ['2038c1a7754b408aa8f9055282638c00e668e','4786cc6a0f19de9c67ea6a4282c494323c932','89d73b3a07209177d0251e30d49d66bd669ac','e841147455d0fdfbf50f74aefe63b6728adc0','27f3aa3f45cb4460bcbac69b782ca470a4570','31a8df09d5a9d8d009790df0b5642e3d76919','09b4e764ff07b10eac1682e71aaf95a78f358','75fe576ce040b619176af22f5a718b2f574f5','e24ee36f9c1519c0a779667a5182a31fb7ccf','903869065d29e23455ddca922071f4bbeb133']

// Api Bitly
apibitly = ['2243940c230ad0d748059aee58ddf126b65fd8e7','6cfc18e9bfa554714fadc10a1f6aff7555642348','c71b6658a1d271ddaf2a5077de3dcb9d67f68025','cddbceccdc2f1c9d11e4cdd0d2b1d1078e447c43','7915c671fbd90eca96310e5c9442d761225a1080','e5dee46eb2d69fc9f4b0057266226a52a3555356','f09ab8db9cf778b37a1cf8bc406eee5063816dec','964080579f959c0cc3226b4b2053cd6520bb60ad','a4f429289bf8bf6291be4b1661df57dde5066525','3d48e2601f25800f375ba388c30266aad54544ae','4854cb9fbad67724a2ef9c27a9d1a4e9ded62faa','d375cf1fafb3dc17e711870524ef4589995c4f69','43f58e789d57247b2cf285d7d24ab755ba383a28','971f6c6c2efe6cb5d278b4164acef11c5f21b637','ae128b3094c96bf5fd1a349e7ac03113e21d82c9','e65f2948f584ffd4c568bf248705eee2714abdd2','08425cf957368db9136484145aa6771e1171e232','dc4bec42a64749b0f23f1a8f525a69184227e301','0f9eb729a7a08ff5e73fe1860c6dc587cc523035','037c5017712c8f5f154ebbe6f91db1f82793c375']

// Loghandler
loghandler = {
    error: {
        status: false,
        code: 503,
        message: 'Error, Service Unavaible',
        maintanied_by: 'Danzz Coding'
    },
    noturl: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Url',
    	maintanied_by: 'Danzz Coding'
    },
    nottext: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text',
    	maintanied_by: 'Danzz Coding'
    },
    nottext1: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text 1',
    	maintanied_by: 'Danzz Coding'
    },
    nottext2: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text 2',
    	maintanied_by: 'Danzz Coding'
    },
    notnum: {
    	status: false,
    	message: 'Enter Num',
    	maintanied_by: 'Danzz Coding'
    },
    notpage: {
    	status: false,
    	message: 'Enter Page',
    	maintanied_by: 'Danzz Coding'
    },
    notmoji1: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Emoji 1',
    	maintanied_by: 'Danzz Coding'
    },
    notmoji2: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Emoji 2',
    	maintanied_by: 'Danzz Coding'
    },
    notquery: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Query',
    	maintanied_by: 'Danzz Coding'
    },
    notapikey: {
    	status: false,
    	code: 403,
    	message: 'Error, Invalid Apikey, Please Check The Apikey In Dash',
    	maintanied_by: 'Danzz Coding'
    },
    notapikeyprem: {
    	status: false,
    	code: 403,
    	message: 'Error, Invalid Apikey, You Are Not A Premium User, Buy In Pricing',
    	maintanied_by: 'Danzz Coding'
    },
    notfound: {
    	status: false,
    	code: 404,
    	message: 'Error, Not Found',
    	maintanied_by: 'Danzz Coding'
    },
    notid: {
    	status: false,
    	code: 404,
    	message: 'Error, Invalid Id or Username',
    	maintanied_by: 'Danzz Coding'
    },
    ready: {
    	status: false,
    	code: 403,
    	message: 'Error, ​​Already In Use',
    	maintanied_by: 'Danzz Coding'
    }
}
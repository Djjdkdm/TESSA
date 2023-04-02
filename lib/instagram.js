const axios = require("axios");

module.exports = {
insta
};


function insta(ig_url) {
    return new Promise(async (resolve, reject)=> {
        const BASE_URL = "https://instasupersave.com/"
        try {
            const resp = await axios(BASE_URL);
            const cookie = resp.headers["set-cookie"];
            const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=", "").replace("%3D", "")
            var config = {
                method: 'post',
                url: `${BASE_URL}api/convert`,
                headers: {
                    'origin': 'https://instasupersave.com',
                    'referer': 'https://instasupersave.com/pt/',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
                    'x-xsrf-token': session,
                    'Content-Type': 'application/json',
                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
                },
                data: {
                    url: ig_url
                }
            };

            axios(config).then(function (response) {
    let a = [] 
                  a.push(response.data.url[0].url)
                let ig = []
                if (Array.isArray(response.data)) {
                    response.data.forEach(post => {
                        ig.push(post.sd === undefined ? post.thumb: post.sd.url)})
                } else {
                  console.log("Loading\n")
                  console.log(response.data)
                }

                resolve({
                  creator : 'Viper-X0',
                  url : `${a[0]}`, 
                  title : response.data.meta.title,
                  thumb : response.data.thumb
                })
            })
            .catch(function (error) {
                reject(error.message)
            })
        } catch(e) {
            console.log(e)
        }
    })
}

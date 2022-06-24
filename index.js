const express = require("express")
const path = require("path")
const https = require("https")
const app = express()
app.use(express.static(path.join(__dirname, 'static')))
app.listen(3000, ()=> console.log("listo"))
app.get("/", async(req, res)=>{
    res.sendFile("index.html")
})
app.get("/api/:word", async(req, res)=>{
    var options = {
        host :  'od-api.oxforddictionaries.com',
        port : 443,
        path : '/api/v2/words/en-us?q=' + req.params.word,
        method : 'GET',
        headers : {
                "Accept": "application/json",
                "app_id": "39a2f3bd",
                "app_key": "b7a8b1984f6a9a44213926e88088656a"
               }
        };
    https.get(options, resp => {
        let body = '';
  resp.on('data', (d) => {
      body += d;
  });
  resp.on('end', () => {
      let parsed = JSON.stringify(body);
      const data = JSON.parse(body)
     res.send(data);
  });
      })
})
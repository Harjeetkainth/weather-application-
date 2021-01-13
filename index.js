const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+ "/index.html");

});
 app.post("/",function(req,res){
   console.log(req.body.cityName);
   const query =req.body.cityName;
   const apikey="e57513f879051656d9fbf45f1a0ee613";
   const units="metric";
   const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey+"&units=" +units;
  https.get(url,function(response)
  {
    console.log(response.statusCode);

     response.on("data",function(data)
   {

     const weatherData= JSON.parse(data)
     const temp = weatherData.main.temp;

     const descrption =weatherData.weather[0].description;
     console.log(descrption);
     const icon =weatherData.weather[0].icon;
     const url ="http://openweathermap.org/img/wn/"+icon+"@2x.png"

     res.write("<h1> current weather tempreture in " +query+" is  " + temp + "celcius </h1>");
     res.write("<p>current weather condition is " + descrption   + "</p> "   );
     res.write("<img src="+url+">");
     res.send()
   })

  })

})


app.listen(3000,function()
{
  console.log("server is running on port 3000");
})

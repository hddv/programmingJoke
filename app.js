const express=require("express"),bodyParser=require("body-parser"),https=require("https"),app=express();app.use(bodyParser.urlencoded({extended:!0})),app.use(express.static("public")),app.set("view engine","ejs");let indexJoke=1;function getIndicesOf(e,s,n){var r=e.length;if(0==r)return[];var o,t=0,p=[];for(n||(s=s.toLowerCase(),e=e.toLowerCase());(o=s.indexOf(e,t))>-1;)p.push(o),t=o+r;return p}function addBR(e,s){if(e.length%2==0){let n=s,r=0;for(let s=0;s<e.length;s++)n=s%2==0?n.splice(e[s]+r,0,"<br>"):n.splice(e[s]+r+1,0,"<br>"),r+=4;return n}return s}app.get("/",function(e,s){indexJoke>58&&(indexJoke=1);const n="https://sv443.net/jokeapi/v2/joke/Any?idRange="+indexJoke;https.get(n,function(e){let n="";e.on("data",function(e){n+=e}),e.on("end",function(){const e=JSON.parse(n),r=e.type;if("single"===r){let n=e.joke;const r="<p class='command line2'>"+addBR(getIndicesOf('"',n),n).replace(/(\n)+/g,"<br>")+"<span class='cursor2fast'>_</span></p><p class='command line3fast'>><span class='cursor3fast'>_</span></p>";s.render("index",{joke1:r,joke2:""}),indexJoke++}else if("twopart"===r){const n="<p class='command line2'>"+e.setup.replace(/(\n)+/g,"<br><br>")+"<span class='cursor2'>_</span></p>",r="<p class='command line3'>"+e.delivery.replace(/(\n)+/g,"<br><br>")+"<span class='cursor3'>_</span></p><p class='command line4'>><span class='cursor4'>_</span></p>";s.render("index",{joke1:n,joke2:r}),indexJoke++}else console.log("Unknow type of joke")})})}),app.listen(process.env.PORT||3e3,()=>{console.log("server ...")}),String.prototype.splice=function(e,s,n){return this.slice(0,e)+n+this.slice(e+Math.abs(s))};
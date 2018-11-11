// Copyright (c) 2018 Lean Web Solutions https://leanws.com

if ("http:"==window.location.protocol) window.location.assign(window.location.href.replace("http:","https:"))
var header=document.getElementsByClassName("header")[0],body=document.getElementById("verhAni");
var SM,allInputs,allButtons;
function showInfo(mes,sec,bz){
if(sec===undefined)sec=5;
if(bz===undefined)bz=function(){};
html('message',mes);
showID('message');setTimeout(function(){hideID('message');bz()},sec*1000)}
function Achtung(mes){showInfo(mes)}
var bm=[];
function messageOnce(mes){
if(-1==bm.indexOf(mes)){
bm.push(mes);
showInfo(mes)}}
function doWarning(idORelem){
var el=('string'==typeof idORelem)? IDget(id):idORelem;
el.style.animation='blink 2s linear infinite';
setTimeout(function(){el.style.animation='none'},20000)}
onLoad.push(function(){
window.addEventListener("scroll",function(){
if(window.scrollY!='0'){
showID("goup");header.classList.add("fixed");body.style.paddingTop="40px";}
else{hideID("goup");body.style.paddingTop="0";header.classList.remove('fixed')}});
window.scrollTo(0,0)});
var displayDB={};
function val(id,v){
if("undefined"==typeof v){return IDget(id).value}
else{IDget(id).value=v}}
function text(id,v){
if("undefined"==typeof v){return IDget(id).textContent}
else{IDget(id).textContent=v}}
function toArray(c){
if("undefined"===typeof c) return []
else{
var retVal=[],i=c.length;
while(i--){retVal.push(c[i])}
return retVal.reverse()}}
function classText(className,v){
toArray(document.getElementsByClassName(className)).forEach(x=>x.textContent=v)}
function html(id,v){IDget(id).innerHTML=v}
function hideID(id){
var el=document.getElementById(id);
if(el){
var cur=el.style.display;
if(cur!='none'){displayDB[id]=cur}
el.style.display='none'}}
function showID(id){
var el=document.getElementById(id);
if(el){
if("undefined"!=typeof displayDB[id])
el.style.display=(id in displayDB)? displayDB[id]:'inline'
else
el.style.display='inline'}}
function hideClass(cl){toArray(document.getElementsByClassName(cl)).forEach(function(el){el.style.display='none'})}
function showClass(cl){toArray(document.getElementsByClassName(cl)).forEach(function(el){el.style.display='inline'})}
const userMenuItems=[
{'html':'<a href="profile">B profile</a>','allowedFor':["all"]},
{'html':'<a href="email">A email</a>','allowedFor':["all"]},
{'html':'<a href="holidays">V holidays</a>','allowedFor':["all"]},
{'html':'<a href="day">r appointments</a>','allowedFor':["all"]}];
function be(bu){
loadScript("js-lib/js.cookie.js").then(function(){
var loginoutH=IDget('loginoutH');
if(Cookies.get('bu') !==undefined){
loginoutH.classList.add("dropdown");
var userMenuHtml='<a class="dropdown-toggle" href="#">user</a> <ul class="dropdown-menu" style="min-width:12em">';
for(i in userMenuItems){
if(-1 !=userMenuItems[i].allowedFor.indexOf(Cookies.get('bu'))) userMenuHtml+='<li class="icon">'+userMenuItems[i].html+'</li>'}
userMenuHtml+='<li class="icon"><a href="#1" onclick="logout()">i logout</a></li></ul>';
if(typeof localCheckIfLoggedIn==="function"){localCheckIfLoggedIn()}
html('loginoutH',userMenuHtml)}
else{
loginoutH.classList.remove("dropdown");
html('loginoutH','login')}})} 
var loadHTML=(function(){
var cq={};
return function(cp){
if(cp in cq){return cq[cp]}
else{
return (cq[cp]=new Promise((resolve,reject)=>{
if(IDget(cp))
{loadScript("js-lib/ajaxme.js").then(function(){
window.AjaxMe.get({url:'https://t.leanws.com/'+cp+'.html',
success:r=>{html(cp,r.response);resolve(r.response)},
error:r=>reject(r)})})}
else{resolve()}}))}}})();
function loadHTMLs(af){return Promise.all(af.map(x=>loadHTML(x)))} 
loadHTML('menu').then(function(){
be();
SM=toArray(document.querySelectorAll("li.dropdown"));
SM.forEach(x=>x.onmouseenter=function(){hover(x,200)});
IDget("mainMenu").onmouseleave=function(){unhover(SM,200)};
if(IDget('canvas'))loadScript('points.js')});
loadHTMLs(['login','footer']).then(function(whatsdone){
allInputs=document.querySelectorAll('input');allButtons=document.querySelectorAll('button');
document.querySelectorAll('div.form') 
.forEach(function(form){
if(form.getAttribute('cgi'))form.querySelector('button.submit').onclick=function(){submitForm(form)};
form.querySelectorAll('button').forEach(function(b){
b.onmouseenter=function(){hover(b)};
b.onmouseleave=function(){unhover([b])};
b=>b.disabled=false});
form.querySelectorAll('input.required').forEach(function(x){
x.disabled=false;
x.onkeydown=function(event){
if(10==event.keyCode||13==event.keyCode)submitForm(form)}})})});
var messageOnce=(function(){
var bm=[];
return function(mes){
if(-1==bm.indexOf(mes)){
bm.push(mes);
showInfo(mes)}}})();
function doWarning(idORelem){
var el=('string'==typeof idORelem)? IDget(id):idORelem;
el.style.animation='blink 2s linear infinite';
setTimeout(function(){el.style.animation='none'},20000)}
var xu=false;
function hover(me,TO){
if(!xu){
if(TO!==undefined&&TO>0){
xu=true;
setTimeout(function(){xu=false},TO)}
me.classList.add("hover");
setTimeout(function(){unhover([me])},6000)}} 
function unhover(mes,TO){
mes.forEach(me=>me.blur());
if(!xu){
if(TO!==undefined&&TO>0){
xu=true;
setTimeout(function(){xu=false},TO)}
mes.forEach(me=>me.classList.remove("hover"))}}
function switchHover(me){
me.firstElementChild.blur();
var SMC=toArray(me.classList);
if(-1==SMC.indexOf('hover'))hover(me)
else unhover([me])}
function login(me){
loadScript("js-lib/js.cookie.js").then(function(){
if(Cookies.get('leanws')===undefined){
var lf=document.getElementById("login");
unhover(toArray(document.getElementsByClassName("hover")));
lf.style.display="block";lf.focus();
}
else{switchHover(me)}})}
function ar(bl){
loadScripts(["js-lib/js.cookie.js","js-lib/ajaxme.js","js-lib/md5.min.js"],function(){
var username,cr;[username,cr]=['username','cr'].map(x=>document.getElementById(x).value)
if(""!=username && ""!=cr){
closeModals();
['leanws','bu'].forEach(x=>Cookies.remove(x,{path:'/'}));
window.AjaxMe.post({
url:'/cgi-bin/checkPassword', json:true,
data:JSON.stringify({"userName":username,"cr":md5(cr)}),
success:function(r){
var response=JSON.parse(r.response);
if (response["success"]) be()
else Achtung("Login failed") }})}})}
function loginKeyPressed(event){
var kc=event.keyCode;
if(kc==10||kc==13) ar()} 
function logout(){
loadScript("js-lib/js.cookie.js").then(function(){
Cookies.remove('leanws',{path:'/'});
Cookies.remove('bu',{path:'/'});
location.reload()})}
function recoverPassword(){
loadScripts(["js-lib/ajaxme.js","js-lib/validator.min.js","js-lib/js.cookie.js"]).then(function(){
if(!validator.isEmail(val("username")) && !validator.isAlphanumeric(val("username"))){
showInfo("Please provide email or user ID.");} else{
Cookies.remove('leanws',{path:'/'});
Cookies.remove('bu',{path:'/'});
window.AjaxMe.post({
url:'/cgi-bin/recoverPassword', json:true,
data:JSON.stringify({"userName":val("username")}),
success:function(r){
var response=JSON.parse(r.response);
if (response["success"]){showInfo("Check email for instructions",5)}
else{showInfo(response['errMessage'],8)}}})}})}
function submitForm(form){
var ch={},submit=true, submitButton=form.querySelector('button.submit'),
allInputs=form.querySelectorAll('input');
loadScript("js-lib/ajaxme.js").then(function(){
unhover([submitButton]);
allInputs.forEach(function(reqInp){
var name=reqInp.getAttribute("name");
ch[name]=reqInp.value.trim();
if(-1!=toArray(reqInp.classList).indexOf('required')){
if(ch[name]==''){
submit=false;
showInfo('Please specify<br>'+reqInp.getAttribute("descr").toUpperCase());
}}});
if(submit){
allInputs.forEach(x=>x.disabled=true);allButtons.forEach(x=>x.disabled=true);
window.AjaxMe.post({
url:'/cgi-bin/'+form.getAttribute("cgi"), json:true, data:JSON.stringify(ch),
success:function(r){
var response=JSON.parse(r.response);
showInfo(response['message']);
allInputs.forEach(x=>x.disabled=false);allButtons.forEach(x=>x.disabled=false);
if (response["success"]) allInputs.forEach(x=>x.value='')}, 
error:function(XMLHttpRequest){console.log('error', XMLHttpRequest)},
abort:function(XMLHttpRequest){console.log('abort', XMLHttpRequest)},
loadstart:function(XMLHttpRequest){console.log('loadstart', XMLHttpRequest)},
progress:function(XMLHttpRequest){console.log('progress', XMLHttpRequest.percent)}})}})}
function closeModals(){
unhover(toArray(document.getElementsByClassName("hover")));
toArray(document.getElementsByClassName("modal")).forEach(m=>m.style.display="none")}
function escModals(event){
var kc=event.keyCode;
if(27==kc) closeModals()} 
function hideInfo(){hideID('message')}

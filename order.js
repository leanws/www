// Copyright (c) 2018 Lean Web Solutions https://leanws.com

loadScript("2.js").then(function(){
html('USstate',
'NY AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
.split(' ').map(x=>'<option value="'+x+'">'+x+'</option>').join(''))});
function bi(name){
return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[null, ''])[1].replace(/\+/g, '%20'))||null;}
const bj=['just','starter','basic','functional'];
var order=bi('order'),bc={};
if(order && -1!=bj.indexOf(order)){
if(order=='just') order='Just a website';
bc.order=order}
else{
bc.order='custom';
"DN NoPs payOnline contentMngmt morePages oneEmail moreEmail apptForOne apptForMany".split(' ')
.forEach(x=>bc[x]=bi(x))}
loadScript("2.js").then(function(){
toArray(document.getElementsByClassName("order")).forEach(x=>x.textContent=':'+bc.order.toUpperCase())});
function co(){
const aa=['firstName','lastName','phone','email'],
ab=["busName","callTime","addr","addr2","city","USstate","zip","furtherDetails"];
var ad={};
aa.forEach(function(id){ad[id]=val(id).trim()});
if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ad['email'])){
ad['email']='';val('email','')} 
var submit=true;
for(var ae in ad){
if(ad[ae]==''){
submit=false;
var ac=document.getElementsByClassName(ae)[0];
showInfo('Please specify<br>'+ac.textContent.replace(':','').toUpperCase());
doWarning(document.getElementsByClassName(ae)[0]);
break}}
if(submit){
showInfo('Submitting…',3);showID("preloader");
aa.concat(ab).forEach(function(x){bc[x]=val(x).trim()});
loadScript("js-lib/ajaxme.js").then(function(){
window.AjaxMe.post({
url:'/cgi-bin/order',json:true,data:JSON.stringify(bc),
success:function(r){
var response=JSON.parse(r.response);
if (response["success"]) window.location.assign("ordered")
else showInfo('order was not submitted')},
error:function(XMLHttpRequest){console.log('error', XMLHttpRequest)},
abort:function(XMLHttpRequest){console.log('abort', XMLHttpRequest)},
loadstart:function(XMLHttpRequest){console.log('loadstart', XMLHttpRequest)},
progress:function(XMLHttpRequest){console.log('progress', XMLHttpRequest.percent)}})})}}

// Copyright (c) 2018 Lean Web Solutions https://leanws.com

loadScript("2.js").then(function(){
html('USstate',
'NY AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
.split(' ').map(x=>'<option value="'+x+'">'+x+'</option>').join(''))});
function getURLParameter(name){
return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[null, ''])[1].replace(/\+/g, '%20'))||null;}
const orders=['just','starter','basic','functional'];
var order=getURLParameter('order'),finalOrder={};
if(order && -1!=orders.indexOf(order)){
if(order=='just') order='Just a website';
finalOrder.order=order}
else{
finalOrder.order='custom';
"DN NoPs payOnline contentMngmt morePages oneEmail moreEmail apptForOne apptForMany".split(' ')
.forEach(x=>finalOrder[x]=getURLParameter(x))}
// text('order',':'+finalOrder.toUpperCase());
loadScript("2.js").then(function(){
toArray(document.getElementsByClassName("order")).forEach(x=>x.textContent=':'+finalOrder.order.toUpperCase())});
function doOrder(){
const requiredTags=['firstName','lastName','phone','email'],
otherTags=["busName","callTime","addr","addr2","city","USstate","zip","furtherDetails"];
var contactData={};
requiredTags.forEach(function(id){contactData[id]=val(id).trim()});
if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactData['email'])){
contactData['email']='';val('email','')} 
var submit=true;
for(var missing in contactData){
if(contactData[missing]==''){
submit=false;
var elName=document.getElementsByClassName(missing)[0];
showInfo('Please specify<br>'+elName.textContent.replace(':','').toUpperCase());
doWarning(document.getElementsByClassName(missing)[0]);
break}}
if(submit){
showInfo('Submitting…',3);showID("preloader");
// var order={'order':finalOrder};
requiredTags.concat(otherTags).forEach(function(x){finalOrder[x]=val(x).trim()});
loadScript("js-lib/ajaxme.js").then(function(){
window.AjaxMe.post({
url:'/cgi-bin/order',json:true,data:JSON.stringify(finalOrder),
success:function(r){
var response=JSON.parse(r.response);
if (response["success"]) window.location.assign("ordered")
else showInfo('order was not submitted')},
error:function(XMLHttpRequest){console.log('error', XMLHttpRequest)},
abort:function(XMLHttpRequest){console.log('abort', XMLHttpRequest)},
loadstart:function(XMLHttpRequest){console.log('loadstart', XMLHttpRequest)},
progress:function(XMLHttpRequest){console.log('progress', XMLHttpRequest.percent)}})})}}

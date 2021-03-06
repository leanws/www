// Copyright (c) 2018 Lean Web Solutions https://leanws.com

const allPages={
'main':[['/','main page'],['plans','plans and prices'],['domains','domain availability'],['custom','customize your order']],
'about':[['about','about Lean Web Solutions'],['busemail','email'],['time','download time'], ['payments','online payments'], ['appts','scheduling appointments online'], ['design','design'], ['hosting','free hosting'],["chat","online chat"]],
'other':[['privacy','privacy notice'],['terms','terms and conditions']]};
const addrPrefixes={'wiki':'https://wiki.leanws.com/'};
function cOnLoad(){
Packages.load("2.js").then(function(){
for(var p in allPages){
var prefix=p in addrPrefixes? addrPrefixes[p]:'';
html(p,allPages[p].sort((l,r)=>l[1].toUpperCase()<r[1].toUpperCase()?-1:1).map(x=>'<a class="wiki pad" href="'+prefix+x[0]+'">'+x[1]+'</a>').join(""))}
})}
(function(){
var ps=[];
for(var p in allPages) ps.push(p);
whenReady(ps,cOnLoad)})();

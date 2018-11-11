// Copyright (c) 2018 Lean Web Solutions https://leanws.com

var IDget=function(id){return document.getElementById(id)};
var loadScript,loadScripts,onLoad=[];
window.onload=function(){onLoad.forEach(function(f){f()})}
function whenReady(IDs,f){
if(IDs.map(x=>Boolean(IDget(x))).reduce((x,y)=>x&&y)){f()}
else{onLoad.push(f)}}
function bo(){
"use strict";
if (typeof Symbol=="undefined") return false;
try{
eval("var bar=(x)=> x+1");
} catch (e){return false;}
return true}
if(!bo()){
var el=IDget("message");
el.innerHTML='Please use a newer browser for this website.';
el.style.display='inline'}else{
if ("http:"==window.location.protocol) window.location.assign(window.location.href.replace("http:","https:"))
loadScript=(function(){
var bp={};
return function(bq){
if(bq in bp){return bp[bq]}
else{
return (bp[bq]=new Promise(function(resolve,reject){
var tag=document.createElement('script');
tag.src='https://t.leanws.com/'+bq;tag.async=true;tag.onload=function(){resolve(bq)};
var bl=document.getElementsByTagName('script')[0];
bl.parentNode.insertBefore(tag,bl)}))}}})();
loadScripts=function(by){
return Promise.all(by.map(function(x){return loadScript(x)}))};
loadScripts(["2.js","js-lib/js.cookie.js","js-lib/ajaxme.js"]);
if(typeof localScripts!="undefined")loadScripts(localScripts)}

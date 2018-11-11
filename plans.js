// Copyright (c) 2018 Lean Web Solutions https://leanws.com

function orderViewModel(){
var self=this;
self.NoPs=ko.observable(2);
self.NoPs.subscribe(function(v){if(v<2){self.NoPs(2)}else if(v>20)self.NoPs(20)});
self.submit=function(){
var ordered='';
ordered+='&NoPs='+self.NoPs();
window.location.assign('order'+ordered)}}
loadScript("js-lib/knockout-latest.js").then(function(){
whenReady(["footer"],function(){
ko.applyBindings(new orderViewModel())})});

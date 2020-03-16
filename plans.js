// Copyright (c) 2018 Lean Web Solutions https://leanws.com

function orderViewModel(){
var self=this;
self.NoPs=ko.observable(2);
self.NoPs.subscribe(function(v){if(v<2){self.NoPs(2)}else if(v>20)self.NoPs(20)});
self.NoGb=ko.observable(10);
self.NoGb.subscribe(function(v){
if(v<10){self.NoGb(10)}else if(v>100)self.NoGb(100);
self.NoGb(10*Math.ceil(v/10)) });
// var ordered='';
// ordered+='&NoPs='+self.NoPs();
// window.location.assign('order'+ordered)}
}
// ko.applyBindings(rvm,IDget('rvm'))})});
Packages.load("KO").then(function(){
whenReady(["footer"],function(){
ko.applyBindings(new orderViewModel(),IDget('rvm'));
Packages.load('preloader.js').then(()=>Packages.preloader.hide())})});

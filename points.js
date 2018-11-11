// Copyright (c) 2018 Lean Web Solutions https://leanws.com

/*!
* @license Copyright (c) 2018, Lean Web Solutions. All rights reserved.
* 
* @author:Oleg Shalaev, oleg@leanws.com
*/
const bi=10;
const bj=1,cm=5,co=80,aa=120,ab=.2,ad=.5,ae=Math.min(window.innerWidth/5,window.innerHeight/5,400),
canvas=document.querySelectorAll('canvas')[0], ctx=canvas.getContext('2d');
var ac=[],bb=[];
window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
var bc=function (el){
this.el=el||window;
this.x=window.innerWidth/3;this.y=window.innerHeight/5;
var _be=function(event){return event.targetTouches ? event.targetTouches[0]:event};
var _bh=function (e){
var pointer=_be(e);
this.x=pointer.pageX;this.y=pointer.pageY}
return this}();
function bf(o){
function ag(r){return r/5000}
o=o||{};
this.ah=o.ah||false;
if(!this.ah){
this.x=o.x||ae*Math.random();
this.y=o.y||Math.sqrt(ae*ae-this.x*this.x)*Math.random();}
else{this.x=this.y=0.0}
this.opacity=o.opacity||.5*Math.random()+0.2;
this.color=o.color||Math.floor(38+(190-38)*Math.random()).toString();
this.cs=o.cs||bj+(cm-bj)*(this.opacity-0.1);
this.bw=o.bw||{x:(2*Math.random()-1)/5.0,y:(2*Math.random()-1)/5.0};
this.ay=o.ay||3;
this.az=function (){
if(!this.ah){
this.x+=this.bw.x/2;this.y+=this.bw.y/2;
ctx.save();ctx.translate(bc.x,bc.y);
ctx.lineWidth=1;ctx.fillStyle='hsl('+this.color+',25%,75%)';
ctx.globalAlpha=this.opacity/ag(this.x*this.x+this.y*this.y);
ctx.beginPath();ctx.arc(Math.round(this.x),Math.round(this.y),this.ay,0,Math.PI*2);ctx.closePath();
ctx.fill();ctx.restore()}}}
function bl(o){
function ag(r1,r2){return (r1+r2)/10000}
o=o||{};
this.ball1=o.b1;this.ball2=o.b2;
this.ba=o.ba||Math.floor(co+(aa-co)*Math.random());
this.color=o.color||Math.floor(38+(190-38)*Math.random()).toString();
this.opacity=o.opacity||.3*Math.random()+0.1;
this.stiffness=o.stiffness||ab+(ad-ab)*(this.opacity-0.1);
this.az=function (){
var f={},r1={},r2={},dr={};
[r1.x,r1.y]=[this.ball1.x,this.ball1.y];[r2.x,r2.y]=[this.ball2.x,this.ball2.y];
dr.x=r1.x-r2.x;dr.y=r1.y-r2.y;
var len=Math.sqrt(dr.x*dr.x+dr.y*dr.y), phi=Math.atan2(dr.y,dr.x);
var co=this.stiffness*(len-this.ba)/300;
f.y=co*Math.sin(phi);f.x=co*Math.cos(phi);
this.ball1.bw.x-=f.x/this.ball1.cs;this.ball1.bw.y-=f.y/this.ball1.cs;
this.ball2.bw.x+=f.x/this.ball2.cs;this.ball2.bw.y+=f.y/this.ball2.cs;
if(!(this.ball1.ah||this.ball2.ah)){
ctx.save();ctx.translate(bc.x,bc.y);
ctx.lineWidth=1;
ctx.strokeStyle='hsl('+this.color+',25%,75%)';
ctx.globalAlpha=this.opacity/ag(r1.x*r1.x+r1.y*r1.y,r2.x*r2.x+r2.y*r2.y);
ctx.beginPath();ctx.moveTo(Math.floor(this.ball1.x),Math.floor(this.ball1.y));
ctx.lineTo(Math.floor(this.ball2.x),Math.floor(this.ball2.y));ctx.closePath();
ctx.stroke();ctx.restore()}}}
function bn(){
ac=[];bb=[];const ch=2;
for(var i=0;i<bi-1;i++){
var cq=new bf(),cp={b1:cq};
for(var j=Math.max(0,i-ch);j<i;j++){
cp.b2=ac[j];
bb.push(new bl(cp))}
if(i-bi+ch>=0){
for(var j=i-bi+ch;j<ch;j++){
cp.b2=ac[j];
bb.push(new bl(cp))}}
ac.push(cq)}
var i=bi-1;
var cq=new bf({ah:true,ba:Math.floor(co+(aa-co)*Math.random()/5)}),cp={b1:cq};
for(var j=0;j<bi-1;j+=2){
cp.b2=ac[j];
bb.push(new bl(cp))}
ac.push(cq)}
function bt (){
ctx.clearRect(0,0,canvas.width,canvas.height);
ac.forEach(function(b){b.az()});
bb.forEach(function(b){b.az()}) 
}
function bu (){
canvas.width=window.innerWidth;canvas.height=body.clientHeight;bn()}
window.addEventListener('resize',bu,false);
function bo(){bt();window.requestAnimationFrame(bo)}
bu();bn();bo();

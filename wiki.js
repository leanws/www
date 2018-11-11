// Copyright (c) 2018 Lean Web Solutions https://leanws.com

const imgSection=document.querySelectorAll("section.images")[0];
const bigImage=document.querySelectorAll("img.bigImage")[0],
biWrapper=document.querySelectorAll("div.bigImage")[0];
var labels=document.querySelectorAll("label.mini-image");
var windowWidth=0;
function zoomImage(obj){
if(windowWidth>1.2*Math.max.apply(Math,availabelRes)){
messageOnce('Click to restore normal view.');
bigImage.src='https://t.leanws.com/'+"wiki/full-size/"+obj.getAttribute("file");
biWrapper.style.display='block'
}}
labels.forEach(function(x){
var file=x.getAttribute("file"),BN=file.split(".")[0], 
nodeDiv=document.createElement("div"),
nodeIMG=document.createElement("img"),
nodeCB=document.createElement("input");
x.setAttribute("for",BN);nodeCB.id=BN;nodeCB.type="checkbox";nodeCB.style.display='none';
nodeCB.setAttribute("file",file);
nodeCB.addEventListener("click", function(){zoomImage(this)});
nodeIMG.setAttribute("file",file);nodeIMG.alt="";
nodeDiv.classList.add("mini-image");nodeDiv.appendChild(nodeIMG);
x.appendChild(nodeDiv);x.appendChild(nodeCB)});
var images=document.querySelectorAll("div.mini-image>img");
const availabelRes=[600,450,300,200].sort();
var widthLoaded=0;
function onWinWidthChange(){
windowWidth=window.innerWidth
||document.documentElement.clientWidth
||document.body.clientWidth;
var i=0;while(windowWidth>availabelRes[i] && i<availabelRes.length){i++}
var width=availabelRes[i-1];
if(width>widthLoaded){
widthLoaded=width;
images.forEach(x=>x.src='https://t.leanws.com/'+"wiki/"+width+"/"+x.getAttribute("file"))}}
function modalEscPressed(event){
var kc=event.keyCode;
if(27==kc) login()} 
onWinWidthChange();
window.addEventListener('resize', function(event){onWinWidthChange()});

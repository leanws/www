// Copyright (c) 2018 Lean Web Solutions https://leanws.com

var chatStatusNow=1, 
chatIntentionallyClosed=false,chatReconnectTime=5,chatIsAlive=false;
function toggleClass(element,className){
if(className in element.classList){element.classList.remove(className)}else{element.classList.add(className)}}
const mesArea=document.querySelectorAll("div.content")[0],
chatBox=document.querySelectorAll("section.chatBox")[0],
chatTab=IDget('chatTab'),
newMessage=chatBox.querySelectorAll("input")[0];
var cvm,wsConnection;
newMessage.addEventListener("keydown",function(event){if(event.key==="Enter"){cvm.visitorSays()}});
function message(z){
// ['isNew','delivered'].forEach(x=>this[x]=ko.observable(z[x]));
this['isNew']=ko.observable(true);this['delivered']=ko.observable(false);
// this['msgTime']=new Date();
['msgType','msgContent','fromVisitor','msgTime'].forEach(x=>this[x]=z[x])}
function msgViewModel(){
var self=this;
self.messages=ko.observableArray();
self.NofUnAnsweredMsgs=0;
self.visitorSays=function(){
if(newMessage.value.trim()!=''){
self.messages.push(new message({'msgType':'text','msgTime':new Date(),'msgContent':newMessage.value,'fromVisitor':true}));
if(wsConnection){wsConnection.send(newMessage.value)}
else{startChat(newMessage.value)}
newMessage.value='';
mesArea.scrollTo(0,mesArea.scrollHeight);
if(7==self.NofUnAnsweredMsgs++)
chatMessage('Warning:for visitors sending 10 or more unaswered messages, temporary prank protection will be activated. Please wait for the responce or leave your contact information so I can get back to you.');
if(10==self.NofUnAnsweredMsgs){
chatMessage('Chat is unavailable, please use email help@leanws.com');newMessage.disabled=true}}}
self.OperatorSays=function(newMessage){
self.messages.push(new message({'msgType':'text','msgTime':new Date(),'msgContent':newMessage.value,'fromVisitor':false}));
beep(30,2);
if(self.NofUnAnsweredMsgs--==0)self.NofUnAnsweredMsgs=0}}
newMessage.disabled=false;
cvm=new msgViewModel();
ko.applyBindings(cvm,IDget('chat'));
// if(2<=chatStatusNow)chatMessage('I am unavailable right now. Please leave your contact information and I will get back to you.');
function chatMessage(text){
cvm.messages.push(new message({'msgType':'text',
'msgContent':text,
'msgTime':new Date(),
'fromVisitor':false}));
setTimeout(()=>mesArea.scrollTo(0,mesArea.scrollHeight),300)}
chatTab.onmouseenter=function(){hover(chatTab,200)};
chatTab.onmouseleave=function(){unhover([chatTab],200)};
function switchChat(me){
if('none'==chatBox.style.display){
hover(chatTab,500);
chatTab.classList.remove('chatPossible');
chatBox.style.display='block';
if(2<=chatStatusNow){chatMessage('I am unavailable now.')}else{
if(1==chatStatusNow){chatMessage('I am partially available now, expect delays.')}}}
else{
unhover([chatTab],500);
chatTab.classList.add('chatPossible');
chatBox.style.display='none';
if(wsConnection!==undefined){
chatIntentionallyClosed=true;
wsConnection.close()}}}
var beep=(function(){
var ctxClass=window.audioContext||window.AudioContext||window.AudioContext||window.webkitAudioContext;
var ctx=new ctxClass();
return function(duration,type,freq=450){
var osc=ctx.createOscillator();
osc.type=(type%5)||0;
osc.frequency.setValueAtTime(freq,ctx.currentTime);
osc.connect(ctx.destination);
if(osc.noteOn)osc.noteOn(0);
if(osc.start)osc.start();
setTimeout(function(){
if(osc.noteOff)osc.noteOff(0);
if(osc.stop)osc.stop();
},duration)}})();
function startChat(msg){
window.AjaxMe.post({
url:'/chatme', json:true, data:JSON.stringify({"text":msg}),
success:function(r){
var response=JSON.parse(r.response);
if(!response.success){
showInfo("All chat channels are busy now, please try later");chatBox.style.display='none';
newMessage.disabled=true}
else{
wsConnection=new WebSocket("wss:
wsConnection.onopen=function(){chatIsAlive=true;console.log("chat started")};
wsConnection.onmessage=function (evt){
var response=JSON.parse(evt.data);
var raw=response[0];
switch(raw.type){
case 'status':chatStatus(raw.status);break;
default:
cvm.OperatorSays({"text":raw.text,"time":new Date(1000*(raw.time-2208988800))});
// OperatorSays({'msgType':raw.type, 
// 'msgContent':raw.text,
// 'msgTime':new Date(1000*(raw.time-2208988800)),
// 'fromVisitor':false})
}}
wsConnection.onclose=function(){
chatIsAlive=false;
if(!chatIntentionallyClosed){
console.log("chat auto-reconnecting in "+chatReconnectTime+" seconds");
if(3*60*1000>(new Date()).getTime()-Math.max.apply(null,cvm.messages().map(x=>Math.round(x.msgTime.getTime())))){
setTimeout(function(){startChat("auto-reconnecting")},chatReconnectTime*1000);
if(chatReconnectTime<60) chatReconnectTime*=2}
else{chatIsAlive=false}
}}}}})}
var chatStatus=(function(){
const statT=[['Q','available','green','white'],['S','partially available','orange','blue'],['R','unavailable','red','white']],
CStext=document.querySelectorAll("span.chatStatus")[0],
CSicon=document.querySelectorAll("span.chatStatus")[1],tab=IDget('chatTab');
return function(s){
chatStatusNow=s;
if(s>=2){s=2;chatMessage('Chat is unavailable, please use email help@leanws.com');newMessage.disabled=true}
else{newMessage.disabled=false}
if(chatStatusNow>=2){hideClass("chatPossible")}else{showClass("chatPossible")}
if(CSicon.innerHTML!=statT[s][0]){
CSicon.innerHTML=statT[s][0];
[CStext,CSicon,tab.querySelectorAll("a span")[0]].forEach(x=>x.style.color=statT[s][2]);
CStext.innerHTML=statT[s][1];
tab.style.borderColor=statT[s][2];
}}})();
var source=new EventSource("/chatme");
source.onmessage=function(event){if(!chatIsAlive)chatStatus(Number(event.data))};

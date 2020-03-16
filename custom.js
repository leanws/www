// Copyright (c) 2018 Lean Web Solutions https://leanws.com

var bi='', SR='',DZ='';
const bj='~`\\^\\$%!@&_*\\(\\)=\\[\\]\\"\' ';
const cm="payOnline chatService contentMngmt morePages emailService apptForOne apptForMany domainIsAvailable".split(' ');
const co=["regPrice","transPrice","NoPs"];
function aa(){
var self=this;
cm.forEach(x=>self[x]=ko.observable(false));
co.forEach(x=>self[x]=ko.observable(0));
if(self.NoPs()<2)self.NoPs(2);
self.NoPs.subscribe(function(v){if(v<2){self.NoPs(2)}else if(v>20)self.NoPs(20)});
self.NoGb=ko.observable(10);
self.NoGb.subscribe(function(v){
if(v<10){self.NoGb(10)}else if(v>100)self.NoGb(100);
self.NoGb(10*Math.ceil(v/10)) });
self.chatMb=ko.observable(30);
self.chatMb.subscribe(function(v){
if(v<30){self.chatMb(30)}else if(v>300)self.chatMb(300);
self.chatMb(30*Math.ceil(v/30)) });
self.apptForOne. subscribe(function(v){if(v)self.apptForMany(false)});
self.apptForMany.subscribe(function(v){if(v)self.apptForOne(false)});
self.domainName=ko.observable("");
self.domainName.subscribe(function(DN){
bi=validator.blacklist(DN.trim().toLowerCase(),bj);
self.domainName(bi);
if(DN!=''){
var domainName=bi.slice(0,bi.lastIndexOf("."));
var ad=bi.lastIndexOf(".");
DZ=(ad!=-1)? (bi.slice(ad)):'';
SR=undefined;SR=ac.find(x=> x['dZone']==DZ);
if(SR===undefined){
self.regPrice(0);self.transPrice(0);
if(DZ!=''){
showInfo('We can not register/transfer domains in '+DZ + ' zone.');
self.domainName('')}
else{showInfo('Please supply full domain name including the zone.')}
self.domainPriceLoaded(false)}
else{
classText('DNval',DN);
self.regPrice(Math.min.apply(Math,SR.regPrice)/100);
self.transPrice(Math.min.apply(Math,SR.transPrice)/100);
window.AjaxMe.post({
url:'/cgi-bin/checkIfAvailable', json:true,
data:JSON.stringify({"domainName":domainName,"zones":[DZ]}),
success:function(r){
var response=JSON.parse(r.response);
if(response["success"]){
self.domainIsAvailable(1==response['domains'][bi]['status']? true:false);
self.domainPriceLoaded(true)}
else{showInfo(response['errMessage'])}}})}}});
self.regPrice=ko.observable(0);self.transPrice=ko.observable(0);
self.domainPriceLoaded=ko.observable(false);
self.domainPriceLoaded.subscribe(function(pLoaded){
if(!pLoaded){["regPrice","transPrice"].forEach(function(x){self[x](0)})}});
self.domainPriceLoaded=ko.observable(false);
self.submit=function(){
var ordered='?DN='+bi;
cm.forEach(function(x){if(self[x]()){ordered+='&'+x+'=1'}});
if(self.morePages())ordered+='&NoPs='+self.NoPs();
if(self.emailService())ordered+='&NoGb='+self.NoGb();
if(self.chatService())ordered+='&chatMb='+self.chatMb();
window.location.assign('order'+ordered)}}
const ae=["dZone","regPrice","transPrice","renewPrice"];
function zone(zName){var nrself=this;ae.forEach(function(vn){nrself[vn]=""});nrself.dZone=zName}
var ac=[];
function bb(){
Packages.load("AjaxMe","validator").then(function(){
window.AjaxMe.get({url:'/cgi-bin/listAvailableZones',
success:function(r){
var response=JSON.parse(r.response);
if(response["success"]){
for (var i=0;i<response['domains'].length;i++){
var nz=new zone(response['domains'][i][0]);
nz.regPrice=response['domains'][i][1];
nz.transPrice=response['domains'][i][2];
nz.renewPrice=response['domains'][i][3];
ac.push(nz)}}
else{showInfo(response['errMessage'])}}})})}
var rvm;
Packages.load("KO","validator").then(function(){
rvm=new aa();
ko.applyBindings(rvm,IDget('rvm'));
bb()});

// Copyright (c) 2018 Lean Web Solutions https://leanws.com

const infoContainer=document.querySelectorAll("div.fon")[0];
const knownBlocks={"widesection":['<article class="story center">','</article>'],
"section":['<article class="story col2">','</article>']};
var structuredText,CHTs,invisibleLine='do not show me';
if(!Array.prototype.last){Array.prototype.last=function(){return this[this.length-1]}}
function parseConf(s){
var res={},confStr=s.substring(2).split(":");
res[confStr[0]]=confStr.slice(1).join(":").trim();
return res}
function confAmStart(textBlock){
var fps=textBlock.split("\n"), newConf={};
while(fps[0] && fps[0].substring(0,2)=="#+")newConf=Object.assign(newConf,parseConf(fps.shift()));
return newConf}
function confAmEnde(textBlock){
var fps=textBlock.split("\n"), newConf={};
while(fps.last() && fps.last().substring(0,2)=="#+")Object.assign(newConf,parseConf(fps.pop()));
return newConf}
function grepV(text,startingWith){
if(startingWith===undefined)startingWith=["#+"];
startingWith.unshift(text.split("\n"));
return startingWith.reduce((x,y)=>x.filter(z=>z.substring(0,y.length)!=y)).join("\n")}
function divideInParagraphs(data){
var localConf=data[0], textBlock=data[1], level=localConf["level"],stars="\n",
blocks=("\n"+textBlock).split("\n"+stars);
if(blocks[0]!='')blocks[0]=blocks[0].split("\n").slice(1).join("\n")
else blocks=blocks.slice(1);
var result=[[{'conf':Object.assign(confAmStart(blocks[0]),localConf.conf),'level':level},blocks[0]]];
for(var i=0;i<blocks.length-1;i++){
result.push([{'conf':Object.assign(confAmStart(blocks[i+1]),confAmEnde(blocks[i])),'level':1+level},blocks[i+1]])}
return result.map(x=>[x[0],grepV(x[1],['#'])]).filter(x=>x[1]!='')}
function structurire(data){
var localConf=data[0], textBlock=data[1], i=level=localConf["level"],stars="*";
while(i--)stars+='*';
if(-1==("\n"+textBlock).indexOf("\n*"))return divideInParagraphs(data)
else{
var blocks=("\n"+textBlock).split("\n"+stars+" ");
if(blocks[0]!='')blocks[0]=blocks[0].split("\n").slice(1).join("\n");
var header=[{'conf':Object.assign(confAmStart(blocks[0]),localConf.conf),'level':level},blocks[0]];
if(1==blocks.length)return structurire(header)
else{
var rest=[];
for(var i=0;i<blocks.length-1;i++){
rest.push([{'conf':Object.assign(confAmStart(blocks[i+1]),confAmEnde(blocks[i])),
'level':level+1},blocks[i+1]])}
var rer=rest.map(x=>structurire(x));
return header[1]==''? rer:[structurire(header),rer]}}}
function unorderedList(sText,lev){
var level="undefined"==typeof lev? 0:lev;
var spaces="",i=level;while(i--)spaces+=' ';
var sublist=("\n"+sText).split("\n"+spaces+'- ');
if(sublist.length>1){
var ulClasses="ul-classes"+"-"+level in customParameters?
customParameters["ul-classes"+"-"+level]:customParameters["ul-classes"],
liClasses="li-classes"+"-"+level in customParameters?
customParameters["li-classes"+"-"+level]:customParameters["li-classes"];
return sublist[0]+'\n<ul class='+ulClasses+'>'
+sublist.slice(1).map(x=>'<li class='+liClasses+'>'+
unorderedList(x,level+1) +'</li>')
.join("\n") +'</ul>'}
else{return formatInline(sText)}}
function formatInline(sText){
sText=sText.replace(/"/g, "&quot;");
var rx=/\[\[(\S+)\]\[(.*)\]\]/gm;
var a=rx.exec(sText);
if(a){
return formatInline(sText.replace(a[0],
("a-href-classes" in customParameters ?
'<a class='+customParameters["a-href-classes"]+' href='
:'<a href=')+a[1]+'>'+a[2]+'</a>'))}
else{
rx=/\*(.+?)\*/gm;
var a=rx.exec(sText);
if(a){
return formatInline(sText.replace(a[0],'<b>'+a[1]+'</b>'))}
else{
return sText}}}
function formatRec(sText,level){
if(level===undefined){level=0}
if(typeof sText=='object' && sText.length>0){
if(typeof sText[0]=='object' && 'level' in sText[0]){
var level=sText[0].level;if(level==0)level=CHTs.length;
var CHT=CHTs[level-1];
if(CHT.substring(0,6)=='title|'){
return sText.slice(1).map(x=>formatRec(x,sText[0].level)).join("\n")}
else{
if(sText.length==2 && 'string'==typeof sText[1] && '- '==sText[1].substring(0,2)){
return unorderedList(sText[1])}
else{
var tag=CHT in knownBlocks? knownBlocks[CHT]:['<'+CHT+'>','</'+CHT+'>'];
return tag[0]+sText.slice(1).map(x=>formatRec(x)).join("\n") +tag[1]}}}
else return sText.map(x=>formatRec(x,level)).join("\n")}
else{
if(typeof sText=='string'){
if(level==0)level=CHTs.length;
var CHT=CHTs[level-1];
var lines=sText.split("\n");
if(CHT.substring(0,6)=='title|'){
var tag=CHT.substring(6);
return '<'+tag+'>'+formatInline(lines[0])+'</'+tag+'>\n'+formatInline(lines.slice(1).join("\n"))}
else{return formatInline(lines.filter(x=>x!=customParameters["invisible-line"]).join("\n"))}}
else{
console.error('cannot parse this!');
return 'parse error'}}}
function arrayToValue(name){
if(typeof customParameters[name]=='object' && 0 in customParameters[name])customParameters[name]=customParameters[name][0]}
const tagNames="title invisible-line ul-classes li-classes a-href-classes".split(" ");
var customParameters={"invisible-line":'invisible-line'};
var tmpallStrings,tmpGroupedStrings;
Packages.load('2.js').then(function(){
var fileName=getURLParameter("t");
if(fileName==undefined||fileName=='')fileName='info';
Packages.load('txt/'+fileName+'.txt').then(function(prs){
var allStrings=prs.split("\n").filter(x=>x.length<2||x.substring(0,2)!="##");
tmpallStrings=allStrings;
tmpGroupedStrings=allStrings.filter(x=>x.substring(0,1)!="#"||x.substring(0,2)=="#+");
structuredText=structurire([{'level':0},allStrings.filter(x=>x.substring(0,1)!="#"||x.substring(0,2)=="#+")]);
var allCommands=allStrings.filter(x=>x.substring(0,1)=="#" && x.substring(0,2)!="#+");
function getConfig(cnames){
cnames.forEach(function(y){
var foundValues=allCommands.filter(x=>y==x.split(":")[0].substring(1).trim()).map(x=>x.split(":").slice(1).join(":").trim());
if(foundValues.length>0)customParameters[y]=foundValues})}
getConfig(["custom-header-tags"].concat(tagNames));
CHTs=customParameters["custom-header-tags"].map(x=>x.split(" ").filter(x=>x!="")).reduce((x,y)=>x.concat(y))||CHTs;
tagNames.forEach(x=>arrayToValue(x));
infoContainer.innerHTML=formatRec(structuredText);
if("title" in customParameters){
html("infoTopic",customParameters["title"]);
document.title=customParameters["title"]
}})});

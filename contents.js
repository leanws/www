// Copyright (c) 2018 Lean Web Solutions https://leanws.com

const allPages={
'main':[['/','main page'],['plans','plans and prices'],['domains','domain availability'],['custom','customize your order']],
'about':[['about','about Lean Web Solutions'],['busemail','email'],['time','download time'], ['payments','online payments'], ['appts','scheduling appointments online'], ['design','design'], ['info','info (wiki) service'], ['hosting','hosting']],
'wiki':[['https://wiki.leanws.com/Appointments','appointments'],['https://wiki.leanws.com/Email','business email'],['https://wiki.leanws.com/Ftp','secure FTP account'],['https://wiki.leanws.com/SEO','search engine optimization (SEO)'],['https://wiki.leanws.com/SPF,_DKIM,_DMARC','SPF, DKIM, DMARC'],['https://wiki.leanws.com/Privacy_Protection','privacy protection'],['https://wiki.leanws.com/Hosting','hosting'],['https://wiki.leanws.com/Optimization','optimization'],['https://wiki.leanws.com/Git','git']],
'other':[['privacy','privacy notice'],['terms','terms and conditions']]};
function cOnLoad(){
loadScript("2.js").then(function(){
for(var p in allPages) html(p,allPages[p].sort((l,r)=>l[1].toUpperCase()<r[1].toUpperCase()?-1:1).map(x=>'<a class="wiki pad" href="'+x[0]+'">'+x[1]+'</a>').join(""));
hideID("preloader")})}
(function(){
var ps=[];
for(var p in allPages) ps.push(p);
whenReady(ps,cOnLoad)})();

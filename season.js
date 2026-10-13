/* Seasonal tab icon: the logo with a small badge for the season, RC Week (Oct 25-31) or Nurses Week (May 6-12). */
(function(){
  var d=new Date(),m=d.getMonth()+1,md=m*100+d.getDate();
  var s=(md>=1025&&md<=1031)?"rcweek":(md>=506&&md<=512)?"nurses":(md>=922&&md<=1130)?"fall":(m===12||m<=2)?"winter":(m===3||m===4)?"spring":m===5?"may":"summer";
  var h=(location.hash.match(/^#season-(fall|winter|spring|may|summer|rcweek|nurses)$/)||[])[1];if(h)s=h;
  var l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement("link");l.rel="icon";document.head.appendChild(l)}
  l.type="image/svg+xml";l.href="/icons/fav-"+s+".svg";
})();
/* The holiday tab changes with the season:
   Nov 28-30, 2026: Cyber Monday.  Dec 1-31, 2026: Holiday Deals (Christmas sales, then after-Christmas sales). */
(function(){
  var d=new Date(),t=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  var mode=t>=20261128&&t<=20261130?"cm":(t>=20261201&&t<=20261231?"hd":"");
  if(!mode)return;
  var nav=mode==="cm"?"Cyber Monday":"Holiday Deals";
  document.querySelectorAll('nav a[href="/holiday/"]').forEach(function(a){a.textContent=nav});
  document.querySelectorAll("[data-"+mode+"]").forEach(function(el){el.textContent=el.getAttribute("data-"+mode)});
  if(location.pathname.indexOf("/holiday")===0&&mode==="cm")document.title="Cyber Monday 2026 · Bash's Bargains";
})();

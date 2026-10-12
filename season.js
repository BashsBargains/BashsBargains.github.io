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

/* After Black Friday (Nov 28-30, 2026) the holiday tab becomes Cyber Monday across the site. */
(function(){
  var d=new Date(),t=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  if(t<20261128||t>20261130)return;
  document.querySelectorAll('nav a[href="/holiday/"]').forEach(function(a){a.textContent="Cyber Monday"});
  document.querySelectorAll("[data-cm]").forEach(function(el){el.textContent=el.getAttribute("data-cm")});
  if(location.pathname.indexOf("/holiday")===0)document.title="Cyber Monday 2026 · Bash's Bargains";
})();

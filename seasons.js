/* Seasonal edge decorations. Picks the look by today's date:
   Fall (Sep 22 - Nov 30) leaves · Winter (Dec - Feb) snow · Spring (Mar - Apr) rain + umbrellas
   May flowers · Summer (Jun 1 - Sep 21) fireflies.
   Preview any season by adding #season-fall, #season-winter, #season-spring, #season-may or #season-summer to the URL.
   Decorations sit along the page edges and behind the cards, never catch taps,
   and stay still for anyone whose phone is set to reduce motion. */
(function(){
  var d=new Date(),m=d.getMonth()+1,day=d.getDate(),md=m*100+day;
  var s=(md>=1025&&md<=1031)?"rcweek":(md>=506&&md<=512)?"nurses":md>=922&&md<=1130?"fall":(m===12||m<=2)?"winter":(m===3||m===4)?"spring":m===5?"may":"summer";
  var h=(location.hash.match(/^#season-(fall|winter|spring|may|summer|rcweek|nurses)$/)||[])[1];if(h)s=h;

  var P={
    maple:"M12 2l1.6 3.6 2.6-1.2-.6 3.6 3.4-1-1.4 3.4 2.8 1.2-3.6 1.6.8 2.4-3.4-.8-.8 3.2h-.8V22h-1.2v-3.4h-.8l-.8-3.2-3.4.8.8-2.4-3.6-1.6 2.8-1.2-1.4-3.4 3.4 1-.6-3.6 2.6 1.2z",
    oak:"M12 2C17 6 18.5 12 12 21 5.5 12 7 6 12 2z",
    drop:"M12 3C12 3 6.5 10.5 6.5 14.5a5.5 5.5 0 0 0 11 0C17.5 10.5 12 3 12 3z",
    umbrella:"M3 12a9 9 0 0 1 18 0c-1.5-1.2-3-1.2-4.5 0-1.5-1.2-3-1.2-4.5 0-1.5-1.2-3-1.2-4.5 0C6 10.8 4.5 10.8 3 12z"
  };
  function shape(kind,c){
    if(kind==="snow")return "<g stroke='"+c+"' stroke-width='1.6' stroke-linecap='round' fill='none'><path d='M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2'/></g>";
    if(kind==="flower")return "<g fill='"+c+"'><circle cx='12' cy='6.5' r='3.6'/><circle cx='17.2' cy='10.3' r='3.6'/><circle cx='15.2' cy='16.4' r='3.6'/><circle cx='8.8' cy='16.4' r='3.6'/><circle cx='6.8' cy='10.3' r='3.6'/></g><circle cx='12' cy='12' r='2.8' fill='%23f2c230'/>";
    if(kind==="umbrella")return "<path d='"+P.umbrella+"' fill='"+c+"'/><path d='M12 12v7a2 2 0 0 1-4 0' stroke='%23705a45' stroke-width='1.4' fill='none' stroke-linecap='round'/>";
    if(kind==="firefly")return "<circle cx='12' cy='12' r='9' fill='"+c+"' opacity='.22'/><circle cx='12' cy='12' r='4.5' fill='"+c+"' opacity='.5'/><circle cx='12' cy='12' r='2.2' fill='%23fff6b0'/>";
    if(kind==="heart")return "<path d='M12 21s-7.5-4.6-9.5-9.2C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z' fill='"+c+"'/>";
    if(kind==="lungs")return "<path d='M12 3v8M12 10l-2.2 2.4M12 10l2.2 2.4' stroke='"+c+"' stroke-width='1.8' stroke-linecap='round' fill='none'/><path d='M10 8.5C6.8 8.5 3.5 12.6 3.5 17c0 2.6 1.5 4.2 3.6 4.2 2.2 0 3.4-1.6 3.4-3.8V9.4z' fill='"+c+"'/><path d='M14 8.5c3.2 0 6.5 4.1 6.5 8.5 0 2.6-1.5 4.2-3.6 4.2-2.2 0-3.4-1.6-3.4-3.8V9.4z' fill='"+c+"'/>";
    if(kind==="bubble")return "<circle cx='12' cy='12' r='8' fill='"+c+"' fill-opacity='.18' stroke='"+c+"' stroke-width='1.6'/><circle cx='9' cy='9' r='1.8' fill='%23ffffff' opacity='.8'/>";
    return "<path d='"+P[kind]+"' fill='"+c+"'/>";
  }
  function svg(inner,w,hh){return "url(\"data:image/svg+xml;utf8,"+("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+hh+"' viewBox='0 0 "+w+" "+hh+"'>"+inner+"</svg>").replace(/</g,"%3C").replace(/>/g,"%3E")+"\")"}
  function at(kind,c,x,y,sc,r){return "<g transform='translate("+x+" "+y+") rotate("+r+" 12 12) scale("+sc+")'>"+shape(kind,c)+"</g>"}

  var C={
    fall:{vine:"%23845226",tile:[["maple","%23d9622b",6,6,1.25,-18],["oak","%23b5372a",18,52,1.1,40],["maple","%23e2a326",2,92,1.05,22],["oak","%23c4561f",16,128,1,-35]],
      fall:[["maple","%23d9622b"],["oak","%23b5372a"],["maple","%23e2a326"],["oak","%23c4561f"],["maple","%23b5372a"],["oak","%23e2a326"],["maple","%23c4561f"]],anim:"drift",dur:[17,26],size:22},
    winter:{vine:"%2394a9c4",tile:[["snow","%237fa6d6",8,10,1.1,0],["snow","%23a9c4e6",18,60,.8,20],["snow","%237fa6d6",4,104,.95,10],["snow","%23a9c4e6",16,138,.7,30]],
      fall:[["snow","%238fb3de"],["snow","%23b7d0ee"],["snow","%238fb3de"],["snow","%23b7d0ee"],["snow","%238fb3de"],["snow","%23b7d0ee"],["snow","%238fb3de"],["snow","%23b7d0ee"]],anim:"snow",dur:[16,28],size:16},
    spring:{vine:"%2394a9c4",tile:[["umbrella","%23e86a92",6,8,1.15,-10],["drop","%236fa8dc",20,58,.7,0],["umbrella","%23f2c230",2,96,1.05,8],["drop","%236fa8dc",18,138,.6,0]],
      fall:[["drop","%236fa8dc"],["drop","%2389bbe6"],["drop","%236fa8dc"],["drop","%2389bbe6"],["drop","%236fa8dc"],["drop","%2389bbe6"],["drop","%236fa8dc"],["drop","%2389bbe6"],["drop","%236fa8dc"]],anim:"rain",dur:[3,5.5],size:12},
    may:{vine:"%235f9b52",tile:[["flower","%23e86a92",6,8,1.05,0],["oak","%235f9b52",20,48,.8,40],["flower","%23b07ad6",2,90,.95,15],["flower","%23f08a4b",16,128,.9,-10]],
      fall:[],anim:"",dur:[0,0],size:0},
    summer:{vine:"%23c9a64a",tile:[["firefly","%23f2c230",8,12,1.05,0],["firefly","%23f2c230",20,70,.75,0],["firefly","%23f2c230",4,112,.9,0]],
      fall:[["firefly","%23f2c230"],["firefly","%23f2c230"],["firefly","%23f2c230"],["firefly","%23f2c230"],["firefly","%23f2c230"],["firefly","%23f2c230"]],anim:"glow",dur:[5,9],size:18}
,
    rcweek:{vine:"%232a9d9b",tile:[["lungs","%232a9d9b",6,8,1.1,0],["bubble","%233fb6c9",20,56,.8,0],["lungs","%232a7fb8",2,94,1,0],["bubble","%233fb6c9",16,134,.7,0]],
      fall:[["bubble","%233fb6c9"],["bubble","%232a9d9b"],["bubble","%233fb6c9"],["bubble","%232a7fb8"],["bubble","%233fb6c9"],["bubble","%232a9d9b"],["bubble","%233fb6c9"]],anim:"rise",dur:[12,20],size:20},
    nurses:{vine:"%23d97a8a",tile:[["heart","%23d93a25",6,8,1.1,-10],["heart","%23e86a92",20,56,.8,12],["heart","%23f08a8a",2,96,1,-6],["heart","%23d93a25",16,134,.75,10]],
      fall:[["heart","%23d93a25"],["heart","%23e86a92"],["heart","%23f08a8a"],["heart","%23d93a25"],["heart","%23e86a92"],["heart","%23f08a8a"],["heart","%23d93a25"]],anim:"rise",dur:[13,21],size:18}
  }[s];

  var tile=svg("<path d='M14 0 C24 40 6 80 16 120 S20 150 14 160' stroke='"+C.vine+"' stroke-width='1.6' fill='none' opacity='.5'/>"+C.tile.map(function(t){return at.apply(null,t)}).join(""),48,160);
  var css=".sfx-g{position:fixed;top:0;bottom:0;width:48px;pointer-events:none;z-index:0;background:"+tile+" repeat-y;opacity:.92}"+
    ".sfx-g.l{left:-30px}.sfx-g.r{right:-30px;transform:scaleX(-1)}"+
    "@media (min-width:700px){.sfx-g.l{left:-14px}.sfx-g.r{right:-14px}}@media (min-width:1000px){.sfx-g.l{left:0}.sfx-g.r{right:0}}"+
    ".sfx-f{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}"+
    ".sfx-f span{position:absolute;top:-40px;background-size:contain;background-repeat:no-repeat;opacity:0}"+
    ".wrap{position:relative;z-index:1}"+
    "@media (prefers-reduced-motion:no-preference){"+
      ".sfx-f span{animation-timing-function:linear;animation-iteration-count:infinite}"+
      "@keyframes sfx-drift{0%{transform:translate(0,0) rotate(0);opacity:0}8%{opacity:.85}50%{transform:translate(38px,52vh) rotate(160deg)}92%{opacity:.85}100%{transform:translate(-22px,104vh) rotate(320deg);opacity:0}}"+
      "@keyframes sfx-snow{0%{transform:translate(0,0);opacity:0}10%{opacity:.9}50%{transform:translate(-18px,52vh)}90%{opacity:.9}100%{transform:translate(14px,104vh);opacity:0}}"+
      "@keyframes sfx-rain{0%{transform:translateY(0);opacity:0}10%{opacity:.55}90%{opacity:.55}100%{transform:translateY(106vh);opacity:0}}"+
      "@keyframes sfx-rise{0%{transform:translate(0,108vh) scale(.8);opacity:0}10%{opacity:.85}50%{transform:translate(20px,54vh) scale(1)}90%{opacity:.85}100%{transform:translate(-12px,0) scale(1.1);opacity:0}}"+
      "@keyframes sfx-glow{0%,100%{opacity:0;transform:translate(0,0)}30%{opacity:.9}50%{opacity:.25;transform:translate(16px,-14px)}70%{opacity:.85}}"+
    "}";
  function go(){
    var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
    var frag=document.createDocumentFragment();
    ["l","r"].forEach(function(x){var g=document.createElement("div");g.className="sfx-g "+x;g.setAttribute("aria-hidden","true");frag.appendChild(g)});
    if(C.fall.length){
      var f=document.createElement("div");f.className="sfx-f";f.setAttribute("aria-hidden","true");
      C.fall.forEach(function(p,i){
        var n=C.fall.length,sp=document.createElement("span"),w=C.size;
        sp.style.width=sp.style.height=w+"px";
        sp.style.left=Math.round(4+i*(92/(n-1||1)))+"%";
        if(C.anim==="glow"){sp.style.top=Math.round(15+((i*37)%70))+"%";}
        var dur=C.dur[0]+((i*7)%10)/10*(C.dur[1]-C.dur[0]);
        sp.style.animationName="sfx-"+C.anim;sp.style.animationDuration=dur.toFixed(1)+"s";sp.style.animationDelay="-"+((i*5.3)%dur).toFixed(1)+"s";
        sp.style.backgroundImage=svg(shape(p[0],p[1]),24,24);
        f.appendChild(sp);
      });
      frag.appendChild(f);
    }
    document.body.insertBefore(frag,document.body.firstChild);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();

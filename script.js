const $=s=>document.querySelector(s);
const loader=$("#loader"),msg=$("#loaderMessage"),sub=$("#loaderSub"),bar=$("#loaderBar"),pct=$("#loaderPct"),drinkModal=$("#drinkModal"),drinkDock=$("#drinkDock");

const messages=[
["Olá Juliana, como você está?","bem-vinda. antes de abrir, deixa o Zeca preparar tudo para você."],
["Aguarde, estamos preparando tudo pra você.","separei fotografias, lembranças e algumas coisas que talvez façam você sorrir."],
["O Zeca é o nosso mascote. Você vai gostar dele.","ele vai acompanhar você durante toda essa pequena viagem."],
["Estamos procurando algumas memórias...","algumas estão nas fotografias. outras estão guardadas na memória de quem estava lá."],
["Quase pronto.","a história está sendo montada. não tenha pressa."],
["Ratos de Brofem Brener.","essa aqui é só para quem precisa entender."],
["Pronto, Juliana.","agora pode entrar."]
];

// Primeiro o navegador carrega a interface inteira.
// Só DEPOIS do evento load o loading aparece e começa a contagem de ~50s.
const TOTAL=50000;
function startLoadingExperience(){
 loader.classList.add("active");
 const start=performance.now();
 let lastMessage=-1;
 function tick(now){
   const elapsed=now-start;
   const progress=Math.min(elapsed/TOTAL,1);
   const index=Math.min(Math.floor(progress*messages.length),messages.length-1);
   if(index!==lastMessage){
     lastMessage=index;
     msg.style.animation="none";
     void msg.offsetWidth;
     msg.style.animation="loaderMessageIn .7s ease both";
     msg.textContent=messages[index][0];
     sub.textContent=messages[index][1];
   }
   bar.style.width=(progress*100)+"%";
   pct.textContent=String(Math.floor(progress*100)).padStart(2,"0")+"%";
   if(progress<1) requestAnimationFrame(tick);
   else setTimeout(()=>{loader.classList.add("done");openDrink()},700);
 }
 requestAnimationFrame(tick);
}
if(document.readyState==="complete") setTimeout(startLoadingExperience,300);
else window.addEventListener("load",()=>setTimeout(startLoadingExperience,300),{once:true});

function openDrink(){drinkModal.classList.add("open");document.body.classList.add("modal-open")}
function closeDrink(){drinkModal.classList.remove("open");document.body.classList.remove("modal-open");drinkDock.classList.add("show")}
$("#drinkClose").addEventListener("click",closeDrink);
$(".drink-backdrop").addEventListener("click",closeDrink);
document.querySelectorAll(".drink-option").forEach(btn=>btn.addEventListener("click",()=>{
 localStorage.setItem("pdcDrink",JSON.stringify({icon:btn.dataset.icon,name:btn.dataset.name}));
 $("#drinkMiniIcon").textContent=btn.dataset.icon;$("#drinkMiniName").textContent=btn.dataset.name;
 closeDrink();
}));
const saved=localStorage.getItem("pdcDrink");
if(saved){try{const d=JSON.parse(saved);$("#drinkMiniIcon").textContent=d.icon;$("#drinkMiniName").textContent=d.name}catch(e){}}
drinkDock.addEventListener("click",openDrink);

const cursor=$("#cursor");
if(window.matchMedia("(pointer:fine)").matches){
 window.addEventListener("pointermove",e=>{
  cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";
  document.querySelectorAll(".hero-photo").forEach(el=>{
   const d=Number(el.dataset.depth||1);
   el.style.translate=((e.clientX-innerWidth/2)/innerWidth*d*12)+"px "+((e.clientY-innerHeight/2)/innerHeight*d*12)+"px"
  });
 });
 document.querySelectorAll("a,button,.hero-photo,.memory-photo,.zeca-hero,.zeca-break img,.drink-dock").forEach(el=>{
  el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));
  el.addEventListener("mouseleave",()=>cursor.classList.remove("hover"));
 });
}
document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.translate=((e.clientX-r.left-r.width/2)*.12)+"px "+((e.clientY-r.top-r.height/2)*.12+"px")});el.addEventListener("pointerleave",()=>el.style.translate="")});
document.querySelectorAll(".audio-button").forEach(btn=>btn.addEventListener("click",()=>{btn.innerHTML="● memória em breve <small>áudio pendente</small>"}));

const $=s=>document.querySelector(s);
const loader=$("#loader"),msg=$("#loaderMessage"),sub=$("#loaderSub"),bar=$("#loaderBar"),pct=$("#loaderPct"),drinkModal=$("#drinkModal"),drinkDock=$("#drinkDock");
const messages=[
["Olá Juliana, como você está?","antes de abrir o álbum, deixa o Zeca preparar tudo..."],
["Aguarde, estamos preparando tudo pra você.","organizando fotografias, lembranças e algumas surpresas..."],
["O Zeca é o nosso mascote. Você vai gostar dele.","ele ainda está aprendendo a posar para a câmera."],
["Ratos de Brofem Brener.","sim. essa piada é só para quem precisa entender."]
];
let i=0,progress=1;
const timer=setInterval(()=>{
 i=Math.min(i+1,messages.length-1);
 msg.textContent=messages[i][0];sub.textContent=messages[i][1];
},950);
const progressTimer=setInterval(()=>{
 progress=Math.min(progress+2,100);bar.style.width=progress+"%";pct.textContent=String(progress).padStart(2,"0")+"%";
 if(progress>=100){clearInterval(progressTimer);clearInterval(timer);setTimeout(()=>{loader.classList.add("done");openDrink()},500)}
},38);
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
  document.querySelectorAll(".hero-photo").forEach(el=>{const d=Number(el.dataset.depth||1);el.style.translate=((e.clientX-innerWidth/2)/innerWidth*d*12)+"px "+((e.clientY-innerHeight/2)/innerHeight*d*12)+"px"})
 });
 document.querySelectorAll("a,button,.hero-photo,.memory-photo,.zeca-hero,.zeca-break img,.drink-dock").forEach(el=>{
  el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));el.addEventListener("mouseleave",()=>cursor.classList.remove("hover"))
 });
}
document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.translate=((e.clientX-r.left-r.width/2)*.12)+"px "+((e.clientY-r.top-r.height/2)*.12)+"px"});el.addEventListener("pointerleave",()=>el.style.translate="")});
document.querySelectorAll(".audio-button").forEach(btn=>btn.addEventListener("click",()=>{btn.innerHTML="● memória em breve <small>áudio pendente</small>"}));

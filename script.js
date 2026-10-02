const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("done"),1550));

const cursor=document.getElementById("cursor");
if(window.matchMedia("(pointer:fine)").matches){
  window.addEventListener("pointermove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
    document.querySelectorAll(".float").forEach(el=>{
      const d=Number(el.dataset.depth||1);
      const x=(e.clientX-innerWidth/2)/innerWidth*d*12;
      const y=(e.clientY-innerHeight/2)/innerHeight*d*12;
      el.style.marginLeft=x+"px";
      el.style.marginTop=y+"px";
    });
  });
  document.querySelectorAll("a,button,.photo").forEach(el=>{
    el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));
    el.addEventListener("mouseleave",()=>cursor.classList.remove("hover"));
  });
}else{cursor.style.display="none"}

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting) entry.target.classList.add("visible");
 });
},{threshold:.15});
reveals.forEach(el=>observer.observe(el));

const soundToggle=document.getElementById("soundToggle");
let sound=false;
soundToggle.addEventListener("click",()=>{
 sound=!sound;
 soundToggle.querySelector("span").textContent=sound?"on":"off";
 // Sons reais serão adicionados quando os áudios do portfólio estiverem prontos.
});

document.querySelectorAll(".fake-player").forEach(btn=>{
 btn.addEventListener("click",()=>{
   btn.querySelector("span").textContent="●";
   btn.querySelector("small").textContent="áudio pendente";
 });
});

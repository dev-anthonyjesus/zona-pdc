const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("done"),1550));

const cursor=document.getElementById("cursor");
if(window.matchMedia("(pointer:fine)").matches){
  window.addEventListener("pointermove",e=>{
    cursor.style.left=e.clientX+"px"; cursor.style.top=e.clientY+"px";
    document.querySelectorAll(".float").forEach(el=>{
      const d=Number(el.dataset.depth||1);
      const x=(e.clientX-innerWidth/2)/innerWidth*d*16;
      const y=(e.clientY-innerHeight/2)/innerHeight*d*16;
      el.style.marginLeft=x+"px"; el.style.marginTop=y+"px";
    });
  });
  document.querySelectorAll("a,button,.polaroid,.memory-photo,.chole-window").forEach(el=>{
    el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));
    el.addEventListener("mouseleave",()=>cursor.classList.remove("hover"));
  });
}else{cursor.style.display="none"}

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.15});
reveals.forEach(el=>observer.observe(el));

const soundToggle=document.getElementById("soundToggle");
let sound=false;
soundToggle.addEventListener("click",()=>{
  sound=!sound;
  soundToggle.querySelector("span").textContent=sound?"on":"off";
});

document.querySelectorAll(".fake-player").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.querySelector("span").textContent="●";
    btn.querySelector("small").textContent="áudio pendente";
  });
});

const stage=document.querySelector(".chole-window");
if(stage){
  stage.addEventListener("pointermove",e=>{
    const r=stage.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    stage.style.transform=`scale(1.015) translate(${x*7}px,${y*7}px)`;
  });
  stage.addEventListener("pointerleave",()=>stage.style.transform="");
}

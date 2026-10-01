const picker=document.querySelector("#picker");
const clock=document.querySelector("#clock");
const timeEl=document.querySelector("#time");
const modeEl=document.querySelector("#mode");
const statusEl=document.querySelector("#status");
const buttons=[...document.querySelectorAll("button[data-seconds]")];

let focus=0, timer=null, endAt=0, remaining=40, initial=40, mode="PLAY", running=false;

function paintFocus(){
  buttons.forEach((b,i)=>b.classList.toggle("focused",i===focus));
  buttons[focus].focus({preventScroll:true});
}
function showPicker(){
  stopInterval(); running=false;
  clock.classList.add("hidden"); picker.classList.remove("hidden");
  paintFocus();
}
function startPreset(seconds,label){
  initial=remaining=seconds; mode=label;
  picker.classList.add("hidden"); clock.classList.remove("hidden");
  modeEl.textContent=`${mode} ${initial}`;
  clock.classList.remove("warning","expired");
  start();
}
function start(){
  if(remaining<=0) remaining=initial;
  endAt=performance.now()+remaining*1000;
  running=true; statusEl.textContent="RUNNING";
  stopInterval();
  tick();
  timer=setInterval(tick,100);
}
function pause(){
  if(!running) return start();
  remaining=Math.max(0,Math.ceil((endAt-performance.now())/1000));
  running=false; stopInterval(); statusEl.textContent="PAUSED";
}
function reset(){
  stopInterval(); running=false; remaining=initial;
  timeEl.textContent=remaining; statusEl.textContent="READY";
  clock.classList.remove("warning","expired");
}
function stopInterval(){ if(timer){clearInterval(timer);timer=null;} }
function beep(ms=90,freq=880){
  try{
    const ac=new (window.AudioContext||window.webkitAudioContext)();
    const o=ac.createOscillator(),g=ac.createGain();
    o.frequency.value=freq;o.connect(g);g.connect(ac.destination);g.gain.value=.12;
    o.start();setTimeout(()=>{o.stop();ac.close()},ms);
  }catch(e){}
}
let lastShown=null;
function tick(){
  remaining=Math.max(0,Math.ceil((endAt-performance.now())/1000));
  timeEl.textContent=remaining;
  clock.classList.toggle("warning",remaining<=5 && remaining>0);
  if(remaining!==lastShown){
    const alertPoints = mode==="PLAY" ? [10,5,0] : [15,5,0];
    if(alertPoints.includes(remaining)) beep(remaining===0?300:100, remaining===0?440:880);
    lastShown=remaining;
  }
  if(remaining<=0){
    stopInterval();running=false;statusEl.textContent="EXPIRED";clock.classList.add("expired");
  }
}
buttons.forEach((b,i)=>b.addEventListener("click",()=>{focus=i;startPreset(+b.dataset.seconds,b.dataset.mode)}));

document.addEventListener("keydown",e=>{
  const k=e.key;
  if(!picker.classList.contains("hidden")){
    if(k==="ArrowRight") focus=(focus%2===0)?focus+1:focus;
    if(k==="ArrowLeft") focus=(focus%2===1)?focus-1:focus;
    if(k==="ArrowDown") focus=Math.min(3,focus+2);
    if(k==="ArrowUp") focus=Math.max(0,focus-2);
    if(k==="Enter") return startPreset(+buttons[focus].dataset.seconds,buttons[focus].dataset.mode);
    paintFocus();
  }else{
    if(k==="Enter") running?pause():start();
    if(k==="ArrowLeft") reset();
    if(k==="ArrowDown") showPicker();
  }
  if(["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Enter"].includes(k)) e.preventDefault();
});
paintFocus();

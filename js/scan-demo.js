/* Demo del escaneo: datos de ejemplo, animación del recuadro, barra de tiempo y controles. */
(function(){
  var reduce=Nerilum.reduce;
  var D=[
    {n:'NonDemented',s:[.86,.10,.03,.01],b:[150,112,100,70],c:'#A7C957',t:'#14230F'},
    {n:'VeryMildDemented',s:[.09,.71,.16,.04],b:[132,104,136,90],c:'#BC4749',t:'#F2E8CF'},
    {n:'MildDemented',s:[.04,.18,.66,.12],b:[120,98,160,104],c:'#BC4749',t:'#F2E8CF'},
    {n:'ModerateDemented',s:[.02,.06,.24,.68],b:[108,92,184,120],c:'#BC4749',t:'#F2E8CF'}
  ];
  var btns=document.querySelectorAll('.pick button'),bars=document.querySelectorAll('.bar');
  var box=document.getElementById('box'),lab=document.getElementById('lab'),txt=document.getElementById('txt');
  function show(k){
    var d=D[k];
    btns.forEach(function(b,i){b.setAttribute('aria-pressed',i===k?'true':'false');});
    tween(d.b,d.n.length*6.7+18);
    box.setAttribute('stroke',d.c);box.setAttribute('fill',d.c==='#A7C957'?'rgba(167,201,87,.12)':'rgba(188,71,73,.12)');
    txt.textContent=d.n;txt.setAttribute('fill',d.t);
    
    lab.setAttribute('fill',d.c);
    bars.forEach(function(r,i){
      var top=i===k;
      r.classList.toggle('top',top);
      r.querySelector('i').style.width=Math.round(d.s[i]*100)+'%';
      r.querySelector('i').style.background=top?d.c:'#6A994E';
      r.lastElementChild.textContent=d.s[i].toFixed(2);
    });
  }
  var cur=1,touched=false,scan=document.querySelector('.scan'),timerEl=document.querySelector('.timer'),segs=timerEl.querySelectorAll('b');
  function mark(k){segs.forEach(function(s,i){s.className=i<k?'done':i===k?'cur':'';});}
  var cb=[132,104,136,90],cw=120,raf=0;
  function tween(b,w){
    var f=cb.slice(),fw=cw,t0=null,dur=reduce?1:450;
    cancelAnimationFrame(raf);
    function step(t){
      if(t0===null)t0=t;
      var p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);
      var v=[0,1,2,3].map(function(i){return f[i]+(b[i]-f[i])*e;}),ww=fw+(w-fw)*e;
      cb=v;cw=ww;
      box.setAttribute('x',v[0]);box.setAttribute('y',v[1]);box.setAttribute('width',v[2]);box.setAttribute('height',v[3]);
      lab.setAttribute('x',v[0]);lab.setAttribute('y',v[1]-22);lab.setAttribute('width',ww);
      txt.setAttribute('x',v[0]+9);txt.setAttribute('y',v[1]-7);
      if(p<1){raf=requestAnimationFrame(step);}
    }
    raf=requestAnimationFrame(step);
  }
  function go(k){cur=k;show(k);mark(k);}
  function stop(){timerEl.classList.add('paused');}
  function play(){if(!hold)timerEl.classList.remove('paused');}
  var pp=document.getElementById('pp'),hold=false;
  function setPP(){pp.textContent=(!touched&&!hold)?'Pausar':'Reproducir';}
  pp.addEventListener('click',function(){
    if(!touched&&!hold){hold=true;timerEl.classList.add('paused');}
    else{hold=false;touched=false;timerEl.classList.remove('manual','paused');segs[cur].className='';void timerEl.offsetWidth;mark(cur);}
    setPP();
  });
  if(reduce)pp.hidden=true;
  timerEl.addEventListener('animationend',function(){if(!touched&&!reduce)go((cur+1)%4);});
  if(reduce)timerEl.classList.add('manual');
  btns.forEach(function(b){b.addEventListener('click',function(){touched=true;timerEl.classList.add('manual');go(+b.dataset.i);document.getElementById('live').textContent='Resultado de ejemplo: '+D[+b.dataset.i].n;setPP();});});
  scan.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')stop();});scan.addEventListener('pointerleave',play);
  scan.addEventListener('focusin',stop);scan.addEventListener('focusout',play);
  requestAnimationFrame(function(){show(1);});
  mark(1);
})();

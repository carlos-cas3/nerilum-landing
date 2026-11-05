/* Demo del escaneo: datos de ejemplo, animación del recuadro, barra de tiempo y controles. */
(function(){
  var reduce=Nerilum.reduce;

  /* ─── CONFIGURACIÓN DE CASOS ──────────────────────────────────────────────
     Cada entrada representa un resultado de ejemplo que rota en el scan.
     n     : etiqueta interna
     s     : scores de las 4 clases [NonDemented, VeryMild, Mild, Moderate] (deben sumar ≈1)
     c     : color del indicador en las barras cuando es la clase activa (hex)
     label : texto del botón selector
  ─────────────────────────────────────────────────────────────────────────── */
  var CASES=[
    {
      n:'NonDemented',
      label:'Sin demencia',
      s:[.86,.10,.03,.01],
      c:'#A7C957'
    },
    {
      n:'VeryMildDemented',
      label:'Muy leve',
      s:[.09,.71,.16,.04],
      c:'#BC4749'
    },
    {
      n:'MildDemented',
      label:'Leve',
      s:[.04,.18,.66,.12],
      c:'#BC4749'
    },
    {
      n:'ModerateDemented',
      label:'Moderada',
      s:[.02,.06,.24,.68],
      c:'#BC4749'
    }
  ];
  /* ────────────────────────────────────────────────────────────────────────── */

  var btns=document.querySelectorAll('.pick button'),bars=document.querySelectorAll('.bar');

  function show(k){
    var d=CASES[k];
    btns.forEach(function(b,i){b.setAttribute('aria-pressed',i===k?'true':'false');});
    bars.forEach(function(r,i){
      var top=i===k;
      r.classList.toggle('top',top);
      r.querySelector('i').style.width=Math.round(d.s[i]*100)+'%';
      r.querySelector('i').style.background=top?d.c:'#6A994E';
      r.lastElementChild.textContent=d.s[i].toFixed(2);
    });
  }

  var cur=1,touched=false,
      scan=document.querySelector('.scan'),
      viewEl=document.querySelector('.view'),
      timerEl=document.querySelector('.timer'),
      segs=timerEl.querySelectorAll('b');

  function mark(k){segs.forEach(function(s,i){s.className=i<k?'done':i===k?'cur':'';});}

  function go(k){cur=k;show(k);mark(k);}

  /* ── Pausa/reanuda al hacer click/tap en la imagen ── */
  var hold=false;
  function toggleHold(){
    if(!hold){
      hold=true;
      timerEl.classList.add('paused');
      viewEl.setAttribute('aria-label','Escaneo pausado — haz clic para reanudar');
    }else{
      hold=false;
      timerEl.classList.remove('paused');
      viewEl.setAttribute('aria-label','Corte de resonancia cerebral — haz clic para pausar');
    }
    viewEl.classList.toggle('paused',hold);
  }
  viewEl.addEventListener('click',function(){if(!reduce)toggleHold();});
  viewEl.setAttribute('role','button');
  viewEl.setAttribute('tabindex','0');
  viewEl.setAttribute('aria-label','Corte de resonancia cerebral con la región detectada — haz clic para pausar');
  viewEl.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&!reduce){e.preventDefault();toggleHold();}});

  timerEl.addEventListener('animationend',function(){if(!touched&&!reduce)go((cur+1)%4);});
  if(reduce)timerEl.classList.add('manual');

  btns.forEach(function(b){
    b.addEventListener('click',function(){
      var k=+b.dataset.i;
      // Si ya estaba pausado por hold, lo liberamos también
      hold=false;
      viewEl.classList.remove('paused');
      viewEl.setAttribute('aria-label','Corte de resonancia cerebral — haz clic para pausar');
      touched=false;
      // Reiniciar el timer desde el principio de esta sección
      timerEl.classList.remove('manual','paused');
      segs[k].className='';
      void timerEl.offsetWidth;   // reflow para que la animación CSS reinicie
      go(k);
      document.getElementById('live').textContent='Resultado de ejemplo: '+CASES[k].n;
    });
  });



  requestAnimationFrame(function(){show(1);});
  mark(1);
})();

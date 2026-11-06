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

  var btns=document.querySelectorAll('.pick button'),bars=document.querySelectorAll('.bar'),
      slides=document.querySelectorAll('.view .slide');

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
    slides.forEach(function(im,i){im.classList.toggle('is-active',i===k);});
  }

  var cur=1,touched=false,
      scan=document.querySelector('.scan'),
      viewEl=document.querySelector('.view'),
      timerEl=document.querySelector('.timer'),
      segs=timerEl.querySelectorAll('b');

  function updateLabel(){
    var base='Corte de resonancia cerebral de ejemplo: '+CASES[cur].label;
    viewEl.setAttribute('aria-label',hold?base+' — escaneo pausado, haz clic para reanudar':base+' — haz clic para pausar');
  }

  function mark(k){segs.forEach(function(s,i){s.className=i<k?'done':i===k?'cur':'';});}

  function go(k){cur=k;show(k);mark(k);updateLabel();}

  /* ── Pausa/reanuda al hacer click/tap en la imagen ── */
  var hold=false;
  function toggleHold(){
    hold=!hold;
    timerEl.classList.toggle('paused',hold);
    viewEl.classList.toggle('paused',hold);
    updateLabel();
  }
  viewEl.addEventListener('click',function(){if(!reduce)toggleHold();});
  viewEl.setAttribute('role','button');
  viewEl.setAttribute('tabindex','0');
  updateLabel();
  viewEl.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&!reduce){e.preventDefault();toggleHold();}});

  timerEl.addEventListener('animationend',function(){if(!touched&&!reduce)go((cur+1)%4);});
  if(reduce)timerEl.classList.add('manual');

  btns.forEach(function(b){
    b.addEventListener('click',function(){
      var k=+b.dataset.i;
      // Si ya estaba pausado por hold, lo liberamos también
      hold=false;
      viewEl.classList.remove('paused');
      touched=false;
      // Reiniciar el timer desde el principio de esta sección
      timerEl.classList.remove('manual','paused');
      segs[k].className='';
      void timerEl.offsetWidth;   // reflow para que la animación CSS reinicie
      go(k);
      document.getElementById('live').textContent='Resultado de ejemplo: '+CASES[k].n;
    });
  });



  requestAnimationFrame(function(){go(1);});
})();

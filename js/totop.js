/* Botón flotante: aparece al bajar y sube al inicio. */
(function(){
  var up=document.querySelector('.totop');
  if(!up)return;
  function sc(){up.classList.toggle('show',window.scrollY>600);}
  window.addEventListener('scroll',sc,{passive:true});sc();
  up.addEventListener('click',function(){window.scrollTo({top:0,behavior:Nerilum.reduce?'auto':'smooth'});});
})();

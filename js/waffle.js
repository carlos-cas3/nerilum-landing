/* Sección Contexto: genera los 100 puntos del gráfico. */
(function(){
  var w=document.getElementById('waffle'),h='';
  for(var i=0;i<100;i++){h+='<span'+(i<60?' class="a"':i<70?' class="b"':'')+' style="--i:'+i+'"></span>';}
  w.innerHTML=h;
})();

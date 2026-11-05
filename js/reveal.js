/* Activa la clase .on cuando un elemento entra en pantalla (gráfico, pasos y frases de privacidad). */
(function(){
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}
    });},{threshold:.35});
    document.querySelectorAll('#waffle,.track,.say').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('#waffle,.track,.say').forEach(function(el){el.classList.add('on');});
  }
})();

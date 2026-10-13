(function(){
 var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var save=navigator.connection&&navigator.connection.saveData;
 function mk(src,o){var v=document.createElement('video');v.src=src;v.playsInline=true;v.setAttribute('playsinline','');
  Object.keys(o).forEach(function(k){v[k]=o[k]});return v}
 document.querySelectorAll('.media[data-video]').forEach(function(m){
  var btn=m.querySelector('.play'),loop=m.dataset.loop,lv;
  if(loop&&!reduce&&!save){lv=mk(loop,{muted:true,loop:true,autoplay:true,preload:'metadata'});lv.setAttribute('muted','');
   lv.setAttribute('aria-hidden','true');lv.className='loop';lv.addEventListener('playing',function(){m.classList.add('live')});lv.addEventListener('error',function(){lv.remove()});m.insertBefore(lv,btn)}
  if(btn)btn.addEventListener('click',function(){
   if(lv){lv.pause();lv.remove()}
   var v=mk(m.dataset.video,{controls:true,autoplay:true,preload:'auto'});
   var p=m.querySelector('img');if(p)p.style.visibility='hidden';
   m.appendChild(v);btn.hidden=true;v.focus&&v.focus()})
 });
 var nv=document.querySelector('header nav'),cu=nv&&nv.querySelector('[aria-current]');if(cu){nv.scrollLeft+=cu.getBoundingClientRect().left-24}
 var form=document.getElementById('lead');
 if(form)form.addEventListener('submit',function(e){e.preventDefault();
  var g=function(n){return(form.elements[n].value||'').trim()};
  var t='Halo Orenz, saya ingin konsultasi '+form.dataset.produk+'.\n\n'+
   'Nama: '+g('nama')+'\nPerusahaan/instansi: '+g('inst')+'\nLokasi: '+g('lokasi')+'\nKebutuhan: '+g('butuh')+'\nCatatan: '+g('catatan');
  window.open('https://wa.me/6288802032033?text='+encodeURIComponent(t),'_blank','noopener')});
})();

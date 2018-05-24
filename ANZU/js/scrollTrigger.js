$(function(){
   $(window).scroll(function(){
      var obj_t_pos = $('#gl001').offset().top;
      var scr_count = $(document).scrollTop() + (window.innerHeight/1.5); // ディスプレイの半分の高さを追加
      if(scr_count > obj_t_pos){
         $('#gl001').addClass('glAnimation01');
         $('#gl002').addClass('glAnimation02');
         $('#gl003').addClass('glAnimation03');
         $('#gl004').addClass('glAnimation04');
         $('#gl005').addClass('glAnimation05');
         $('#gl006').addClass('glAnimation06');
      }else{
         $('#gl001').removeClass();
         $('#gl002').removeClass();
         $('#gl003').removeClass();
         $('#gl004').removeClass();
         $('#gl005').removeClass();
         $('#gl006').removeClass();
      }
   })
})
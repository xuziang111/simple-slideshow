var allButtons = $('#buttons > span');
var n = 0;
for(let i=0;i<allButtons.length;i++){
  allButtons.eq(i).on('click',function(x){
    var num = $(x.currentTarget).index();
    n = num;
    var p = (num * -300) + 'px';
    $('#images').css({
      transform:'translateX(' + p + ') translateZ(0)'
    });
    $(x.currentTarget).addClass('red').siblings('.red').removeClass('red')
  });
}

function setTime() {
  return setInterval(()=>{
  n++;
  allButtons.eq(n%4).trigger('click');
  },1000);
}

var stopTime = setTime();

$('.window').on('mouseenter',function(){
  window.clearInterval(stopTime);
});
$('.window').on('mouseleave',function(){
  stopTime=setTime();
});

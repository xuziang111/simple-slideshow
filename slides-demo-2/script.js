let n;
start();
let stopSlide = startSlide();
mouseAction();

function startSlide(){
  return setInterval(()=>{
    addLeave(getImgNode(n)) .one('transitionend', (e)=>{
    addEnter($(e.currentTarget));
    });
    addCurrent(getImgNode(n+1))
    n++;
  },3000);
};

function x(n){
  if(n>4){
    n = n%4
    if (n===0){
      n =4
    }
  } 
  return n
}

function start(){
  n=1;
  getImgNode(n).addClass('current').siblings().addClass('enter');

}
function getImgNode(n){
  return $(`.imgs > img:nth-child(${x(n)})`)
}
function addCurrent($node){
  return $node.removeClass('enter').addClass('current');
}
function addEnter($node){
  return $node.removeClass('leave').addClass('enter');
}
function addLeave($node){
  return $node.removeClass('current').addClass('leave');
}
function mouseAction(){
$('.showWindow').on('mouseenter',function(){
    window.clearInterval(stopSlide);
  });
  $('.showWindow').on('mouseleave',function(){
    stopSlide = startSlide();
  });
}

buttonsAction();

function buttonsAction(){
  $('.buttons > span:nth-child(1)').on('click',(e)=>{
    n--;
    getImgNode(n).removeClass('enter').addClass('leave').one('transitionend', (e)=>{
      getImgNode(n+1).removeClass('current').addClass('enter');
    $(e.currentTarget).removeClass('leave').addClass('current');
    });	
    	
  $('.buttons > span:nth-child(2)').on('click',(e)=>{
    addLeave(getImgNode(n)) .one('transitionend', (e)=>{
      addEnter($(e.currentTarget));
    });
    addCurrent(getImgNode(n+1))
    n++;
    });	
  return n;
  })
}
    

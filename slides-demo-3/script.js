let $buttons = $('.buttons>span');
let $slides = $('#slides');
let $images = $slides.children('img')
let n=1
		
makeClone()
flip()
mousuActive()
	
$buttons.eq(0).on('click',function(){
  $slides.css({
    transform:'translateX(-670px) translateZ(0)'
	})
	if(n===4){ 
    endToStart()
  }
  n=1;
});
$buttons.eq(1).on('click',function(){
  $slides.css({
    transform:'translateX(-1340px) translateZ(0)'
  });
	n=2;
});
$buttons.eq(2).on('click',function(){
  $slides.css({
    transform:'translateX(-2010px) translateZ(0)'
  });
	n=3;
});
$buttons.eq(3).on('click',function(){
  $slides.css({
    transform:'translateX(-2680px) translateZ(0)'
  });
	if(n===1){
    startToEnd();
	}
	n=4;
});

function makeClone(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function makeSlide(){
	return	setInterval(function(){
    $slides.css({
	  	transform:`translateX(${inturn(n)*-670}px)`
	  }).offset();	
	  if(inturn(n)===1){
       endToStart();
	  }
	  n++;
  },2000)		
}
var stopSlide = 	makeSlide();

function mousuActive(){
  $('.container').on('mouseenter',function(){
    window.clearInterval(stopSlide);
  });
  $('.container').on('mouseleave',function(){
    stopSlide = makeSlide();
  });
};

function inturn(n){
   return n%4+1;
}

function flip(){	
  $('.show-window>span:nth-child(3)').on('click',function(){
	  $slides.css({
		  transform:`translateX(${inturn(n)*-670}px)`
	  }).offset();	
	  if(inturn(n)===1){
      endToStart()
	  }
	  n++;
  });
	
  $('.show-window>span:nth-child(2)').on('click',function(){
	  n=n+2;
		$slides.css({
		  transform:`translateX(${inturn(n)*-200}px)`
	  }).offset();	
		if(inturn(n)===4){
     startToEnd()
	  }
		n=n+1;
  });
}

document.addEventListener('visibilitychange',function(){
  if(document.hidden===false){
	   stopSlide = makeSlide();
	}else{
	  window.clearInterval(stopSlide);
	}
})

function endToStart(){
	$slides.css({
    transform:'translateX(-3350px) translateZ(0)'
	 }).one('transitionend', function(){
	 	  $slides.hide().offset();
  $slides.css({transform:'translateX(-670px)'}).show();
	 });
}

function startToEnd(){
	$slides.css({
    transform:'translateX(0px) translateZ(0)'
	}).one('transitionend', function(){
	$slides.hide().offset();
    $slides.css({transform:'translateX(-2680px)'}).show();
	});
}

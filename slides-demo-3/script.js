let $buttons = $('.buttons>span');
let $slides = $('#slides');
let $images = $slides.children('img')
let n=1
		
makeClone()
flip()
mousuActive()
buttonsActive()
windowActive()
	
function buttonsActive(){
  $('#buttons').on('click','span',function(e){
	  let $button = $(e.currentTarget);
	  let index = $button.index();
	  if(inturn(n) === $buttons.length-1 && index === 0){
		endToStart($buttons.length);
			n=0;
	  }else if(inturn(n) === 0 && index=== $buttons.length-1){
		startToEnd($buttons.length);
			n=$buttons.length-1
	  }else{
	    $slides.css({
          transform:`translateX(${- (index + 1) * 670}px) translateZ(0)`
	  })
			n = index;
		console.log(index)
	}
  })
}
	
function makeClone(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function makeSlide(){
	return	setInterval(function(){
    $slides.css({
	  	transform:`translateX(${(inturn(n)+1)*-670}px)`
	  }).offset();	
	  if(inturn(n)===0){
       endToStart($buttons.length);
			 n=0;
	  }
	console.log(n)
	  n++;
  },2000)		
}

var stopSlide = makeSlide();

function mousuActive(){
  $('.container').on('mouseenter',function(){
    window.clearInterval(stopSlide);
  });
  $('.container').on('mouseleave',function(){
    stopSlide = makeSlide();
  });
};

function inturn(n){
   return n%4;
}

function flip(){
  $('.show-window>span:nth-child(2)').on('click',function(){
	  n=n+3;
		console.log(n)
		$slides.css({
		  transform:`translateX(${inturn(n)*-670}px)`
	  }).offset();	
		if(inturn(n)===0){
     startToEnd($buttons.length)
	  }
  });

  $('.show-window>span:nth-child(3)').on('click',function(){
    $slides.css({
	  	transform:`translateX(${(inturn(n)+1)*-670}px)`
	  }).offset();	
	  if(inturn(n)===0){
       endToStart($buttons.length);
			 n=0;
	  }
	console.log(n)
	  n++;
  });
}

function windowActive(){	
document.addEventListener('visibilitychange',function(){
  if(document.hidden===false){
	   stopSlide = makeSlide();
	}else{
	  window.clearInterval(stopSlide);
	}
})
}
	
function endToStart(x){
	$slides.css({
    transform:`translateX(${-(x + 1)*670}px) translateZ(0)`
	 }).one('transitionend', function(){
	 	  $slides.hide().offset();
  $slides.css({transform:'translateX(-670px)'}).show();
	 });
}

function startToEnd(x){
	$slides.css({
    transform:'translateX(0px) translateZ(0)'
	}).one('transitionend', function(){
	$slides.hide().offset();
    $slides.css({transform:`translateX(${-x * 670}px)`}).show();
	});
}

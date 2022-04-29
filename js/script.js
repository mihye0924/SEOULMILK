var pause = false;
var sec = 0
var click = false

$(function(){       
    var content = $('.slide_content')
    var slide_wrap = $('.slide_wrap')
    var slideCount = content.length
    var slideWidth = $('.slide_content').width()
    var currentPosition = 0;   
    var totalSlideWidth = slideWidth*slideCount


    // 슬라이드 네비게이션바 타이머
    setInterval(() => {   
        
        if( sec >= 3 ) {
            sec = 0
            if(!pause) { 
                $('.slide_more').trigger('click')  
            }
        } else {
            if(!pause) {
                sec = Number(sec.toFixed(2)) + 0.01 
            }
        }
 
    }, 10);
 
    // 마우스 올렸을때
    $('.slide_content, .slide_more').on('mouseover', function(){  
        $('.slide_prograss_inner').addClass('pause')
        pause = true 
    }) 
    $('.slide_content, .slide_more').on('mouseout', function(){ 
        $('.slide_prograss_inner').removeClass('pause')
        pause = false
    }) 

    // 애니메이션 - 텍스트, 이미지
    $('.slide_prograss_inner').addClass('animate')   
    $('.textBox .title').css({ bottom: '-125px'}).animate({ bottom: 0 })
    $('.textBox .subTitle').css({ bottom: '-80px'}).animate({ bottom: 0 })

    // 이전 클릭
    $('.slide_more').on('click',function(){ 
        slide_wrap.css({ width: totalSlideWidth })     
        content.css({ left : -currentPosition , opacity: 0.5 }).animate({ opacity : 1}) 
        $('.slide_content:first-child').appendTo(slide_wrap) 
        
        var initNum = parseInt ( slideCount / 3 )  
        for (let i = 0; i<initNum; i++) {  
    
            var prev_count = document.querySelector('.prev_count').innerHTML 
            prev_count++;
            document.querySelector('.prev_count').textContent = '0'+prev_count
     
            if(prev_count > 3 ){
                document.querySelector('.prev_count').textContent = '0'+1
            }  
        } 

        $('.textBox .title').css({ bottom: '-125px'}).animate({ bottom: 0 })
        $('.textBox .subTitle').css({ bottom: '-80px'}).animate({ bottom: 0 })   
    })


    //fresh milk 텍스트 애니메이션
    var timer = 0;
    setInterval(() => { 
        timer+=1;

        if(timer % 2 == 0){
            $('h1.title01 span:first-of-type').css({top:'-190px'}).animate({top:'0'},200)
            document.querySelector('.title01 span:first-of-type').textContent = 'FRESH'
        }else{
            $('h1.title01 span:first-of-type').css({top:'-190px'}).animate({top:'0'},200)
            document.querySelector('.title01 span:first-of-type').textContent = 'SEOUL'
        } 
    }, 4000);
 

    // 전체 스크롤바 - 오른쪽
    
    $(window).on('scroll',function(){ 
        var scroll  = $(window).scrollTop()  
        currentHeight = scroll / 50
        $('#scrollbar .scrollbar_inner').css({ height : currentHeight })

        if( scroll >= 400 ){
            document.querySelector('#scrollbar span').textContent='TOP'  
        }else{
            document.querySelector('#scrollbar span').textContent='SCROLL'
        }
    })
      

    $('.scroll_text').on('click',function(){ 
        $('html, body').animate({scrollTop: 0}, 500);
    })
  
}) 
 
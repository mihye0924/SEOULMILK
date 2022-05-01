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

    // 스크롤시 텍스트 애니메이션
    $('.motion').scrolla({
        mobile: true,        // 모바일 적용 여부
        once: true,         // 스크롤 애니메이션 한 번만 적용 여부

    })

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
        var scroll  = $(this).scrollTop()  
        console.log(scroll)
        currentHeight = scroll / 50
        
        $('#scrollbar .scrollbar_inner').css({ height : currentHeight })

        if( scroll >= 100 ){
            document.querySelector('#scrollbar span:nth-of-type(2)').textContent='BOTTOM'  
            $('#scrollbar span:first-of-type').css({ opacity:0, display: 'block' }).animate({opacity:1},1000)
        }else{
            document.querySelector('#scrollbar span:nth-of-type(2)').textContent='SCROLL'
            $('#scrollbar span:first-of-type').css({ opacity:0, display: 'none' }).animate({opacity:1},1000)
        } 

        // fresh text - 애니메이션 구현
        var scrollD  = $(this).scrollTop()    
        var mainHeight = $('main #main').height() 
        var windowHeight = $(window).height()   

        if( scrollD >= mainHeight-windowHeight) {
            $('.slide_container').addClass('nofixed')  
            $('main #main h1.title01').addClass('animated_opacity') 

        }else{
            $('.slide_container').removeClass('nofixed') 
            $('main #main h1.title01 ').removeClass('animated_opacity') 
        }
     
        // 2번째 섹션으로 넘어가기
        var gap = scrollD - (mainHeight - windowHeight)
        if( gap < 0 ) {
            gap = 0
        }  
        // console.log(mainHeight - windowHeight,'2번째 높이')
        if( scrollD > mainHeight - windowHeight ) { 
            $('#redBg_wrap').css({'opacity' : gap / 100 * 0.2, 'zIndex' : 3 }) 
            $('#product').css({'opacity' : gap / 100 * 0.2})   
        } else {
            $('#redBg_wrap').css({'opacity' : 0 , 'zIndex' : 0 })
            $('#product').css({'opacity' : 0}) 
        } 

        var milkImg = $('#product .content img').height()
        var section2Height = $('#product').height()
        console.log((mainHeight + section2Height),'2번째 높이')
        console.log(milkImg)
        if( scrollD > (mainHeight + section2Height ) - windowHeight ) {   

            if(scrollD > (mainHeight + section2Height + milkImg ) - windowHeight ){ 
            }
        } 
    })
      

    // 맨위로 올리기
    var bottom = $(document).height() 
    $('#scrollbar span:nth-of-type(2)').on('click',function(){ 
        $('html, body').animate({scrollTop:bottom}, 500);
    })
    $('#scrollbar span:first-of-type').on('click',function(){ 
        $('html, body').animate({scrollTop:0}, 500);
    })

    // 자동 글자 애니메이션
    $('.autoText.marquee').marquee({ 
        duration: '6000',
        direction : 'left',
        loop : '-1',
        scrollamount: '0',
        duplicated : 'true', 
    })
 
    var log_wrap = $('.logSlide_wrap')
    var log_list = document.querySelector('.logSlide_wrap .slide_list').offsetWidth
    var j = jQuery; 

    // currentPosition-=log_list
    setInterval(() => {
        if( pause == false ){
            stopBtn.click()
        }else{
            stopBtn.preventDefault
        }
    }, 2000);

    var stopBtn = $('.stop').on('click',function(){
        j('.logSlide_wrap .slide_list:first-child').appendTo(log_wrap)
        // currentPosition=-log_list
        j('.logSlide_wrap .slide_list').css( { left: currentPosition } ).animate({ left: -log_list-25},1000)  
    })

    
    $('.logSlide_wrap').on('mouseover', function(e){   
        pause = true 
    })
    $('.logSlide_wrap').on('mouseout', function(){ 
        pause = false
    })

    $('footer .familysite li.mainTitle .footer_plus').on('click', function(){
        $('footer .familysite li:not(.mainTitle)').slideToggle()
    })

})  
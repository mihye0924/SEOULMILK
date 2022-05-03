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

    // gnb버튼 클릭 이벤트
    $('.openBtn').on('click',function(e){
        var chk = $('input#gnb_bg').is(":checked") 
        if( chk != false ){ 
            $('input#gnb_bg').removeAttr('checked')
            chk = false
        }else{
            $('input#gnb_bg').attr('checked','checked')
            chk = true
        }
        $('header').toggleClass('active')
        $('#scrollbar').toggleClass('active')
 
        e.preventDefault();
        if($(this).hasClass('active')){
            $('.openBtn').removeClass('active')
            $('.openBtn').addClass('close')
        }else{
            $('.openBtn').addClass('active')
            $('.openBtn').removeClass('close')
        }
        $('#gnbMenu .gnb li a').addClass('motion')
    }) 

    // gnb 버튼 클릭 후 텍스트 호버시 이미지 변경  
    var gnbImg = document.querySelector('#gnbMenu img') 
    $('#gnbMenu .gnb li').on('mouseover',function(){
        $(this).addClass('hover')   
        var text= document.querySelector('.gnb li.hover a').innerHTML  
        if( text == '스토리'){ 
            gnbImg.src ='./img/gnb01.jpg' 
        }else if( text == '제품' ){ 
            gnbImg.src ='./img/gnb02.jpg'
        }else if( text == '서울로그'){
            gnbImg.src = './img/gnb03.jpg'
        }else if( text == '홍보&amp;이벤트'){
            gnbImg.src = './img/gnb04.jpg'
        }
         
    }).on('mouseout',function(){
       $(this).removeClass('hover')   
    })
 

    // 슬라이드 네비게이션바 타이머
    setInterval(() => {   
        
        if( sec >= 3 ) {
            sec = 0
            if(!pause) { 
                // $('.slide_more').trigger('click')  
            }
        } else {
            if(!pause) {
                sec = Number(sec.toFixed(2)) + 0.01 
            }
        }
 
    }, 10);
 
    // 마우스 올렸을때
    $('.slide_content, .slide_more, .slide_bar').on('mouseover', function(){  
        $('.slide_prograss_inner').addClass('pause')
        pause = true 
    }) 
    $('.slide_content, .slide_more, .slide_bar').on('mouseout', function(){ 
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
 

    // 새로고침시 고정 여부 - 오른쪽 
    $(window).on('load',function(){ 
        var scrollTop  = $(this).scrollTop()    
        var mainHeight = $('main #main').height() 
        var windowHeight = $(window).height()   

        if( scrollTop < mainHeight-windowHeight) {
            $('.slide_container').addClass('fixed') 
            $('main #main h1.title01').addClass('fixed') 
        } 
        var sck = document.querySelector('#scrollbar span:nth-of-type(2)').textContent 
    
        if(sck =='SCROLL'){ 
            $('#scrollbar span:nth-of-type(2)').css({ pointerEvents : 'none' })
        }

    })
 
    

   

    // 스크롤 시 빨간 부분 표시
    $(window).on('scroll',function(){ 
        var scroll  = $(this).scrollTop()   
        currentHeight = scroll / 40 
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
              $('.slide_container').removeClass('fixed') 
            $('main #main h1.title01').addClass('animated_opacity').removeClass('fixed') 

        }else{
            $('.slide_container').addClass('fixed') 
            $('main #main h1.title01 ').removeClass('animated_opacity').addClass('fixed')
        }
     
        // 2번째 섹션으로 넘어가기
        var gap = scrollD - (mainHeight - windowHeight)
        if( gap < 0 ) {
            gap = 0
        }  
        if( scrollD > mainHeight - windowHeight ) { 
            $('#redBg_wrap').css({'opacity' : gap / 100 * 0.2, 'zIndex' : 3 }) 
            $('#product').css({'opacity' : gap / 100 * 0.2})   
        } else {
            $('#redBg_wrap').css({'opacity' : 0 , 'zIndex' : 0 })
            $('#product').css({'opacity' : 0}) 
        } 

    })

    // 맨아래로 
    $(window).on('scroll', function(){ 
        var sck = document.querySelector('#scrollbar span:nth-of-type(2)').textContent 
    
        if(sck =='SCROLL'){ 
            $('#scrollbar span:nth-of-type(2)').css({ pointerEvents : 'none' })
        }else{
            $('#scrollbar span:nth-of-type(2)').css({ pointerEvents : 'unset' })
        }
    
    })
    // 맨위로
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
 
    // 서울로그 슬라이드
    var owl = $('.owl-carousel'); 
        owl.owlCarousel({ 
            // loop:true,
            // autoplay:true,
            autoWidth:true,
            margin:50,
            autoplayTimeout:2000,
            autoplayHoverPause:true,
            // items:1 
        }) 

        
        owl.on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY>0) { 
                owl.trigger('prev.owl');
            } else {
                owl.trigger('next.owl');
            }
            e.preventDefault();
        });
 
    // 푸터 familysite
    $('footer .familysite li.mainTitle .footer_plus').on('click', function(){
        $('footer .familysite li:not(.mainTitle)').slideToggle()
    })
 

    // 사랑받는 이유 원 움직임
    var circle01 = document.documentElement.style;
    var circle02 = document.documentElement.style;
    var circle03 = document.documentElement.style;
    var circle04 = document.documentElement.style;
 
    document.addEventListener('mousemove', function(e) {
    circle01.setProperty('--mouse-x', e.clientX);
    circle01.setProperty('--mouse-y', e.clientY);
    circle02.setProperty('--mouse-x', e.clientX);
    circle02.setProperty('--mouse-y', e.clientY);
    circle03.setProperty('--mouse-x', e.clientX);
    circle03.setProperty('--mouse-y', e.clientY);
    circle04.setProperty('--mouse-x', e.clientX);
    circle04.setProperty('--mouse-y', e.clientY);
    });

   var play = false
    $('.playIcon').on('click',function(){ 
        $('#player').css({ zIndex : 1 })
        
        if( play != false){
            console.log('ㅋㅋㅋㅋㅋㅇㅇㅇㅇㅇㅇㅋㅋㅋㅋㅋㅋㅋ')  
            
            stopVideo()
            play = false
        }else{ 
            $('#seoulLog .logSlide_wrap .playIcon.yogurt,'+
            '#seoulLog .logSlide_wrap li span.yogurt ').animate({ bottom: '-80px'})
            playVideo()
            play = true
            console.log(play)   
        }
    })
})  
 
var player;
function onYouTubeIframeAPIReady(){
    player = new YT.Player('player',{    
      
      videoId:'3wHCprySi2I',
      // origin : 가져올 서버의 주소를 입력
      playerVars : { 
        'rel': 0,
        'loop':1,
        'controls': 1,
        'showinfo':0,
        'autohide':0,
        'modestbranding':1,
        'frameborderz':0,
        'mute':1,
        },
    
    }) 
}

function playVideo(){
    player.playVideo();
}
function stopVideo(){
    player.stopVideo()
}
var pause = false;
var sec = 0
var click = false 
/* Youtube API 로드*/
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 

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


    // 마우스 커서 이벤트
    let mouseCursor = document.querySelector(".cursor");   
    // 마우스 좌표
    let mouseX = 0;
    let mouseY = 0;

    // el좌표
    let currentX = 0;
    let currentY = 0;

    $(document).on("mousemove", cursor);  
    function cursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY; 
        tick()
    }
    function tick(){
        requestAnimationFrame(tick);
        
        currentX += (mouseX - currentX - 10) * 0.5;
        currentY += (mouseY - currentY - 10) * 0.5; 
        mouseCursor.style.cssText = `
        position:fixed; 
        transform: translate(${currentX}px, ${currentY}px);
        `;
   } 

    // $('a, .viewmore').on('mouseover',function(){
    //     $('.cursor').stop().animate({'width':'180px','height' : '180px'})
    // }).on('mouseout', function(){
    //     $('.cursor').stop().animate({'width':'80px','height' : '80px'})
    // })
    // $('.gnbBtn, .searchImg, .starImg, .scroll_text').on('mouseover',function(){
    //     $('.cursor').hide()
    //     $(this).addClass('pointer')
    // }).on('mouseout', function(){ 
    //     $('.cursor').show()
    //     $(this).removeClass('pointer')
    // })
 

    $('.slide_prograss_inner').css( { 'width' : 0 })
    $('.slide_prograss_inner').stop().animate({ 'width' : '100%' }, 3000) 
    // 슬라이드 네비게이션바 타이머
    setInterval(() => {   
     
    if(!pause) { 
        $('.slide_more').trigger('click')  
        $('.slide_prograss_inner').css( { 'width' : 0 })
        $('.slide_prograss_inner').stop().animate({ 'width' : '100%' }, 3000)  
    } 

    }, 3000);
 
    $('#gnbMenu .gnb li a').addClass('motion')
   

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
 

  
        
    
    $(window).on('scroll',function(){ 
        var dHeight = $(document).height()
        var height = $(this).height()
        var scroll  = $(this).scrollTop()  

        // 메인섹션 - 호출
        mainResize()

        // 스크롤 시 빨간 부분 표시
        currentHeight = Math.floor( ((scroll+height) / dHeight * 100 )* 2.9)
        $('#scrollbar .scrollbar_inner').css({ height : currentHeight })      

        if( scroll >= 100 ){
            document.querySelector('#scrollbar span:nth-of-type(2)').textContent='DOWN'    
            $('#scrollbar span:first-of-type').css({ opacity:0, display: 'block' }).animate({opacity:1},1000)
        }else{
            document.querySelector('#scrollbar span:nth-of-type(2)').textContent='SCROLL' 
            $('#scrollbar span:first-of-type').css({ opacity:0, display: 'none' }).animate({opacity:1},1000)
        } 


        // fresh text - 애니메이션 구현
        var scroll  = $(this).scrollTop()    
        var mainHeight = $('main #main').height() 
        var windowHeight = $(window).height()    
 
        // 2번째 섹션으로 넘어가기
        var gap = scroll - (mainHeight - windowHeight)
        if( gap < 0 ) {
            gap = 0
        }  
        if( scroll > mainHeight - windowHeight ) { 
            $('#redBg_wrap').css({'opacity' : gap / 100 * 0.2, 'zIndex' : 3 }) 
            $('#product').css({'opacity' : gap / 100 * 0.2})   
        } else {
            $('#redBg_wrap').css({'opacity' : 0 , 'zIndex' : 0 })
            $('#product').css({'opacity' : 0}) 
        } 
        
        // 맨아래로 
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
    $('.marquee').marquee({ 
        duration: 15000, 
        direction : 'left',
        loop : '-1', 
        duplicated : 'true', 
    })
 
    // 서울로그 슬라이드
    var owl = $('.owl-carousel'); 
        owl.owlCarousel({  
            autoWidth:true,
            margin:50, 
            responsive:{
                486:{
                    items:1,
                    margin:20,
                },
                0:{
                    items:1,
                    margin:10,
                } 
            }
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
 
    // 플레이 버튼
    $('.play').on('click', function() {
        let idx = $('.play').index(this) 
        // console.log(idx)
        $(this).addClass('active')  
        $('.slide_list').addClass('active')  

        // 동영상 재생
        playerList[idx].playVideo()
    })    


})/* 문서 준비 이벤트(끝) */  

    // 새로고침시 고정 여부 - 오른쪽 
    $(window).on('load',function(){ 
        var scrollTop  = $(this).scrollTop()    
        var mainHeight = $('main #main').height() 
        var windowHeight = $(window).height()   

        if( scrollTop < mainHeight-windowHeight) {
            $('.slide_container').addClass('fixed') 
            $('main #main h1.title01').addClass('fixed') 
            var sck = document.querySelector('#scrollbar span:nth-of-type(2)').textContent 
        
            if(sck =='SCROLL'){ 
                $('#scrollbar span:nth-of-type(2)').css({ pointerEvents : 'none' })
            }  
        }

        // 메인섹션 - 호출
        mainResize()
        


        // 찾기
        var search = document.getElementById('search')
        var searchDoc = search.contentDocument;
        var search_wrap = searchDoc.getElementById('search_wrap')
        
        // 별
        var star = document.getElementById('star')
        var starDoc = star.contentDocument;
        var star_wrap = starDoc.getElementById('star')

        // 로고
        var logo = document.getElementById('logo')
        var logoDoc = logo.contentDocument;
        var logoSimbolo = logoDoc.getElementById('logoSimbolo')
        var logo_wrap = logoDoc.getElementById('logo')
        

        //스마일 호버시
        $('.starImg').on('click',function(){ 
            var chk = $('input#star_popup').is(":checked") 
            if( chk != false ){ 
                $(this).removeClass('active')
                $('input#star_popup').removeAttr('checked') 
                $('header').removeClass('active')
                $(search_wrap).removeClass('active')   
                $(star_wrap).removeClass('active')   
                $(logo_wrap).removeClass('active')   
                $(logoSimbolo).removeClass('active') 
                chk = false
            }else{
                $(this).addClass('active')
                $('input#star_popup').attr('checked','checked') 
                $('header').addClass('active')
                $(search_wrap).addClass('active')   
                $(star_wrap).addClass('active')   
                $(logo_wrap).addClass('active')   
                $(logoSimbolo).addClass('active')  
                $('.openBtn').removeClass('active')
                if(chk !=false){ 
                    $('input#gnb_bg').attr('checked','checked')  
                    chk = false
                }else{
                    $('input#gnb_bg').removeAttr('checked') 
                    chk = true
                }  
                chk = true
            }
        })

        // gnb버튼 클릭 이벤트
        $('.openBtn').on('click',function(){
            var chk = $('input#gnb_bg').is(":checked")  
            if( chk != false ){ 
                $('input#gnb_bg').removeAttr('checked') 
                $('header').removeClass('active')
                $(search_wrap).removeClass('active')   
                $(star_wrap).removeClass('active')   
                $(logo_wrap).removeClass('active')   
                $(logoSimbolo).removeClass('active') 
                chk = false
            }else{
                $('.starImg').removeClass('active')
                $('input#gnb_bg').attr('checked','checked')
                $('header').addClass('active')   
                $(search_wrap).addClass('active')   
                $(star_wrap).addClass('active')   
                $(logo_wrap).addClass('active')   
                $(logoSimbolo).addClass('active')   
                if(chk !=false){ 
                    $('input#star_popup').attr('checked','checked')  
                    chk = false
                }else{
                    $('input#star_popup').removeAttr('checked') 
                    chk = true 
                } 
                chk = true
            }

            if($(this).hasClass('active')){
                $('.openBtn').removeClass('active')
                $('.openBtn').addClass('close')
            }else{
                $('.openBtn').addClass('active')
                $('.openBtn').removeClass('close')
            } 
                $('#scrollbar').toggleClass('active') 
        }) 

    })
        
    // 메인섹션 - 호출
    $(window).resize(function(){    
        mainResize() 
    })


    var playList = ['3wHCprySi2I','wIVANe3FMJE','BPxSGGkwVcA','4VBQ3ySuBjA']
    var playerList = new Array();

    // 자동 호출 
    // - videoId, iframe 및 옵션을 가지고 player 객체 생성하여 유튜브 동영상 화면을 준비
    function onYouTubeIframeAPIReady(){  

        let N = playList.length

        for (let i = 0; i < N; i++) {
            // 유튜브 동영상 제어하는 객체 : player
            let player = new YT.Player('player' + i,{    
            videoId: playList[i],
            // origin : 가져올 서버의 주소를 입력
            playerVars : { 
                'rel': 0,
                'loop':1,
                'controls': 1,
                'showinfo':0,
                'autohide':0,
                'modestbranding':1,
                'frameborderz':0,
                // 'mute':1,
                },
                events: {
                    'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
                    'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
                }
            })  
            playerList.push(player)
        }

    }
    
    var playerState;
    function onPlayerStateChange(event) {
        playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
                event.data == YT.PlayerState.PLAYING ? '재생 중' :
                event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
                event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
                event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
                event.data == -1 ? '시작되지 않음' : '예외';
 
            // div#player
            let target = event.target.o.id
            
            // 일시중지, 종료
            if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED ){
                // 멈췄을 때, 다시 재생버튼
                $('#' + target).parent().removeClass('active')
                $('.slide_list').removeClass('active')
                $('.play').removeClass('active')
            } 

        // console.log('onPlayerStateChange 실행: ' + playerState);
    } 
       
    function onPlayerReady() { }

    function stopVideo(){
        player.stopVideo()
    }


    // 메인 섹션 - 리사이징 1024 이하 및 이상 일때 반응형 적용
    function mainResize(){
        var windowWidth = $(window).width()
        var windowHeight = $(window).height()    
        var scroll  = $(this).scrollTop()   
        var mainHeight = $('main #main').height()  
     

        // 1024 사이즈보다 작고, 첫번째 구간일때
        if( windowWidth + 17 <= 1024 ) { 
            if( scroll >= mainHeight-windowHeight ) {
                $('.slide_container').removeClass('fixed')
                $('main #main h1.title01').removeClass('animated_opacity').removeClass('fixed') 
            }else{
                $('.slide_container').removeClass('fixed') 
                $('main #main h1.title01').removeClass('animated_opacity').removeClass('fixed')        
            }
        
        }else{
            if( scroll >= mainHeight-windowHeight ) {
                $('.slide_container').removeClass('fixed') 
                $('main #main h1.title01').addClass('animated_opacity').removeClass('fixed') 
            }else{
                $('.slide_container').addClass('fixed') 
                $('main #main h1.title01').removeClass('animated_opacity').addClass('fixed') 
            }
        } 
    }
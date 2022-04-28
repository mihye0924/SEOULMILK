let pause = false;
$(function(){      
    var content = $('.slide_content')
    var slide_wrap = $('.slide_wrap')
    var slideCount = content.length
    var slideWidth = $('.slide_content').width()
    var slide_prograss_inner = $('.slide_prograss_inner')
    var currentPosition = 0;  

    var totalSlideWidth = slideWidth*slideCount
    slide_wrap.css({ width: totalSlideWidth }) 


    var time = 1
    var timer = setInterval(() => {  
        if(!pause) {
            $('.slide_more').trigger('click') 
        }
        console.log(time) 
        time++
    }, 3000);



    // 마우스 올렸을때
    $('.slide_content, .slide_more').on('mouseover', function(){  
        $(slide_prograss_inner).addClass('pause')
        clearInterval(timer)
        pause = true
    }) 
    $('.slide_content, .slide_more').on('mouseout', function(){ 
        $(slide_prograss_inner).removeClass('pause')
        timer = setInterval()
        pause = false
    })
  

    for(i=0;i<content.length;i++){ 
            $(slide_prograss_inner).addClass('animate')
    } 

    // 이전 클릭
    $('.slide_more').on('click',function(){
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
    })
 
}) 
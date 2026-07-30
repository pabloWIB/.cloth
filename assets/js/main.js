$(function(){
    $(".active1").hover(function(){
        $(".hoverSelection1").toggleClass("hoverSelection1N");
    });
});


$(function(){
    $(".active2").hover(function(){
        $(".hoverSelection2").toggleClass("hoverSelection2N");
    });
});

$(function(){
    $(".active3").hover(function(){
        $(".hoverSelection3").toggleClass("hoverSelection3N");
    });
});

$(function(){
    $(".active4").click(function(){
        $(".active4").toggleClass("hoverSelection4N");
        $(".overlay").toggleClass("hoverSelection5N");
        $("main").toggleClass("hoverSelection6N");
        $("footer").toggleClass("hoverSelection7N");
    });
});


var alto = 0;
$("#carrusel .carousel-item").each(function(index,elemento){
    if(alto < $(elemento).height()){
        alto = $(elemento).height();
    }
});

$("#carrusel .carousel-item").css("min-height",alto);
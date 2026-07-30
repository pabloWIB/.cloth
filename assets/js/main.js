// Reescritura completa a vanilla JS en la fase 9. Aquí solo se adaptan
// los nombres de clase al nuevo sistema y se elimina el código del
// subrayado del nav (tres bloques jQuery casi idénticos), que ahora
// resuelve el CSS con :hover y :focus-within.

$(function () {
    $(".nav-toggle").click(function () {
        $(".nav-toggle").toggleClass("is-open");
        $(".mobile-menu").toggleClass("is-open");
        $("body").toggleClass("menu-open");
    });
});


var alto = 0;
$("#carrusel .carousel-item").each(function (index, elemento) {
    if (alto < $(elemento).height()) {
        alto = $(elemento).height();
    }
});

$("#carrusel .carousel-item").css("min-height", alto);

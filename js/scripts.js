$(document).ready(function(){
    
//    altura de banner dinamico ******************************************
    var banner = $('#banner');
    
    function alturaBanner(){
        
        var vpaltura = $(window).height();
        banner.css('height', vpaltura);
    }
    
    alturaBanner();
    
    $(window).resize(alturaBanner);
    
//    Efecto para menu fijo ***********************************************
    var menuFijo = $('#menuFijo');
    
    $(window).on('scroll', function(){
        
        var alturaElemento = $('#nosotros').offset().top;
        if($(window).scrollTop() >= alturaElemento){
            menuFijo.css('margin-top', 0);
            
        }else if($(window).scrollTop() <= alturaElemento/2){
            menuFijo.css('margin-top', -100);
        }
    })
    
//    Efecto Volver arriba y scroll suave *********************************
    
//    Volver arriba
    var volverAriba = $('#volverArriba');
    $(window).on('scroll', function(){
        
        var botonAltura = $('#nosotros').offset().top;
        if($(window).scrollTop() >= botonAltura){
            volverAriba.css('margin-right', 0);
            
        }else if($(window).scrollTop() <= botonAltura/2){
            volverAriba.css('margin-right', -80);
        }
    })
    
//    Scroll suave de volver arriba
    $('a.volver-arriba').on('click', function(e){
        e.preventDefault();
        
        if($(window).scrollTop() != 0){
            $('html, body').stop().animate({scrollTop: 0}, 1000);
        }
    })
    
//    Scroll suave para los elementos restantes
    $('a.scroll-suave').on('click', function(e){
        e.preventDefault();
        var seccionAltura = $($(this).attr('href')).offset().top;
    
        $('html, body').stop().animate({scrollTop: seccionAltura}, 1000);
    })
    
    $('a.scroll-menu').on('click', function(e){
        e.preventDefault();
        var seccionAltura = $($(this).attr('href')).offset().top -110;
    
        $('html, body').stop().animate({scrollTop: seccionAltura}, 1000);
    })
    
    $('a.scroll-eventos').on('click', function(e){
        e.preventDefault();
        var seccionAltura = $($(this).attr('href')).offset().top -110;
    
        $('html, body').stop().animate({scrollTop: seccionAltura}, 1000);
    })
    
//    Efecto Modal para imagenes de seccion nosotros ******************************
    $('.imagen-galeria').on('click', function(){
        var rutaImagen = $(this).attr('src');
        var modal = '<div class="modal" id="modal"><img src="'+ rutaImagen +'" alt=""><div class="btn-cerrar" id="btnCerrar"><i class="fas fa-times-circle"></i></div></div>';
        
        $('.galeria-nosotros').after(modal);
        
        $('#btnCerrar').on('click', function(){
            $('#modal').remove();
        })
    })
    
    $(document).on('keyup', function(e){
        if(e.which == 27) {
            $('#modal').remove();
        }
    })
    
//    Efecto Slider para imagenes ************************************************
    
//    Slider con movimiento a la derecha
    var slider = $('#slideContenedor'),
        botonAntes = $('#btnAnterior'),
        botonSiguiente = $('#btnSiguiente');
    
    $('#slideContenedor .slide:last').insertBefore('#slideContenedor .slide:first');
    slider.css('margin-left', '-100%');
    
    function moverDerecha(){
        if(!slider.is(':animated')){    
            slider.animate({
                marginLeft: '-200%'
            }, 700, function(){
                $('#slideContenedor .slide:first').insertAfter('#slideContenedor .slide:last');
                slider.css('margin-left', '-100%');
                
                reseteoInterval();
            });
        }
    }
    
    botonSiguiente.on('click', moverDerecha);
    
//    Slider con movimiento a la izquierda
    function moverIzquierda(){
        if(!slider.is(':animated')){
           $('#slideContenedor .slide:last').insertBefore('#slideContenedor .slide:first');
            slider.css('margin-left', '-200%');

            slider.animate({
                marginLeft: '-100%'
            }, 700, function (){
                
                reseteoInterval();
            });
        }
    }
    
    botonAntes.on('click', moverIzquierda);
    
//    Slider con movimiento automatico
    var intervalo = setInterval(moverDerecha, 5000);
    
    function reseteoInterval(){
        clearInterval(intervalo);
        
        intervalo = setInterval(moverDerecha, 5000);
    }
    
//    Efecto tabs para menu de platos ************************************************
    
    var menuSeleccion = $('.opciones-menu ul > li a'),
        menuCarta = $('.menu-platos .contenedor .carta-fondo'),
        liSeleccion = $('.opciones-menu ul > li'),
        contenidoActivo = null;
    
    
    for(var i=0; i < menuSeleccion.length; i++){
        $('.opciones-menu ul > li a').on('click', eventoMenu);
    }
    
    function eventoMenu(e){
        e.preventDefault();
        
        for(var i=0; i < menuCarta.length; i++){
            $('.menu-platos .contenedor .carta-fondo').removeClass('active');
        }
        
        for(var i=0; i < liSeleccion.length; i++){
            $('.opciones-menu ul > li').removeClass('active');
        }
        
        $(this).parent().addClass('active');
        contenidoActivo = $(this).attr('href');
        
        $(contenidoActivo).addClass('carta-fondo active');
        $(contenidoActivo).css('opacity', '0');
        
        setTimeout(function(){
            $(contenidoActivo).css('opacity', '1');
            
        }, 100);
    }      
    
//   Validación de formulario ************************************************
    var formulario = $('#contForm'),
        nombre = $('#nombre'),
        correo = $('#correo'),
        telefono = $('#telefono'),
        consulta = $('#consulta');
    
//    validando campo nombre
    function valNombre(e){
        
        if(nombre.val() == '' || nombre.val() == null){
            e.preventDefault();
            
            $('input[type="text"] + .error').css('display', 'block');
        }else {
            $('input[type="text"] + .error').css('display', 'none');
        }
    }
    
//    validando campo email
    function valEmail(e){
        
        if(correo.val() == '' || correo.val() == null){
            e.preventDefault();
            
            $('input[type="email"] + .error').css('display', 'block');
        }else {
            $('input[type="email"] + .error').css('display', 'none');
        }
    }
    
//    validando campo telefono
    function valTel(e){
        
        if(telefono.val() == '' || telefono.val() == null){
            e.preventDefault();
            
            $('input[type="tel"] + .error').css('display', 'block');
        }else {
            $('input[type="tel"] + .error').css('display', 'none');
        }
    }
    
//    validando campo consulta
    function valConsulta(e){
        
        if(consulta.val() == '' || consulta.val() == null){
            e.preventDefault();
            
            $('textarea + .error').css('display', 'block');
        }else {
            $('textarea + .error').css('display', 'none');
        }
    }
    
    function validacion(e){
        valNombre(e);
        valEmail(e);
        valTel(e);
        valConsulta(e);
        
    }
    
    formulario.on('submit', validacion);
    
//   Menu movil ************************************************
    var numeroUno = 1;
    
    $('#btnMenu').on('click', function(e){
        e.preventDefault();
        if(numeroUno == 1){
            $('.menu-mobil .menu-principal').animate({left: 0}, 300, function(){
                numeroUno=0;
            })
        }else{
            $('.menu-mobil .menu-principal').animate({left: '-100%'}, 300, function(){
                numeroUno=1;
            })
        }
        
    })
    
    $('.menu-mobil .menu-principal a').on('click', function(){
        $('.menu-mobil .menu-principal').animate({left: '-100%'}, 300, function(){
                numeroUno=1;
            })
    })
    
});
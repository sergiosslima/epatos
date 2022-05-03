 /*
 *
 * Theme functions
 * Initialize all scripts and adds custom js
 *
 * Version 1.0
 */
( function( $ ) {
    "use strict";

    $(function() {
    ///////////////////////////////


        /////////////////////////////////
        // Sticky Sidebar
        /////////////////////////////////
        jQuery('.sidebar').stick_in_parent({parent: '.wrap-fullwidth', spacer: '.sidebar-wrapper', recalc_every: 1});
        jQuery('.sidebar')
        .on('sticky_kit:bottom', function(e) {
            jQuery(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function(e) {
            jQuery(this).parent().css('position', 'relative');
        })
        
        /////////////////////////////////
        // Carousel
        /////////////////////////////////
        $('.carousel-item').eq(0).addClass('active');
        var total = $('.carousel-item').length;

        $('.carousel-white').eq(0).addClass('active');
        var total = $('.carousel-white').length;

        var current = 0;
        $('#moveRight').on('click', function(){
            var next=current;
            current= current+1;
            setSlide(next, current);
        });
        $('#moveLeft').on('click', function(){
            var prev=current;
            current = current- 1;
            setSlide(prev, current);
        });
        $('#moveRightwhite').on('click', function(){
            var next=current;
            current= current+1;
            setSlide(next, current);
        });
        $('#moveLeftwhite').on('click', function(){
            var prev=current;
            current = current- 1;
            setSlide(prev, current);
        });

        function setSlide(prev, next){
            var slide= current;
            if(next>total-1){
             slide=0;
              current=0;
            }
            if(next<0){
              slide=total - 1;
              current=total - 1;
            }
                   $('.carousel-item').eq(prev).removeClass('active');
                   $('.carousel-item').eq(slide).addClass('active');

                   $('.carousel-white').eq(prev).removeClass('active');
                   $('.carousel-white').eq(slide).addClass('active');                   
              setTimeout(function(){

            },800);
            
            console.log('current '+current);
            console.log('prev '+prev);
        }
 
        /////////////////////////////////
        // Masonry 
        /////////////////////////////////
        jQuery('.grid_list').masonry({
          // options
          itemSelector: '.post',
          transitionDuration  : '0.5s',
          isOriginLeft: true
        }); 

        /////////////////////////////////
        // Hover Effect
        /////////////////////////////////
        jQuery(".hover").mouseleave(
            function () {
              jQuery(this).removeClass("hover");
            }
        ); 
 
        /////////////////////////////////
        // Accordion 
        /////////////////////////////////       
        jQuery(".accordionButton").on('click', function(){jQuery(".accordionButton").removeClass("on");jQuery(".accordionContent").slideUp("normal");if(jQuery(this).next().is(":hidden")==true){jQuery(this).addClass("on");jQuery(this).next().slideDown("normal")}});jQuery(".accordionButton").mouseover(function(){jQuery(this).addClass("over")}).mouseout(function(){jQuery(this).removeClass("over")});jQuery(".accordionContent").hide(); 

        /////////////////////////////////
        // Go to TOP
        /////////////////////////////////
        // hide #back-top first
        jQuery("#back-top").hide();
        jQuery("#back-top").delay(150).animate({"opacity": "1"}, 100);
            
        // fade in #back-top
        jQuery(function () {
            jQuery(window).scroll(function () {
                if (jQuery(this).scrollTop() > 100) {
                    jQuery('#back-top').fadeIn();
                } else {
                    jQuery('#back-top').fadeOut();
                }
            });

            // scroll body to 0px on click
            jQuery('#back-top a').on('click', function () {
                jQuery('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        }); 

        /////////////////////////////////
        // Category dropdown
        /////////////////////////////////
        $('.dropbtn').on('click', function () {
          $(this).toggleClass('active');
        }); 

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        }

        /////////////////////////////////
        // AnThemes Menu & link arrows
        /////////////////////////////////
        jQuery(".ant-responsive-menu").delay(150).animate({"opacity": "1"}, 100);
        (function ($) {
            $.fn.antResponsiveMenu = function (options) {

                //plugin's default options
                var defaults = {
                    resizeWidth: '768',
                    animationSpeed: 'fast',
                    accoridonExpAll: false
                };

                //Variables
                var options = $.extend(defaults, options),
                    opt = options,
                    $resizeWidth = opt.resizeWidth,
                    $animationSpeed = opt.animationSpeed,
                    $expandAll = opt.accoridonExpAll,
                    $aceMenu = $(this),
                    $menuStyle = $(this).attr('data-menu-style');

                // Initilizing        
                $aceMenu.find('ul').addClass("sub-menu");
                $aceMenu.find('ul').siblings('').append('<a href="#" class="arrow"></a>');
                if ($menuStyle == 'accordion') { $(this).addClass('collapse'); }

                // Window resize on menu breakpoint 
                if ($(window).innerWidth() <= $resizeWidth) {
                    menuCollapse();
                }
                $(window).resize(function () {
                    jQuery(".ant-responsive-menu").delay(150).animate({"opacity": "1"}, 100);
                    menuCollapse();
                });

                // Menu Toggle
                function menuCollapse() {
                    var w = $(window).innerWidth();
                    if (w <= $resizeWidth) {
                        $aceMenu.find('li.menu-active').removeClass('menu-active');
                        $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
                        $aceMenu.addClass('collapse hide-menu');
                        $aceMenu.attr('data-menu-style', '');
                        $('.menu-toggle').show();
                    } else {
                        $aceMenu.attr('data-menu-style', $menuStyle);
                        $aceMenu.removeClass('collapse hide-menu').removeAttr('style');
                        $('.menu-toggle').hide();
                        if ($aceMenu.attr('data-menu-style') == 'accordion') {
                            $aceMenu.addClass('collapse');
                            return;
                        }
                        $aceMenu.find('li.menu-active').removeClass('menu-active');
                        $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
                    }
                }

                //ToggleBtn Click
                $('#menu-btn').on('click', function () {
                    $aceMenu.slideToggle().toggleClass('hide-menu');
                });

                // Main function 
                return this.each(function () {
                    // Function for Horizontal menu on mouseenter
                    $aceMenu.on('mouseover', '> li a', function () {
                        if ($aceMenu.hasClass('collapse') === true) {
                            return false;
                        }
                        $(this).off('click', '> li a');
                        $(this).parent('li').siblings().children('.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style').stop();
                        $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                        return;
                    });
                    $aceMenu.on('mouseleave', 'li', function () {
                        if ($aceMenu.hasClass('collapse') === true) {
                            return false;
                        }
                        $(this).off('click', '> li a');
                        $(this).removeClass('menu-active');
                        $(this).children('ul.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style');
                        return;
                    });
                    //End of Horizontal menu function

                    // Function for Vertical/Responsive Menu on mouse click
                    $aceMenu.on('click', '> li a', function () {
                        if ($aceMenu.hasClass('collapse') === false) {
                            //return false;
                        }
                        $(this).off('mouseover', '> li a');
                        if ($(this).parent().hasClass('menu-active')) {
                            $(this).parent().children('.sub-menu').slideUp().removeClass('slide');
                            $(this).parent().removeClass('menu-active');
                        } else {
                            if ($expandAll == true) {
                                $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                                return;
                            }
                            $(this).parent().siblings().removeClass('menu-active');
                            $(this).parent('li').siblings().children('.sub-menu').slideUp().removeClass('slide');
                            $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                        }
                    });
                    //End of responsive menu function

                });
                //End of Main function
            }
        })(jQuery);
        
        // Responsive options
        jQuery("#respMenu").antResponsiveMenu({
            resizeWidth: '980',      
            animationSpeed: 'fast',
            accoridonExpAll: false
        });


    
    //////////////////////////////
    } ); // End doc ready  ///////
    
} )( jQuery );


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() { document.getElementById("myDropdown").classList.toggle("show"); }
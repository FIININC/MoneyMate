//Jquery encompass
$(document).ready(function(){

    //Variables
    var win = $(window);
    var sections = $('section')
        , nav = $('nav')
        , nav_height = nav.outerHeight();

    //smooth scrolling
    nav.find('a').on('click', function () {
        console.log('found a');
        var $el = $(this)
            , id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height - 50
        }, 500);

        return false;
    });

    //Window Scrolling
    win.scroll(function(event) {

        //nav shadow and opacity change on scroll
        $('header').toggleClass('scrolled', $(this).scrollTop() > 50);

        //add active class to current section
        var cur_pos = $(this).scrollTop();
        sections.each(function () {
            var top = $(this).offset().top - nav_height - 75,
                bottom = top + $(this).outerHeight();
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#testimonials"]').addClass('active');
            } else if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });
    
    includeFooter(); //Includes the Footer design

    //Include the Footer HTML to all the Pages
    function includeFooter() {
        var z, i, elmnt, file, xhttp;
        /*loop through a collection of all HTML elements:*/
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("common-footer");
            if (file) {
                /*make an HTTP request using the attribute value as the file name:*/
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /*remove the attribute, and call this function once more:*/
                        elmnt.removeAttribute("common-footer");
                        //includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                /*exit the function:*/
                return;
            }
        }
    }
});
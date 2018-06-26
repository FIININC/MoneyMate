//Jquery encompass
$(document).ready(function(){

    //Variables
    var win = $(window);
    var sections = $('section')
        , nav = $('nav')
        , nav_height = nav.outerHeight()
        , div = $('.hiw-wrapper');


    //smooth scrolling
    div.find('a').on('click', function(){
        var $el = $(this)
            , id = $el.attr('href');
console.log($el);
        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height - 50
        }, 500);

        return false;
    });


    nav.find('a').on('click', function () {
        console.log('found a');
        var $el = $(this)
            , id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height - 50
        }, 500);

        return false;
    });

    $('header').toggleClass('scrolled', $(this).scrollTop() > 50);
    //add active class to current section
    var cur_pos = $(this).scrollTop();
    sections.each(function() {
        var top = $(this).offset().top - nav_height - 75,
            bottom = top + $(this).outerHeight();

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            nav.find('a').removeClass('active');
            nav.find('a[href="#testimonials"]').addClass('active');
        }else if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });

    //counter
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    //FAQ
    var faqs = document.querySelectorAll('.faq-questions-before');
    console.log(faqs);
    for (var i=0; i<faqs.length; i++){
        faqs[i].addEventListener('click', changeClass.bind(this, i))
    }

    function changeClass(i){
        var answer = document.getElementById('answer' + (i+1));
        if(answer.style.display == 'none'){
            answer.style.display = 'inline-block';
        }else{
            answer.style.display = 'none';
        }
        faqs.forEach(function(item, index){
                item.classList.add('faq-questions-after');
                item.classList.remove('faq-questions-before');

            });

    }


    //Window Scrolling
    win.scroll(function(event) {

        /*Fade in animations for the steps on landing page*/
        //Step 1
        $(document).ready(function () {
            $('div.step1hidden').fadeIn(3000).removeClass('step1hidden');
        });
        //Step 2
        $(document).ready(function () {
            $('div.step2hidden').fadeIn(6000).removeClass('step2hidden');
        });
        //Step 3
        $(document).ready(function () {
            $('div.step3hidden').fadeIn(9000).removeClass('step3hidden');
        });
        //Step 4
        $(document).ready(function () {
            $('div.step4hidden').fadeIn(12000).removeClass('step4hidden');
        });

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

    //Testimonials Animation
    $.getJSON("js/Testimonials.json", function (json) {
        showttmns(json);
        console.log("JSON Data: " + json.ttmData[0].quote);
    });

    function showttmns(jsonObj)
    {
        var ttmCol = jsonObj['ttmData'];
        var ttmClass = document.getElementById("ttm")

        for (count = 0; count < ttmCol.length; count++) {
            var currContainer = document.createElement('div');
            var currQuote = document.createElement('p');
            var currAuthor = document.createElement('p');

            currContainer.className = "quote";
            currContainer.id = "qt" + count;
            currQuote.textContent = ttmCol[count].quote;
            currQuote.className = "quote-text";
            currAuthor.textContent = "- " + ttmCol[count].author;

            currContainer.appendChild(currQuote);
            currContainer.appendChild(currAuthor);

            ttmClass.appendChild(currContainer);
        }

        loopQuotes();

    }

    function loopQuotes() {
        var quotes = $(".quote");
        var quoteIndex = -1;

        function showNextQuote() {
            ++quoteIndex;
            quotes
                .eq(quoteIndex % quotes.length)
                .fadeIn(1000)
                .delay(2000)
                .fadeOut(1000, showNextQuote);
        }

        showNextQuote();
    }

    $("body").addClass("is-blurred");

    $(".toggleModal").on("click", function (event) {
        event.preventDefault();

        $(".modal").toggleClass("is-active");
        $("body").toggleClass("is-blurred");
    });

});

jQuery(function($) {

    // Function which adds the 'animated' class to any '.animatable' in view
    var doAnimations = function() {

        // Calc current offset and get all animatables
        var offset = $(window).scrollTop() + $(window).height(),
            $animatables = $('.animatable');

        // Unbind scroll handler if we have no animatables
        // if ($animatables.size() == 0) {
        //     $(window).off('scroll', doAnimations);
        // }

        // Check all animatables and animate them if necessary
        $animatables.each(function(i) {
            var $animatable = $(this);
            if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                $animatable.removeClass('animatable').addClass('animated');
            }
        });

    };

    // Hook doAnimations on scroll, and trigger a scroll
    $(window).on('scroll', doAnimations);
    $(window).trigger('scroll');


    setTimeout(function(){
        document.getElementById('arrows').style.display = 'inline-block';
    }, 3000);

    $('.trigger').click(function() {
        console.log('testing');
        $('.modal-wrapper').toggleClass('open');
        $('.page-wrapper').toggleClass('blur');
        return false;
    });
    function openModal(){

        console.log('clicked gallery');
        var fullscreenImg = document.getElementById('fullscreenImg');
        fullscreenImg.style.display = 'block';
    }
    // document.getElementById('license').addEventListener('click', openModal.bind(this));
});

$( document ).ready(function() {

});


$(document).ready(function() {
    "use strict";
    var myNav = {
        init: function() {
            this.cacheDOM();
            this.browserWidth();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.navBars = $(".navBars");
            this.xBxHack = $("#xBxHack");
            this.navMenu = $("#menu");
        },
        browserWidth: function() {
            $(window).resize(this.bindEvents.bind(this));
        },
        bindEvents: function() {
            var width = window.innerWidth;

            if (width < 600) {
                this.navBars.click(this.animate.bind(this));
                this.navMenu.hide();
                this.xBxHack[0].checked = false;
            } else {
                this.resetNav();
            }
        },
        animate: function(e) {
            var checkbox = this.xBxHack[0];
            !checkbox.checked ?
                this.navMenu.slideDown() :
                this.navMenu.slideUp();

        },
        resetNav: function() {
            this.navMenu.show();
        }
    };
    myNav.init();
});


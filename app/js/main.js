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
    var requestURL = '../Data/Testimonials.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var ttmns = request.response;
        showttmns(ttmns);
    }

    function showttmns(jsonObj)
    {
        var ttmCol = jsonObj['ttmData'];
        var ttmClass = document.getElementById("ttm")

        for (count = 0; count < ttmCol.length; count++)
        {
            var currQuote = document.createElement('p');
            var currAuthor = document.createElement('p');

            currQuote.textContent = ttmCol[count].quote;
            currAuthor.textContent = "- " + ttmCol[count].author;
           
            ttmClass.appendChild(currQuote);
            ttmClass.appendChild(currAuthor)
        }

    }

});
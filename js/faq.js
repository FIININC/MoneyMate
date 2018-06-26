class Details {
    constructor(el, settings = {}) {
        this.group    = el;
        this.details  = this.group.getElementsByClassName("details");
        this.toggles  = this.group.getElementsByClassName("details__summary");
        this.contents = this.group.getElementsByClassName("details__content");
        this.settings = {
            speed       : settings.speed       ? settings.speed       : 300,
            one_visible : settings.one_visible ? settings.one_visible : false
        }
    }

    open(i) {
        const detail = this.details[i];
        const toggle = this.toggles[i];
        const content = this.contents[i];

        // If applicable, hide all the other details first
        if (this.settings.one_visible) {
            for (let a = 0; a < this.toggles.length; a++) {
                if (i !== a) this.close(a);
            }
        }

        // Update class
        detail.classList.remove("is-closing");

        // Get height of toggle
        const toggle_height = toggle.clientHeight;

        // Momentarily show the contents just to get the height
        detail.setAttribute("open", true);
        const content_height = content.clientHeight;
        detail.removeAttribute("open");

        // Set the correct height and let CSS transition it
        detail.style.height = toggle_height + content_height + "px";

        // Finally set the open attr
        detail.setAttribute("open", true);
    }

    close(i) {
        const detail = this.details[i];
        const toggle = this.toggles[i];

        // Update class
        detail.classList.add("is-closing");

        // Get height of toggle
        const toggle_height = toggle.clientHeight;

        // Set the height so only the toggle is visible
        detail.style.height = toggle_height + "px";

        setTimeout(() => {
            // Check if still closing
            if (detail.classList.contains("is-closing"))
        detail.removeAttribute("open");
        detail.classList.remove("is-closing");
    }, this.settings.speed);
    }

    init() {
        const _this = this;

        // Setup toggle click
        for (let i = 0; i < _this.details.length; i++) {
            const detail  = _this.details[i];
            const toggle  = _this.toggles[i];
            const content = _this.contents[i];

            // Set transition-duration to match JS setting
            detail.style.transitionDuration = _this.settings.speed + "ms";

            // Set initial height to transition from
            if (!detail.hasAttribute("open")) {
                detail.style.height = toggle.clientHeight + "px";
            } else {
                detail.style.height = toggle.clientHeight + content.clientHeight + "px";
            }

            // Setup click listener
            toggle.addEventListener("click", (e) => {
                e.preventDefault();

            if (!detail.hasAttribute("open")) {
                _this.open(i);
            } else {
                _this.close(i);
            }
        });
        }
    }
}

(() => {
    const els = document.getElementsByClassName("details-group");

for (let i = 0; i < els.length; i++) {
    const details = new Details(els[i], {
        speed: 500,
        one_visible: true
    });
    details.init();
}
})();
var win = $(window);
var sections = $('section')
    , nav = $('nav')
    , nav_height = nav.outerHeight();

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

$(document).ready(function(){

    $('.trigger').click(function() {
        $(this).parents('.module').toggleClass('show-info');
    });


});

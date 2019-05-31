$(document).ready(function(){






    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('on')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "on" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    function heightses() {
        if ($(window).width()>=1200) {
            $('.start-item-head').height('auto').equalHeights();
        }

        if ($(window).width()>=1400) {
            $('.form-eq-item').height('auto').equalHeights();
        }
    }

    heightses();


    $('.sprint-item-head').on('click', function(){
        var th = $(this),
            sprintItem = th.parents('.sprint-item'),
            desc = sprintItem.find('.sprint-item-desc');

        sprintItem.toggleClass('active');
        desc.slideToggle(300);
    });

    $('.faq-item-quest').on('click', function(){
        var th = $(this),
            item = th.parents('.faq-item'),
            ans = item.find('.faq-item-ans');

        item.toggleClass('active');
        ans.slideToggle(400);

        item.siblings('.faq-item').removeClass('active').find('.faq-item-ans').slideUp(400)
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });


    /**
     * toTop functionality start
     */
    $(window).scroll(function() {
        if($(this).scrollTop() > 1000) {
            $('#toTop').css('opacity', '.6');
        } else {
            $('#toTop').css('opacity', '0');
        }
    });

    $('body').bind('touchmove', function (e)
    {
        if($(this).scrollTop() > 1000) {
            $('#toTop').css('opacity', '.6');
        } else {
            $('#toTop').css('opacity', '0');
        }
    });

    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},600);
    });
    /**
     * toTop functionality end
     */


    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});

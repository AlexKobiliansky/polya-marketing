$(document).ready(function(){


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




    $('.preloader').fadeOut();



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
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoPlayers = [];
    var i = 0;

    onYouTubeIframeAPIReady = function () {
        $('.video-player .you-player').each(function(){
            var $playerID = $(this).attr("id");
            var $videoID = $(this).parents('.video-player').data("video");
            var $start = $(this).siblings('.start-video');

            $start.attr("data-playern", i);

            $start.on('click', function(){
                var playerN = $(this).attr("data-playern");
                $(this).hide();
                $(this).siblings('.you-player').show();
                $(this).siblings('.thumbnail-container').hide();


                videoPlayers[i] = new YT.Player($playerID, {
                    videoId: $videoID,
                    playerVars: {
                        'autoplay': 0,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });

                if(videoPlayers[i])
                {
                    var fn = function(){ videoPlayers[i].playVideo(); };
                    setTimeout(fn, 1500);
                }

                // slider onChange
                videoSlider.on('slideChange', function () {
                    console.log('slide changed');
                    videoPlayers[i].stopVideo();
                });

            });
            i++;
        });
    };

    var p = document.getElementsByClassName("you-player");
    $(p).hide();

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.you-player').hide();
            $('.start-video').fadeIn('normal');
            $('.thumbnail-container').fadeIn('normal');
        }
    };
    /**
     * end YOUTUBE SCRIPT
     */


    var videoNav = new Swiper('.video-nav-slider', {
        spaceBetween: 30,
        slidesPerColumn: 2,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is <= 320px
            991: {
                slidesPerColumn: 1,
                spaceBetween: 20,
                slidesPerView: 2,
            }
        }
    });

    var videoSlider = new Swiper ('.video-slider', {
        autoHeight: true,
        effect: 'fade',
        thumbs: {
            swiper: videoNav
        }
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
        t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });
});

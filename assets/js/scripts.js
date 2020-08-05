window.isMobile = function() {
    return false
};
window.isDesktop = function() {
    return true
};
window.isTablet = function() {
    return false
};

function AI_responsive_widget() {
    jQuery('iframe.StefanoAI-youtube-responsive').each(function() {

        $this = jQuery(this);

        var width = $this.parent().width();
        var margin = parseInt($this.css('margin-left').replace(/px/, '')) * 2;
        var padding = parseInt($this.css('padding-left').replace(/px/, '')) * 2;

        // adjust for padding + margin
        width -= margin + padding;

        var maxwidth = jQuery(this).css('max-width').replace(/px/, '');

        if (maxwidth < width) {
            width = maxwidth;
        }

        jQuery(this).css('width', width + "px");
        jQuery(this).css('height', width / (16 / 9) + "px");
    });
}
if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
        AI_responsive_widget();
    });
    jQuery(window).resize(function() {
        AI_responsive_widget();
    });
}

function AI_responsive_widget() {
    jQuery('object.StefanoAI-youtube-responsive').each(function() {
        jQuery(this).parent('.fluid-width-video-wrapper').removeClass('fluid-width-video-wrapper').removeAttr('style').css('width', '100%').css('display', 'block');
        jQuery(this).children('.fluid-width-video-wrapper').removeClass('fluid-width-video-wrapper').removeAttr('style').css('width', '100%').css('display', 'block');
        var width = jQuery(this).parent().innerWidth();
        var maxwidth = jQuery(this).css('max-width').replace(/px/, '');
        var pl = parseInt(jQuery(this).parent().css('padding-left').replace(/px/, ''));
        var pr = parseInt(jQuery(this).parent().css('padding-right').replace(/px/, ''));
        width = width - pl - pr;
        if (maxwidth < width) {
            width = maxwidth;
        }
        jQuery(this).css('width', width + "px");
        jQuery(this).css('height', width / (16 / 9) + "px");
        jQuery(this).find('iframe').css('width', width + "px");
        jQuery(this).find('iframe').css('height', width / (16 / 9) + "px");
    });
}
if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        AI_responsive_widget();
    });
    jQuery(window).resize(function() {
        AI_responsive_widget();
    });
}

// global tracking
$(document).ready(function() {
    $('.client-login').click(function() {
        powerTrackEvent('Homepage', 'External Link', 'Client Login');
        powerTrackEvent('header navigation click', 'Client Login', 'header interaction');
    });
    //10
    $('.twitter').click(function() {
        powerTrackEvent('social media', 'twitter', 'footer interactions');
    });
    //10
    $('.facebook').click(function() {
        powerTrackEvent('social media', 'facebook', 'footer interactions');
    });
    //10
    $('.youtube').click(function() {
        powerTrackEvent('social media', 'youtube', 'footer interactions');
    });
    //10
    $('.instagram').click(function() {
        powerTrackEvent('social media', 'instagram', 'footer interactions');
    });
    //10
    $('.linkedin').click(function() {
        powerTrackEvent('social media', 'linkedin', 'footer interactions');
    });
    //11
    $('.careers a').click(function() {
        powerTrackEvent('carousel Learn More click', 'Join Our Team', 'footer interaction');
    });
    //11
    $('.whoweare a').click(function() {
        powerTrackEvent('carousel Learn More click', 'Who We Are', 'footer interaction');
    });

    //13
    $('a').click(function() {
        var emailStr = $(this).attr('href')
        if (typeof emailStr !== typeof undefined && emailStr !== false) {
            if (emailStr && emailStr.indexOf('mailto:') == 0) {
                powerTrackEvent('email', emailStr.split(':')[1], 'page interaction');
            }
        }
    });

    //25
    $('.location_and_contact a').click(function() {
        powerTrackEvent('our company', 'cta', $(this).text());
    });

    //26
    $('div.left_page article div.accordion section h3 span').click(function() {
        powerTrackEvent('our company', 'history timeline reveal', $(this).text());
    });

    //27
    $('.map gm-style p').click(function() {
        powerTrackEvent('our company', 'location map select', $(this).text());
    });

    //28
    $('.addresses a address h3').click(function() {
        powerTrackEvent('our company', 'location list select', $(this).text());
    });

    //30
    $('article a').click(function() {
        if ($(this).text().toLowerCase() == 'employment listings' || $(this).text().toLowerCase() == 'job openings') {
            powerTrackEvent('careers', 'Job Openings', $(this).text().toLowerCase());
        }
    });

    //32
    $('.post-list a').click(function() {
        powerTrackEvent('articles', 'click', $(this).text());
    });

    //33
    $('.events .event-badge a').click(function() {
        powerTrackEvent('company events', 'Learn More click', $(this).attr('title'));
    });

    //33
    $('.events ul li div.event .cta a').click(function() {
        powerTrackEvent('company events', 'Learn More click', $(this).attr('title'));
    });

    //34
    $('.right_page .quickref p.submit a').click(function() {
        powerTrackEvent('quick reference', 'cta', 'Order Now');
    });

    //36
    $('.right_page article p a').click(function() {
        powerTrackEvent('exiting the website', 'click', $(this).attr('href'));
    });

    //38 & 39
    $('.related_content ul li a p').click(function() {
        var title = $(this).parents('li').parent().prev('a').text();
        if (title == 'Projects' || title == 'White Papers') {
            powerTrackEvent('Related Content sidebar', title, $(this).text());
        }
    });

});

$(function() {


    //Make all callouts the same height as the largest cta
    function resizeLayout() {
        var max = 0,
            ctas = $('.callouts li').each(function() {
                $(this).css("height", "auto");
                max = Math.max(max, $(this).height());
            }).height(max + 'px');

        if ($(document.documentElement).hasClass('ltie9')) {
            fix_aspect_ratio();
        } else {
            fix_background_image();
        }
    }

    resizeLayout();

    var once = null;
    $(window).resize(function() {
        if (once) clearTimeout(once);
        once = setTimeout(resizeLayout, 250);
    });


    /*$('.slides').slidesjs({
				play: 7000,
				pause: 2000,
				crossfade: true,
				effect: "fade",
				fadeSpeed: 500,
				paginationClass: 'slide-pagination'
			});
		  	*/

    function get_responsive_image_url(slide) {

        var intervals = [640, 768, 1024, 1200, 1600];
        var dimension = 1600;

        $.each(intervals, function(k, v) {
            //find first interval that is larger than current viewport to prevent stretching
            //and ensure the slide contains a valid data reference for that size
            if (v - slide.width() >= 0 && slide.data('img-url-' + (v == 640 ? "mobile" : v))) {
                dimension = v;
                return false;
            }
        });

        return slide.data('img-url-' + (dimension == 640 ? "mobile" : dimension));
    }

    function fix_background_image() {
        $('.slide').each(function() {
            var slide = $(this);
            var imgurl = get_responsive_image_url(slide);

            slide.css({
                backgroundImage: "url(" + imgurl + ")"
            });
        });
    }

    function fix_aspect_ratio() {

        $('.slide').each(function() {
            var slide = $(this);

            var imgurl = get_responsive_image_url(slide);

            //Get image size data from url
            var size = imgurl.split("_").pop().split(".")[0].split("x"); //extract size from filename
            var width = parseInt(size[0], 10);
            var height = size[1];

            if (height.length > 3) {
                //strip off image index number
                height = height.substr(0, 3);
            }
            height = parseInt(height, 10);

            var aspect = height / width;

            if (width >= slide.width()) {
                //no resize, just center the background image
                var hzoom = 0;
                var vzoom = 0;
            } else {
                //expand image to fill background
                hzoom = parseInt(slide.width(), 10) - width;
                vzoom = hzoom * aspect;
            }

            var tgt;
            var id = imgurl.replace(/[^a-z0-9]/gi, "").toLowerCase();

            if ($('#' + id).length > 0) {
                //img already replaced, grab reference to target element
                tgt = $('#' + id);
            } else {
                slide.css({
                    background: 'none',
                    filter: 'none',
                    overflow: 'hidden'
                });

                //need to embed a child element
                tgt = $('<div>&nbsp;</div>');
                tgt.attr('id', id);
                slide.append(tgt);
            }

            //center image horizontally if larger than viewport
            var left = 0;
            if (width > slide.width()) {
                left = (width - slide.width()) / 2;
            }

            //update css dimensions
            var css = {
                filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + imgurl + ", sizingMethod=scale)",
                position: 'relative',
                top: '-' + (height + (vzoom / 5)) + "px",
                left: '-' + parseInt(left, 10) + 'px',
                zIndex: '100',
                width: parseInt(width + hzoom, 10) + 'px',
                height: parseInt(height + vzoom / 2, 10) + 'px'
            };

            tgt.css(css);
        });
    }

    // bxslider
    var slider = $('.slides_container').bxSlider({
        mode: 'fade',
        auto: true,
        pause: 7000,
        controls: false
    });

    // tracking
    $(document).ready(function() {
        $('.direction-nav a').click(function(event) {
            if ($(this).hasClass('next')) {
                slider.goToNextSlide();
                //19
                powerTrackEvent('home page', 'carousel scroll', 'right');
            } else {
                slider.goToPrevSlide();
                //19
                powerTrackEvent('home page', 'carousel scroll', 'left');
            }
            // reset timer
            slider.stopAuto();
            slider.startAuto();
        });
        $('.slide a').click(function() {
            powerTrackEvent('Homepage Hero', 'Internal Click', $(this).attr('title'));
            //18
            powerTrackEvent('home page', 'Learn More click', $(this).attr('title'));
        });

        $('.callouts li a').click(function() {
            powerTrackEvent('Homepage Body', 'Internal Click', $(this).attr('title'));
            //20
            powerTrackEvent('home page', 'footer Learn More click', $(this).parents('li').find('hgroup h1').text());
        });
        //7
        $("[tracking_attribute^=menu-item-]").mouseenter(function() {
            powerTrackEvent('header navigation hover', $(this).text(), 'header interaction');
        });
        //8
        $("[tracking_attribute^=menu-item-]").click(function() {
            powerTrackEvent('header navigation click', $(this).text(), 'header interaction');
        });
    });
});
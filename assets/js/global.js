
(function() {

  //Global bootstrap
  $(function() {
    //remove 1px divider on previous menu item when hovered, restore on leave
    var cur_top_menu_item = "header > nav > ul > li.current-menu-ancestor," +
      "header > nav > ul > li.current-menu-item";

    $('header > nav > ul > li').mouseenter(function() {
      $(this).prev().children("a").css("border-right-color", "#000");
      $(this).children('a').css('border-right-color', '#e8e6e3');

      if($(window).width() >= 1024 && isDesktop())
        $(this).find('.sub-menu').show();

    }).mouseleave(function() {
      $(this).children("a").css("border-right-color", "#818181");
      $(this).prev().children("a").css("border-right-color", "#818181");
      $(cur_top_menu_item).prev().children('a').css('border-right-color', '#000');
      $(this).find('.sub-menu').hide();
    });

    $(cur_top_menu_item).prev().children('a').css('border-right-color', '#000');

    //add "last" class to last item of every list for x-browser css styling
    $('li:last-child').addClass('last');
    $('.accordion section:last-child').addClass('last');

    $('.accordion > section > h3').click(function() {
      $h3 = $(this);
      $div = $($h3.siblings('div')[0]);
      if ($div.is(':visible')) {
        $div.hide('fast');
        $h3.removeClass('open');
      }
      else {
        $div.show('fast');
        $h3.addClass('open');
      }
    });

    // xbrowser :focus support
    $('input[type=text]').focus(function() {
      $(this).addClass('focus');
    }).blur(function() {
      $(this).removeClass('focus');
    });

    // xbrowser background-size support (because ms filters suck)
    //$('.slide').css({backgroundSize: "cover"});

    $('nav.primary li, nav.secondary li').mouseenter(function() {
      $(this).parent().find('a').removeClass('borderless-sibling');
      $(this).prev().find('a').addClass('borderless-sibling');
      $('nav.secondary .current-menu-item').prev().find('a').addClass('borderless-sibling');
    }).mouseleave(function() {
      $(this).parent().find('a').removeClass('borderless-sibling');
      $('nav.secondary .current-menu-item').prev().find('a').addClass('borderless-sibling');
    });

    $('nav.secondary li.current-menu-item').prev().find('a').addClass('borderless-sibling');

    // give nav items indices b/c :nth-child isn't supported in IE
    $('nav.primary > ul > li').each(function(index, element) {
      $(element).addClass("nth-child-" + index);
    });

    // add classes to the home page widgets for coloring
    $('.widget_home-page-box:nth-child(1)').addClass('first');
    $('.widget_home-page-box:nth-child(2)').addClass('second');
    $('.widget_home-page-box:nth-child(3)').addClass('third');

    // hide empty asides
    $('aside').each(function(index, element) {
      var aside = $(element);
      if(aside.html().replace(/\s/g, "") == "")
        aside.remove();
    });

    // hover states for ul.grid if desktop
    if(isDesktop())
    {
      $('ul.grid li').mouseenter(function() {
        $(this).addClass('hover')
      }).mouseleave(function() {
        $(this).removeClass('hover');
      });
    }

    // on careers page, auto-check checkbox that the 'apply' button is clicked on
    // to avoid users seeing a message about not checking any jobs
    $('.career-search-results input[type=submit]').click(function(){
      $('.career-search-results input[name=' + $(this).attr('data-checkbox-name') + ']').prop('checked', true);
    });

    // on press release page, if no sidebar exists, make center content full width
    if($('.single-press-release').length && !$('aside.right').length)
      $('.center_page').removeClass('center_page').addClass('right_page');

    //Make all related content columns the same height as the largest column
    function resizeRelatedContent() {
      var max = 0, ctas = $('aside.bottom .related_content ul').each(function() {
        $(this).css("height", "auto");
        max = Math.max(max, $(this).height());
      }).height(max + 'px');
    }

    //resizeRelatedContent();

    /*var once = null;
    $(window).resize(function() {
        if (once) clearTimeout(once);
        once = setTimeout(resizeRelatedContent, 250);
    });*/
  });
})();

function powerTrackEvent(category, action, label)
{
  ga('send', 'event', category, action, label);
//	if("_gaq" in window) {
//		_gaq.push(['_trackEvent', category, action, label]);
//	}
//	else
//	{
//		//alert("trackEvent: category: " + category + " action: " + action + " label: " + label);
//	}
}

if(window.location.pathname === '/our-company/supplier-registration/'){
  ga('send', 'event', 'supplier form progression', 'Page 1');

  $(window).on('wpcf7:invalid', function() {
    ga('send', 'event', 'supplier form failed submission', 'failed submission');
  });

  $('.cf7mls_next').click(function(x){
    //cf7 doesn't validate individual pages client side for some reason
    $(document).ajaxSuccess(function() {
      var invalid = $('.wpcf7-response-output').css('display') === 'block';
      var newPage;
      if(!invalid){
        newPage = parseInt(document.getElementsByClassName('cf7mls_current_fs')[0].getAttribute('data-cf7mls-order')) + 1;
        ga('send', 'event', 'supplier form progression', 'Page ' + newPage);
        // Scroll to top of page on next form page
        $('html, body').animate({ scrollTop: 0}, 'fast');
      }
      //prevent false positives from actual submit
      $(document).off('ajaxSuccess');
    });
  });

  $('.cf7mls_back').click(function() {
    // Scroll to bottom of page on previous form page
    $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 'fast');
  });

  //form submit
  document.addEventListener( 'wpcf7mailsent', function(event){
    ga('send', 'event', 'supplier form submission', 'submit');
    // IE fix, scroll to bottom of page to keep success message in view
    $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 'fast');
  }, false );
}
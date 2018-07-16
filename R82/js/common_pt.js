$(function(){
    var hashMap = {
        '#top': 'TOP',
        '#about': 'ABOUT',
        '#cast': 'CAST',
        '#access': 'ACCESS'
    };

    // var carouselTopImg = function () { // TODO: トップのメイン画像をカルーセルにしたいけどうまくいかなかった
    //     var $topImgContents = $('#topImgContents'), winWidth = $(window).width();
    //     $topImgContents
    //         .css('width', winWidth + 'px');
    //     $topImgContents
    //         .find('> ul > li').each(function () {
    //         var $this = $(this), imgPath = $this.attr('data-img-path');
    //         console.log(imgPath);
    //         $this
    //             .css({'background-image': 'url(' + imgPath + ')', 'width': winWidth, 'height': 300});
    //     });
    //     var ti = setInterval(function () {
    //         var $ul = $topImgContents
    //             .find('> ul'), calcImgPos = winWidth * $(window).width() * -1;
    //         $ul
    //             .css({'transform': 'translate3d(' + calcImgPos + 'px, 0px, 0px)', 'transition-duration': '0.6s;'});
    //     }, 1500);
    // };
    // var carouselTopImg = function () {
    //     var $topImgContents = $('#css-slider'), winWidth = $(window).width();
    //     $topImgContents
    //         .css('width', winWidth + 'px');
    //     $topImgContents
    //         // .find('.slider-wrapper')
    //         // .css('width', winWidth + 'px')
    //         // .end()
    //         .find('.slide-item')
    //         .css('width', winWidth + 'px')
    //         .end()
    //         .find('> ul > li > img').each(function () {
    //         var $this = $(this);
    //         $this
    //             .css('width', winWidth);
    //     });
    // };
    // carouselTopImg();

    var aboutSentenceEffect = function () {
        $('#ef1').textillate({
            loop: false,
            in: {
                delay: 10,
                shuffle: true,
                effect: "bounceIn"
            },

            out: {
                delay: 100,
                effect: 'hinge'
            }
        });
    };

    // 初期表示
    if(location.hash === ''){
        displayPage("#top");
    }else{
        displayPage(location.hash);
    }
    // 完了フラグ(falseになったら遷移は不可にする)　
    // 途中でURLを変更しても、falseになっていたら遷移不可
    var completeFlg = true;

    // ボタン押下のページ遷移処理
    // ハッシュのみ変更する
    var hash = '', menuLinkClicked = false;
    $('.menuLink').click(function(e){
        e.preventDefault();
        menuLinkClicked = true;
        var effectBorderTopPos = $(this).offset().top + $(this).height() + 10;
        $('.menuEffectBorder')
            .css({'top': effectBorderTopPos + 'px', 'display': 'block'});
        $('.plus-btn')
            .trigger('click');
        $('#wrapper')
            .fadeIn(200);
        hash = "#"+$(this).attr('data-hash');
        location.hash = hash;
    });

    // ハッシュが変更されたら、そのハッシュに基づいて表示する
    $(window).hashchange(function(){
        if(completeFlg === true){
            clearPage();
            displayPage(location.hash);
        }else {
            location.hash = "#top";
            return false;
        }
    });

    // ページ初期化処理
    function clearPage(){
        $(".page").css("display", "none");
    }
    // ページ表示処理
    function displayPage(hash){
        var pageTitle = '';
        for(key in hashMap) {
            if(key === location.hash) {
                pageTitle = hashMap[key];
                break;
            }
        }
        if(!hash) {
            pageTitle = 'TOP';
        }
        $('.jscPageTitle > p')
            .text(pageTitle);
        $('#menu')
            .fadeOut(100);
        $(hash)
            .fadeIn(500);
        if(hash === '#about') {
            aboutSentenceEffect();
        }
    }

    $('.plus-btn').on('click', function () {
        if($('.menu-open').length > 0) {
            $('.menu-container')
                .fadeOut(300);
            $('.menuEffectBorder')
                .fadeOut(300);
            $('#wrapper')
                .fadeIn(300);
        } else {
            var headerHeight = $('header').height() + 5;
            $('.menu')
                .css('top', headerHeight + 'px');
            if(menuLinkClicked) {
                $('.menuEffectBorder')
                    .fadeIn(1500);
            }
            $('.menu-container')
                .fadeIn(200);
            $('#wrapper')
                .fadeOut(300);
        }
    });


    $('.plus-btn').on('click', function(){
        $('body').toggleClass('menu-open');
    });

    $('#topCastMenuBtn').on('click', function () {
        location.hash = "#cast";
    });

    $('.castImgSlideList').slick({
        centerMode: true, //センターモード
        centerPadding: '20px', //前後のパディング
        autoplay: true, //オートプレイ
        autoplaySpeed: 3000, //オートプレイの切り替わり時間
        slidesToShow: 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false, // 前後の矢印非表示
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 1.5
                }
            }
        ]
    });

    $(window).on('scroll touchmove', function() {
        if($(this).scrollTop() > 0) {
            $('header')
                .addClass('fixedHeader');
        } else {
            $('header')
                .removeClass('fixedHeader');
        }
        $('header')
            .css('opacity', .5);
        scrollStopEventTrigger();
    });
    $(window).on('scrollstop', function(){
        $('header')
            .css('opacity', 1);
    });
    var scrollStopEvent = new $.Event("scrollstop");
    var delay = 200;
    var timer;

    function scrollStopEventTrigger(){
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
    }

});
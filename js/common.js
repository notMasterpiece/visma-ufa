var stepCount = $('#step-count'),
    headerFirst = $('.section-header__first'),
    stepsListWrap = $('.section-header__steps-wrapper'),
    sectionHeaderteps = $('.section-header__steps');
    stepsList = $('.step-item-list'),
    stepRange = $('.step-item-range-fill'),
    stepItemHeader =  $('.step-item-header'),
    stepRangeWrap =  $('.step-item-range-wrap'),
    rangeInput = $('.range-input'),
    sectionCalculation = $('.section-calculation'),
    count = 9;


$( document ).ready(function() {
    Onload();
});


$( window ).resize(function() {
    mobileMenu();
});




function Onload() {
    initSlider();
    calcItemChecked();
    initrange();
    showStep();
    toggleMenu();
    mobileMenu();
    showForm();
    initfancybox();
}



function showForm() {
    $('.show-form').on('click', function (e) {
        e.preventDefault();
        $('.step-form-hidden').show();
        $('.step-info-hidden').hide();
    });
}


function initfancybox () {
    if ( $(".fancybox").length ) {
        $('.fancybox').on('click', function (e) {
            e.preventDefault();
            $.fancybox({
                maxWidth: 740,
                maxHeight: 900,
                minWidth: 280,
                type : $(this).attr('data-fancybox-type'),
                href: $(this).attr('data-fancybox-href'),
                fitToView: true,
                fitToViewHeight: false,
                width: 'auto',
                height: 'auto',
                autoSize: false,
                closeClick	: false,
                onComplete  : '',
                openEffect	: 'fade',
                closeEffect	: 'fade',
                padding: 0,
                margin: 10,
                closeBtn: false,
                autoHeight: true,
                afterShow: function() {
                    initfancybox();
                }
            });
        });

    }
}




function calcItemChecked() {
    $('.step-checkbox').on('click', function () {
        // $(this).removeClass('active').siblings().removeClass('active');

        $(this).closest('.step-item-list').find('.step-checkbox').removeClass('active');

        if( $(this).find('input[type="radio"]').is(':checked') ) {
            $(this).addClass('active');
        }
    });
}



function mobileMenu() {
    if ( $(window).outerWidth() < 1200 ) {
        $('#header .menuparent a.menuparent').on('click', function (e) {
            e.preventDefault();
            $(this).next('ul').toggleClass('open');

        })
    }
}



function showStep() {
    $('.steps-link').on('click', function (e) {
        e.preventDefault();

        var attr = $(this).data('show');

        if (!attr) return;

        stepItemHeader.show();
        stepRangeWrap.show();

        if( attr === 'last') {
            stepsList.show();
            sectionCalculation.show();
            sectionHeaderteps.hide();
        }

        if( attr === 'gift') {
            stepItemHeader.hide();
            stepRangeWrap.hide();
        }



        if( attr === 'first') {
            headerFirst.show();
            stepsListWrap.hide();
        }



        if( attr === 1) {
            headerFirst.hide();
            stepsListWrap.show();
        }

        stepsList.hide();
        stepsListWrap.find('[data-step="' + attr + '"]').show();

        var persent = (attr / count * 100).toFixed(5);
        stepRange.css('width', persent + '%');
        stepCount.html(attr);

        if( $(window).outerWidth() < 992) {
            $('html, body').animate({
                scrollTop: stepsListWrap.offset().top
            }, 0)
        }


    });
}


function toggleMenu() {
    $('.toggle-mnu').on('click', function (e) {
        e.preventDefault();
       $('.block-superfish').toggle();
    });
}


function initrange() {

    var range = $('#range'),
        node= range[0]
        min = range.data('min'),
        max = range.data('max'),
        start = range.data('start');


    noUiSlider.create(node, {
        start: [start],
        behaviour: "snap",
        animate: true,
        animationDuration: 300,
        orientation: "horizontal",
        connect: [false, false],
        tooltips: [wNumb({decimals: 0})],
        step: 10,
        range: {
            min: [min],
            max: [max]
        },

    });

    node.noUiSlider.on('update', function (values, handle) {
        rangeInput.val(values[0])
    });
}


function initSlider() {
    var bigimage = $("#big");
    var thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: [
                '',
                ''
            ]
        })
        .on("changed.owl.carousel", syncPosition);

    thumbs
        .on("initialized.owl.carousel", function() {
            thumbs
                .find(".owl-item")
                .eq(0)
                .addClass("current");
        })
        .owlCarousel({
            items: 6,
            dots: true,
            nav: true,
            navText: [
                '',
                ''
            ],
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 4,
            responsiveRefreshRate: 100,
            responsive : {
                0 : {
                    items: 1
                },
                480 : {
                    items: 2
                },
                768 : {
                  items: 3
                },
                992 : {
                    items: 4
                },
                1200 : {
                    items: 6
                }
            }
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        //if loop is set to false, then you have to uncomment the next line
        //var current = el.item.index;

        //to disable loop, comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        //to this
        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = thumbs.find(".owl-item.active").length - 1;
        var start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
        var end = thumbs
            .find(".owl-item.active")
            .last()
            .index();

        if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            bigimage.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        bigimage.data("owl.carousel").to(number, 300, true);
    });
}
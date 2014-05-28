(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "scrollSlider",
        defaults = {};

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var $slider = $(this.element),
                $reel = $('.slider-reel', $slider ),
                $prev = $('.slider-prev', $slider ),
                $next = $('.slider-next', $slider );

            $('html').addClass('scroll-slider');
            $slider.addClass('start');

            $next.on('click', function(e) {
                e.preventDefault();

                var $link = $(this),
                    reelWidth = $reel.width(),
                    reelPos = parseInt( $reel.css('left'), 10 ),
                    windowWidth = $slider.width(),
                    decrement = windowWidth*0.6,
                    newPos = 0;

                if ( isNaN(reelPos) ) reelPos = 0;
                if ( reelPos - decrement < -reelWidth + windowWidth ) {
                    newPos = -reelWidth + windowWidth;
                    $slider.addClass('end');
                } else {
                    newPos = reelPos - decrement;
                    $slider.removeClass('start end');
                }

                if ( Modernizr && Modernizr.csstransitions ) {
                    $reel.css( 'left', newPos );
                } else {
                    $reel.animate( {'left': newPos} );
                }
            });

            $prev.on('click', function(e) {
                e.preventDefault();

                var $link = $(this),
                    reelWidth = $reel.width(),
                    reelPos = parseInt( $reel.css('left'), 10 ),
                    increment = $slider.width() * 0.6,
                    newPos = 0;

                if ( isNaN(reelPos) ) reelPos = 0;
                if ( reelPos + increment > 0 ) {
                    newPos = 0;
                    $slider.addClass('start');
                } else {
                    newPos = reelPos + increment;
                    $slider.removeClass('start end');
                }

                if ( Modernizr && Modernizr.csstransitions ) {
                    $reel.css( 'left', newPos );
                } else {
                    $reel.animate( {'left': newPos} );
                }
            });
            
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
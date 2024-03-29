(function ($) {
    
/*-------------------------------------------------------------------- 
 * jQuery plugins: toEm() and toPx()
 * by Scott Jehl (scott@filamentgroup.com), http://www.filamentgroup.com
 * Copyright (c) Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 * Options:  	 								
 		scope: string or jQuery selector for font-size scoping		  
 * Usage Example: $(myPixelValue).toEm(); or $(myEmValue).toPx();
--------------------------------------------------------------------*/
    
    $.fn.toEm = function(settings){
        settings = jQuery.extend({
            scope: 'body'
        }, settings);
        var that = parseInt(this[0],10);
        var scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope);
        var scopeVal = scopeTest.height();
        scopeTest.remove();
        return (that / scopeVal).toFixed(8) + 'em';
    };

/*
 * jQuery plugin for unit conversion.
 * by Gerke Max Preussner
 *
 * based on Scott Jehl's converter at:
 * http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 */

    $.fn.toUnit = function (unit, settings) {
        settings = jQuery.extend({
            scope: 'body'
        }, settings);
        var that = parseInt(this[0], 10);
        var scopeTest = jQuery('<div style="display: none; width: 10000' + unit + '; padding:0; border:0;"></div>').appendTo(settings.scope);
        var scopeVal = scopeTest.width() / 10000;
        scopeTest.remove();
        return (that / scopeVal).toFixed(8);
    };
})(jQuery);
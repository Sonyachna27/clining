/*!
 * jQuery Before/After plugin
 * 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 * 
 * author: sizeof(cat) <sizeofcat AT riseup DOT net> https://sizeof.cat
 * url: https://sizeof.cat/project/software/jquery-before-after/
 * copyright: 2020-2022
 * version: 1.1.0
 * license: GPLv3 https://sizeof.cat/LICENSE.txt
 */
(function($) {
	$.fn.extend({
		before_after: function(options) {
			/**
			 * The default settings, can be changed by passing different ones to
			 * the before_after() function.
			 */
			let default_settings = {
				gap: 50,
				left_gap: 10,
				right_gap: 10,
				caption: false,
				reveal: 0.5
			};
			let settings = $.extend(default_settings, options);
			return this.each(function() {
				/**
				 * Get the width of the first image.
				 */
				let width = $(this).children('img:eq(0)').width();
				/**
				 * Get the height of the first image.
				 */
				let height = $(this).children('img:eq(0)').height();
				/**
				 * Hide the img DOM elements (because we're going to reconstruct
				 * them in divs).
				 */
				$(this).children('img').hide();
				$(this).css({
					overflow: 'hidden',
					position: 'relative'
				});
				/**
				 * Add the mask div element (the after image).
				 */
				$(this).append('<div class="ba-mask"></div>');
				/**
				 * Add the background div element (the before image).
				 */
				$(this).append('<div class="ba-bg"></div>');
				/**
				 * Add the caption div element (the alt-text on the images).
				 */
				$(this).append('<div class="ba-caption">' +
						$(this).children('img:eq(0)').attr('alt') +
					'</div>');
				/**
				 * Set the width and height of the new divs to match the parent
				 * element.
				 */
				$(this).children('.ba-mask, .ba-bg').width(width);
				$(this).children('.ba-mask, .ba-bg').height(height);
				/**
				 * Use a nice animation effect to reveal a bit of the before image.
				 */
				$(this).children('.ba-mask').animate({
					width: width - settings.gap
				}, 1000);
				/**
				 * Set the background images of the two divs.
				 */
				$(this).children('.ba-mask').css('backgroundImage', 'url(' + $(this).children('img:eq(0)').attr('src') + ')');
				$(this).children('.ba-bg').css('backgroundImage', 'url(' + $(this).children('img:eq(1)').attr('src') + ')');
				/**
				 * If we want a caption, show it.
				 */
				if (settings.caption) {
					$(this).children('.ba-caption').show();
				}
			}).mousemove(function(c) {
				/**
				 * Get the `left` positioning of the container.
				 */
				let pos_img = $(this).position()['left'];
				/**
				 * Get the `left` positioning of the mouse cursor and substract the
				 * `pos_img` variable from it.
				 */
				let pos_mouse = c.pageX - $(this).children('.ba-mask').offset().left;
				let diff = pos_mouse - pos_img;
				/**
				 * Get the width of the container.
				 */
				let width = $(this).width();
				/**
				 * Get the captions (from the alt-texts) of the images.
				 */
				let after_caption = $(this).children('img:eq(0)').attr('alt');
				let before_caption = $(this).children('img:eq(1)').attr('alt');
				/**
				 * Use math for good (not for evil) to calculate the width of the
				 * mask (the after image) by adjusting it with the left and right
				 * gap options.
				 */
				if ((diff > settings.left_gap) && (diff < width - settings.right_gap)) {
						$(this).children('.ba-mask').width(diff);
				}
				/**
				 * Show a different caption when we move the mouse across the
				 * container.
				 */
				if (diff < (width * settings.reveal)) {
					$(this).children('.ba-caption').html(before_caption);
				} else {
					$(this).children('.ba-caption').html(after_caption);
				}
			});
		}
	});
})(jQuery);

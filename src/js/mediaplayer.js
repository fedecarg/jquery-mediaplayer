/*global require, define */

require.config({
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        "jquery-mediaelement": "//www.mediaelementjs.com/2.11.0/mediaelementjs.min.js"
    }
});

/**
 * MediaPlayer module
 *
 * HTML5 <audio> or <video> player with Flash and Silverlight shims that mimics the HTML5 MediaElement API, 
 * enabling a consistent UI in all browsers. http://mediaelementjs.com/
 *
 * @version 1.0
 * @author Federico Cargnelutit
 */
define(['jquery','jquery-mediaelement'], function ($, mediaElement) {

    "use strict";

    var MediaPlayer = {

        defaults: {
            // if the <video width> is not specified, this is the default
            defaultVideoWidth: 480,
            // if the <video height> is not specified, this is the default
            defaultVideoHeight: 270,
            // if set, overrides <video width>
            videoWidth: -1,
            // if set, overrides <video height>
            videoHeight: -1,
            // width of audio player
            audioWidth: 400,
            // height of audio player
            audioHeight: 30,
            // initial volume when the player starts
            startVolume: 0.8,
            // useful for <audio> player loops
            loop: false,
            // enables Flash and Silverlight to resize to content size
            enableAutosize: true,
            // the order of controls you want on the control bar (and other plugins below)
            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
            // Hide controls when playing and mouse is not over the video
            alwaysShowControls: false,
            // force iPad's native controls
            iPadUseNativeControls: false,
            // force iPhone's native controls
            iPhoneUseNativeControls: false,
            // force Android's native controls
            AndroidUseNativeControls: false,
            // forces the hour marker (##:00:00)
            alwaysShowHours: false,
            // show framecount in timecode (##:00:00:00)
            showTimecodeFrameCount: false,
            // used when showTimecodeFrameCount is set to true
            framesPerSecond: 25,
            // turns keyboard support on and off for this instance
            enableKeyboard: true,
            // when this player starts, it will pause other players
            pauseOtherPlayers: true,
            // array of keyboard commands
            keyActions: []
        },

        /**
         * Convert <video> tag to MediaElement. If your users have JavaScript and Flash, this is
         * the easist route for all browsers and mobile devices (the drawback is that h.264 is not
         * fully open and only works in IE9 and Safari under HTML5).
         *
         * @method init
         * @since 1.0
         * @param {Object} options Player Options
         */
        init: function (elementId, options) {

            options = $.extend({}, this.defaults, options);

            // method that fires when the Flash or Silverlight object is ready    
            options.success = function (mediaElement, domObject) {
                // add event listener
                mediaElement.addEventListener('timeupdate', function (e) {
                    $('#' + elementId + '-current-time').html(mediaElement.currentTime);
                }, false);
                
                // call the play method
                mediaElement.play();
            };

            // fires when a problem is detected
            options.error = function () {
                // log
            };

            $('#' + elementId).mediaelementplayer(options);
        },

        /**
         * Returns true if the jQuery element exists
         *
         * @method hasElement
         * @since 1.0
         * @param {String} element DOM element
         * @return {Boolean} Returns true if the element has been found in the page
         */
        hasElement: function (element) {
            return $(element).length > 0 ? true : false;
        },

        /**
         * @metod addCss
         * @since 1.0
         * @param {String} cssText
         */
        addCss: function (cssText) {
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = cssText;
            } else {
                rules = document.createTextNode(cssText);
                style.appendChild(rules);
            }

            // $('<style type="text/css">' + cssText + '</style>' ).appendTo('head');
            head.appendChild(style);
        }

    }; // MediaPlayer

    return MediaPlayer;

}); // define
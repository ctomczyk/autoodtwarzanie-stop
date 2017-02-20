/*globals document*/

(function (global) {
    'use strict';

    var counter = 0,
        LIMIT = 120,
        intervalId;

    function getIframes() {
        return Array.prototype.slice.call(document.querySelectorAll('iframe'), 0);
    }

    function addParamToUrl(url, param) {
        var hasQuery = url.indexOf('?') !== -1,
            hasHash = url.indexOf('#') !== -1,
            hashContent = url.split('#')[1],
            appendix = hasQuery ? '&' : '?',
            newUrl;

        newUrl = hasHash ? url.replace('#', appendix + param + '#' + hashContent) : url + appendix + param;

        return newUrl;
    }

    function hasUrlParam(url, param) {
        return url.indexOf(param) !== -1;
    }

    function setPauseState(node) {
        if (node.src.indexOf('gazeta.tv/plej') === -1) {
            return;
        }

        if (hasUrlParam(node.src, 'autoplay=true')) {
            node.src = node.src.replace(/autoplay=true/gmi, 'autoplay=false');
        } else if (hasUrlParam(node.src, 'autoplay=1')) {
            node.src = node.src.replace(/autoplay=1/gmi, 'autoplay=0');
        } else if (hasUrlParam(node.src, 'autoplay=false') === false) {
            node.src = addParamToUrl(node.src, 'autoplay=false');
        }
    }

    function checkForIframe() {
        if (counter === LIMIT && intervalId) {
            global.clearInterval(intervalId);
            return;
        }

        getIframes().forEach(function (iframe) {
            setPauseState(iframe);
        });

        counter += 1;
    }

    intervalId = global.setInterval(checkForIframe, 500);

    getIframes().forEach(setPauseState);

}(this));
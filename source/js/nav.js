var Application = function () {

    this.historyState = {
        '': {
            url: '/'
        }
    };

    this.labs = document.getElementById('labs');
    this.mask = document.getElementById('mask');
    this.back = document.getElementById('back');

    this.init();

};

Application.prototype = {

    constructor: Application.constructor,

    init: function () {

        this.labs.addEventListener('click', this.handleClick.bind(this));
        this.back.addEventListener('click', this.handleClick.bind(this));
        window.addEventListener('popstate', this.handlePopstate.bind(this));

        var index = location.pathname.split('/');
        index = index[index.length - 1];

        if (index !== '') {

            if (this.historyState[index] === undefined) {

                this.historyState[index] = {};

            }

            this.historyState[index].url = location.pathname;
            history.pushState(null, null, location.pathname);

            this.navigate(this.historyState[index]);

        }

    },

    onIframeLoad: function () {

        this.show();

    },

    handlePopstate: function (event) {

        var hs = history.state;

        if ((hs === null) || (hs === undefined)) {
            hs = event.state
        };

        if ((hs === null) || (hs === undefined)) {
            hs = window.event.state
        };

        if (hs === null) {
            hs = {
                url: '/'
            };
        }
        if (hs !== null) {
            this.navigate(hs)
        };
    },



    handleClick: function (e) {

        var el = event.target;
        event.preventDefault();

        if (el.nodeName === 'A') {

            if (this.historyState[el.innerHTML] === undefined) {

                this.historyState[el.innerHTML] = {};

            }

            this.historyState[el.innerHTML].url = el.getAttribute('href');
            history.pushState(null, null, el.href);

            this.navigate(this.historyState[el.innerHTML]);

        }

    },



    hide: function (callback) {

        TweenMax.to(this.mask, 1, {
            width: '100%',
            ease: Power2.easeOut,
            onComplete: callback
        });

    },

    show: function (callback) {

        TweenMax.to(this.mask, 1, {
            width: '0%',
            ease: Power2.easeIn,
            onComplete: callback
        });

    },

    navigate: function (state) {

        if (console) {

            console.clear();

        }

        this.hide(function () {

            if (state.url === '/') {

                document.body.className = '';

                if (this.iframe) {

                    this.iframe.removeEventListener('load', this.onIframeLoad.bind(this));
                    document.body.removeChild(this.iframe);

                }

                this.iframe = null;

                this.show();

            } else {

                document.body.className = 'isFullscreen';

                this.iframe = document.createElement('iframe');
                this.iframe.addEventListener('load', this.onIframeLoad.bind(this));
                this.iframe.src = '/experiments/' + state.url.split('/')[2] + '.html';
                document.body.appendChild(this.iframe);

            }

        }.bind(this));

    }

};

window.onload = new Application();

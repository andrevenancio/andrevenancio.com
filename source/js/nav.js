var Application = function() {

    this.historyState = {
        '': {
            url: '/'
        }
    };
    this.dataChunk = {}
    this.data = []
    this.dataAll = [];

    this.tags = document.getElementById('tags');
    this.tech = document.getElementById('tech');

    this.labs = document.getElementById('labs');
    this.mask = document.getElementById('mask');
    this.back = document.getElementById('back');
    this.info = document.getElementById('info');
    this.cont = document.getElementById('info-container');
    this.spin = document.getElementById('spinner');

    this.hasInfo = false;

    this.load('/data.json', this.init.bind(this));

};

Application.prototype = {

    constructor: Application.constructor,

    load: function(path, success) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success) {
                        success(JSON.parse(xhr.responseText).all);
                    }
                } else {
                    console.error(xhr);
                }
            }
        };

        xhr.open('GET', path, true);
        xhr.send();
    },

    build: function(data) {
        this.data = data;

        // delete all
        this.labs.innerHTML = '';
        window.scrollTo(0, 0);

        // add new
        for (var i = 0; i < this.data.length; i++) {
            var li = document.createElement('li');

            var a = document.createElement('a');
            a.href = this.data[i].url;

            var img = document.createElement('img');
            img.src = this.data[i].thumb;

            a.appendChild(img);
            li.appendChild(a);
            this.labs.appendChild(li);
        }

    },

    init: function(data) {

        this.dataAll = data;
        this.build(data);

        // sort
        this.tags.addEventListener('click', this.handleTags.bind(this));
        this.tech.addEventListener('click', this.handleTags.bind(this));

        // click
        this.labs.addEventListener('click', this.handleClick.bind(this));
        this.back.addEventListener('click', this.handleClick.bind(this));
        this.info.addEventListener('click', this.showInfo.bind(this));
        window.addEventListener('popstate', this.handlePopstate.bind(this));
        window.addEventListener('contextmenu', this.handleContext.bind(this));

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

        console.log('\nYou\'re a curious little pumpkin aren\'t you?\n');

    },

    onIframeLoad: function(e) {
        this.info.style.display = 'block';
        if (this.dataChunk.info === '') {
            this.info.style.display = 'none';
        } else {
            var str = '';
            str += '<strong>Date</strong>';
            str += '<br>';
            str += this.dataChunk.date;
            str += '<br>';
            str += '<br>';
            str += '<strong>Info</strong>';
            str += '<br>';
            str += this.dataChunk.info;
            str += '<br>';
            str += '<br>';
            str += '<strong>Technology</strong>';
            str += '<br>';
            str += this.dataChunk.technology.join(', ');
            this.cont.innerHTML = str;
        }
        this.back.style.color = this.info.style.color = this.cont.style.color = this.dataChunk.theme === 'light' ? '#fff' : '#000';
        this.show();
        this.iframe.contentWindow.addEventListener('contextmenu', this.handleContext.bind(this));

    },

    handlePopstate: function(event) {

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
            return;
        }

        if (hs !== null) {
            this.navigate(hs)
        };

    },

    handleContext: function(e) {

        e.preventDefault()

    },

    handleClick: function(e) {

        var el = e.target;
        e.preventDefault();

        if (el.nodeName === 'A') {

            if (this.historyState[el.innerHTML] === undefined) {

                this.historyState[el.innerHTML] = {};

            }

            this.historyState[el.innerHTML].url = el.getAttribute('href');
            history.pushState(null, null, el.href);

            this.navigate(this.historyState[el.innerHTML]);

        }

    },

    handleTags: function(e) {

        var el = e.target;
        e.preventDefault();

        if (el.nodeName === 'A') {

            var sorter = el.getAttribute('href');

            if (sorter === 'all') {
                this.build(this.dataAll);
                return
            } else {
                var temp = []
                for (var i = 0; i < this.dataAll.length; i++) {
                    for (var j = 0; j < this.dataAll[i].technology.length; j++) {
                        if (this.dataAll[i].technology[j] === sorter) {
                            temp.push(this.dataAll[i]);
                        }
                    }
                }
                this.build(temp);
            }
        }
    },

    showInfo: function(e) {

        e.preventDefault();
        this.hasInfo = !this.hasInfo;
        this.toggleInfo(this.hasInfo);

    },

    toggleInfo: function(toActive) {

        if (toActive) {

            this.info.innerHTML = 'close';
            this.cont.style.display = 'block';

        } else {

            this.info.innerHTML = 'info';
            this.cont.style.display = 'none';

        }

    },

    hide: function(callback) {

        if (this.iframe === undefined) {

            this.spin.style.opacity = 1;

        }

        TweenMax.to(this.mask, 0.7, {
            width: '100%',
            ease: Power2.easeOut,
            onComplete: callback
        });

    },

    show: function(callback) {

        this.spin.style.opacity = 0;

        TweenMax.to(this.mask, 0.5, {
            width: '0%',
            ease: Power2.easeIn,
            onComplete: callback
        });

    },

    navigate: function(state) {

        this.hide(function() {

            if (state.url === '/') {
                document.body.className = '';

                if (this.iframe) {

                    this.toggleInfo(false);
                    this.hasInfo = false;

                    this.iframe.removeEventListener('load', this.onIframeLoad.bind(this));
                    this.iframe.contentWindow.removeEventListener('contextmenu', this.handleContext.bind(this));
                    document.body.removeChild(this.iframe);

                }

                this.dataChunk = {};
                this.iframe = null;
                this.show();

            } else {
                document.body.className = 'isFullscreen';

                this.iframe = document.createElement('iframe');
                this.iframe.addEventListener('load', this.onIframeLoad.bind(this));
                this.iframe.src = '/experiments/' + state.url.split('/')[2] + '.html';
                document.body.appendChild(this.iframe);

                // update info or hide it
                for (var i = 0; i < this.data.length; i++) {
                    if (state.url === this.data[i].url) {
                        this.dataChunk = this.data[i];
                    }
                }
            }

        }.bind(this));

    }

};

window.onload = new Application();

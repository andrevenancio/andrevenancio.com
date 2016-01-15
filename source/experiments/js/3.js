var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/3.frag');
    renderer.loadImage('/img/noise64.png', 0);
    renderer.loadImage('/img/loremipsum.png', 1);

    window.addEventListener('resize', resize.bind(this));

    window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '24.11.2015',
        '',
        '<strong>Info</strong>',
        'This was a quick test for a text transition using a noise texture.',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="https://github.com/LowwwLtd/shadertoy.js" target="_blank">shadertoy.js</a></strong>',
        '',
        '<strong>Download</strong>',
        '<a href="/experiments/shaders/3.frag" target="_blank">3.frag</a>',
    ].join('<br>');

    resize();
    update();

}

function update() {

    requestAnimationFrame(update);

    renderer.render();

}

function resize() {

    renderer.setSize(window.innerWidth, window.innerHeight);

}

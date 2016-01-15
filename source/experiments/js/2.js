var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/2.frag');
    renderer.loadImage('/img/noise.png');

    window.addEventListener('resize', resize.bind(this));

    window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '22.11.2015',
        '',
        '<strong>Info</strong>',
        'Experimenting with uv offsets on a noise texture.',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="https://github.com/LowwwLtd/shadertoy.js" target="_blank">shadertoy.js</a></strong>',
        '',
        '<strong>Download</strong>',
        '<a href="/experiments/shaders/2.frag" target="_blank">2.frag</a>',
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

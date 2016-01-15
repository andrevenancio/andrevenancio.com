var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/4.frag');

    window.addEventListener('resize', resize.bind(this));

    // window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '12.01.2016',
        '',
        '<strong>Info</strong>',
        'This was the result of two problems I tried to fix for a commercial project. First, I\'m drawing a gradient with 4 distinct colours, and secondly I\'m adding another gradient with transparency and variable height on top of it.',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="https://github.com/LowwwLtd/shadertoy.js" target="_blank">shadertoy.js</a></strong>',
        '',
        '<strong>Download</strong>',
        '<a href="/experiments/shaders/4.frag" target="_blank">4.frag</a>',
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

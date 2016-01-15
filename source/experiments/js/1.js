var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/1.frag');

    window.addEventListener('resize', resize.bind(this));

    window.info = [
        '<strong>Date</strong>',
        '22.11.2015',
        '',
        '<strong>Info</strong>',
        'If you\'re into WebGL and GLSL, by now you should have heard of <a href="http://shadertoy.com" target="_blank">ShaderToy</a>. This is a copy of their fragment shader example. Running on a small WebGL library I\'ve build to emulate it. Why?... Why now?!',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="https://github.com/LowwwLtd/shadertoy.js" target="_blank">shadertoy.js</a></strong>',
        '',
        '<strong>Download</strong>',
        '<a href="/experiments/shaders/1.frag" target="_blank">1.frag</a>',
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

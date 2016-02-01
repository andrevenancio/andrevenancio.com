var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/projects/shaders/trippy-stripes.frag');
    renderer.loadImage('/img/noise.png');

    window.addEventListener('resize', resize.bind(this));

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

var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/4.frag');

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

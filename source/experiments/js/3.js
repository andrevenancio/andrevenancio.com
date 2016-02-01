var renderer;

window.onload = init;

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.loadFragment('/experiments/shaders/3.frag');
    renderer.loadImage('/img/noise64.png', 0);
    renderer.loadImage('/img/loremipsum.png', 1);

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

var renderer;

init();
update();

function init() {

    renderer = new ShaderToy();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.load( '/experiments/shaders/2.frag' );

    window.addEventListener('resize', resize.bind(this));

}

function update() {

    requestAnimationFrame(update);

    renderer.render();

}

function resize() {

    renderer.setSize(window.innerWidth, window.innerHeight);

}

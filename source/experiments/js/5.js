var renderer, camera, scene;

init();
update();

function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 10);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.autoClear = false;

    window.addEventListener('resize', resize.bind(this));

    // window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '13.01.2016',
        '',
        '<strong>Info</strong>',
        'perlin noise',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="http://threejs.org/" target="_blank">Three.js</a></strong>',
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

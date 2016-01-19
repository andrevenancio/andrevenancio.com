var renderer, camera, scene, controls, clock;
var data, vertices, geometry, material, mesh, ambient, light;

init();
update();

function init() {

    clock = new THREE.Clock()

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 500, 5000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 500;
    camera.position.z = 1000;
    camera.lookAt(scene.position);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100
    controls.maxDistance = 3000
    controls.enablePan = true
    controls.enableKeys = true
    controls.minPolarAngle = 10*Math.PI/180
    controls.maxPolarAngle = 80*Math.PI/180

    window.addEventListener('resize', resize.bind(this));

    addElements();

    window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '19.01.2016',
        '',
        '<strong>Info</strong>',
        'Flat Ocean is a study on THREE.ShaderMaterial. It includes fog, lights and uses standard derivatives to calculate per face lighting (kind of).',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="http://threejs.org/" target="_blank">Three.js</a></strong>',
    ].join('<br>');

    resize();
    update();

}

function addElements() {
    geometry = new THREE.PlaneGeometry(10000, 10000, 45, 45);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    material = new THREE.ShaderMaterial({
       derivatives: FlatShading.derivatives,
       uniforms: FlatShading.uniforms,
       fragmentShader: FlatShading.fragment,
       vertexShader: FlatShading.vertex,
       lights: true,
       fog: true
    });
    material.uniforms['speed'].value.x = Math.random();
    material.uniforms['speed'].value.z = 0.5;
    material.uniforms['terrain_seed'].value = 0.001;
    material.uniforms['terrain_height'].value = 200;

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    ambient = new THREE.AmbientLight(0x000000);
    scene.add(ambient);

    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 2000, 0);
    scene.add(light);
}

function update() {

    requestAnimationFrame(update);
    renderer.render(scene, camera);

    mesh.material.uniforms['time'].value = clock.getElapsedTime();

}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

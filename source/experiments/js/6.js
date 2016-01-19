var renderer, camera, scene, controls, clock;
var data, vertices, geometry, material, mesh, ambient, light, light1;
var isDown = false;
var didMove = false;

init();
update();

function init() {

    clock = new THREE.Clock()

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 50;
    camera.position.z = 300;
    camera.lookAt(new THREE.Vector3(0, -100, 0));
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 250
    controls.maxDistance = 2000
    controls.enablePan = false
    controls.enableKeys = false
    controls.minPolarAngle = 45*Math.PI/180
    controls.maxPolarAngle = 86*Math.PI/180

    window.addEventListener('resize', resize.bind(this));

    window.addEventListener('mousedown', onDown.bind(this));
    window.addEventListener('mousemove', onMove.bind(this));
    window.addEventListener('mouseup', onUp.bind(this));
    window.addEventListener('touchdown', onDown.bind(this));
    window.addEventListener('touchmove', onMove.bind(this));
    window.addEventListener('touchup', onUp.bind(this));

    addElements();

    window.theme = 'light';
    window.info = [
        '<strong>Date</strong>',
        '19.01.2016',
        '',
        '<strong>Info</strong>',
        'Mountain generator is another study on THREE.ShaderMaterial',
        '',
        '<strong>Technology</strong>',
        'WebGL, <a href="http://threejs.org/" target="_blank">Three.js</a></strong>',
    ].join('<br>');

    resize();
    update();

}

function onDown() {
    isDown = true;
    didMove = false;
}

function onMove() {
    if (isDown === true) {
        didMove = true;
    }
}

function onUp() {
    isDown = false;
    if (didMove === false) {
        material.uniforms['offset'].value.x = Math.random() * 5000;
        material.uniforms['offset'].value.y = Math.random() * 5000;
        material.uniforms['offset'].value.z = Math.random() * 5000;

        ambient.color = new THREE.Color(0xffffff * Math.random());
    }
}

function addElements() {
    geometry = new THREE.PlaneBufferGeometry(600, 600, 30, 30);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    var heightMap = new THREE.Texture(getHeightData(24));
    heightMap.needsUpdate = true;

    var texture = new THREE.Texture(getHeightData(30));
    texture.needsUpdate = true;
     
    material = new THREE.ShaderMaterial({
       derivatives: FlatShading.derivatives,
       uniforms: FlatShading.uniforms,
       fragmentShader: FlatShading.fragment,
       vertexShader: FlatShading.vertex,
       lights: true,
       fog: false
    });

    material.uniforms['heightMap'].value = heightMap
    material.uniforms['texture'].value = texture
    material.uniforms['offset'].value.x = Math.random() * 500;
    material.uniforms['offset'].value.y = Math.random() * 500;
    material.uniforms['offset'].value.z = Math.random() * 500;
    material.uniforms['terrain_seed'].value = 0.01;
    material.uniforms['terrain_height'].value = 400;

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    ambient = new THREE.AmbientLight(0xffffff * Math.random());
    scene.add(ambient);

    light1 = new THREE.PointLight(0xffffff);
    light1.position.set(0, 500, 0);
    scene.add(light1);
}

function getHeightData(radius) {
    var size = 64;

    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(size, size);

    for (var i = 0; i < imageData.data.length; i++) {
        var x = i % size;
        var y = Math.floor(i / size);
        var dx = x - size / 2;
        var dy = y - size / 2;
        var d = 255 - Math.sqrt(dx * dx + dy * dy) / radius * 255;
        if (d < 0) {
            d = 0;
        }
        if (d > 255) {
            d = 255;
        }
        putPixel(imageData, x, y, d, d, d, size);
    }

    context.putImageData(imageData, 0, 0);
    return canvas;
}

function putPixel(imageData, x, y, r, g, b, size) {
    index = (x + y * size) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
};

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

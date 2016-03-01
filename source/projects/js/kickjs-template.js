// Generated by CoffeeScript 1.9.3

/*
kickjs
 */
var App, me,
    bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };

App = (function() {
    App.prototype.fov = 75;

    App.prototype.near = 1;

    App.prototype.far = 10000;

    function App() {
        this.update = bind(this.update, this);
        this.onResize = bind(this.onResize, this);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.damping = 0.2;
        this.controls.minDistance = 200;
        this.controls.maxDistance = 2000;
        this.controls.noPan = true;
        this.controls.noKeys = true;
        this.controls.maxPolarAngle = 87 * Math.PI / 180;
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResize, false);
        this.addLights();
        this.initPass();
        this.onResize();
        this.init();
        this.update();
    }

    App.prototype.addLights = function() {
        this.ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(this.ambient);
        this.light = new THREE.SpotLight(0xaaaaaa, 1, 0, Math.PI / 2, 1);
        this.light.position.set(0, 1500, 1000);
        this.light.target.position.set(0, 0, 0);
        this.scene.add(this.light);
        return null;
    };

    App.prototype.initPass = function() {
        var gui;
        this.composer = new WAGNER.Composer(this.renderer, {
            useRGBA: false
        });
        this.bloomPass = new WAGNER.MultiPassBloomPass();
        this.bloomPass.params.blurAmount = 2;
        this.bloomPass.params.applyZoomBlur = true;
        this.bloomPass.params.zoomBlurStrength = 1;
        return null;
    };

    App.prototype.init = function() {
        var geometry, material;
        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: false
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        return null;
    };

    App.prototype.onResize = function() {
        var h, w;
        w = window.innerWidth;
        h = window.innerHeight;
        this.renderer.setSize(w, h);
        this.camera.projectionMatrix.makePerspective(this.fov, w / h, this.near, this.far);
        this.resizePass();
        return null;
    };

    App.prototype.resizePass = function() {
        this.composer.setSize(this.renderer.domElement.width, this.renderer.domElement.height);
        this.bloomPass.params.zoomBlurCenter.set(0.5 * this.composer.width, 0.5 * this.composer.height);
        this.glowTexture = WAGNER.Pass.prototype.getOfflineTexture(this.composer.width, this.composer.height, false);
        return null;
    };

    App.prototype.update = function() {
        requestAnimationFrame(this.update);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.bloomPass.params.zoomBlurStrength = 1 + (0.5 + 0.5 * Math.sin(Date.now() / 1000));
        this.renderPass();
        return null;
    };

    App.prototype.renderPass = function() {
        this.composer.reset();
        this.composer.render(this.scene, this.camera);
        this.composer.pass(this.bloomPass);
        this.composer.toScreen();
        return null;
    };

    return App;

})();

(me = function() {
    var args;
    window.app = new App();
    return null;
})();

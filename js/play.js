(function() {
  "use strict";

  // if (WEBGL.isWebGLAvailable() === false) {
  //   alert(WEBGL.getWebGLErrorMessage());
  // }
  var container,
    camera,
    scene,
    renderer,
    controls,
    clock;

  var init = function() {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    var gridHelper = new THREE.GridHelper(100, 10, 0x121c35, 0x121c35);
    //var gridHelper = new THREE.GridHelper();
    // scene.add(gridHelper);

    scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 2));

    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 50, 50);

    controls = new THREE.OrbitControls(camera, container);
    //controls.autoRotate = true;

    new THREE.MTLLoader().load(mtlName, function(materials) {
      materials.preload();
      new THREE.OBJLoader().setMaterials(materials).load(objName, function(object) {
        scene.add(object);
        animate();
      });

    });

    window.addEventListener('resize', onWindowResize, false);
  };

  window.onload = init();

  function onWindowResize() {
    var w = window.innerWidth,
      h = window.innerHeight;
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    controls.update();
    renderer.render(scene, camera);
  }

})();

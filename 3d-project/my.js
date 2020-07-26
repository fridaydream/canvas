var container, controls
var camera, scene, renderer, light
function init() {
  container = document.createElement('div')
  document.body.appendChild(container)
  // 创造眼睛
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000)
  camera.position.set(0, 80, 200)
  controls = new THREE.OrbitControls(camera)
  controls.target.set(0, -0.2, -0.2)
  controls.update()
  // 创建一个大千世界
  scene = new THREE.Scene()
  light = new THREE.HemisphereLight(0Xbbbbff, 0X444422)
  light.position.set(0, 1, 0)
  scene.add(light)
  // 创建一个模型加载器
  var loader = new THREE.GLTFLoader().setPath('7thWorkshopModelV1/')
  // 内部解码文件夹
  THREE.DRACOLoader.setDecoderPath('./javascript/')
  loader.setDRACOLoader(new THREE.DRACOLoader())
  loader.load('7thWorkshopModelV1-processed.gltf', function(gltf) {
    gltf.scene.scale.set(0.03, 0.03, 0.03)
    gltf.scene.position.set(-80, 0, 0)
    scene.add(gltf.scene)
  })
  // 把眼睛看到的大千世界绘制到html页面去
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  var axesHelper = new THREE.AxesHelper()
  scene.add(axesHelper)
}

init()
// 一定记得让场景及时的requestAnimationFrame
animate()
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
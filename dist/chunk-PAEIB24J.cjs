"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } var _class;

var _chunkYYQHSRHFcjs = require('./chunk-YYQHSRHF.cjs');


var _chunkL5PHFQV3cjs = require('./chunk-L5PHFQV3.cjs');


var _chunkLF7XH2W5cjs = require('./chunk-LF7XH2W5.cjs');


var _chunk3AELWAFNcjs = require('./chunk-3AELWAFN.cjs');


var _chunkTLCLVRLCcjs = require('./chunk-TLCLVRLC.cjs');


var _chunkNA3ZO4CRcjs = require('./chunk-NA3ZO4CR.cjs');


var _chunk2KEFRGGDcjs = require('./chunk-2KEFRGGD.cjs');


var _chunk7227QGKNcjs = require('./chunk-7227QGKN.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POST = _interopRequireWildcard(_postprocessing);
var UnrealEnginePostProcessingPlugin = (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this); }
  __init() {this.name = "UnrealEnginePostProcessing"}
  
  __init2() {this.frameState = new (0, _chunk2KEFRGGDcjs.FrameState)()}
  
  
  
  
  
  
  
  
  
  
  install({ scene, camera, renderer }) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;
    renderer.outputColorSpace = _chunkEA3XQ4KJcjs.THREE.SRGBColorSpace;
    renderer.toneMapping = _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.composer = new POST.EffectComposer(renderer);
    this.velocity = new (0, _chunk3AELWAFNcjs.VelocityPassPlugin)(width, height);
    this.ao = new (0, _chunkTLCLVRLCcjs.AOPlugin)(scene, camera, renderer);
    this.gi = new (0, _chunk7227QGKNcjs.GILitePlugin)(scene, camera, this.velocity, renderer);
    this.bloom = new (0, _chunkNA3ZO4CRcjs.BloomPlugin)();
    this.motion = new (0, _chunkYYQHSRHFcjs.MotionBlurPlugin)(this.velocity);
    this.taa = new (0, _chunkLF7XH2W5cjs.TAAPlugin)(camera, this.velocity, renderer);
    this.sharpen = new (0, _chunkL5PHFQV3cjs.SharpenEffect)(0.2);
    const realismPass = new POST.EffectPass(camera, this.ao.effect, this.gi.effect, this.bloom.effect);
    const finalPass = new POST.EffectPass(camera, this.taa.effect, this.motion.effect, this.sharpen);
    this.composer.addPass(realismPass);
    this.composer.addPass(finalPass);
  }
  postRender() {
    this.frameState.update(this.camera, this.domElement.clientWidth, this.domElement.clientHeight);
    this.velocity.render(this.composer.getRenderer(), this.scene, this.camera);
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
  }
  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
  }
}, _class);



exports.UnrealEnginePostProcessingPlugin = UnrealEnginePostProcessingPlugin;

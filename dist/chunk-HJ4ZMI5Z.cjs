"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkDF6YTEMAcjs = require('./chunk-DF6YTEMA.cjs');


var _chunkC7CPDDG7cjs = require('./chunk-C7CPDDG7.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var Annotations = ({ annotations }) => {
  const orchestrator = _chunkC7CPDDG7cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const data = annotations.map((ann) => {
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      const content = typeof ann.content === "string" ? ann.content : _react2.default.isValidElement(ann.content) ? ann.content.props.children : String(ann.content);
      return {
        id: ann.id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
        target,
        content,
        offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
      };
    });
    const plugin = new (0, _chunkDF6YTEMAcjs.AnnotationsPlugin)(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [annotations]);
  return null;
};



exports.Annotations = Annotations;

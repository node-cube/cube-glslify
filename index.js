'use strict';
const glsl = require('glslify');

class GLSLProcessor {
  /**
   *
   * @param  {Cube} cube 对象
   * @param  {Object} config 来自process配置里传入的配置信息
   *                     basedir: require的根目录
   *
   */
  constructor(cube, config) {
    this.cube = cube;
    this.config = config || {};

    if (!config.basedir) {
      config.basedir = cube.config.root;
    }
  }
  /**
   * @param  {Object}   data     [description]
   * @param  {Function} callback [description]
   */
  process(data, callback) {
    let code = data.code;
    try {
      code = glsl(code, this.config);
    } catch (e) {
      e.code = 'GLSL_COMPILE_ERROR';
      return callback(e);
    }
    data.code = 'module.exports = \n' + JSON.stringify(code) + ';';
    callback(null, data);
  }
}

GLSLProcessor.type = 'script';
GLSLProcessor.ext = '.glsl';

module.exports = GLSLProcessor;

// 初始化webgl上下文
export default (()=> {
    const SetupWebGL = (canvas : any, parameters : any)=> {
        let gl = canvas.getContext("webgl2", parameters);
        gl.version = gl.getParameter(gl.VERSION);

        const isWebGL2 = (gl.version.match("WebGL 2.0") !== null);
        gl.floatTextureExtension  = gl.getExtension("EXT_color_buffer_float");
        gl.floatTextureExtension2 = gl.getExtension("OES_texture_float_linear"); 
        // 用于instanceing
        gl.instancingExtension = parameters.instancing; 
        // 用于多目标渲染的attachment
        gl.COLOR_ATTACHMENT_WEBGL = gl.COLOR_ATTACHMENT0;
        gl.NORMAL_ATTACHMENT_WEBGL = gl.COLOR_ATTACHMENT1;
        gl.POSITION_ATTACHMENT_WEBGL = gl.COLOR_ATTACHMENT2;
        
        gl.isWebGL2 = isWebGL2;       
        if (!gl.isWebGL2) {
            console.warn('chaoyueWebgl is only support webgl2.0')
        }
        gl.wbSamples = parameters.samples;
        gl.wbFormat  = (parameters.alpha? gl.RGBA8 : gl.RGB8);
        gl.wbDepthFormat = (parameters.stencil? gl.DEPTH24_STENCIL8 : gl.DEPTH_COMPONENT24);
        
        // 便于debug
        gl.drawElements = function(mode, count, type, offset) {
            gl.__proto__.drawElements.call(gl, mode, count, type, offset);
        };
        
        gl.drawArrays = function(mode, first, count) {
            gl.__proto__.drawArrays.call(gl, mode, first, count);
        };

        gl.useProgram = function(program) {
            gl.__proto__.useProgram.call(gl, program);
        };

        gl.uniform1f = function(loc, x) {
            gl.__proto__.uniform1f.call(gl, loc, x);
        };
        
        gl.uniform1fv = function(loc, v) {
            gl.__proto__.uniform1fv.call(gl, loc, v);
        };
        
        gl.uniform1i = function(loc, x) {
            gl.__proto__.uniform1i.call(gl, loc, x);
        };

        gl.uniform2f = function(loc, x, y) {
            gl.__proto__.uniform2f.call(gl, loc, x, y);
        };
        
        gl.uniform2fv = function(loc, v) {
            gl.__proto__.uniform2fv.call(gl, loc, v);
        };

        gl.uniform2i = function(loc, x, y) {
            gl.__proto__.uniform2i.call(gl, loc, x, y);
        };

        gl.uniform3f = function(loc, x, y, z) {
            gl.__proto__.uniform3f.call(gl, loc, x, y, z);
        };
        
        gl.uniform3fv = function(loc, v) {
            gl.__proto__.uniform3fv.call(gl, loc, v);
        };
        
        gl.uniform3i = function(loc, x, y, z) {
            gl.__proto__.uniform3i.call(gl, loc, x, y, z);
        };
        
        gl.uniform4f = function(loc, x, y, z, w) {
            gl.__proto__.uniform4f.call(gl, loc, x, y, z, w);
        };
        
        gl.uniform4fv = function(loc, v) {
            gl.__proto__.uniform4fv.call(gl, loc, v);
        };
        
        gl.uniform4i = function(loc, x, y, z, w) {
            gl.__proto__.uniform4i.call(gl, loc, x, y, z, w);
        };
        
        gl.uniformMatrix3fv = function(loc, transpose, matrix) {
            gl.__proto__.uniformMatrix3fv.call(gl, loc, transpose, matrix);
        };
        
        gl.uniformMatrix4fv = function(loc, transpose, matrix) {
            gl.__proto__.uniformMatrix4fv.call(gl, loc, transpose, matrix);
        };

        gl.disable = function(flag) {
            gl.__proto__.disable.call(gl, flag);
        };
        gl.depthMask = function(flag) {
            gl.__proto__.depthMask.call(gl, flag);
        };

        gl.bindTexture = function(target, texture) {
            gl.__proto__.bindTexture.call(gl, target, texture);
        };

        gl.bindFramebuffer = function(target, framebuffer) {
            gl.__proto__.bindFramebuffer.call(gl, target, framebuffer);
        };

        gl.colorMask = function(red, green, blue, alpha) {
            gl.__proto__.colorMask.call(gl, red, green, blue, alpha);
        };

        gl.depthFunc = function(func) {
            gl.__proto__.depthFunc.call(gl, func);
        };

        gl.clear = function(flag) {
            gl.__proto__.clear.call(gl, flag);
        };

        gl.activeTexture = function(texUnit) {
            gl.__proto__.activeTexture.call(gl, texUnit);
        };

        return gl;
    }; 
    return SetupWebGL;
})();

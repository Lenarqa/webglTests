var gl;
var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

function start(){
    var canvas = document.getElementById("glCanvas");
    gl = initWebGL(canvas);

    if(gl){
        console.log("Good all work");
        gl.clearColor(0.75, 0.85, 0.8, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
        // gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
        // gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT); 
        // gl.viewport(0, 0, canvas.width, canvas.height);

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);
        

        gl.compileShader(vertexShader);
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
            console.error("Error compile vertexShader");
            return;
        }

        gl.compileShader(fragmentShader);
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
            console.error("Error compile vertexShader");
        }

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.error("Error link program", gl.getProgramInfoLog(program));
            return;
        }

        gl.validateProgram(program);//what?
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.error("Error validate program", gl.getProgramInfoLog(program));
            return;
        }

        var triangleVertices = [ //X,Y, RGB
            0.0, 0.5,       1, 1, 1,
            -0.5, -0.5,     0.7, 0, 1,
            0.5, -0.5,      0.1, 1, 0.6, 
        ];

        var triangleBufferObj = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleBufferObj);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    }

    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');
    
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.vertexAttribPointer(
        colorAttributeLocation,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT,
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    
}

function initWebGL(canvas){
    gl = null;

    try{
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    }
    catch(e){}

    if(!gl){
        alert("Your browser may not support WebGl");
        gl = null;
    }

    return gl;
}

canvas.addEventListener('click', function() { 
    
}, false);

// function initShaders(){
//     var fragmentShader = getShader(gl, 'shader-fs');
//     var vertexShader = getShader(gl, 'shader-vs');

//     var shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram();

//     if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
//         alert("Unable to initialize the shader program.");
//     }

//     gl.useProgram(shaderProgram);

//     vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
//     gl.enableVertexAttribArray(vertexPositionAttribute);
// }

// function getShader(gl, id){
//     var shaderScript, theSourse, currentChild, shader;

//     shaderScript.getElementById(id);
    
//     if(!shaderScript){
//         return null;
//     }

//     theSourse = null;
//     currentChild = shaderScript.firstChild;

//     while(currentChild){
//         if(currentChild.nodeType == currentChild.TEXT_NODE){
//             theSourse += currentChild.textContent;
//         }

//         currentChild = currentChild.nextSibling;
//     }

//     if(shaderScript.type == "x-shader/x-fragment"){
//         shader = gl.createShader(gl.FRAGMENT_SHADER);
//     }else if(shaderScript.type == "x-shader/x-vertex"){
//         shader = gl.createShader(gl.VERTEX_SHADER);
//     }else{
//         return null
//     }

//     gl.shaderSource(shader, theSourse);

//     gl.compileShader(shader);

//     if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
//         alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
//         return null;
//     }

//     return shader;
// }

// var horizAspect = 480.0/640.0;

// function initBuffers() {
//   squareVerticesBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  
//   var vertices = [
//     1.0,  1.0,  0.0,
//     -1.0, 1.0,  0.0,
//     1.0,  -1.0, 0.0,
//     -1.0, -1.0, 0.0
//   ];
  
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
// }


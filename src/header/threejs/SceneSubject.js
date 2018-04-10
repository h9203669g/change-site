import * as THREE from 'three';
//import OBJLoader from '../../assets/./plugin/ObJLoader.js';
// src根目錄 為../../
import alphaTexture from '../../assets/./img/stripes_gradient.jpg';

import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
//
export default scene => {
    // declear    
    const group = new THREE.Group();
    const linelimit = 0;

    //Loader of Object
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();

    // Create buffer Geometry with var
    // points
    var positionList=[];
    var colorList=[];
    var sizeList=[];
    // lines
    var linepositionList=[];
    var linecolorList=[];
    var linevisibleList=[];

    var baseGeo = new THREE.BufferGeometry();
    var baseGeo2 = new THREE.BufferGeometry();
    var particles, uniforms, sMaterial,lineparticles, lineuniforms, lMaterial;

    //載入
    objLoader.load(
        './assets/obj/body.obj',
    // called when resource is loaded
    function ( object ) {
            
            
            object.traverse(function (child) {
                var geo = child.geometry;
                checkGroup (geo); // major plament function
                    
                });
        
    }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
                            //alert( Math.round(percentComplete, 2) + '% downloaded' );
        }
    }, function ( xhr ) {  });


    scene.add(group); 
    

    // update
    function update(time) {
        
        // transform >> rotate
        //const angle = time*speed*5;
        animate(time);
        //group.rotation.x = angle;
        //group.rotation.y = angle;
        // transform >> scale
        //const scale = (Math.sin(angle)+6.4)/5;
        //subjectWireframe.scale.set(scale, scale, scale);
        
        
        
        // transform >> deform
        //subjectGeometry=

        // texture
        //subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;
        // render
        //subjectWireframe.material.color.setHSL( Math.sin(angle), 0.5, 0.5 );
        
        
    }
     function checkGroup (geo){

        //var outputList=[];
        if (geo instanceof THREE.Geometry) {

        }else if (geo instanceof THREE.BufferGeometry){
            var vts = geo.attributes.position.array;

            positionList=new Float32Array(vts.length);
            colorList=new Float32Array(vts.length);
            sizeList=new Float32Array(vts.length/3);

            linepositionList=new Float32Array(vts.length*2);
            colorList=new Float32Array(vts.length*2);
            sizeList=new Float32Array(vts.length*2/3);
/*  reMesh
            for (var i = 0; i < (vts.length/9)-1; i+=1) {
                // cp 為中點 px, py, pz, 中點法向量 nx, ny, nz組成
                var va = new THREE.Vector3(vts[i*9+3]-vts[i*9],vts[i*9+4]-vts[i*9+1],vts[i*9+5]-vts[i*9+2]);
                var vb = new THREE.Vector3(vts[i*9+6]-vts[i*9],vts[i*9+7]-vts[i*9+1],vts[i*9+8]-vts[i*9+2]);
                var cp=[(vts[i*9] + vts[i*9+3] + vts[i*9+6])/3, 
                        (vts[i*9+1] + vts[i*9+4] + vts[i*9+7])/3,
                        (vts[i*9+2] + vts[i*9+5] + vts[i*9+8])/3];
                var nv=[va[1]*vb[2]-va[2]*vb[1],
                        va[2]*vb[0]-va[0]*vb[2],
                        va[0]*vb[1]-va[0]*vb[1]]

                positionList[i*3]=cp[0];
                positionList[i*3+1]=cp[1];
                positionList[i*3+2]=cp[2];

                var color = new THREE.Color();
                color.setHSL( 0.8, 0.3+( i*0.25 / (vts.length/9) ), 0.5 );
                colorList[i*3]=color[0];
                colorList[i*3+1]=color[1];
                colorList[i*3+2]=color[2];
                
                sizeList[i]=50;
            }
*/
            for (var i = 0; i < (vts.length/3)-1; i+=1) {
                // points
                positionList[i*3]=vts[i*3];
                positionList[i*3+1]=vts[i*3+1];
                positionList[i*3+2]=vts[i*3+2];

                var color = new THREE.Color();
                color.setHSL( 0.3+( i*0.25 / (vts.length/3) ), 0.8, 0.4 );
                colorList[i*3]=color.r;
                colorList[i*3+1]=color.g;
                colorList[i*3+2]=color.b;
                
                sizeList[i]=7;

                // lines
                if (i%3==0){
                    /*
                var cp=[(vts[i*3] + vts[i*3+3] + vts[i*3+6])/3, 
                        (vts[i*3+1] + vts[i*3+4] + vts[i*3+7])/3,
                        (vts[i*3+2] + vts[i*3+5] + vts[i*3+8])/3];
                        */
                    //製作線段矩陣
                    var colora = new THREE.Color();
                    var colorb = new THREE.Color();
                    var colorc = new THREE.Color();
                    colora.setHSL( 0.3+( (i)*0.25 / (vts.length/3) ), 0.8, 0.4 );
                    colorb.setHSL( 0.3+( (i+1)*0.25 / (vts.length/3) ), 0.8, 0.4 );
                    colorc.setHSL( 0.3+( (i+2)*0.25 / (vts.length/3) ), 0.8, 0.4 );

                    linepositionList[i*2]=linepositionList[i*2+15]=vts[i*3];//pax = ab, ca
                    linepositionList[i*2+1]=linepositionList[i*2+16]=vts[i*3+1];//pay 
                    linepositionList[i*2+2]=linepositionList[i*2+17]=vts[i*3+2];//paz
                    linecolorList[i*2]=linecolorList[i*2+15]=colora.r;//pax = ab, ca
                    linecolorList[i*2+1]=linecolorList[i*2+16]=colora.g;//pay 
                    linecolorList[i*2+2]=linecolorList[i*2+17]=colora.b;//paz

                    linepositionList[i*2+3]=linepositionList[i*2+6]=vts[i*3+3];//pbx = ab, bc
                    linepositionList[i*2+4]=linepositionList[i*2+7]=vts[i*3+4];//pby
                    linepositionList[i*2+5]=linepositionList[i*2+8]=vts[i*3+5];//pbz
                    linecolorList[i*2+3]=linecolorList[i*2+6]=colorb.r;//pax = ab, ca
                    linecolorList[i*2+4]=linecolorList[i*2+7]=colorb.g;//pay 
                    linecolorList[i*2+5]=linecolorList[i*2+8]=colorb.b;//paz

                    linepositionList[i*2+9]=linepositionList[i*2+12]=vts[i*3+6];//pcx = bc, ca
                    linepositionList[i*2+10]=linepositionList[i*2+13]=vts[i*3+7];//pcy
                    linepositionList[i*2+11]=linepositionList[i*2+14]=vts[i*3+8];//pcz
                    linecolorList[i*2+9]=linecolorList[i*2+12]=colorc.r;//pax = ab, ca
                    linecolorList[i*2+10]=linecolorList[i*2+13]=colorc.g;//pay 
                    linecolorList[i*2+11]=linecolorList[i*2+14]=colorc.b;//paz
                    /*    
                    linepositionList[i*2]=linepositionList[i*2+6]=linepositionList[i*2+12]=cp[0];
                    linepositionList[i*2+1]=linepositionList[i*2+7]=linepositionList[i*2+13]=cp[1];
                    linepositionList[i*2+2]=linepositionList[i*2+8]=linepositionList[i*2+14]=cp[2];
                    // each tippoint
                    linepositionList[i*2+3]=vts[i*3];
                    linepositionList[i*2+4]=vts[i*3+1];
                    linepositionList[i*2+5]=vts[i*3+2];
                    linepositionList[i*2+9]=vts[i*3+3];
                    linepositionList[i*2+10]=vts[i*3+4];
                    linepositionList[i*2+11]=vts[i*3+5];
                    linepositionList[i*2+15]=vts[i*3+6];
                    linepositionList[i*2+16]=vts[i*3+7];
                    linepositionList[i*2+17]=vts[i*3+8];
                    */
                    /*
                    var v1 = new THREE.Vector3(cp[0]-vts[i*3],
                                                cp[1]-vts[i*3+1],
                                                cp[2]-vts[i*3+2]);
                    var v2 = new THREE.Vector3(cp[0]-vts[i*3+3],
                                                cp[1]-vts[i*3+4],
                                                cp[2]-vts[i*3+5]);
                    var v3 = new THREE.Vector3(cp[0]-vts[i*3],
                                                cp[1]-vts[i*3+7],
                                                cp[2]-vts[i*3+8]);
                    
                    linevisibleList[i*2/3] = 0;//v1.length>linelimit ? 0:1;
                    linevisibleList[i*2/3+1] = 0;//v1.length>linelimit ? 0:1;
                    linevisibleList[i*2/3+2] = 0;//v2.length>linelimit ? 0:1;
                    linevisibleList[i*2/3+3] = 0;//v2.length>linelimit ? 0:1;
                    linevisibleList[i*2/3+4] = 0;//v3.length>linelimit ? 0:1;
                    linevisibleList[i*2/3+5] = 0;//v3.length>linelimit ? 0:1;
                    */
                }
            }
 
            // creates shader upon model
            baseGeo2.addAttribute( 'position',new THREE.Float32BufferAttribute( positionList, 3 ).setDynamic( true ));
            baseGeo2.addAttribute( 'color',new THREE.Float32BufferAttribute( colorList, 3 ).setDynamic( true ));
            baseGeo2.addAttribute( 'size',new THREE.Float32BufferAttribute( sizeList, 1 ).setDynamic( true ));

            uniforms = {    
                    texture: { value: new THREE.TextureLoader().load( "assets/mat/sprites/circle.png" ) },
                    time:{value:0.2}
                };
            sMaterial = new THREE.ShaderMaterial( {
                /*
                uniforms: {
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() }
                },
                */
                uniforms:       uniforms,
                blending:       THREE.AdditiveBlending,
                depthTest:      false,
                transparent:    true,
                vertexColors:   true,
                vertexShader: 
                    'attribute float size;'+
                    'varying vec3 vColor;'+
                        'void main() {'+
                            'vColor = color;'+
                            'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );'+
                            'gl_PointSize = size * ( 300.0 / -mvPosition.z );'+
                            'gl_Position = projectionMatrix * mvPosition;'+
                        '}'
                ,
                fragmentShader: 
                    'uniform sampler2D texture;'+
                    'varying vec3 vColor;'+
                        'void main() {'+
                            'gl_FragColor = vec4( vColor, 1.0 );'+
                            'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );'+
                        '}'
                
            });
            particles = new THREE.Points( baseGeo2,sMaterial);
            group.add(particles);
            

            // line
            //alert(linevisibleList);
            baseGeo.addAttribute( 'position',new THREE.Float32BufferAttribute( linepositionList, 3).setDynamic( true ));
            baseGeo.addAttribute( 'color',new THREE.Float32BufferAttribute( linecolorList, 3 ).setDynamic( true ));
            baseGeo.computeBoundingSphere();
            baseGeo.setDrawRange( 0, 8000);
            //baseGeo.setviewRange=(0,50);
            lMaterial = new THREE.LineBasicMaterial( {
                vertexColors: THREE.VertexColors,
                blending: THREE.AdditiveBlending,
                transparent: true
                
            });
            lineparticles = new THREE.LineSegments( baseGeo, lMaterial);
            group.add(lineparticles);



            /*
            var lMaterial = new THREE.MeshToonMaterial( {
                    uniforms: uniforms,
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader
                } );
            
            var linesMesh = new THREE.Mesh( baseGeo2, lMaterial );
            group.add(linesMesh);
               */
        }
    }
    // 單元資料變更 需用addAttribute
    function animate(time) {
        for ( var i = 0; i < sizeList.length; i++ ) {
            sizeList[ i ] = 5 * ( 1 + Math.sin( 0.1 * i + time ) );   
        }
        baseGeo2.addAttribute( 'size',new THREE.Float32BufferAttribute( sizeList, 1 ).setDynamic( true ));
        
    }

    return {
        update
    }
}
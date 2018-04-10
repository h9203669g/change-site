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
    //const subjectVertices=[];
    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

    //this.THREE = THREE; 
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();
    //var loadingMap = [];
    var loadingMap=[];
    objLoader.load(
        './assets/obj/upperbody_smooth.obj',
    // called when resource is loaded
    function ( object ) {
            
            
            object.traverse(function (child) {
                var geo = child.geometry;
                checkGroup (geo);





                //alert(loadingMap.type);

                //var geometry = new THREE.BufferGeometry();
                //geometry.addAttribute( 'position', loadingMap);
/*                var material = new THREE.ShaderMaterial( {
                    uniforms: {
                        color:   { value: new THREE.Color( 0xffffff ) },
                        texture: { value: new THREE.TextureLoader().load( "textures/sprites/disc.png" ) }
                    },
                    alphaTest: 0.9
                } );
*/
                //var particles = new THREE.Points( geometry, material );
                //group.add(particles);
                
                //geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
                //geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
                /*
                if (geo instanceof THREE.Geometry) {
                    for(let i=0; i<geo.vertices.length;i+=1){
                        //loadinobject = loadinobject.concat(checkGroup(loadinobject,geo.vertices[i].x,geo.vertices[i].y,geo.vertices[i].z));
                    }
                }else if (geo instanceof THREE.BufferGeometry){
                    
                    //alert(ptl[55]);
                    /*
                    for(let i=0; i<ptl.length-3;i+=1){
                        if (i%3==0){

                           loadinobject = loadinobject.concat(checkGroup(loadinobject,ptl[i],ptl[i+1],ptl[i+2]));
                        }
                    }
                    */
                    
                });
        
    }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
                            //alert( Math.round(percentComplete, 2) + '% downloaded' );
        }
    }, function ( xhr ) {  });


    scene.add(group);      
    //scene.add( camera );
    

    // update
    function update(time) {
        
        // transform >> rotate
        const angle = time*speed*5;
        deformGeometry(angle*10);
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

            var positionList=new Float32Array(vts.length/3);
            var colorList=new Float32Array(vts.length/3);
            var sizeList=new Float32Array(vts.length/9);

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
                color.setHSL( 0.01 + 0.1 * ( i / (vts.length/9) ), 1.0, 0.5 );
                colorList[i*3]=color[0];
                colorList[i*3+1]=color[1];
                colorList[i*3+2]=color[2];
                
                sizeList[i]=3;
                // 六角形
                /*

                    
                    
                    
                */ 

                //要放之物件
                var hexgon = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
                    hexgon.moveTo( 0, 0 );
                    hexgon.lineTo( 1, 0 );
                    hexgon.lineTo( 0.5, 0.866 );
                    hexgon.lineTo( -0.5, 0.866 );
                    hexgon.lineTo( -1, 0 );
                    hexgon.lineTo( -0.5, -0.866 );
                    hexgon.lineTo( 0.5, -0.866 );
                    hexgon.lineTo( 1, 0 );
                var obj = new THREE.ExtrudeGeometry( hexgon, { amount: 0, bevelEnabled: false});
                //obj.lookAt(0,0,0);
                var hm = new THREE.Mesh(
                                obj,
                                new THREE.MeshPhongMaterial({
                                    color: 0xCC0000}));
                hm.position.set(cp[0],cp[1],cp[2]);
                group.add(hm);
            }
/*
            if (positionList != undefined && sizeList != undefined){
                var bg = THREE.BufferGeometry();
                bg.addAttribute( 'position', new THREE.BufferAttribute( positionList, 3 ) );
                //geometry.addAttribute( 'customColor',new THREE.Float32BufferAttribute( colorList, 3 ));
                bg.addAttribute( 'size',new THREE.BufferAttribute( sizeList, 1 ));
                var material = new THREE.MeshPhongMaterial( {
                        shininess: 80,
                        vertexColors: THREE.VertexColors
                } );


                var particles = new THREE.Mesh( bg , material );
                group.add(particles);
            }
        }
*/        
    }
}
    /*   
    function checkGroup (mapGeometry, px, py, pz){
        var checkDuplate=false;
        var outputlist=[];
        if (mapGeometry.length==0){
        }else{
            for (var i = 0; i < mapGeometry.length/3; i+=1) {
                if ( mapGeometry[i*3] == px && 
                     mapGeometry[i*3+1] == py && 
                     mapGeometry[i*3+2] ==  pz){
                        checkDuplate = true;
                    break;
                }
            }
            
        }
        if (checkDuplate == false){
               outputlist.push(px);
               outputlist.push(py);
               outputlist.push(pz);
               var tm = new THREE.Mesh(
                                new THREE.BoxGeometry(1,1,1),
                                new THREE.MeshLambertMaterial({
                                    color: 0xCC0000}));
                tm.position.set(px,py,pz);
                group.add(tm);
        }
        return outputlist;
    }
    */
    // deform change through arg1
   function deformGeometry(arg1) {
        //const gvp= geometry.attributes.position.array;
        //const gc = geometry.BoundingBox.getCenter();

        //alert(Math.sin(arg1));
        //const scalar = 1 + (Math.sin(arg1*(i%8))+6.4);
       /* 
        for (let i = 0; i < group.children.length; i+=1) {
            //group.children[i].geometry.scale(Math.sin(arg1*0.01),Math.sin(arg1*0.01),Math.sin(arg1*0.01));
            group.children[i].material.color.setHSL( Math.sin(arg1*0.01), 0.5 , i/(group.children.length*3) );
        }
        */
        //alert(gvp[0]);
        //alert(gvp[51]);
        //    gvp[i].x = gvp[i].x*(1+Math.sin(arg1*10));
            //viy = viy*(1+Math.sin(arg1*10));
            //viz = viz*(1+Math.sin(arg1*10));
        //}
       
        //for (let i=0; i<geometry.vertices.length; i+=1) {
        //    const scalar = 1 + (Math.sin(arg1*(i%8))+6.4);
        //    geometry.vertices[i].multiplyScalar(scalar*5)
        //}
        //subjectGeometry.attributes.position.needsUpdate = true;
        //return geometry;  
    }

    return {
        update
    }
}
import React, { PureComponent } from 'react';
//import { PropTypes, THREE, autobind } from './libs';
export default class Model extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        model: PropTypes.object,
        material: PropTypes.instanceOf(THREE.Material),
        rotation: PropTypes.instanceOf(THREE.Euler),
        position: PropTypes.instanceOf(THREE.Vector3),
        scale: PropTypes.oneOfType([PropTypes.instanceOf(THREE.Vector3), PropTypes.number])
    };
    static defaultProps = {
        rotation: new THREE.Euler(0, 0, 0),
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    };
    constructor(props, context) {
        super(props, context);
        if (props.model) {
            this.model(props);
        }
    }
    shouldComponentUpdate() {
        return false;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.model !== this.props.model) {
            if (this.props.model) {
                this._groupRef.remove(this.props.model);
            }
            if (nextProps.model) {
                this.model(nextProps);
                if (this._groupRef) {
                    this._groupRef.add(nextProps.model);
                }
            }
        } else {
            if (nextProps.rotation !== this.props.rotation) {
                this.rotation(nextProps.rotation);
            }
            if (nextProps.position !== this.props.position) {
                this.position(nextProps.position);
            }
        }
    }
    render() {
        return <group ref={this.handleRef} children={this.props.children} />;
    }
    //@autobind
    handleRef(group) {
        const { model } = this.props;
        if (group && model) {
            group.add(model);
        }
        this._groupRef = group;
    }
    //@autobind
    model({ model, material, position, rotation, scale }) {
        if (model) {
            model.traverse(child => {
                if (material && child instanceof THREE.Mesh) {
                    child.material = material;
                }

                if (child instanceof THREE.Mesh) {
                    const geo = new THREE.EdgesGeometry(child.geometry);
                    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
                    const wireframe = new THREE.LineSegments(geo, mat);
                    child.add(wireframe);
                }
            });
            if (position !== undefined) this.position(position, model);
            if (rotation !== undefined) this.rotation(rotation, model);
            if (scale !== undefined) this.scale(scale, model);
            return model;
        }
    }
    //@autobind
    rotation(rotation, model = this.props.model) {
        model.quaternion.setFromEuler(rotation);
    }
    //@autobind
    position(position, model = this.props.model) {
        model.position.copy(position);
    }
    //@autobind
    scale(scale, model = this.props.model) {
        if (typeof scale === 'number') {
            model.scale.x = model.scale.y = model.scale.z = scale;
        } else if (model.scale) {
            model.scale.copy(scale);
        } else {
            model.scale = scale;
        }
    }
}
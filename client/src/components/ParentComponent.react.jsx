import React from 'react';
import ChildComponent from './ChildComponent.react';

class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello from Parent Component!
                <ChildComponent/>
            </div>
        
        )
    }
}

export default ParentComponent;


import React from 'react';
import { DropTarget } from 'react-dnd';

class DropAxis extends React.Component {
  render() {
    const {
      connectDropTarget,
      items,
    } = this.props;

    return connectDropTarget((
      <div className="drop">
        <ul className="column-names">
          {
            items.map(item => (
              <li key={item.name}>
                <p>{item.name}</p>
                <span className={`datatype-${item.type}`}>{item.type}</span>
              </li>
            ))
          }
        </ul>
      </div>));
  }
}

const spec = {
  drop(props, monitor) {
    props.addItem(monitor.getItem());
    return { moved: true };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

export default (type, items, onDrop) => {
  const DropSquare = DropTarget(type, spec, collect)(DropAxis);
  return <DropSquare items={items} addItem={onDrop} />;
};
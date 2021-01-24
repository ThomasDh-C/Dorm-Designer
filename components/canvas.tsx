import React from "react";

const Circle = () => {
  const [position, setPosition] = React.useState({
    id: Date.now(),
    x: 100,
    y: 100,
    active: false,
    offset: { x: 0, y: 0 }
  });

  const handlePointerDown = e => {
    console.log(position.id)
    const targetElement = e.target;
    // calculate relative offset of click position to circle position
    const bbox = targetElement.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    // set values for use when dragging
    targetElement.setPointerCapture(e.pointerId);
    setPosition({
      ...position,
      active: true,
      offset: { x, y }
    });
  };

  const handlePointerMove = e => {
    const targetElement = e.target;
    const bbox = targetElement.getBoundingClientRect();
    // same relative offset calc
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    // update state
    if (position.active) {
      setPosition({
        ...position,
        // difference of original and new relative offset
        x: position.x - (position.offset.x - x),
        y: position.y - (position.offset.y - y)
      });
    }
  };
  const handlePointerUp = e => {
    setPosition({
      ...position,
      active: false
    });
  };

  return (
    <circle
      key={position.id}
      cx={position.x}
      cy={position.y}
      r={50}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      fill={position.active ? "grey" : "black"}
    />
  );
};

const Canvas = () => {
  return (
    <svg width="90%" height="1000" style={{ border: "2px solid black", borderRadius: "3px" }}>
      <Circle />
      <Circle />
    </svg>
  );
}

const Editor = () => {
  return (
    <div style={{ width: "100%" }}>
      <h1>Drag Me</h1>
      <Canvas />
    </div>
  );
};


export default Editor
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Slider.css";

function Slider(props) {
  const { min, max } = props;
  const isDragging = useRef(false);
  const thumbRef = useRef();
  const [position, setPosition] = useState(min);

  const onMouseDown = useCallback((event) => {
    if (thumbRef.current && thumbRef.current.contains(event.target)) {
      isDragging.current = true;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      if (isDragging.current) {
        setPosition((position) => {
          if (position <= min && event.movementX < 0) {
            return min;
          } else if (position >= max && event.movementX > 0) {
            return max;
          } else if (position >= min && position <= max) {
            return position + event.movementX;
          }
        });
      }
    },
    [min, max]
  );

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove, onMouseDown, onMouseUp]);

  return (
    <div className="container">
      <div className="track">
        <div
          className="change-track-color"
          style={{ width: `${position}%` }}
        ></div>
        <div className="thumb" ref={thumbRef} style={{ left: `${position}%` }}>
          <div className="text">{position}</div>
        </div>
      </div>
    </div>
  );
}

export default Slider;

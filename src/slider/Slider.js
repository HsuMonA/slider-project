import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Slider.css";

function Slider(props) {
  const { min, max } = props;
  const isDragging = useRef(false);
  const thumbRef = useRef();
  const [position, setPosition] = useState(0);

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

  const onMouseMove = useCallback((event) => {
    if (isDragging.current) {
      setPosition((position) => {
        if (position <= 0 && event.movementX < 0) {
          return 0;
        } else if (position >= 99 && event.movementX > 0) {
          return 99;
        } else if (position >= 0 && position <= 99) {
          return position + event.movementX;
        }
      });
    }
  }, []);

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

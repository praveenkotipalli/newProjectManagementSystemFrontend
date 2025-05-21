import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import "../../index.css"; // Include the CSS for the cursor-dot

const CustomCursor = () => {
  const cursorPosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });

  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, stiffness: 1000000, damping: 0 }, // High stiffness, no damping for fast movement
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };

      // Position the dot cursor exactly at the main cursor's position
      api.start({
        x: cursorPosition.current.x,
        y: cursorPosition.current.y,
        config: { mass: 1, stiffness: 1000000, damping: 0 }, // Fast response for instant effect
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [api]);

  useEffect(() => {
    const updateDotPosition = () => {
      dotPosition.current = {
        x: springProps.x.get(),
        y: springProps.y.get(),
      };
      requestAnimationFrame(updateDotPosition);
    };

    updateDotPosition();

    return () => cancelAnimationFrame(updateDotPosition);
  }, [springProps]);

  return (
    <animated.div
      className="cursor-dot"
      style={{
        transform: springProps.x.to(
          (x) => `translate3d(${x}px, ${springProps.y.get()}px, 0)`
        ),
        width: '20px',
        height: '20px',
        backgroundColor: '#e3e3e3',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        mixBlendMode:"difference",
        // color: 'black',
        zIndex: 9999, // Ensure the cursor stays on top
        boxShadow: '0 0 20px 4px rgba(231, 231, 231, 0.271)',

      }}
    />
  );
};

export default CustomCursor;

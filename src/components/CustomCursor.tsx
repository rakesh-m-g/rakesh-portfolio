import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // State for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // State for cursor interactions
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInWindow, setIsInWindow] = useState(true);
  
  // Ref for inactivity timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = useState(true);
  
  // Animation controls for rotation
  const rotationControls = useAnimation();
  
  // Spring physics for smooth cursor movement
  const springConfig = { stiffness: 200, damping: 20, mass: 0.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Start rotation animation
  useEffect(() => {
    rotationControls.start({
      rotate: 360,
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [rotationControls]);
  
  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    setIsActive(true);
    
    inactivityTimerRef.current = setTimeout(() => {
      setIsActive(false);
    }, 2500); // 2.5 seconds of inactivity
  };
  
  useEffect(() => {
    // Check if device is mobile/touch
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };
    
    checkDevice();
    
    // Only set up cursor if not on mobile
    if (!isMobile) {
      // Function to update cursor position
      const updateMousePosition = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
        resetInactivityTimer();
      };
      
      // Function to detect when cursor is over interactive elements
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = (
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.closest('button') !== null || 
          target.closest('a') !== null ||
          target.classList.contains('interactive')
        );
        setIsHovering(isInteractive);
      };
      
      // Function to handle mouse down/up for click animation
      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);
      
      // Functions to handle mouse entering/leaving window
      const handleMouseLeave = () => setIsInWindow(false);
      const handleMouseEnter = () => setIsInWindow(true);
      
      // Add event listeners
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      
      // Initialize inactivity timer
      resetInactivityTimer();
      
      // Hide the default cursor
      document.body.style.cursor = 'none';
      
      // Clean up event listeners and timer
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        
        document.body.style.cursor = 'auto';
      };
    }
  }, [isMobile, isVisible, mouseX, mouseY]);
  
  // Don't render cursor on mobile devices
  if (isMobile) return null;
  
  return (
    <motion.div
      className="cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        scale: isHovering ? 1.2 : 1,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isInWindow && isActive ? 1 : 0,
        transition: {
          opacity: { duration: isActive ? 0.8 : 0.5, ease: 'easeInOut' }
        }
      }}
    >
      {/* Dashed outline circle with rotation */}
      <motion.div
        animate={rotationControls}
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: isHovering || isClicking ? 'none' : '2px dashed black',
          backgroundColor: isHovering || isClicking ? 'black' : 'transparent',
          transition: 'background-color 0.3s ease, border 0.3s ease',
        }}
        initial={{ rotate: 0 }}
      >
        {/* Inner circle for click animation */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: isClicking ? 'black' : 'transparent',
          }}
          animate={{
            scale: isClicking ? [1, 1.3, 1] : 1,
          }}
          transition={{
            scale: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1.5], // Bounce effect
              times: [0, 0.5, 1],
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
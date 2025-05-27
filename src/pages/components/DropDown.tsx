import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DropDown.css'

interface ButtonData {
  label: string;
  onClick: () => void;
}

// Define props interface
interface DropDownProps {
  label: React.ReactNode
  trigger: 'Click' | 'Hover'
  buttons: ButtonData[]
}

const DropDown: React.FC<DropDownProps> = ({label, trigger, buttons}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("use effect", triggerRef.current);
    if (open && triggerRef.current) {
      console.log("here");
      const rect = triggerRef.current.getBoundingClientRect();
      console.log('rect.height:', rect.height);
      setPosition({
        top: rect.top + window.scrollY + 4 + rect.height, // Start from top, add height
        right: window.innerWidth - rect.right + window.scrollX
      });
    }
  }, [open]);

  const triggerProps = trigger === 'Click' ? {
    onClick: () => setOpen(!open)
 } : {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false)
 }
    return <div className='drop-down'>
      <div {...triggerProps} ref={triggerRef}>{label}</div>
        
        {open && createPortal(
        <div 
          className="dropdown-menu" 
          style={{
            position: 'absolute',
            top: position.top,
            right: position.right,
            zIndex: 9999
          }}
        >
          {buttons.map((button, index) => (
            <button 
              key={index}
              onClick={() => {
                button.onClick();
                setOpen(false); // Close dropdown after click
              }} 
              className='drop-down-item'
            >
              {button.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
}

export default DropDown;

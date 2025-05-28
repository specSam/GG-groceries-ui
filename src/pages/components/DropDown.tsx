import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DropDown.css'

interface ButtonData {
  label: string;
  onClick: () => void;
}

interface DropDownProps {
  label: React.ReactNode
  buttons: ButtonData[]
}

const DropDown: React.FC<DropDownProps> = ({label, buttons}) => { // TODO: Update drop down to close when clicked outside of box.
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + 4 + rect.height, // Start from top, add height
        right: window.innerWidth - rect.right + window.scrollX
      });
    }
  }, [open]);

  const triggerProps = {
    onClick: () => setOpen(!open),
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

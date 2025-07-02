import React, { useState, useRef, useEffect, useCallback } from 'react';
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

function pointInRect(x: number, y: number, r: DOMRect): boolean {
  return (
    x <= r.right &&
    x >= r.left &&
    y <= r.bottom &&
    y >= r.top
  );
}


const DropDown: React.FC<DropDownProps> = ({label, buttons}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeOnOutsideClick = useCallback((e: MouseEvent) => {
    if (!triggerRef.current || !dropdownRef.current) {
      return
    }
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    if (!pointInRect(e.clientX, e.clientY, triggerRect) && !pointInRect(e.clientX, e.clientY, dropdownRect)) {
      setOpen(false)
    }
  }, [setOpen])
  const closeOnEscape = useCallback((k: KeyboardEvent) => {
    if (k.key === 'Escape') {
      setOpen(false);
    }
  }, [setOpen])
  useEffect(() => {
    if (!triggerRef.current) {
      return
    }
    if (open) {
      if (!dropdownRef.current) {
        return
      }
      document.body.addEventListener('mousedown', closeOnOutsideClick);
      document.body.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      document.body.removeEventListener('mousedown', closeOnOutsideClick);
      document.body.removeEventListener('keydown', closeOnEscape);
    }
  }, [open, closeOnOutsideClick, closeOnOutsideClick]);

  const triggerProps = {
    onClick: () => {
      if (!triggerRef.current) {
      return
    }
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + 4 + rect.height, // Start from top, add height
        right: window.innerWidth - rect.right + window.scrollX
      });
      setOpen(!open)
    },
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
          ref={dropdownRef}
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

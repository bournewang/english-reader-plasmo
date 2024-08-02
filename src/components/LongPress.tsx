import React, { useRef } from 'react';

interface LongPressProps {
  onLongPress: (e: React.TouchEvent, selection: string) => void;
  onClick?: (e: React.TouchEvent, selection: string) => void;
  children: React.ReactNode;
}

const LongPress: React.FC<LongPressProps> = ({ onLongPress, onClick, children }) => {
  const timerRef = useRef<number | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    isLongPress.current = false;
    timerRef.current = window.setTimeout(() => {
      isLongPress.current = true;
      const selection = window.getSelection()?.toString() || '';
      onLongPress(e, selection);
    }, 800); // 800ms for long press
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!isLongPress.current && onClick) {
      const selection = window.getSelection()?.toString() || '';
      onClick(e, selection);
    }
  };

  const handleTouchMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {children}
    </div>
  );
};

export default LongPress;

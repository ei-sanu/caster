import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-sm md:text-base font-medium">
      <div className="flex flex-col items-center md:items-end">
        <div className="text-gray-900 dark:text-white font-display">
          {format(currentTime, 'h:mm')}
          <span className="animate-pulse-slow inline-block">:</span>
          {format(currentTime, 'ss a')}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {format(currentTime, 'EEE, MMM d, yyyy')}
        </div>
      </div>
    </div>
  );
};

export default LiveClock;
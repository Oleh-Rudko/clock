import { useEffect, useState } from 'react';
import '../styles/HourglassAnimation.css';

const HourglassAnimation = ({ timeRemaining, totalDays }) => {
  // Calculate progress percentage (how much sand has fallen)
  const [sandProgress, setSandProgress] = useState(0);
  
  useEffect(() => {
    // Calculate what percentage of time has passed
    const daysLeft = timeRemaining.days;
    const hoursLeft = timeRemaining.hours;
    const minutesLeft = timeRemaining.minutes;
    
    // Convert all to minutes for more precise calculation
    const totalMinutesLeft = daysLeft * 24 * 60 + hoursLeft * 60 + minutesLeft;
    const totalMinutes = totalDays * 24 * 60;
    
    // Calculate progress (100% means all sand has fallen)
    const percentComplete = Math.min(100, Math.max(0, 100 - (totalMinutesLeft / totalMinutes * 100)));
    setSandProgress(percentComplete);
  }, [timeRemaining, totalDays]);

  return (
    <div className="hourglass-container">
      <div className="hourglass">
        {/* Top chamber - sand decreases */}
        <div className="hourglass-top">
          <div 
            className="sand-top" 
            style={{ height: `${100 - sandProgress}%` }}
          ></div>
        </div>
        
        {/* Middle connector */}
        <div className="hourglass-middle">
          {/* Falling sand particles */}
          <div className="sand-stream">
            <div className="sand-particle particle-1"></div>
            <div className="sand-particle particle-2"></div>
            <div className="sand-particle particle-3"></div>
          </div>
        </div>
        
        {/* Bottom chamber - sand increases */}
        <div className="hourglass-bottom">
          <div 
            className="sand-bottom" 
            style={{ height: `${sandProgress}%` }}
          ></div>
        </div>
        
        {/* Hourglass frame */}
        <div className="hourglass-frame"></div>
      </div>
      
      {sandProgress >= 100 && (
        <div className="time-up-message">Час вийшов!</div>
      )}
    </div>
  );
};

export default HourglassAnimation;

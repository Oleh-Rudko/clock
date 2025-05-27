import { useEffect, useState, useRef } from 'react';
import '../styles/LumberjackAnimation.css';

const LumberjackAnimation = ({ timeRemaining, totalDays }) => {
  // Calculate progress percentage (how much of the tree has been chopped)
  const [chopProgress, setChopProgress] = useState(0);
  const [showChips, setShowChips] = useState(false);
  const woodChipsRef = useRef([]);
  
  // Initialize random values for wood chips
  useEffect(() => {
    woodChipsRef.current = Array(5).fill().map(() => ({
      x: Math.random(),
      r: Math.random()
    }));
  }, []);
  
  useEffect(() => {
    // Calculate what percentage of time has passed
    const daysLeft = timeRemaining.days;
    const percentComplete = Math.min(100, Math.max(0, 100 - (daysLeft / totalDays * 100)));
    setChopProgress(percentComplete);
  }, [timeRemaining.days, totalDays]);

  // Determine tree state based on progress
  const treeState = () => {
    if (chopProgress >= 100) return 'fallen';
    if (chopProgress >= 80) return 'almost-fallen';
    if (chopProgress >= 60) return 'heavily-chopped';
    if (chopProgress >= 40) return 'moderately-chopped';
    if (chopProgress >= 20) return 'lightly-chopped';
    return 'intact';
  };

  // Animation frames for the lumberjack
  const [axePosition, setAxePosition] = useState('up');
  
  useEffect(() => {
    // Animate the lumberjack's axe with more realistic timing
    const animateAxe = () => {
      // Show wood chips when axe is going down
      setAxePosition('down');
      setShowChips(true);
      
      // Hold axe down for a moment
      setTimeout(() => {
        setShowChips(false);
        
        // Bring axe back up
        setTimeout(() => {
          setAxePosition('up');
          
          // Wait longer before next chop
          setTimeout(animateAxe, 1800);
        }, 200);
      }, 300);
    };
    
    // Start the animation
    const timer = setTimeout(animateAxe, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animation-container">
      <div className={`tree ${treeState()}`}>
        <div className="tree-trunk">
          <div className="cut-mark" style={{ width: `${chopProgress}%` }}></div>
        </div>
        <div className="tree-top"></div>
      </div>
      
      {/* Wood chips that appear when chopping */}
      {showChips && (
        <div className="wood-chips">
          {woodChipsRef.current.map((chip, index) => (
            <div 
              key={index} 
              className="wood-chip" 
              style={{ 
                '--random-x': chip.x, 
                '--random-r': chip.r,
                left: `${index * 10 - 20}px`
              }}
            ></div>
          ))}
        </div>
      )}
      
      <div className="lumberjack">
        <div className="lumberjack-body">
          {/* Beard */}
          <div></div>
          {/* Shirt pattern */}
          <span></span>
        </div>
        <div className={`lumberjack-arm ${axePosition}`}>
          <div className="axe"></div>
        </div>
      </div>
      
      {chopProgress >= 100 && (
        <div className="fallen-message">Час вийшов!</div>
      )}
    </div>
  );
};

export default LumberjackAnimation;

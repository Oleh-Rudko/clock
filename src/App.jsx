import { useState, useEffect } from 'react'
import './App.css'
import HourglassAnimation from './components/HourglassAnimation'

function App() {
  // Fixed target date - set to June 14, 2025 at 13:00
  const targetDate = new Date('2025-06-14T13:00:00');
  
  // Calculate total days for the animation
  const startDate = new Date('2025-05-27T10:15:42'); // Current date
  const totalDays = Math.ceil((targetDate - startDate) / (1000 * 60 * 60 * 24));
  
  // State to hold the remaining time
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Function to calculate the time difference
  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = targetDate - now;
    
    // If the target date is in the past, return all zeros
    if (difference <= 0) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    setTimeRemaining({ days, hours, minutes, seconds });
  };

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []); // No dependencies needed as target date is fixed

  // Format the target date for display
  const formattedTargetDate = targetDate.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="countdown-container">
      <h1>Свобода через:</h1>
      <h2>До {formattedTargetDate}</h2>
      
      <div className="countdown-timer">
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.days}</span>
          <span className="countdown-label">днів</span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.hours}</span>
          <span className="countdown-label">годин</span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.minutes}</span>
          <span className="countdown-label">хвилин</span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.seconds}</span>
          <span className="countdown-label">секунд</span>
        </div>
      </div>
      
      <HourglassAnimation timeRemaining={timeRemaining} totalDays={totalDays} />
    </div>
  )
}

export default App

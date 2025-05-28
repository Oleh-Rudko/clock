import { useState, useEffect } from "react";
import "./App.css";
import HourglassAnimation from "./components/HourglassAnimation";

function App() {
  // Fixed target date - set to June 14, 2025 at 13:00
  const targetDate = new Date("2025-06-14T13:00:00");

  // Calculate total days for the animation
  const startDate = new Date("2025-05-27T10:15:42"); // Current date
  const totalDays = Math.ceil((targetDate - startDate) / (1000 * 60 * 60 * 24));

  // State to hold the remaining time
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
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
  const formattedTargetDate = targetDate.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Helper function to get the correct grammatical form for Ukrainian time units
  const getUkrainianTimeForm = (value, forms) => {
    // Handle special cases for numbers ending in 1, 2-4, and 5-0
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    // Special case for 11-14 (they use the plural form)
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return forms.many; // e.g., "11 днів"
    }

    // For numbers ending in 1 (except 11)
    if (lastDigit === 1) {
      return forms.one; // e.g., "1 день"
    }

    // For numbers ending in 2, 3, 4 (except 12, 13, 14)
    if (lastDigit >= 2 && lastDigit <= 4) {
      return forms.few; // e.g., "2 дні"
    }

    // For all other cases
    return forms.many; // e.g., "5 днів"
  };

  // Define the forms for each time unit
  const dayForms = { one: "день", few: "дні", many: "днів" };
  const hourForms = { one: "година", few: "години", many: "годин" };
  const minuteForms = { one: "хвилина", few: "хвилини", many: "хвилин" };

  return (
    <div className="countdown-container">
      <h1>Свобода через:</h1>
      <h2>До {formattedTargetDate}</h2>

      <div className="countdown-timer">
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.days}</span>
          <span className="countdown-label">
            {getUkrainianTimeForm(timeRemaining.days, dayForms)}
          </span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.hours}</span>
          <span className="countdown-label">
            {getUkrainianTimeForm(timeRemaining.hours, hourForms)}
          </span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.minutes}</span>
          <span className="countdown-label">
            {getUkrainianTimeForm(timeRemaining.minutes, minuteForms)}
          </span>
        </div>
        <div className="countdown-segment">
          <span className="countdown-value">{timeRemaining.seconds}</span>
          <span className="countdown-label">секунд</span>
        </div>
      </div>

      <HourglassAnimation timeRemaining={timeRemaining} totalDays={totalDays} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "../styles/HourglassAnimation.css";

const HourglassAnimation = ({ timeRemaining, totalDays }) => {
  // Calculate progress percentage (how much sand has fallen)
  const [topSand, setTopSand] = useState(100);
  const [bottomSand, bottomTopSand] = useState(0);

  useEffect(() => {
    // Calculate the percentage of sand in the top chamber
    const totalSeconds = totalDays * 24 * 60 * 60; // Total seconds in the countdown
    const elapsedSeconds =
      (totalDays - timeRemaining.days) * 24 * 60 * 60 +
      timeRemaining.hours * 3600 +
      timeRemaining.minutes * 60 +
      timeRemaining.seconds;

    const topSandPercentage = Math.max(
      0,
      Math.min(100, (elapsedSeconds / totalSeconds) * 100),
    );
    setTopSand(100 - topSandPercentage);
    bottomTopSand(topSandPercentage);
  }, [timeRemaining, totalDays]);

  return (
    <div className="hourglass-container">
      <div className="hourglass">
        {/* Top chamber - sand decreases */}
        <div className="hourglass-top">
          {/* Sand in top chamber - explicitly set to 95% of available space */}
          <div
            className="sand-top"
            style={{
              height: `${topSand}%`,
            }}
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

        {/* Bottom chamber - sand increases from bottom up */}
        <div className="hourglass-bottom">
          <div
            className="sand-bottom"
            style={{
              height: `${bottomSand}%`,
            }}
          ></div>
        </div>

        {/* Hourglass frame - rendered after sand to ensure it's visible */}
        <div className="hourglass-frame"></div>
      </div>
    </div>
  );
};

export default HourglassAnimation;

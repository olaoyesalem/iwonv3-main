"use client";
import { useTimer } from "react-timer-hook";

const CountdownClock = () => {
  // Function to calculate the next Friday at 12 AM
  const getNextFridayMidnight = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Friday = 5
    const daysUntilNextFriday = (5 - dayOfWeek + 7) % 7 || 7; // Days to next Friday
    const nextFriday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilNextFriday
    );
    nextFriday.setHours(0, 0, 0, 0); // Set to 12 AM
    return nextFriday;
  };

  // Set the expiration timestamp for the next Friday at 12 AM
  const time = getNextFridayMidnight();

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      console.warn("onExpire called");
      // Restart the countdown
      window.location.reload(); // Simple reload for now, or recalculate the next Friday
    },
  });

  return (
    <div className="countdown ul_li_center">
      <div className="single">
        <h1>{days}</h1>
        <p>days</p>
      </div>
      <div className="single">
        <h1>{hours}</h1>
        <p>hours</p>
      </div>
      <div className="single">
        <h1>{minutes}</h1>
        <p>mins</p>
      </div>
      <div className="single">
        <h1>{seconds}</h1>
        <p>secs</p>
      </div>
    </div>
  );
};

export default CountdownClock;

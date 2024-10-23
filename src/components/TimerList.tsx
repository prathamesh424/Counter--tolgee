// src/components/TimerList.tsx
import Countdown from './Countdown';
import { useTranslate } from '@tolgee/react';
interface Timer {
  event: string;
  targetDate: string;
}

interface TimerListProps {
  timers: Timer[];
  removeTimer: (index: number) => void;
}

const TimerList: React.FC<TimerListProps> = ({ timers, removeTimer }) => {
  const handleTimeUp = (index: number) => {
    alert(`${timers[index].event} is complete!`);
    removeTimer(index);
  };
  const { t } = useTranslate();

  return (
    <div className="space-y-4">
      {timers.map((timer, index) => (
        <Countdown
          key={index}
          event={timer.event}
          targetDate={timer.targetDate}
          onTimeUp={() => handleTimeUp(index)}
          onRemove={() => removeTimer(index)}  
        />
      ))}
    </div>
  );
};

export default TimerList;

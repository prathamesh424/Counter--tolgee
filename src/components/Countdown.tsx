// src/components/Countdown.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslate } from '@tolgee/react';

interface CountdownProps {
  event: string;
  targetDate: string;
  onTimeUp: () => void;
  onRemove: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ event, targetDate, onTimeUp, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimeUp();
    }
    return timeLeft;
  }

  const { t } = useTranslate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <motion.div 
      className="bg-gray-800 p-4 rounded-lg shadow-lg text-center space-y-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4">{event}</h2>
      <div className="flex justify-around space-x-2">
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm">{t('days')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm">{t('hours')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm">{t('minute-key')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm">{t('seconds')}</div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
      >
        {t('remove')}
      </button>
    </motion.div>
  );
};

export default Countdown;

// src/App.tsx
import { useState } from 'react';
import TimerForm from './components/TimerForm';
import TimerList from './components/TimerList';
import { LangSelector } from './components/LanguageDropdown'; // Import the language selector
import { Toaster } from 'react-hot-toast';
import { useTranslate } from '@tolgee/react';
interface Timer {
  event: string;
  targetDate: string;
}

const App: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const { t } = useTranslate();
  const addTimer = (event: string, targetDate: string) => {
    setTimers([...timers, { event, targetDate }]);
  };

  console.log()

  const removeTimer = (index: number) => {
    setTimers(timers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" />
      <div className="text-center">

        <h1 className="text-4xl mb-8">{t('app-title')}</h1>
        <LangSelector />  
      </div>
      <TimerForm addTimer={addTimer} />
      <TimerList timers={timers} removeTimer={removeTimer} />
    </div>
  );
};

export default App;

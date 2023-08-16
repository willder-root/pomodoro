import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer defaultPomodoroTimer={10}
      shortRestTimer={5}
      longerRestTime={15}
      cycle={2}/>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useInterval } from '../../hooks/useInterval';
import ButtonDefault from '../ButtonDefault';
import Timer from '../Timer';
import { secondToTimer } from '../../utils/secondsToTime';
interface Props {
    defaultPomodoroTimer: number;
    shortRestTimer: number;
    longerRestTime: number;
    cycle: number;
}
const PomodoroTimer = (props: Props): JSX.Element => {
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [cycles, setCycles] = React.useState(0);
    const [pomodoro, setPomodoro] = React.useState(0);
    const [pomodoroTotal, setPomodoroTotal] = React.useState(0);
    const [totalWork, setTotalWork] = React.useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);
        if (working) setTotalWork(totalWork + 1);
    }, timeCounting
        ? 1000 : null);

    React.useEffect(() => {
        if (working) {
            document.body.classList.add('working');
        } else {
            document.body.classList.remove('working');
        }
    }, [working]);

    React.useEffect(() => {
        if (mainTime === 0) {
            working ? stopWork() : startWork();
        }
    }, [mainTime]);

    useEffect(() => {
        if (pomodoro === props.cycle) {
            setPomodoro(0);
            setCycles(cycles + 1);
            setMainTime(props.longerRestTime)
        }
    }, [pomodoro])

    const stopWork = () => {
        if (working && timeCounting) {
            setPomodoroTotal(pomodoroTotal + 1);
            setPomodoro(pomodoro + 1);
        }
        setWorking(false);
        console.log(pomodoro);
        setMainTime(props.shortRestTimer);
        if (!timeCounting) setTimeCounting(true);
    };



    const startWork = () => {
        setTimeCounting(true);
        setMainTime(props.defaultPomodoroTimer);

        setWorking(true);
    }

    const stopCounting = () => {
        setTimeCounting(false);
    }

    const startCounting = () => {
        setTimeCounting(true);
    }

    return (
        <div className="pomodoro">
            <h2>Você está estudando</h2>
            <Timer mainTime={mainTime} />
            <div className="control">
                <ButtonDefault text='work' click={startWork} />
                <ButtonDefault text='short' click={stopWork} />
                {timeCounting ? <ButtonDefault text='pause' click={stopCounting} /> : <ButtonDefault text='start' click={startCounting} />}
            </div>
            <div className="details">
                <p>Details:</p>
                <p>Cycles: {cycles}</p>
                <p>Total working time: {secondToTimer(totalWork)}</p>
                <p>time Blocks(pomodoros): {pomodoroTotal}</p>
            </div>
        </div>
    );
};
export default PomodoroTimer;
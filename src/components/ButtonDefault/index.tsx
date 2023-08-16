import { click } from '@testing-library/user-event/dist/click';
import React from 'react';

interface Props{
    text: string;
    click?: () => void;
    className?: string;
}

const ButtonDefault = (props: Props): JSX.Element => {
    return <button 
    onClick={props.click}
    className={props.className}
    >{props.text}</button>
}

export default ButtonDefault;
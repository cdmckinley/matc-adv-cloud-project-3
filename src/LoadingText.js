import { useState } from "react";

export default () => {
    const getQuarterOfSecond = () => Date.now() / 250 % 4;

    const [loadingTextTrail, updateLoadingTextTrail] = useState('');

    // Thanks to https://stackoverflow.com/questions/65049812/how-to-call-a-function-every-minute-in-a-react-component
    // and https://stackoverflow.com/questions/52889152/multiply-a-string-in-js
    setInterval(
        () => updateLoadingTextTrail('.'.repeat(getQuarterOfSecond())),
        250
    )

    return (
        <span>Loading{loadingTextTrail}</span>
    )
};
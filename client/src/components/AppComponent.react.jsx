import React, { useState, useMemo, useEffect } from 'react';

export default function AppComponent() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    /**
     * useMemo takes in two args: a function that returns some function call
     * that may or may not run & an array containing a variable that, if changed,
     * will cause useMemo to run the return function call.
     * 
     * If number changes then slowFunction will run, else a cached value will be returned 
     * if number stays the same.
     */
    const doubleNumber = useMemo(() => {
        return slowFunction(number)
    }, [number]);

    /**
     * If the value dark changes (if the dark theme is applied/removed) themeStyles will reference
     * a new object containing the updated style, else if the dark value stays the same themeStyles
     * will reference the same object.
     */
    const themeStyles = useMemo(() => {
        return {
            backgroundColor: dark ? 'black' : 'white',
            color: dark ? 'white' : 'black'
        }
    }, [dark]);

    // const themeStyles = {
    //     backgroundColor: dark ? 'black' : 'white',
    //     color: dark ? 'white' : 'black'
    // };

    /**
     * If we kept the commented out code above, themeStyles would reference different points in memory
     * since a new themeStyles object would be created after each re-render.
     * 
     * By using useMemo with themeStyles in the block above, themeStyles will only refer to a new object if 
     * the value dark changes.
     */
    useEffect(() => {
        console.log('Theme changed');
    }, [themeStyles]);
    

    return (
        <>
            <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
            <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
            <div style={themeStyles}>{doubleNumber}</div>
        </>
    )
}

/**
 * num: an integer
 * returns: a value twice the amount of num
 * 
 * slowFunction simulates how a slow, long running, complex function would run.
 * The for loop iterates until 'i' reaches 1 billion, returning num*2 afterwards.
 */
function slowFunction(num) {
    console.log('Calling Slow Function');
    for (let i = 0; i < 1000000000; i++) {}
    return num * 2;
}

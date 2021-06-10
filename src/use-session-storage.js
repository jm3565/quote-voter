import {useState, useEffect} from 'react'

const useSessionStorage = (key, initialValue = '') => {
    const [value, setValue] = useState(
        sessionStorage.getItem(key) || initialValue
    );

    useEffect(() => {
        sessionStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;
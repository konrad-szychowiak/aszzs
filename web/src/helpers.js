import {useEffect, useState} from 'react';

export function useGetAsync(
    initialPromise,
    {dependencies = [], initialCall = true} = {}
) {
    const [isInitialCall, setIsInitialCall] = useState(true);
    const [value, setValue] = useState(undefined);

    function call(...args) {
        initialPromise(...args).then(setValue);
    }

    useEffect(() => {
        if (isInitialCall) {
            setIsInitialCall(false);
            if (!initialCall) return;
        }
        call();
    }, dependencies);

    return {value, setValue, call};
}

export function Product(apiProduct) {
    return {
        ...apiProduct,
        level() {
            if (this.reserve === 0) return 'no'
            else if (this.reserve > this.medium) return 'safe'
            else if (this.reserve <= this.critical) return 'critical'
            return 'medium'
        },
    }
}
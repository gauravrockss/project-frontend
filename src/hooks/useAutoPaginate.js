import { useCallback, useEffect, useState } from 'react';

const useAutoPaginate = ({ container, cb, totalPages }) => {
    const [pageNo, setPageNo] = useState(1);
    const [initialData, setInitialData] = useState(false);

    const element = container || window;
    console.log({ element });

    const handleScroll = useCallback(() => {
        const height = element.scrollHeight;
        const scroll = element.scrollTop;
        const mainHeight = element.offsetHeight;

        console.log({ height, scroll, mainHeight });

        if (mainHeight + scroll + 1 >= height) {
            if (pageNo < totalPages) {
                setPageNo(pageNo + 1);
                cb(pageNo + 1);
            }
        }
    }, [totalPages, setPageNo, pageNo, cb, element]);

    useEffect(() => {
        if (initialData) return;
        cb(1);
        setInitialData(true);
    }, [cb, initialData]);

    useEffect(() => {
        element.addEventListener('scroll', handleScroll);

        return () => element.removeEventListener('scroll', handleScroll);
    }, [handleScroll, element]);
};

export default useAutoPaginate;

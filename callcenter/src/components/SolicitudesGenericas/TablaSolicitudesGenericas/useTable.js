import { useEffect, useState } from 'react';

const prop = (key) => (o) => o[key];
const sortCallback = (fn, direction) => (a, b) => (fn(a) <= fn(b) ? -1 : 1) * direction;

const defaultConfig = {
    orderBy: '',
    isAsc: true,
    filter: () => true
};

const useTable = (data, initialConfig) => {
    const [config, setConfig] = useState({ ...defaultConfig, ...initialConfig });
    const [rows, setRows] = useState(data);

    useEffect(() => {
        const _rows = data
            .slice()
            .filter(config.filter)
            .sort(sortCallback(prop(config.orderBy), config.isAsc ? 1 : -1));
        setRows(_rows);
    }, [config.orderBy, config.isAsc, config.filter, data]);

    return { rows, isAsc: config.isAsc, setConfig };
};

export default useTable;

import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalSearchFilter = ({ searchKey, setSearchKey }) => {
    const [value, setValue] = useState(searchKey);

    const handleDebounce = useAsyncDebounce((value) => {
        setSearchKey(value || undefined);
    }, 1000);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => {
                e.stopPropagation();
                setValue(e.target.value);
                handleDebounce(e.target.value);
            }}
        />
    );
};

export default GlobalSearchFilter;

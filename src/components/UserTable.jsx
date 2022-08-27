import React, { useEffect, useMemo, useState } from 'react';
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './constants';
import './UserTable.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';
import GlobalSearchFilter from './GlobalFilter';
import { Pagination } from '@mui/material';

const UserTable = () => {
    const [data, setData] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const getAllUsers = async () => {
        const API_URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
        try {
            //   const response = await axios.get(API_URL);
            //   setData(response.data);
            //   return response.data;
            setData(MOCK_DATA);
            return MOCK_DATA;
        } catch (err) {
            console.log('Something went wrong');
            return [];
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const columns = useMemo(() => COLUMNS, []);
    //     const data = useMemo(() => userData, []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter, pageIndex } = state;

    return (
        <div className="main-component">
            <GlobalSearchFilter
                searchKey={globalFilter}
                setSearchKey={setGlobalFilter}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) => (
                                <th
                                    key={idx}
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr key={index} {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => (
                                    <td key={idx} {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <div>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of
                        {/* {pageOptions.length} , {pageCount} both will give us same result give  */}
                        {pageOptions.length}
                    </strong>
                </div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>
            </div>
            <Pagination
                variant="outlined"
                onChange={(event, newPage) => {
                    gotoPage(newPage - 1);
                }}
                page={5}
                count={pageCount}
                defaultPage={1}
                showFirstButton
                showLastButton
                color="primary"
            />
        </div>
    );
};

export default UserTable;

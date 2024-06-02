import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy, Column, TableInstance } from 'react-table';

import useSearchStore from '@/stores/searchInput-store';

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends object>({ columns, data }: TableProps<T>) => {

  const { searchTerm } = useSearchStore();

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData || [],
    },
    useSortBy,
    usePagination
  ) as TableInstance<T> & {
    page: any[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    pageCount: number;
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    state: { pageIndex: number; pageSize: number };
  };

  return (
    <div className="overflow-x-auto">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

          {/* Tablae */}
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">

            {/* Head */}
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Cells */}
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>

          </table>

          {/* Pagination */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
              <button onClick={() => nextPage()} disabled={!canNextPage} >Next </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-x-2">
                <span className="text-sm text-gray-700">
                  Page <span className="font-medium">{pageIndex + 1}</span> of {pageOptions.length}
                </span>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} > First </button>
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} > Previous </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} > Last </button>
                </nav>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Table;


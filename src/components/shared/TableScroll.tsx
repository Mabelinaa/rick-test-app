//import React, { useMemo, useState } from 'react';
//import { useTable, usePagination, useSortBy, Column, TableInstance } from 'react-table';
//import InfiniteScroll from 'react-infinite-scroll-component';
//
//import { fetchEpisodes } from '@/utils/api-fetch-list';
//import { Spinner } from '../ui/spinner';
//
//import useSearchStore from '@/stores/searchInput-store';
//
//interface TableProps<T extends object> {
//  columns: Column<T>[];
//  data: any[];
//  pageProps: number;
//  setPageProps: (page: any) => void;
//}
//
//const Table = ({ columns, data, pageProps, setPageProps }: TableProps<T>) => {
//  const [itemsList, setItemsList] = useState(data);
//  const { searchTerm } = useSearchStore();
//
//  const filteredData = useMemo(() => {
//    return itemsList.filter((item) => {
//      return Object.values(item).some((value) => {
//        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
//      });
//    });
//  }, [itemsList, searchTerm]);
//
//  const fetchMoreEpisodes = async () => {
//    const nextPage = pageProps + 1;
//    const newItemsList = await fetchEpisodes(nextPage);
//    console.log("newItems: " + newItemsList);
//    setItemsList((prevItems) => [...prevItems, ...newItemsList]);
//    setPageProps(nextPage);
//  };
//
//  const {
//    getTableProps,
//    getTableBodyProps,
//    headerGroups,
//    prepareRow,
//    rows,
//    page,
//  } = useTable(
//    {
//      columns,
//      data: filteredData || [],
//      initialState: { pageindex: 0, pageSize: 200 }, // Asegúrate de pasar el pageIndex inicial
//    },
//    useSortBy,
//    usePagination
//  ) as TableInstance;
//
//  return (
//    <div className="overflow-x-auto">
//      <div className="py-2 align-middle inline-block min-w-full">
//        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//          <InfiniteScroll
//            dataLength={rows.length}
//            next={fetchMoreEpisodes}
//            hasMore={true}
//            loader={<Spinner />} // Puedes personalizar el loader aquí
//          >
//            {/* Tabla */}
//            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//              {/* Cabeceras */}
//              <thead className="bg-gray-50">
//                {headerGroups.map((headerGroup, headerGroupIndex) => (
//                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
//                    {headerGroup.headers.map((column, columnIndex) => (
//                      <th
//                        key={columnIndex}
//                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                      >
//                        {column.render('Header')}
//                      </th>
//                    ))}
//                  </tr>
//                ))}
//              </thead>
//              {/* Celdas */}
//              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//                {page.map((row, rowIndex) => {
//                  prepareRow(row);
//                  return (
//                    <tr {...row.getRowProps()} key={rowIndex}>
//                      {row.cells.map((cell, cellIndex) => (
//                        <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4 whitespace-nowrap">
//                          {cell.render('Cell')}
//                        </td>
//                      ))}
//                    </tr>
//                  );
//                })}
//              </tbody>
//            </table>
//
//          </InfiniteScroll>
//          {/* Botones de navegación 
//          <div className="py-3 flex items-center justify-between">
//            <div className="flex-1 flex justify-between sm:hidden">
//              <button onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
//              <button onClick={() => nextPage()} disabled={!canNextPage} >Next </button>
//            </div>
//            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//              <div className="flex gap-x-2">
//                <span className="text-sm text-gray-700">
//                  Page <span className="font-medium">{pageIndex + 1}</span> of {pageOptions.length}
//                </span>
//              </div>
//              <div>
//                <nav
//                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                  aria-label="Pagination"
//                >
//                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} > First </button>
//                  <button onClick={() => previousPage()} disabled={!canPreviousPage} > Previous </button>
//                  <button onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
//                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} > Last </button>
//                </nav>
//              </div>
//            </div>
//          </div>*/}
//          
//        </div>
//      </div>
//    </div>
//  );
//};
//
//export default Table;


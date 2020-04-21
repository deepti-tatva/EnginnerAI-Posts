import React, { useState, useEffect, useCallback } from 'react';
import CustomContainer from '../Components/CustomContainer';
import Header from '../Components/Header';
import CustomDialog from '../Components/CustomDialog';
import MUIDataTable from 'mui-datatables';
import { getApiData } from '../Services/AppService';
import { HTTP_STATUS_CODE, ERROR_MESSAGES, API_TIMER, ROWS_COUNT_PER_PAGE } from '../Helper/Constants';

export const HomePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [content, setContent] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filterList, setFilterList] = useState([]);

    const columns = [
        {
            name: 'title',
            label: 'Title',
            options: {
                filter: true,
                filterList: filterList && filterList.length> 0 && filterList[0].length > 0 ? filterList[0] : null,
            }
        },
        {
            name: 'url',
            label: 'URL',
            options: {
                filter: false,
                filterList: filterList && filterList.length> 0 && filterList[1].length > 0 ? filterList[1] : null,
            }
        },
        {
            name: 'created_at',
            label: 'Created At',
            options: {
                filter: true,
                searchable: false,
                filterList: filterList && filterList.length> 0 && filterList[2].length > 0 ? filterList[2] : null,
            }
        },
        {
            name: 'author',
            label: 'Author',
            options: {
                filter: false,
                filterList: filterList && filterList.length> 0 && filterList[3].length > 0 ? filterList[3] : null,
            }
        },
        {
            name: 'points',
            label: 'Points',
            options: {
                filter: false,
                searchable: false,
                display: false,
                filterList: filterList && filterList.length> 0 && filterList[4].length > 0 ? filterList[4] : null,
            }
        },
        {
            name: 'story_text',
            label: 'story_text',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'comment_text',
            label: 'comment_text',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'num_comments',
            label: 'num_comments',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'story_id',
            label: 'story_id',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'story_title',
            label: 'story_title',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'story_url',
            label: 'story_url',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'parent_id',
            label: 'parent_id',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'created_at_i',
            label: 'created_at_i',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: '_tags',
            label: '_tags',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: 'objectID',
            label: 'objectID',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
        {
            name: '_highlightResult',
            label: '_highlightResult',
            options: {
                filter: false,
                searchable: false,
                display: false,
            }
        },
    ]

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setPageCount((pageCount) => pageCount + 1);
        }, API_TIMER);

        return (() => {
            clearInterval(setInterval);
        })
    }, []);

    useEffect(() => {
        getRowsData(pageCount);
    }, [pageCount]);

    const getRowsData = async (pageCount) => {
        const url = "https://hn.algolia.com/api/v1/search_by_date";
        const urlData = {
            tags: 'story',
            page: pageCount
        }
        const response = await getApiData(url, urlData);

        if (response.status === HTTP_STATUS_CODE.Success) {
            if(response.data && response.data.hits)
            {
                const mergedRows = [...rows, ...response.data.hits]
                setRows(mergedRows);
            }
        }
        else if (response.status === HTTP_STATUS_CODE.InternalServer) {
            alert(ERROR_MESSAGES.InternalServer);
        }
        else {
            alert(ERROR_MESSAGES.Error);
        }

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRowClick = useCallback((rowData) =>
    {
        const jsonData = JSON.stringify(rowData);
        setContent(jsonData);
        setOpen(true);
    },[]);

    const handleSearchChange = useCallback((text) => {
        setSearchText(text);
    },[]);

    const handleFilterChange = useCallback((data) => {
        setFilterList(data);
    },[]);

    const options = {
        responsive:'scroll',
        filterType:'dropdown',
        onRowClick:(rowData) => handleRowClick(rowData),
        rowsPerPage:ROWS_COUNT_PER_PAGE,
        rowsPerPageOptions:[10,20,40],
        selectableRows:'none',
        print:false,
        download:false,
        viewColumns:false,
        onSearchChange: (value) => handleSearchChange(value),
        searchText: searchText,
        onFilterChange: (columnChanged,filterList) => handleFilterChange(filterList),
      };

    return (
        <>
            <Header title="Posts Information"></Header>
            <CustomContainer>
                <MUIDataTable
                    title={"Posts"}
                    data={rows}
                    columns={columns}
                    options={options}
                />
                <CustomDialog title="Post in JSON" open={open} content={content} onClose={handleClose}></CustomDialog>
            </CustomContainer>
        </>
    )
}
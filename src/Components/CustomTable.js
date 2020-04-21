import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';

//column format
//{ id: 'name', label: 'Name', minWidth: 170, search:true },


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function CustomTable(props) {
    const classes = useStyles();
    const { rows, columns, rowsPage } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPage);
    const [searchText, setSearchText] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let filteredRows = [...rows];

    let filteredColumns = [];
    filteredColumns.push(columns.map((data) => {
        if (data.search)
            return data.id;
    }));

    if (searchText) {
        filteredRows = rows.filter((data) => {
            let res = false;
            filteredColumns && filteredColumns.length > 0 && filteredColumns.map((col) => {
                if (typeof data[col] === 'string' && data[col].toLowerCase().includes(searchText)) {
                    res = res || true;
                }
            });
        if (res === true) {
                return data;
            }
    }
       )
}

const handleSearchChange = (e) => {
    setSearchText(e.target.value);
}

return (
    <Paper className={classes.root}>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search here"
                inputProps={{ 'aria-label': 'Search here' }}
                onChange={handleSearchChange}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 20, 40]}
            component="div"
            count={!searchText ? rows.length : filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
);
}

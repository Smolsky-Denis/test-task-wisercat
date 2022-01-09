import React, {useState} from 'react';
import {Box, Modal, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table} from "@mui/material";

import {ListItem} from "../ListItem/ListItem";
import {ListItemDetails} from "../ListItemDetails/ListItemDetails";
import {SortableTableCell} from "../SortableTableCell/SortableTableCell";
import utils from "../../common/utils";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";

const style = {
    container: {
        minWidth: '650px',
        width: '40%',
        margin: '50px auto'
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    table: {
        minWidth: 650
    }
};

const useStyles = makeStyles({
    closeModal: {
        cursor: 'pointer',
        fontSize: '2em',
        position: 'absolute',
        top: '0px',
        right: '15px'
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function TableWrapper({list}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');

    const handleClick = (id) => {
        utils.fetch(`/group.free.beeceptor.com/item/${id}`, {
            method: 'GET'
        }).then(data => {
            setItem(data);
            return true
        }).then(open => setOpen(open))
            .catch((error) => {
                navigate("/error", {replace: true});
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const changeOrder = (property) => () => {
        const asc = orderBy === property && order === 'asc';

        setOrderBy(property);
        setOrder(asc ? 'desc' : 'asc');
    };

    const comparator = getComparator(order, orderBy);

    return (
        <TableContainer sx={style.container} component={Paper}>
            <Table sx={style.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <SortableTableCell
                            value="id"
                            orderBy={orderBy}
                            order={order}
                            onClick={changeOrder}
                            name="ID"
                        />
                        <SortableTableCell
                            align="left"
                            value="name"
                            orderBy={orderBy}
                            order={order}
                            onClick={changeOrder}
                            name="Name"
                        />
                        <SortableTableCell
                            align="left"
                            value="description"
                            orderBy={orderBy}
                            order={order}
                            onClick={changeOrder}
                            name="Description"
                        />
                        <TableCell align="left"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.sort(comparator).map((item) => (
                        <ListItem
                            key={item.id}
                            item={item}
                            handleClick={handleClick}
                        />
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.box}>
                    <span
                        className={classes.closeModal}
                        onClick={handleClose}>
                        &#xd7;
                    </span>
                    <ListItemDetails
                        item={item}
                        onClose={handleClose}
                    />
                </Box>
            </Modal>
        </TableContainer>
    );
}
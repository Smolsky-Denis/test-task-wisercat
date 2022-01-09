import {TableCell} from "@mui/material";
import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    arrowSize: {
        width: '10px',
        display: 'inline-block'
    },
    arrowMargin: {
        marginLeft: '40px'
    }
});

const descArrowCode = "\u25B2";
const ascArrowCode = "\u25BC";

export function SortableTableCell({value, orderBy, order, onClick, name, ...rest}) {
    const classes = useStyles();
    const arrow = (order === 'asc' ? ascArrowCode : descArrowCode);

    return (
        <TableCell
            align="left"
            onClick={onClick(value)}
            {...rest}
        >
            <span>{name}</span>
            <div className={classes.arrowSize}>
                <span className={classes.arrowMargin}>{orderBy === value && arrow}</span>
            </div>
        </TableCell>
    )
}
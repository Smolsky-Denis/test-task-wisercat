import React from "react";

import { Button, TableCell, TableRow } from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#5a595c',
            contrastText: '#fff',
        },
    },
});

const style = {
    button: {
        borderRadius: 40
    }

}

const useStyles = makeStyles({
    columnId: {
        width: '40px'
    },
    columnName: {
        minWidth: '50px',
        width: '30%'
    },
    columnDescription: {
        minWidth: '50px',
        width: '30%'
    },
    columnButton: {
        width: '50px'
    }

});

export function ListItem({item, handleClick}) {
    const classes = useStyles();
    const {id, name, description} = item;

    const onClick = () => handleClick(id);

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell
                component="th"
                scope="row"
                align="right"
                className={classes.columnId}
            >
                {id}
            </TableCell>
            <TableCell
                align="left"
                className={classes.columnName}
            >
                {name}
            </TableCell>
            <TableCell
                align="left"
                className={classes.columnDescription}
            >
                {description}
            </TableCell>
            <TableCell
                align="right"
                className={classes.columnButton}
            >
                <ThemeProvider theme={theme}>
                    <Button
                        onClick={onClick}
                        sx={style.button}
                        variant="outlined"
                        color="neutral"
                    >
                        Детали
                    </Button>
                </ThemeProvider>
            </TableCell>
        </TableRow>
    )
}
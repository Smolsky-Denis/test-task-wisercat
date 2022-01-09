import React from 'react';
import alert from '../icons/alert.png'
import {Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&& div': {
            display: 'flex',
            flexDirection: 'column'
        },
        '&& img': {
            display: 'block',
            maxWidth: '400px',
            margin: 'auto'
        }
    },
    textCenter: {
        marginTop: '20px',
        textAlign: "center"
    }
});

const ErrorPages = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/", {replace: true});
    }
    return (
        <div className={classes.container}>
            <div>
                <img src={alert} alt="alert"/>
                <Typography className={classes.textCenter} variant="h6">Что-то пошло не так.</Typography>
                <Button variant={"contained"} onClick={handleClick}>Вернуться назад</Button>
            </div>
        </div>
    );
};

export default ErrorPages;
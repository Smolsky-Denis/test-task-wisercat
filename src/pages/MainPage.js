import React, {useEffect, useState} from 'react';
import {TableWrapper} from "../components/TableWrapper/TableWrapper";
import utils from "../common/utils";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    container: {
        width: '100%'
    }
});

const MainPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [list, setList] = useState([])

    useEffect(() => {
        utils.fetch('/group.free.beeceptor.com/list', {
            method: 'GET'
        }).then(data => {
            setList(data)
        }).catch((error) => {
            navigate("/error", {replace: true});
        })
    }, [])

    return (
        <div className={classes.container}>
            <TableWrapper list={list}/>
        </div>
    );
};

export default MainPage;
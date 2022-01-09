import React from "react";
import {Switch, Button, TextField, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles'
import {useForm, Controller} from "react-hook-form";
import utils from "../../common/utils";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    error: {
        color: '#d32f2f',
        marginTop: '20px',
    },
    form: {
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    formInput: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    formInputSwitch: {
        justifyContent: 'start',
    },
    formController: {
        width: '100%',
        marginLeft: '10px',
    },
    formButton: {
        display: 'flex',
        justifyContent: 'end',
        '&& button': {
            color: '#000'
        }
    }
});

const style = {
    label: {
        marginRight: '15px'
    }
};

export function ListItemDetails({item, onClose}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const {name, description, active, properties} = item;

    const parsedProps = properties.reduce((prev, current) => {
        return {...prev, [current.name]: current.value}
    }, {}) || {};

    const renderError = ({name, description, ...rest}) => {
        const error = [];

        if (name?.type === 'required') {
            error.push("Name is required");
        }
        if (name?.type === 'maxLength') {
            error.push("Name is too long");
        }
        if (description?.type === 'required') {
            error.push("Description is required");
        }
        if (description?.type === 'maxLength') {
            error.push("Description is too long");
        }
        if (rest) {
            for (const key in rest) {
                if (rest[key]?.type === 'maxLength') {
                    error.push(`Property ${key} is too long`);
                }
            }
        }

        return error.length > 0 ? error.join(". ") : null;
    };

    const {formState: {errors}, handleSubmit, control} = useForm({
        defaultValues: {
            name,
            description,
            active,
            ...parsedProps,
        }
    });

    const onSubmit = ({active, name, description, ...rest}) => {
        const body = {
            active,
            description,
            name,
        };

        if (rest) {
            body.properties = [];
            for (const key in rest) {
                body.properties.push({name: key, value: rest[key]})
            }
        }

        utils.fetch('https://www.onliner.by/', {
            method: 'POST',
            body
        }).then(data => {
            console.log('Success!')
        }).catch((error) => {
            navigate("/error", {replace: true});
        })
    };

    const handleCancel = () => {
        onClose();
    };

    const error = renderError(errors || {});

    return (
        <div>
            <div className={classes.form}>
                <label className={classes.formInput} htmlFor="name">
                    <Typography sx={style.label} variant="h6">Name</Typography>
                    <Controller
                        name="name"
                        control={control}
                        rules={{required: true, maxLength: 25}}
                        render={({field}) => (
                            <TextField variant="standard"
                                       className={classes.formController}
                                       error={Boolean(errors.name)} {...field} />)}
                    />
                </label>
                <label className={classes.formInput} htmlFor="description">
                    <Typography  sx={style.label} variant="h6">Description</Typography>
                    <Controller
                        name="description"
                        control={control}
                        rules={{required: true, maxLength: 100}}
                        render={({field}) => (
                            <TextField variant="standard"
                                       className={classes.formController}
                                       error={Boolean(errors.description)} {...field} />)}
                    />
                </label>
                <label className={`${classes.formInput} ${classes.formInputSwitch}`} htmlFor="active">
                    <Typography variant="h6">Not active</Typography>
                    <Controller
                        name="active"
                        control={control}
                        render={({field}) =>
                            <Switch checked={field.value} inputProps={{'aria-label': 'controlled'}} {...field} />
                        }
                    />
                    <Typography variant="h6">Active</Typography>
                </label>

                    {properties.map(({name}) => (
                        <label key={name} className={classes.formInput} htmlFor="name">
                            <Typography sx={style.label} variant="h6" key={name}>
                                {name}
                            </Typography>
                            <Controller
                                name={name}
                                control={control}
                                rules={{maxLength: 50}}
                                render={({field}) => (
                                    <TextField
                                        variant="standard"
                                        className={classes.formController}
                                        error={Boolean(errors[name])}
                                        {...field}
                                    />
                                )}
                            />
                        </label>)
                    )}

            </div>

            <div className={classes.error}>
                {error}
            </div>
            <div className={classes.formButton}>
                <Button onClick={handleSubmit(onSubmit)}>
                    Сохранить
                </Button>
                <Button autoFocus onClick={handleCancel}>
                    Отмена
                </Button>
            </div>
        </div>
    )
}
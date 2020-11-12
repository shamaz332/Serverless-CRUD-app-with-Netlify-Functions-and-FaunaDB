import React, { useEffect, useState } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
} const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export const ReadTodo = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [dataa, setData] = useState([])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        (async () => {
            await fetch("/.netlify/functions/readTodo")
                .then(res => res.json())

                .then(data => {
                    console.log(data)
                    setData(data)
                })
        })()
    }, [])

    const deleteMessage = async message => {

        await fetch("/.netlify/functions/deleteTodo", {
            method: "post",
            body: JSON.stringify({ id: message.ref["@ref"].id }),
        })

    }
    return (
        <div>

            {dataa === null || dataa === undefined ? <div>leading</div> :
                <div>
                    {dataa.map((mes, i) => (
                        <div key={i}>
                            <p>{mes.data.detail}</p>
                            <button onClick={() => {
                                deleteMessage(mes)
                            }}> Delete</button>
                            <button onClick={() => {
                                handleOpen
                            }}> Update</button>
                        </div>

                    ))}
                </div>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <h1>mode;</h1>
            </Modal>
            <button onClick={() => {
                handleOpen()
            }}> Update</button>
        </div>
    )
}

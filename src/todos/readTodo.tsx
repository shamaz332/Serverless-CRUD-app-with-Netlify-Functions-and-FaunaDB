import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Field, Form, Formik } from 'formik';
import { TextField } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

// Data showing  

export const ReadTodo = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [todoToUpdate, setTodoToUpdate] = useState()

    interface Data {
        ref: object
        ts: number
        data: {
          message: string
        }
      }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [dataa, setData] = useState([])


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

// Deleting toto 

    const deleteMessage = async message => {

        await fetch("/.netlify/functions/deleteTodo", {
            method: "post",
            body: JSON.stringify({ id: message.ref["@ref"].id }),
        })

    }

// Update Todo
const updateTodoId = (id: string) => {
    var updateData = dataa.find(mes => mes.ref["@ref"].id === id)
    setTodoToUpdate(updateData)
  }
const todoUpdate = (
    <div>
      <Formik
        onSubmit={(value, actions) => {
          fetch("/.netlify/functions/updateTodo", {
            method: "put",
            body: JSON.stringify({
              message: value.message,
              id: todoToUpdate.ref["@ref"].id,
            }),
          })
        }}
        initialValues={{
          message: todoToUpdate !== undefined ? todoToUpdate.data.message : "",
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit} className="form">
            <Field
              as={TextField}
              multiline
              rowMax={4}
              type="text"
              name="message"
              id="message"
              className="field"
            />
            <div className="btn-form">
              <button type="submit">update</button>
              <button type="button" onClick={handleClose}>
                close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
    return (
        <div>

            {dataa === null || dataa === undefined ? <div>leading</div> :
                <div>
                    <hr/>
                    {dataa.map((mes, i) => (
                        <div key={i}>
                            <p>{mes.data.detail}</p>
                            <button onClick={() => {
                                deleteMessage(mes)
                            }}> Delete</button>
                            <button onClick={() => {
                                handleOpen()
                            }}> Update</button>
                                <hr/>
                        </div>

                    ))}
                </div>
            }
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                      {todoUpdate}
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}

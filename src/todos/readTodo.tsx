import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Field, Form, Formik } from 'formik';
import { TextField } from '@material-ui/core';



const useStyles = makeStyles((theme) =>
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

// types

// Data showing  


export const ReadTodo = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState<null | Data[]>()
    const [fetchData, setFetchData] = useState(false)
    const [todo, setTodo] = useState(undefined)
    const [update, setUpdate] = useState(false)
    

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
 

    useEffect(() => {
        (async () => {
            await fetch("/.netlify/functions/readTodo")
                .then(res => res.json())

                .then(data => {
                    console.log(data)
                    setData(data)
                })
        })()
    }, [fetchData])

// Deleting toto 

    const deleteMessage = async message => {

        await fetch("/.netlify/functions/deleteTodo", {
            method: "post",
            body: JSON.stringify({ id: message.ref["@ref"].id }),
        })
        
        setFetchData(true)

    }


// updating data

  const updateTodo = (id: string) => {
    var updateData = data.find(mesg => mesg.ref["@ref"].id === id)
    setTodo(updateData)
  }
const todoUpdateWrap = (
    <div style={modalStyle} className={classes.paper}>
      <Formik
        onSubmit={(value, actions) => {
          fetch("/.netlify/functions/update", {
            method: "put",
            body: JSON.stringify({
              detail: value.message,
              id: todo.ref["@ref"].id,
            }),
          })
          setFetchData(true)
          actions.resetForm({
            values: {
              message: "",
            },
          })
          setFetchData(false)
          handleCloseUpdated()
        }}
        initialValues={{
          message: todo !== undefined ? todo.data.message : "",
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
              <button type="button" onClick={handleCloseUpdated}>
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

            {data === null || data === undefined ? <div>leading</div> :
                <div>
                    <hr/>
                    {data.map((mesg, i) => (
                        <div key={i}>
                            <p>{mesg.data.detail}</p>
                            <button onClick={() => {
                                deleteMessage(mes)
                            }}> Delete</button>
                            <button onClick={() => {
                                handleOpen()
                              updateTodo(mesg.ref["@ref"].id)
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
                  {todoUpdateWrap}
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}

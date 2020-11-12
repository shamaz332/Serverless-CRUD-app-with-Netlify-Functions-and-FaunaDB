import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
export const ReadTodo = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
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
                                handleOpen()
                            }}> Update</button>
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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
            
        </div>
    )
}

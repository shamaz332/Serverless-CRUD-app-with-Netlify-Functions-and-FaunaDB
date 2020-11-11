import React, { useEffect, useState } from 'react'




export const ReadTodo = () => {
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
                        </div>

                    ))}
                </div>
            }

        </div>
    )
}

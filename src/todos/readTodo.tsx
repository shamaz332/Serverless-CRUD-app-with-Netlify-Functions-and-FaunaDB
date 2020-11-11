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

    return (
        <div>

            {dataa === null || dataa === undefined ? <div>leading</div>:
<div>
            {dataa.map((mes, i) => (
                <div key={i}>
                    <p>{mes.data.detail}</p>
                </div>
            ))}
             </div>
            }
            
        </div>
    )
}

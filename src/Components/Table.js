import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Table() {

    const [field, setField] = useState([{ services: {} }])
    const [data, setData] = useState({})
    const [dataCount, setDataCount] = useState(0)

    const demoData = [
        { id: 2, title: "B", count: 2 },
        { id: 3, title: "c", count: 4 },
    ]

    const handleBlur = (e) => {
        if (e.target.name == "count") {
            setDataCount(dataCount + e.target.value)
        }
        let newData = { ...data }
        newData[e.target.name] = e.target.value;
        setData(newData)

    }

    const handleAdd = (bid) => {
        if (demoData.filter((did) => did.id == bid)) {
            const newData = { ...data, id: uuidv4() }
            setField([...field, newData])
        }


    }
    const handleRemove = (id, e) => {
        const newField = field.filter((fd) => fd.id !== id)
        setDataCount(0)
        setField(newField)
    }
    // console.log(field);
    return (

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Title
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Count
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        demoData.map((dt) =>
                            <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {dt.title}
                                </th>
                                <td className="py-4 px-6">
                                    {dt.count}
                                    <br />
                                    <button onClick={() => handleAdd(dt.id)} className="font-medium text-blue-600" >Add</button>
                                </td>
                                <td className="py-4 px-6 ">
                                    {
                                        field.map((fd) => <div className='flex '>
                                            {
                                                dt.count <= dataCount ? <input disabled type="text" className=' m-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' onBlur={handleBlur} name='count' placeholder='count' /> : <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlur} name='count' placeholder='count' />
                                            }

                                            <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlur} name='text' placeholder='Text' />
                                            <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' onBlur={handleBlur} name='dropdown' placeholder='DropDown' />
                                            <button className=" m-2 font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleRemove(fd.id)}  >Remove</button>
                                        </div>)
                                    }

                                </td>
                            </tr>
                        )
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Table
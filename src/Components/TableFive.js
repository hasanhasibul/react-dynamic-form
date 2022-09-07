import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { InputNumber } from 'antd';
import 'antd/dist/antd.css';
function TableFive() {

    const [count, setCount] = useState(0)
    const [remainingCount, setRemainingCount] = useState(false)
    const [message, setMessage] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [fieldValue, setFieldValue] = useState({})
    const [field, setField] = useState([{ id: uuidv4(), count: '0', text: '', dropdown: '', max: 4 }])

    const handleBlur = (e) => {
        if (e.target.name == "count" && e.target.value <= 4) {
            setMessage(null)
            setCount(parseInt(e.target.value))
        }
        let newfieldValue = { ...fieldValue, max: Math.abs(4 - totalCount), id: uuidv4() }
        newfieldValue[e.target.name] = e.target.value;
        setFieldValue(newfieldValue)
    }

    const handleChange = (id, value) => {
        // console.log(id, e)
        if (value && value <= 4) {
            setMessage(null)
            setCount(parseInt(value))
            const updateField = field.filter((item) => item.id == id)
            if (updateField.length) {
                updateField[0].count = value;
                // if ( ) {
                //     updateField[0].max = 4 - totalCount;
                // }
            }

        }

    }


    useEffect(() => {

        if (field.length > field.length - 1 && count == 0) {
            field[field.length - 1].count = 0
        }
        let totalCount = 0;
        field.map((item) =>
            totalCount = parseInt(item.count) + parseInt(totalCount)
        )
        setTotalCount(totalCount)

        if (totalCount == 4) {
            setRemainingCount(true)
            field.map((item) => item.max = item.count)
        }

    }, [field, count])

    const handleAdd = () => {
        if (count > 0) {
            let newField = [...field, fieldValue]
            setField(newField)
            setCount(0)
        }
    }
    const handleKeyDown = (e) => {
        if (e.target.value > 4) {
            e.preventDefault();
            setMessage("quantity not be more then 4")
        }
    }

    const handleRemove = (id) => {
        if (field.length !== 1) {
            const remainField = field.filter((item) => item.id != id);
            setField(remainField)
            setRemainingCount(false)
        }
    }
    console.log(field, totalCount);


    return (

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
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
                    <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                            A
                        </th>
                        <td className="py-4 px-6">
                            4
                            <br />
                            {
                                count < 4 && totalCount < 4 && count > 0 ? <button onClick={handleAdd} className="font-medium text-blue-600" >Add</button> :
                                    <button disabled className=" cursor-not-allowed font-medium text-blue-600" >Add</button>
                            }

                        </td>
                        <td className="py-4 px-6 ">
                            {
                                field.map((item, i) => <div key={item.id} className='flex '>
                                    <InputNumber name='count' onKeyUp={handleKeyDown} onBlur={handleBlur} onChange={(value) => handleChange(item.id, value)} min={1} max={item.max} />

                                    {/* <input min="1" max='4' defaultValue={4 - totalCount}
                                        onKeyUp={handleKeyDown} onBlur={handleBlur} onChange={(e) => handleChange(item.id, e)} type="number" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' name='count' placeholder='count' /> */}

                                    <input type="text" onBlur={handleBlur} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' name='text' placeholder='Text' />

                                    <input type="text" onBlur={handleBlur} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' name='dropdown' placeholder='DropDown' />

                                    <button onClick={() => handleRemove(item.id)} className=" m-2 font-medium text-blue-600  hover:underline">Remove</button>
                                </div>)
                            }

                            {
                                message && <p className='text-black'>{message}</p>
                            }

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableFive
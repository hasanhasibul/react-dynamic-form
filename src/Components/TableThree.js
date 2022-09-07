import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const TableThree = () => {

    const [fieldValue, setFieldValue] = useState({});
    const [field, setField] = useState([{ title: '', dropDown: '', count: '0', id: '1' }]);
    const [count, setCount] = useState(parseInt(0));

    const [countTotal, setCountTotal] = useState(parseInt(0));

    const handleBlur = (id, e) => {
        if (e.target.name == 'count' && e.target.value) {
            const checkCount = field.filter((item) => item.id == id);
            if (checkCount.length) {
                checkCount[0].count = e.target.value;
                setCount(e.target.value)
                console.log(checkCount);
            }
        }
        const newFieldValue = { ...fieldValue }
        newFieldValue[e.target.name] = e.target.value
        setCount(parseInt(e.target.value))
        setFieldValue(newFieldValue)

    }

    useEffect(() => {
        let countTotal = parseInt(0);
        field.map((ct) => (
            countTotal = parseInt(ct.count) + countTotal
        ))
        setCountTotal(countTotal + count)
        console.log(countTotal, field)
    }, [field, count])

    const handleAdd = () => {
        if (countTotal <= 4) {
            const newFieldValue = { ...fieldValue, id: uuidv4() }
            const newField = [...field, newFieldValue]
            setField(newField)

        }

    }

    const handleRemove = (id) => {
        console.log(id);
        const newField = field.filter((ft) => ft.id !== id)
        setField(newField)
    }

    // console.log(countTotal, field)
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
                    <tr className="bg-gray-50 border-b ">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            B
                        </th>
                        <td className="py-4 px-6">
                            4
                            <br />
                            {
                                countTotal < 4 && count < 4 ? <button onClick={handleAdd} className="font-medium text-blue-600" >Add</button>
                                    :
                                    <button disabled onClick={handleAdd} className=" cursor-not-allowed font-medium text-blue-600" >Add</button>
                            }

                        </td>
                        <td className="py-4 px-6 ">

                            {
                                field.map((fd) =>
                                    <div key={fd.id} className='flex '>
                                        <input type="number" onBlur={(e) => handleBlur(fd.id, e)} defaultValue={count} min="1" max={Math.abs(4 - countTotal)} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='count' placeholder='count' />

                                        <input type="text" onBlur={(e) => handleBlur(fd.id, e)} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='text' placeholder='Text' />
                                        <input type="text" onBlur={(e) => handleBlur(fd.id, e)} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='dropdown' placeholder='DropDown' />
                                        <button onClick={() => handleRemove(fd.id)} className=" m-2 font-medium text-blue-600  hover:underline" >Remove</button>
                                    </div>
                                )
                            }
                            {countTotal >= 4 && <span className='text-red-400' > unavailable Quatity remove anyone </span>}

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableThree;

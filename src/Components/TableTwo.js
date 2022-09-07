import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function TableTwo() {

    const [field, setField] = useState([{ services: {} }])
    const [fieldSecond, setFieldSecond] = useState([
        { count: '', text: '', dropdown: '', id: 'c6f934e3-804e-4430-98ce-170d92a0718a' }
    ])
    const [data, setData] = useState({})
    const [dataSecond, setDataSecond] = useState({})
    const [dataCount, setDataCount] = useState(0)
    const [dataCountSecond, setDataCountSecond] = useState(0)

    const [defaultTwo, setDefaultTwo] = useState(1)

    const handleBlur = (e) => {
        if (e.target.name == "count") {
            setDataCount(parseInt(dataCount) + parseInt(e.target.value))
        }
        let newData = { ...data }
        newData[e.target.name] = e.target.value;
        setData(newData)

    }
    const handleBlurSecond = (e) => {
        if (e.target.name == "count") {
            setDataCountSecond(parseInt(dataCountSecond) + parseInt(e.target.value))
        }
        let newData = { ...dataSecond }
        newData[e.target.name] = e.target.value;
        setDataSecond(newData)
        //    setDataSecond(newData) newData[e.target.name] = e.target.value;


    }



    const handleAdd = (bid) => {
        // if (demoData.filter((did) => did.id == bid)) {
        const newData = { ...data, id: uuidv4() }
        setField([...field, newData])
        // }
    }
    const handleAddSecondRow = (bid) => {
        // if (demoData.filter((did) => did.id == bid)) {
        const newData = { ...dataSecond, id: uuidv4() }
        setFieldSecond([...fieldSecond, newData])
        // }
    }
    console.log(fieldSecond)
    const handleRemove = (id) => {
        const newField = field.filter((fd) => fd.id !== id)
        setDataCount(0)
        setField(newField)
    }

    const handleRemoveSecond = (id) => {
        const singF = fieldSecond.find((of) => of.id == id)
        console.log(singF)
        console.log(fieldSecond)
        const newField = fieldSecond.filter((fd) => fd.id !== id)
        // setDataCountSecond(newField[0].count)
        setFieldSecond(newField)
        // // console.log(newField)
    }
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
                    <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            A
                        </th>
                        <td className="py-4 px-6">
                            2
                            <br />
                            <button onClick={() => handleAdd()} className="font-medium text-blue-600" >Add</button>
                        </td>
                        <td className="py-4 px-6 ">
                            {
                                field.map((fd) => <div className='flex '>

                                    {
                                        dataCount >= 2 ? <input min="1" max="2" disabled type="number" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlur} name='count' placeholder='count' />
                                            :
                                            <input type="number" min="1" max="2" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlur} name='count' placeholder='count' />
                                    }

                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlur} name='text' placeholder='Text' />
                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' onBlur={handleBlur} name='dropdown' placeholder='DropDown' />
                                    <button className=" m-2 font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleRemove(fd.id)}  >Remove</button>
                                </div>)
                            }

                        </td>
                    </tr>

                    <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            B
                        </th>
                        <td className="py-4 px-6">
                            4
                            <br />


                            {
                                dataCountSecond >= parseInt(4) ? <button disabled onClick={() => handleAddSecondRow()} className="font-medium text-blue-600" >Add</button>
                                    :
                                    <button onClick={() => handleAddSecondRow()} className="font-medium text-blue-600" >Add</button>
                            }
                        </td>
                        <td className="py-4 px-6 ">
                            {
                                fieldSecond.length === 0 ? <div className='flex '>
                                    <input type="number" defaultValue={defaultTwo} min="1" max="4" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlurSecond} name='count' placeholder='count' />
                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlurSecond} name='text' placeholder='Text' />
                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' onBlur={handleBlurSecond} name='dropdown' placeholder='DropDown' />
                                    <button className=" m-2 font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleRemoveSecond()}  >Remove</button>
                                </div> : fieldSecond.map((fd) => <div className='flex '>
                                    <input type="number" defaultValue={defaultTwo} min="1" max="4" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlurSecond} name='count' placeholder='count' />
                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' onBlur={handleBlurSecond} name='text' placeholder='Text' />
                                    <input type="text" className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' onBlur={handleBlurSecond} name='dropdown' placeholder='DropDown' />
                                    <button className=" m-2 font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleRemoveSecond(fd.id)}  >Remove</button>
                                </div>)
                            }

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableTwo
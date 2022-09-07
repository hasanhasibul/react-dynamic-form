
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
export const RowComponents = ({ countLegth = 1 }) => {

    const [fieldDValue, setFieldDValue] = useState({});
    const [field, setField] = useState([]);
    const [countTotal, setCountTotal] = useState(parseInt(0));

    const handleDefaultBlur = (e) => {
        const newFieldValue = { ...fieldDValue }
        newFieldValue[e.target.name] = e.target.value
        setFieldDValue(newFieldValue)
    }

    useEffect(() => {
        let countTotal = parseInt(0);
        field.map((ct) => (
            countTotal = parseInt(ct.count) + parseInt(countTotal)
        ))
        setCountTotal(countTotal)
    }, [field])

    const handleAdd = () => {
        if (countTotal <= countLegth) {
            const newFieldValue = { ...fieldDValue, id: uuidv4() }
            const newField = [...field, newFieldValue]
            setField(newField)
        }

    }

    const handleRemove = (id) => {
        const newField = field.filter((ft) => ft.id !== id)
        setField(newField)

    }
    return (
        <tr className="bg-gray-50 border-b ">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                B
            </th>
            <td className="py-4 px-6">
                {countLegth}
                <br />
                {
                    countTotal < countLegth ? <button onClick={handleAdd} className="font-medium text-blue-600" >Add</button>
                        :
                        <button disabled onClick={handleAdd} className=" cursor-not-allowed font-medium text-blue-600" >Add</button>
                }

            </td>
            <td className="py-4 px-6 ">

                {
                    field.map((fd) =>
                        <div key={fd.id} className='flex '>
                            <input type="number" value={fd?.count} min="1" max={Math.abs(countLegth - countTotal)} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='count' placeholder='count' />

                            <input type="text" value={fd?.text} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='text' placeholder='Text' />

                            <select id="countries" value={fd.dropdown} className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
                                <option selected="">Choose a Option</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>

                            <button onClick={() => handleRemove(fd.id)} className=" m-2 font-medium text-blue-600  hover:underline" >Remove</button>
                        </div>
                    )
                }
                {countTotal >= countLegth && <span className='text-red-400' > unavailable Quatity remove anyone to set New Value or update  </span>
                }

                {
                    countTotal < countLegth && <div className='flex '>
                        <input type="number" required defaultValue={Math.abs(countLegth - countTotal)} onBlur={handleDefaultBlur} min="1" max={Math.abs(countLegth - countTotal)} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='count' placeholder='count' />
                        <input type="text" required onBlur={handleDefaultBlur} className=' m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5' name='text' placeholder='Text' />
                        <select id="countries" required name='dropdown' onBlur={handleDefaultBlur} className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
                            <option selected="">Choose a Option</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                    </div>
                }


            </td>
        </tr>
    )
}

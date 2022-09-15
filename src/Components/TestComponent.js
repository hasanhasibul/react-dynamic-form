import { useState } from "react";
import { useFieldArray } from "react-hook-form";

function TestComponent({ register, control, watch, limit, name: componentName }) {

    const {
        fields,
        append,
        remove,
        replace
    } = useFieldArray({
        control,
        name: componentName
    });

    const [text2, setText2] = useState(1)
    const [error, setError] = useState('')


    const handleChange = (e, index) => {
        setError('')
        const updatedData = watch(componentName)

        if (countTotal2() <= limit && e <= limit && e > 0 && e <= updatedData[index].text2) {
            setError('')
            replace(updatedData)
        }
        else {
            setError('total count can not be more then qtn');
        }
    };

    const handleText2 = (e, index) => {
        setError('')
        const updatedData = watch(componentName)
        console.log(e)
        if (e > 0 && e >= updatedData[index].qtn) {
            replace(updatedData)
        }
        else {
            setError('dropdown shoulb be greater then qtn');
        }
    }
    const handleText1 = (e, index) => {
        setError('')
        if (e !== 'hasib') {
            setError('secret key should match');
        }
        else {
            setError('');
        }
    }

    const countTotal2 = () => {
        const updatedData = watch(componentName)
        const totalCount = updatedData?.reduce(
            (totalCount, item) => parseInt(totalCount) + parseInt(item.qtn), 0
        );
        return totalCount;
    }

    const checkAvailability = () => {
        return countTotal() < limit ? true : false;
    };
    const countTotal = () => {
        const totalCount = fields?.reduce(
            (totalCount, item) => parseInt(totalCount) + parseInt(item.qtn), 0
        );
        return totalCount;
    }

    return (
        <tbody>
            <tr className="bg-gray-50 border-b dar:bg-gray-800 dar:border-gray-700">
                <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                    A
                </th>
                <td className="py-4 px-6">
                    {limit}
                    <button
                        disabled={!checkAvailability()}
                        className={`${!checkAvailability() ? "cursor-not-allowed " : ""
                            } font-medium text-blue-600`}
                        type="button"
                        onClick={() => {
                            append({ qtn: 1, text1: "", text2: 1 });
                        }}
                    >
                        ADD
                    </button>

                </td>
                <td className="py-4 px-6 ">
                    <ul>

                        {fields.map((item, index) => {

                            return (
                                <li className="flex" key={item.id}>
                                    <select
                                        className=" m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        value={item.text2}
                                        {...register(`${componentName}.${index}.text2`,
                                            {
                                                onChange: ((e) => handleText2(e.target.value, index))
                                            }

                                        )}
                                    >
                                        <option value='1'>1</option>
                                        <option value={'2'}>2</option>
                                        <option value={'3'}>3</option>
                                        <option value={'4'}>4</option>
                                        <option value={'5'}>5</option>
                                        <option value={'6'}>6</option>
                                        <option value={'7'}>7</option>
                                    </select>


                                    {/* <Controller
                                        render={({ field }) =>
                                            <select
                                                className=" m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                {...field}
                                            >
                                                <option value='1'>1</option>
                                                <option value={'2'}>2</option>
                                                <option value={'3'}>3</option>
                                                <option value={'4'}>4</option>
                                                <option value={'5'}>5</option>
                                                <option value={'6'}>6</option>
                                                <option value={'7'}>7</option>
                                            </select>

                                        }
                                        value={item.text2}
                                        control={control}
                                        {...register(`${componentName}.${index}.text2`,
                                            {
                                                onChange: ((e) => handleText2(e.target.value, index))
                                            }

                                        )}

                                    /> */}

                                    <input
                                        type='number'
                                        className=" m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        value={item.qtn}
                                        {...register(`${componentName}.${index}.qtn`,
                                            {
                                                onChange: ((e) => handleChange(e.target.value, index))
                                            }

                                        )}

                                    />

                                    <input
                                        className=" m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        defaultValue={item.text1}
                                        placeholder="Secret Key..."
                                        {...register(`${componentName}.${index}.text1`,
                                            {
                                                onChange: ((e) => handleText1(e.target.value, index))
                                            }

                                        )} />



                                    <button type="button"
                                        onClick={() => fields.length > 1 && remove(index)}>
                                        remove
                                    </button>

                                    <br />
                                    <br />
                                    <br />
                                </li>


                            );
                        })}
                        <p className="text-black" >{error}</p>

                    </ul>

                </td>
            </tr>
        </tbody >
    );
}

export default TestComponent

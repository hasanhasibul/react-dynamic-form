import React, { useState } from 'react'
import TestComponent from './TestComponent';
import { useForm, Controller } from "react-hook-form";


export const HookCom = () => {

    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            test1: [
                { qtn: 1, text1: "", text2: 1 },
            ],
            test2: [
                { qtn: 1, text1: "", text2: 1 },
            ]
        }
    });

    const [checkCount, setCount] = useState([])

    // const checkKey = (data) => {
    //     let size = Object.keys(data).length;
    //     let newArray = []
    //     let newArrayCount = []
    //     for (let i = 0; i < size; i++) {
    //         newArray.push(...Object.values(data)[i]?.filter((item) => item?.text1 !== 'hasib'));
    //         newArrayCount.push(Object.values(data)[i]?.reduce(
    //             (totalPrice, item) => parseInt(totalPrice) + parseInt(item.qtn), 0
    //         ));
    //     }
    //     setCount(newArrayCount)
    //     return newArray;
    // }



    const onSubmit = (data) => {

        let size = Object.keys(data).length;
        let newArray = []
        let newArrayCount = []
        for (let i = 0; i < size; i++) {
            newArray.push(...Object.values(data)[i]?.filter((item) => item?.text1 !== 'hasib'));
            newArrayCount.push(Object.values(data)[i]?.reduce(
                (totalPrice, item) => parseInt(totalPrice) + parseInt(item.qtn), 0
            ));
        }

        if (newArray?.length == 0 && newArrayCount[0] == 2 && newArrayCount[1] == 20) {
            console.log(data)
            alert('submitted')
        } else {
            alert('Key and total qtn should match')
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-black font-bold' > UseFieldArray </h1>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dar:bg-gray-700 ">
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
                    <TestComponent
                        register={register}
                        control={control}
                        watch={watch}
                        name="test1"
                        limit={2}
                    />
                    <TestComponent
                        register={register}
                        control={control}
                        watch={watch}
                        name="test2"
                        limit={20}
                    />

                </table>


                <input type="submit" />
            </form>
        </div>
    )
}

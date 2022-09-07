import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const HookForm = () => {
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            test: [{ count: 0, title: "Luo", dropDown: "bd" }]
        }
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "test"
    });
    const [count, setCount] = useState({})
    const [limit, setLimit] = useState(0)
    const handleChange = (e) => {
        // console.log(e.target.value,);
        const newCount = { ...count }
        newCount[e.target.name] = e.target.value;
        setCount(newCount)
    }

    useEffect(() => {
        const values = Object.values(count);
        const sum = values.reduce((accumulator, value) => {
            return parseInt(accumulator) + parseInt(value);
        }, 0);

        setLimit(sum)
    }, [fields, count])

    useEffect(() => {
        let totalCount = 0;
        fields.map((item) => totalCount = parseInt(item.count) + parseInt(totalCount))
        setLimit(totalCount)
    }, [fields])


    console.log(limit);
    console.log(count);

    console.log(fields)
    const onSubmit = (data) => console.log("data", data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Field Array </h1>
                <ul>
                    {fields.map((item, index) => {
                        return (
                            <li className="flex" key={item.id}>
                                <input type="number" min={1} max={fields.length > 1 ? 4 - limit : 4} {...register(`test.${index}.count`, { onChange: (e) => handleChange(e) })} />

                                <Controller
                                    render={({ field }) => <input {...field} />}
                                    name={`test.${index}.title`}
                                    control={control}
                                />
                                <input {...register(`test.${index}.dropDown`)} />
                                <button type="button" onClick={() => remove(index)}>
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <section>

                    {
                        limit < 4 ? <button
                            type="button"
                            onClick={() => {
                                append({ count: 0, title: "Luo", dropDown: "bd" });
                            }}
                        >
                            Add
                        </button>
                            :
                            <button
                                type="button"
                                disabled
                                className="cursor-not-allowed"
                                onClick={() => {
                                    append({ count: 0, title: "Luo", dropDown: "bd" });
                                }}
                            >
                                Add
                            </button>
                    }

                </section>
                {/* <input
                    type="submit" >
                </input> */}
            </form>
        </div>
    )
}

export default HookForm
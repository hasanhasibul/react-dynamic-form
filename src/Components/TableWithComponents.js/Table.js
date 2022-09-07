import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { RowComponents } from './RowComponents';
const Table = () => {

    return (
        <div className="overflow-x-auto relative  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left p-4 text-gray-500">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50">
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
                    <RowComponents countLegth={4} />
                </tbody>
            </table>
        </div>
    )
}

export default Table;

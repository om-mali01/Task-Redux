import React, { useEffect, useState } from "react";

function FilterData({selectedStatus, setStatus}) {

    const handleChange = (e) => {
        setStatus(e.target.value);
        // console.log(selectedStatus);
    }

    // useEffect(() => {
    //     console.log(selectedStatus);
    // }, [selectedStatus])

    return (
        <div className="bg-gray-700 text-white text-sm h-7 p-1 rounded-md" FilterData={selectedStatus}>
            <select name="status" id="status" className="bg-gray-700" onChange={handleChange}>
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
                <option value="in-process">In-Process</option>
                <option value="all">All</option>
            </select>
        </div>
    )
}

export default FilterData;
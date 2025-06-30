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
                <option value="all">All</option>
                <option value="Completed">Complete</option>
                <option value="Pending">Pending</option>
                <option value="In-process">In-Process</option>
            </select>
        </div>
    )
}

export default FilterData;
import React from 'react'

function convertUTCToIST(dateString) {


    let istTime = new Date(dateString);

    // istTime.setHours(istTime.getHours() - 5)
    // istTime.setMinutes(istTime.getMinutes() - 30)

    return  istTime.toLocaleString()
}

// // Example usage
// let utcDate = "2024-07-15T14:11:24Z"; // UTC date and time
// let istDate = convertUTCToIST(utcDate);
// console.log("IST Date and Time: " + istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));


const RecentVist = ({data}) => {
    let dates = [...data].reverse().slice(0,20)
  return (
    <ul className=' h-64 overflow-y-auto'>
        {dates.map((time, i) => <li>{convertUTCToIST(time)}</li>)}
    </ul>
  )
}

export default RecentVist
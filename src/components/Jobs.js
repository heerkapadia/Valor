import React from 'react'
import { useState,useEffect } from 'react'
import Jobcard from './Jobcard';

export default function Jobs() {
    const [jobs,setJobs]=useState({
        "company": "Google",
    "date": "545",
    "location": "Mumbai",
    
    });
    console.log(jobs);

  return (
    <div>
        {
            <Jobcard/>
        }
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import getApi from '../../apis/getter'

export default function GraphComponent() {

  // const [data, setData] = useState(null);

  // useEffect(()=> {
  //   const fetchData = async () => {
  //     const res = await getApi('http://localhost:3001/transactions');
  //     console.log(res)
  //     if (res) {
  //       setData(res);
  //     }
  //   }
  //   fetchData();
  // }, [])

  return <>
    <div className='graph'>

    </div>
  </>
}

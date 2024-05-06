import React, { useEffect, useState } from 'react'
import "./Home.css"

export default function Home() {
  let [list, setList] = useState<any[]>([])
  let [list2, setList2] = useState<any[]>([])
  const getData = function () {
    fetch("https://randomuser.me/api/?results=100").then((res) => res.json()).then((data) => {
      let arr: any = []
      data.results.forEach((el: any, index: number) => {
        const i: any = arr.findIndex((item: any) => item.country === el.location.country)
        if (i !== -1) {
          arr[i].list.push(el)
        } else {
          arr.push({
            country: el.location.country,
            list: [el],
            choosed: false
          })
        }
      })
      arr = arr.sort((a: any, b: any) =>
        a.list.length - b.list.length
      )
      console.log(arr);
      setList(arr)
    })
  }
  const selectChange = (e: any) => {
    console.log(e.target.value);
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <select name="" id="" onChange={(e) => selectChange(e)}>
        <option value="1">male</option>
        <option value="0">female</option>
        <option value="2">all</option>
      </select>
      <div>
        {list.map((el, index) => {
          return <div>
            <div className='btn' key={index} >{el.country}</div>
            <div className='box'>
              {el.list.map((item: any, i: number) => {
                return <div  key={i}>
                  <div className='item'>
                    <div>name : {item.name.first} {item.name.last}</div>
                    <div>gender : {item.gender}</div>
                    <div>city : {item.location.city}</div>
                    <div>state : {item.location.state}</div>
                    <div>Date Registered : {item.registered.date}</div>
                  </div>
                </div>
              })}
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

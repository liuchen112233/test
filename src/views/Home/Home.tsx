import React, { useEffect, useState } from 'react'
import "./Home.css"

export default function Home() {
  let [list, setList] = useState<any[]>([])
  let [listOrigin, setListOrigin] = useState<any[]>([])

  let [number, setNumber] = useState<any>("")
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
          })
        }
      })
      arr = arr.sort((a: any, b: any) =>
        a.list.length - b.list.length
      )
      setListOrigin([...arr])
      setList(arr)
    })
  }
  const selectChange = (e: any) => {
    let val = e.target.value
    let arr = genderQuery(val)
    setList(arr)
  }
  const genderQuery = (val: any) => {
    setNumber("")
    let arr: any = []
    if (val !== "all") {
      listOrigin.forEach((el: any) => {
        let arr2: any = []
        el.list.forEach((item: any) => {
          arr2.push(item)
        })
        arr.push({
          country: el.country,
          list: JSON.parse(JSON.stringify(arr2)).filter((item: any) => item.gender === val)
        })
      })
    } else {
      arr = JSON.parse(JSON.stringify(listOrigin))
    }
    return arr
  }
  const openItem = (index: number) => {
    if (index === number) {
      setNumber('')

    } else {
      setNumber(index)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <select name="gender" defaultValue="all" id="" onChange={(e) => selectChange(e)}>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="all">all</option>
      </select>
      <div>
        {list.map((el, index) => {
          return <div key={index} onClick={() => openItem(index)}>
            <div className='btn' >{el.country}</div>
            {number === index && <div className='box'>
              {el.list.map((item: any, i: number) => {
                return <div key={i}>
                  <div className='item'>
                    <div>name : {item.name.first} {item.name.last}</div>
                    <div>gender : {item.gender}</div>
                    <div>city : {item.location.city}</div>
                    <div>state : {item.location.state}</div>
                    <div>Date Registered : {item.registered.date}</div>
                  </div>
                </div>
              })}
            </div>}
          </div>
        })}
      </div>
    </div>
  )
}

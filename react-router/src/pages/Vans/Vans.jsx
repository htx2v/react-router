import React from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Vans() {

  const [searchParams, setSearchParams] = useSearchParams()
  const [vans, setVans] = React.useState([])
  
  const typeFilter = searchParams.get("type")

  React.useEffect(() => {
    fetch("/api/vans")
    .then(res => res.json())
    .then(data => setVans(data.vans))
  }, [])

  const displayedVans = typeFilter
    ? vans.filter( van => van.type === typeFilter)
    : vans

  const vanElements = displayedVans.map(van => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
        <img src={van.imageUrl} />
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
))
// Using vanilla javaScript with <Link>
function genNewSearchParamString(key, value) {
  const newSearchParam = new URLSearchParams(searchParams) // initial value
  if (value === null) {
    newSearchParam.delete(key)
  } else {
    newSearchParam.set(key, value)
  } 
  return `${newSearchParam.toString()}`
}

// Using setSearchParams
function handleFilterChange(key, value) {
  setSearchParams(prevParams => {
    if (value === null) {
      prevParams.delete(key)
    } else {
      prevParams.set(key, value)
    }
    return prevParams
  })
}

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
          <Link
            to={genNewSearchParamString("type","simple")}
            className={`van-type simple ${typeFilter === "simple"? "selected" :""}`}          
          >
            Simple
          </Link>
          <Link
            to={genNewSearchParamString("type","luxury")}
            className={`van-type luxury ${typeFilter === "luxury"? "selected" :"" }`}          
          >
            Luxury
          </Link>
          <button 
            onClick={() => handleFilterChange("type","rugged")}
            className={`van-type rugged ${typeFilter === "rugged"? "selected" :""}`}
          >
            Rugged
          </button>
          { typeFilter && 
            <button 
              onClick={() => handleFilterChange("type",null)}
              className="van-type clear-filters"
            >
              Clear Filter
            </button>
          }
          
      </div>
      <div className="van-list">
          {vanElements}
      </div>
    </div>
  )
}
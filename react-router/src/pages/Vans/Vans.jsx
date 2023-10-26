import { Await, Link, defer, useLoaderData, useSearchParams } from "react-router-dom"
import { getVans } from "../../api"
import { Suspense } from "react"

export function loader() {
  return  defer({ vans: getVans() }) 
}

export default function Vans() {

  const [searchParams, setSearchParams] = useSearchParams()
  const dataPromise = useLoaderData()
  
  const typeFilter = searchParams.get("type")

// Using vanilla javaScript with <Link>
// function genNewSearchParamString(key, value) {
//   const newSearchParam = new URLSearchParams(searchParams) // initial value
//   if (value === null) {
//     newSearchParam.delete(key)
//   } else {
//     newSearchParam.set(key, value)
//   } 
//   return `${newSearchParam.toString()}`
// }

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
  function renderVanElements(vans) {
  const displayedVans = typeFilter
  ? vans.filter( van => van.type === typeFilter)
  : vans

  const vanElements = displayedVans.map(van => (
    <div key={van.id} className="van-tile">
      <Link 
        to={van.id} 
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter
      }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))
  return (
    <>
            <div className="van-list-filter-buttons">
    <button
      onClick={() => handleFilterChange("type","simple")}
      className={`van-type simple ${typeFilter === "simple"? "selected" :""}`}          
    >
      Simple
    </button>
    <button
      onClick={() => handleFilterChange("type","luxury")}
      className={`van-type luxury ${typeFilter === "luxury"? "selected" :"" }`}          
    >
      Luxury
    </button>
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
    </>
  )
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans....</h2>}>
        <Await resolve={dataPromise.vans}>
          {renderVanElements}
        </Await>
      </Suspense>
    </div>
  )
}
import { Await, Link, NavLink, Outlet, defer, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import { Suspense } from "react"

export async function loader({ request ,params }){
  await requireAuth(request)
  return defer({ currentVan: getHostVans(params.id) }) 
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData() 

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  function renderVanElements(currentVan) {
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
        <img src={currentVan.imageUrl} />
        <div className="host-van-detail-info-text">
          <i className={`van-type van-type-${currentVan.type}`}>
            {currentVan.type}
          </i>
          <h3>{currentVan.name}</h3>
          <h4>${currentVan.price}/day</h4>
        </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink 
            to="."
            style={({isActive}) => isActive ? activeStyle : null}
            end
          >
            Detail
          </NavLink>        
          <NavLink 
            to="pricing"
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Pricing
          </NavLink>        
          <NavLink 
            to="photos"
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Photos
          </NavLink>        
        </nav>
        <Outlet context={{ currentVan }}/>
      </div>
    )
  }
  return (
    <section>
      <Link
        to=".."
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading host van....</h2>} >
          <Await resolve={dataPromise.currentVan} >
            {renderVanElements}
          </Await>
        </Suspense>
    </section>
  )
}
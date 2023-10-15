import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"

export function loader({ params }){
  return getHostVans(params.id)
}

export default function HostVanDetail() {
  const currentVan = useLoaderData() 
  console.log(currentVan)

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
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
    </section>
  )
}
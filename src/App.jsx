import Home from "./pages/Home"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import About from "./pages/About"
import Vans, { loader as vansLoader} from './pages/Vans/Vans'
import VanDetail, { loader as vansDetailLoader }from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans, { loader as hostVanLoader } from "./pages/Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader }  from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import Login from "./pages/Login"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} loader={vansDetailLoader}/>
      
      <Route path="host" element={<HostLayout />}>
        <Route 
          index 
          element={<Dashboard />} 
          loader={async () => {
            return null
          } }
          />
        <Route 
          path="income" 
          element={<Income />} 
          loader={async () => {
            return null
          } }
          />
        <Route 
          path="reviews" 
          element={<Reviews />} 
          loader={async () => {
            return null
          } }
          />
        <Route 
          path="vans" 
          element={<HostVans />} 
          loader={hostVanLoader}

          />
        <Route 
          path="vans/:id" 
          element={<HostVanDetail />} 
          loader={hostVanDetailLoader}
          >
          <Route 
            index 
            element={<HostVanInfo />} 
            loader={async () => {
              return null
            } }
            />
          <Route 
            path="pricing" 
            element={<HostVanPricing/>} 
            loader={async () => {
              return null
            } }
            />
          <Route 
            path="photos" 
            element={<HostVanPhotos/>} 
            loader={async () => {
              return null
            } }
            />
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Route>
))

export default function App() {
  return (
      <RouterProvider router={router}/>
  )
}
# React Router 6.4 notes
The note was followed the React Router 6 tutorial on [freeCodeCamp Youtube channel](https://www.youtube.com/watch?v=nDGA3km5He4) along with [official documents](https://reactrouter.com/en/main/start/overview#client-side-routing).

## Overview
- Setup: `npm install react-router-dom`
### [Client side routing](https://reactrouter.com/en/main/start/overview#client-side-routing)
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### [Dynamic Segments](https://reactrouter.com/en/main/start/overview#dynamic-segments)
```js
  <Route path="/vans/:id" element={<VanDetail />} />
```
The strings in dynamic segments (after colon) could be parsed and provided to various apis:

- [useParams](#useparams)

### [Nested Routes](https://reactrouter.com/en/main/start/overview#nested-routes) 
- keep displaying some UI on the page, share UI between components
- don't need to use absolute paths, use [relative links](https://reactrouter.com/en/main/start/overview#relative-links) instead. 
  > Relative links are always relative to the route path they are rendered in, not to the full URL. 

[Pathless Routes](https://reactrouter.com/en/main/start/concepts#pathless-routes) don't have a path
  - [Layout Routes](https://reactrouter.com/en/main/start/concepts#layout-routes) is the parent route contain any shared UI among children routes. 
  Use [Outlet](https://reactrouter.com/en/main/components/outlet#outlet) to render their children route elements.
  - [Index routes](https://reactrouter.com/en/main/start/concepts#index-routes) render in their parent route's outlet at the **parent route's path**. Another way to think of an index route is that it's the **default child route** when the parent matches but none of its children do.
```js
<Routes> 
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} />
      <Route path="vans/:id" element={<VanDetail />} />
      
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Route>
  </Routes>
```
### [Active Links](https://reactrouter.com/en/main/start/overview#active-links)
Styling the active navigation items so the user knows where they are (isActive) or where they're going (isPending) in the app is done easily with [<NavLink>](https://reactrouter.com/en/main/components/nav-link)
<NavLink> will match multiple routes, therefore use `end` prop to only  match to the "end" of the NavLink's `to` path. If the URL is longer than `to`, it will **no** longer be considered **active**.
```js
//inline style
<NavLink 
  to="/host"
  style={({isActive}) => isActive ? activeStyle : null}
  end
>
  Dashboard
</NavLink>

//external style
<NavLink 
  to="/host"
  className={({isActive}) => isActive ? "active-link" : null}
>
```
## Components
### [Link](https://reactrouter.com/en/main/components/link)

- `Link` renders an accessible `a` element with client side routing (don't refresh the pages and let the browser handle the transition normally) => don't effect **react state**
- Styling just like an `a` elements 
```css
    a {
        text-decoration: none
    }
```
### useParams
- The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
- Child routes inherit all params from their parent routes.
```js
import { useParams } from "react-router-dom"

export default function VanDetail() {
    const params = useParams()
    console.log(params)  // id:1 
    return <h1>VanDetail go here</h1>
}
```

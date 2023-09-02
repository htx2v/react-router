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

## Components
### [Link](https://reactrouter.com/en/main/components/link)

- `Link` renders an accessible `a` element with client side routing (don't refresh the pages and let the browser handle the transition normally) => don't effect **react state**
- Styling just like an `a` elements 
```css
    a {
        text-decoration: none
    }
```


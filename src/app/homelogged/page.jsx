'use client'
import React, { useEffect } from 'react'

const homelogged = () => {

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return (
    <div>Welcome to the logged-in page!</div>
  )
}

export default homelogged
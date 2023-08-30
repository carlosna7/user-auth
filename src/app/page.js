'use client'

import Link from "next/link"

export default function Home() {

  document.cookie = "token=teste"

  return(
    <ul>
      <li>
        <Link href="/login">Login</Link>
      </li>

      <li>
        <Link href="/register">Register</Link>
      </li>
    </ul>
  )
}

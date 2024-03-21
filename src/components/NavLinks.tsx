"use client"

import { Menu } from "@headlessui/react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Route = {
  name: string
  path: LinkProps<HTMLAnchorElement>["href"]
}

export default function NavLinks() {
  const pathname = usePathname()

  const routes: Route[] = [
    {
      name: "Dashboard",
      path: "/",
    },
    { name: "Chat", path: "/chat" },
    { name: "Image Recognition", path: "/image-recognition" },
  ]
  return (
    <div className="md:w-[220px] w-[180px] p-5 fixed overflow-hidden">
      {routes.map((route, idx) => (
        <Link
          key={`link-${idx}`}
          className={`text-neutral-400 hover:text-neutral-200 flex w-full items-center rounded-md px-2 py-2 text-base ${
            pathname === route.path && "text-neutral-100"
          }`}
          href={route.path}
        >
          {route.name}
        </Link>
      ))}
    </div>
  )
}

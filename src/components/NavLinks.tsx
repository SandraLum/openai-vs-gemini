"use client"

import { Menu } from "@headlessui/react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactNode } from "react"
import Icon from "./Icon"

type Route = {
  name: string
  path: LinkProps<HTMLAnchorElement>["href"]
  icon?: JSX.Element
}

export default function NavLinks() {
  const pathname = usePathname()

  const routes: Route[] = [
    // {
    //   name: "Dashboard",
    //   path: "/",
    // },
    {
      name: "Chat",
      path: "/chat",
      icon: <Icon icon="chat" className="pr-2" />,
    },
    {
      name: "Image Generation",
      path: "/image-generation",
      icon: <Icon icon="image" className="pr-2" />,
    },
    {
      name: "Image Recognition",
      path: "/image-recognition",
      icon: <Icon icon="image" className="pr-2" />,
    },
  ]
  return (
    <div className="nav-link-container p-5 fixed overflow-hidden">
      {routes.map((route, idx) => (
        <Link
          key={`link-${idx}`}
          className={`flex w-full items-center rounded-md px-2 py-2 text-base ${
            pathname == route.path
              ? "text-amber-400"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
          href={route.path}
        >
          {route.icon}
          {route.name}
        </Link>
      ))}
    </div>
  )
}

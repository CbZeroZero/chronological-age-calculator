'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"


export default function NavbarPage() {

  return (

    <NavigationMenu className='pb-2 lg:pt-2 w-full w-screen bg-emerald-300' >
      <div className='flex lg:flex-1 lg:justify-start lg:flex-row flex-col w-full ml-2'>
        <NavigationMenuList className=''>
          <NavigationMenuItem className='flex-1 lg:pb-0 lg:pt-0 pb-2 pt-2'>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink >
                <div className='flex flex-row pl-4'>
                  <Image src="/logo.svg" className="mr-3 h-9" width="37" height="37" alt="Chronological Age Calculator Logo" />
                  <span className="self-center whitespace-nowrap text-xl text-emerald-900 font-semibold dark:text-white">Chronological Age Calculator</span>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{children}</div>
          {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p> */}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
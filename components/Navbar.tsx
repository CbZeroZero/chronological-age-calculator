'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from '@/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl';


export default function NavbarPage() {
  const t = useTranslations('navbar');

  const router = useRouter();
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);

  const [navDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  const [languageMenuOpen, setLaugnageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuDropdownRef = useRef<HTMLDivElement>(null);

  const [lastTouchHandleTime, setLastTouchHandleTime] = useState(0);

  const switchLanguage = (language: string) => {
    router.push(pathname, { locale: language });
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (event.timeStamp - lastTouchHandleTime < 150) {
        return;
      }

      setLastTouchHandleTime(event.timeStamp);


      if (languageMenuRef.current) {
        if (languageMenuRef.current.contains(event.target as Node)) {
          setLaugnageMenuOpen(!languageMenuOpen);
        } else if (languageMenuDropdownRef.current && !languageMenuDropdownRef.current.contains(event.target as Node)) {
          setLaugnageMenuOpen(false);
        }
      }
      if (navDropdownRef.current) {
        if (navDropdownRef.current.contains(event.target as Node)) {
          setIsNavDropdownOpen(!navDropdownOpen);
        } else {
          let clickDropdownMenu = navRef.current && navRef.current.contains(event.target as Node);
          if (!clickDropdownMenu) {
            setIsNavDropdownOpen(false);
            setLaugnageMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [lastTouchHandleTime, languageMenuOpen, navDropdownOpen]);

  return (

    <NavigationMenu className='pb-2 lg:pt-2 w-full w-screen bg-emerald-300' ref={navRef}>
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
      <NavigationMenuList className='lg:mr-4'>
        <NavigationMenuItem className={`${navDropdownOpen ? 'block' : 'hidden'} relative flex-1 border lg:border-0  lg:block`}>
          <div ref={languageMenuRef}>
            <NavigationMenuTrigger className='w-full justify-start bg-emerald-300'>
              {t('language')}
            </NavigationMenuTrigger>
          </div>
          {languageMenuOpen &&
            <div className='z-10 absolute left-0 top-full flex justify-center'
              ref={languageMenuDropdownRef}>
              <div className='origin-top-center relative mt-1 max-h-96 w-full overflow-scroll rounded-md border bg-popover text-popover-foreground shadow-lg md:w-64'>
                <ul>
                  <ListItem key='English' onClick={() => switchLanguage("en")}>English</ListItem>
                  <ListItem key='中文' onClick={() => switchLanguage("zh")}>中文</ListItem>
                  <ListItem key='Español' onClick={() => switchLanguage("es")}>Español</ListItem>
                  <ListItem key='Français' onClick={() => switchLanguage("fr")}>Français</ListItem>
                  <ListItem key='Deutsch' onClick={() => switchLanguage("de")}>Deutsch</ListItem>
                  <ListItem key='Italiano' onClick={() => switchLanguage("it")}>Italiano</ListItem>
                  <ListItem key='Português' onClick={() => switchLanguage("pt")}>Português</ListItem>
                  <ListItem key='日本語' onClick={() => switchLanguage("ja")}>日本語</ListItem>
                  <ListItem key='한국어' onClick={() => switchLanguage("ko")}>한국어</ListItem>
                </ul>
              </div>
            </div>
          }
        </NavigationMenuItem>
      </NavigationMenuList>

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
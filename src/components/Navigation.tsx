'use client';

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
      <nav className="container flex h-16 items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Amayara Solutions</span>
            <Image
              src="/img/logo.png"
              alt="Amayara Solutions"
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium ${
                pathname === item.href 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-white'
              } transition-colors duration-200`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-[1.5rem] left-0 h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
          >
            <span>Start a Project</span>
            <svg 
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6.75 3.25L10.25 8L6.75 12.75" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-zinc-900 px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Amayara Solutions</span>
              <Image
                src="/img/logo.png"
                alt="Amayara Solutions"
                width={150}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-zinc-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-zinc-800">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium ${
                      pathname === item.href 
                        ? 'text-white bg-zinc-800' 
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    } transition-all duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Start a Project</span>
                  <svg 
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M6.75 3.25L10.25 8L6.75 12.75" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition duration-300 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
} 
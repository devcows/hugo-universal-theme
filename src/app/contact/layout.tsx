import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Amayara Solutions',
  description: 'Contactez Amayara Solutions pour vos besoins en recrutement international et transformation digitale en Tunisie. Notre équipe est à votre écoute.',
  keywords: 'contact, Amayara Solutions, recrutement Tunisie, transformation digitale, consultation IT',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
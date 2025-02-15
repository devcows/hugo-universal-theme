'use client';

import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: t('contact.form.successMessage')
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: t('contact.form.errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    locations: [
      {
        title: t('contact.locations.canada.title'),
        address: t('contact.locations.canada.address'),
        phone: "+1 514 576 3085",
        email: "contact@amayara.com"
      },
      {
        title: t('contact.locations.tunisia.title'),
        address: t('contact.locations.tunisia.address'),
        phone: "+216 56 058 366",
        email: "contact@amayara.com"
      }
    ],
    social: [
      {
        name: "LinkedIn",
        href: "#",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        ),
      }
    ]
  };

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            {!imageError ? (
              <Image
                src="/img/logo3.png"
                alt="Amayara Solutions Logo"
                width={200}
                height={60}
                className="h-auto w-auto"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                AMAYARA
                <span className="text-zinc-400 text-xl ml-2 font-normal">Solutions</span>
              </h1>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">{t('contact.title')}</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            {t('contact.subtitle')}
          </p>
          <p className="mt-4 text-base text-zinc-400">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </div>

              {status.message && (
                <div className={`rounded-lg p-4 ${
                  status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn w-full justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {contactInfo.locations.map((location, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {location.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPinIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-zinc-400 whitespace-pre-line">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <PhoneIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="text-zinc-400 hover:text-white transition-colors">
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <EnvelopeIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <a href={`mailto:${location.email}`} className="text-zinc-400 hover:text-white transition-colors">
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* About Section */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">
                {t('contact.about.title')}
              </h3>
              <p className="text-zinc-400">
                {t('contact.about.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
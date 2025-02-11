'use client';

import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactInfo = {
  locations: [
    {
      title: "Canada Office",
      address: "Avenue de chateaubriand\nMontreal, QC H2S 2N6\nCanada",
      phone: "+1 514 576 3085",
      email: "contact@amayara.com"
    },
    {
      title: "Tunisia Office",
      address: "Jardins de carthage\nEl Kram, 2084\nTunis, Tunisia",
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

export default function Contact() {
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
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">Contact</span>{' '}
            <span className="gradient-text">Us</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            COMMUNIQUEZ AVEC UN MEMBRE DE L'ÉQUIPE SOLUTIONS AMAYARA
          </p>
          <p className="mt-4 text-base text-zinc-400">
            Si vous avez des questions ou que vous souhaitez en savoir plus sur nos services, veuillez remplir le formulaire et nous vous répondrons rapidement.
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
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                    Votre Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
                  Votre Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="btn w-full justify-center"
              >
                Envoyer le Message
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
                À propos de nous
              </h3>
              <p className="text-zinc-400">
                AMAYARA SOLUTIONS est une société de conseil spécialisée dans le developpement Logicielle, l'assurance qualité et la Transformation Agile. Fondé par des experts dans le domaine, AMAYARA SOLUTIONS a développé plusieurs offres de services au profit de ses clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
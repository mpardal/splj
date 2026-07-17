"use client";

import React, { useState } from "react";

function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0 text-splj-or">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0 text-splj-or">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.13 6.13l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0 text-splj-or">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0 text-splj-or">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-12 h-12 text-splj-or">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 422) {
        const fieldErrors: Record<string, string> = {};
        data.error.forEach((issue: { path: string[]; message: string }) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0]] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        setStatus("");
        return;
      }

      if (response.ok) {
        setFormData({ firstname: "", lastname: "", email: "", subject: "", message: "", honeypot: "" });
        setErrors({});
        setIsLoading(false);
        setStatus("");
        setSuccess(true);
      } else {
        throw new Error("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error);
      setStatus("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full border px-4 py-3 text-sm text-splj-bordeaux bg-white placeholder:text-splj-bordeaux/30 focus:outline-none focus:ring-2 focus:ring-splj-or transition-colors ${
      errors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-splj-bordeaux/20 focus:border-splj-or"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-splj-bordeaux text-splj-creme overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none" aria-hidden>
          <svg width="200" height="260" viewBox="0 0 260 340" fill="currentColor">
            <rect x="110" y="0" width="40" height="340" />
            <rect x="0" y="110" width="260" height="40" />
          </svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20">
          <p className="text-splj-or text-xs uppercase tracking-widest mb-3">Paroisse catholique — Strasbourg</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">Nous contacter</h1>
          <p className="text-splj-creme/70 mt-3 text-base max-w-xl">
            Une question, une demande de sacrement, ou simplement envie d&apos;échanger ? Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-splj-creme py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">

          {/* Info column */}
          <aside className="md:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux mb-5">Informations pratiques</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <IconLocation />
                  <div>
                    <p className="text-sm font-semibold text-splj-bordeaux">Adresse</p>
                    <p className="text-sm text-splj-bordeaux/70 mt-0.5">7, rue Saint Léon<br />67000 Strasbourg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconPhone />
                  <div>
                    <p className="text-sm font-semibold text-splj-bordeaux">Téléphone</p>
                    <a href="tel:+33388324319" className="text-sm text-splj-bordeaux/70 hover:text-splj-bordeaux transition-colors mt-0.5 block">
                      03 88 32 43 19
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMail />
                  <div>
                    <p className="text-sm font-semibold text-splj-bordeaux">Email</p>
                    <a href="mailto:accueil@splj-cath.fr" className="text-sm text-splj-bordeaux/70 hover:text-splj-bordeaux transition-colors mt-0.5 block">
                      accueil@splj-cath.fr
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconClock />
                  <div>
                    <p className="text-sm font-semibold text-splj-bordeaux">Secrétariat</p>
                    <p className="text-sm text-splj-bordeaux/70 mt-0.5">Mardi au vendredi<br />9h00 – 12h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-splj-bordeaux/10 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux mb-4">Urgence pastorale</h2>
              <p className="text-sm text-splj-bordeaux/70">
                Pour une onction des malades ou un décès, contactez-nous directement par téléphone.
              </p>
            </div>
          </aside>

          {/* Form column */}
          <div className="md:col-span-3">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <IconCheckCircle />
                <h2 className="text-xl font-bold text-splj-bordeaux">Message envoyé</h2>
                <p className="text-sm text-splj-bordeaux/70 max-w-sm">
                  Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-xs uppercase tracking-widest text-splj-bordeaux/60 hover:text-splj-bordeaux underline underline-offset-4 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstname" className="block text-xs font-semibold uppercase tracking-widest text-splj-bordeaux mb-1.5">
                      Prénom <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Jean"
                      className={inputClass("firstname")}
                      required
                    />
                    {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block text-xs font-semibold uppercase tracking-widest text-splj-bordeaux mb-1.5">
                      Nom <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Dupont"
                      className={inputClass("lastname")}
                      required
                    />
                    {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-splj-bordeaux mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@exemple.fr"
                    className={inputClass("email")}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest text-splj-bordeaux mb-1.5">
                    Objet <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Demande de baptême, renseignement…"
                    className={inputClass("subject")}
                    required
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-splj-bordeaux mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    rows={6}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande…"
                    className={`${inputClass("message")} resize-none`}
                    required
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status && (
                  <p className="text-sm text-red-500">{status}</p>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-splj-bordeaux/40">* champs obligatoires</p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-splj-bordeaux text-splj-creme text-xs uppercase tracking-widest font-semibold px-8 py-3.5 hover:bg-splj-bordeaux-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                        </svg>
                        Envoi…
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 7l10 7 10-7" />
                        </svg>
                        Envoyer
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
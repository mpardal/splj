"use client";

import React, { useState } from "react";

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
        // Transformer les erreurs Zod en objet par champ
        const fieldErrors: Record<string, string> = {};
        data.error.forEach((issue: { path: string[]; message: string }) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0]] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
        setIsLoading(false);
        setStatus("Formulaire envoyé !");
        setSuccess(true);
      } else {
        throw new Error("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error);
      setStatus("Erreur lors de l'envoi du formulaire");
    }
  };

  return (
    <>
      <h1>Formulaire de contact</h1>
      <section>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-gray-50 px-6 md:px-10 py-8 rounded"
        >
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Prénom :
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
              required
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Nom :
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
              required
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Email :
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Raison :
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
              required
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Demande :
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              rows={5}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <div className="mb-4 hidden">
            <label
              htmlFor="honeypot"
              className="block text-gray-700 font-bold mb-2 texte-fluide"
            >
              Captcha :
            </label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B0841A]"
            />
          </div>
          {status && <p>{status}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </section>
    </>
  );
}

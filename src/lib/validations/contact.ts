import { z } from "zod";

export const ContactSchema = z.object({
  firstname: z
    .string()
    .min(2, "Veuillez rentrer un prénom")
    .max(20, "Votre prénom est trop long"),
  lastname: z
    .string()
    .min(2, "Veuillez rentrer un nom")
    .max(20, "Votre nom est trop long"),
  email: z.email("Adresse email invalide"),
  subject: z
    .string()
    .min(5, "Veuillez écrire un sujet un peu plus long")
    .max(50, "Votre texte est trop long"),
  message: z
    .string()
    .min(10, "Veuillez écrire un texte un peu plus long")
    .max(200, "Votre message est trop long"),
  honeypot: z.string().max(0, "Bot détecté"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

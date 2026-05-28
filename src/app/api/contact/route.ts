import { Resend } from "resend";
import { z } from "zod";
import { ContactSchema } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    //1. Récupérer les données
    const body = await request.json();
    const { firstname, lastname, email, subject, message } = body;

    // 2. Vérifier le honeypot en premier — filtre rapide
    if (body.honeypot) {
      return Response.json({ error: "Bot détecté" }, { status: 400 });
    }

    // 3. Valider avec Zod
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return Response.json({ error: result.error.issues }, { status: 422 });
    }

    // 4. Envoyer l'email avec Resend
    const to = process.env.RESEND_TO;
    if (!to) {
      return Response.json(
        { error: "Configuration manquante" },
        { status: 500 },
      );
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      html: `
      Prénom : ${firstname} | Nom : ${lastname}
      Email : ${email}
      Demande : ${message}
      `,
    });

    if (data.error) {
      return Response.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    // 5. Retourner une réponse succès
    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

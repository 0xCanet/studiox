import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Cette route API envoie un email de contact via Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, date, time } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Configuration Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_TO_EMAIL || 'contact@studi0x.agency';

    if (resendApiKey) {
      // Envoyer l'email via Resend
      const resend = new Resend(resendApiKey);

      const isBooking = date && time;
      const subject = isBooking 
        ? `Nouveau rendez-vous: ${name}` 
        : `Nouveau message de contact: ${name}`;

      // Formater la date si c'est un rendez-vous
      let formattedDate = '';
      if (date && time) {
        try {
          const bookingDate = new Date(date);
          formattedDate = bookingDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch (e) {
          formattedDate = date;
        }
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #0E0E0E; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF7A30; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #F0EEE9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #0E0E0E; margin-bottom: 5px; display: block; }
              .value { color: #0E0E0E; }
              .message-box { background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 3px solid #FF7A30; }
              .booking-info { background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 3px solid #FF7A30; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">${isBooking ? '📅 Nouveau rendez-vous' : '✉️ Nouveau message de contact'}</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Nom:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}">${email}</a></span>
                </div>
                ${phone ? `
                <div class="field">
                  <span class="label">Téléphone:</span>
                  <span class="value"><a href="tel:${phone}">${phone}</a></span>
                </div>
                ` : ''}
                ${isBooking ? `
                  <div class="booking-info">
                    <div class="field">
                      <span class="label">📅 Date:</span>
                      <span class="value">${formattedDate}</span>
                    </div>
                    <div class="field">
                      <span class="label">🕐 Heure:</span>
                      <span class="value">${time}</span>
                    </div>
                  </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      // Essayer d'envoyer l'email
      let emailSent = false;
      let finalData = null;

      let result = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: subject,
        html: htmlContent,
      });

      if (result.error) {
        // Gestion des erreurs Resend - comportement identique en dev et prod
        console.error('Erreur Resend:', result.error);
        
        // Messages d'erreur spécifiques selon le type d'erreur
        let errorMessage = 'Erreur lors de l\'envoi de l\'email';
        
        if (result.error.message?.includes('Not authorized to send emails from')) {
          const domain = fromEmail.split('@')[1];
          errorMessage = `Le domaine ${domain} n'est pas autorisé. Vérifiez votre domaine sur resend.com/domains.`;
        } else if (result.error.message?.includes('only send testing emails')) {
          const emailMatch = result.error.message.match(/\(([^)]+@[^)]+)\)/);
          const allowedEmail = emailMatch ? emailMatch[1] : 'votre email de compte';
          errorMessage = `En mode test, les emails ne peuvent être envoyés qu'à ${allowedEmail}. Vérifiez votre domaine sur resend.com/domains pour envoyer à d'autres destinataires.`;
        }
        
        throw new Error(errorMessage);
      } else {
        // Succès
        emailSent = true;
        finalData = result.data;
        console.log('✅ Email envoyé avec succès via Resend:', finalData?.id);
      }
    } else {
      // Mode développement : log les données si Resend n'est pas configuré
      console.log('📧 Nouveau message de contact (mode développement):');
      console.log('Nom:', name);
      console.log('Email:', email);
      console.log('Message:', message);
      if (date && time) {
        console.log('Rendez-vous:', date, time);
      }
      console.log('⚠️  Pour envoyer de vrais emails, configurez RESEND_API_KEY dans .env.local');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: date && time 
          ? 'Votre rendez-vous a été confirmé. Nous vous enverrons un email de confirmation.' 
          : 'Votre message a été envoyé avec succès.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


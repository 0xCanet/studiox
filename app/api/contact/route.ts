import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Cette route API envoie un email de contact via Resend
export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      // Default to English for parse errors since we don't have language yet
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const { name, email, phone, message, date, time, language } = body;
    
    // Default to English if language not provided
    const lang = language === 'fr' ? 'fr' : 'en';

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: lang === 'fr' ? 'Tous les champs sont requis' : 'All fields are required' },
        { status: 400 }
      );
    }

    // Ensure all values are strings
    const sanitizedName = String(name || '').trim();
    const sanitizedEmail = String(email || '').trim();
    const sanitizedMessage = String(message || '').trim();
    const sanitizedPhone = phone ? String(phone).trim() : '';
    const sanitizedDate = date ? String(date).trim() : '';
    const sanitizedTime = time ? String(time).trim() : '';

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: lang === 'fr' ? 'Format d\'email invalide' : 'Invalid email format' },
        { status: 400 }
      );
    }

    // Helper function to escape HTML
    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Configuration Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Studi0x <contact@studi0x.agency>';
    const toEmail = process.env.RESEND_TO_EMAIL || 'contact@studi0x.agency';

    if (resendApiKey && resendApiKey.trim()) {
      try {
        // Envoyer l'email via Resend
        const resend = new Resend(resendApiKey);

        const isBooking = sanitizedDate && sanitizedTime;
        const subject = isBooking 
          ? `Nouveau rendez-vous: ${escapeHtml(sanitizedName)}` 
          : `Nouveau message de contact: ${escapeHtml(sanitizedName)}`;

        // Formater la date si c'est un rendez-vous
        let formattedDate = '';
        if (sanitizedDate && sanitizedTime) {
          try {
            const bookingDate = new Date(sanitizedDate);
            if (!isNaN(bookingDate.getTime())) {
              formattedDate = bookingDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            } else {
              formattedDate = escapeHtml(sanitizedDate);
            }
          } catch (e) {
            formattedDate = escapeHtml(sanitizedDate);
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
                    <span class="value">${escapeHtml(sanitizedName)}</span>
                  </div>
                  <div class="field">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${escapeHtml(sanitizedEmail)}">${escapeHtml(sanitizedEmail)}</a></span>
                  </div>
                  ${sanitizedPhone ? `
                  <div class="field">
                    <span class="label">Téléphone:</span>
                    <span class="value"><a href="tel:${escapeHtml(sanitizedPhone)}">${escapeHtml(sanitizedPhone)}</a></span>
                  </div>
                  ` : ''}
                  ${isBooking ? `
                    <div class="booking-info">
                      <div class="field">
                        <span class="label">📅 Date:</span>
                        <span class="value">${escapeHtml(formattedDate)}</span>
                      </div>
                      <div class="field">
                        <span class="label">🕐 Heure:</span>
                        <span class="value">${escapeHtml(sanitizedTime)}</span>
                      </div>
                    </div>
                  ` : ''}
                  <div class="field">
                    <span class="label">Message:</span>
                    <div class="message-box">
                      ${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;

        // Essayer d'envoyer l'email
        let result = await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: sanitizedEmail,
          subject: subject,
          html: htmlContent,
        });

        if (result.error) {
          // Gestion des erreurs Resend - comportement identique en dev et prod
          console.error('Erreur Resend:', result.error);
          
          // Messages d'erreur spécifiques selon le type d'erreur
          let errorMessage = lang === 'fr' 
            ? 'Erreur lors de l\'envoi de l\'email'
            : 'Error sending email';
          let errorStatus = 500; // Default to 500 for server errors
          
          const errorMsg = result.error.message || String(result.error) || '';
          
          if (errorMsg.includes('not verified') || errorMsg.includes('Not authorized to send emails from') || errorMsg.includes('associated domain')) {
            // Extract email from format "Display Name <email@domain.com>" or just "email@domain.com"
            const emailMatch = fromEmail.match(/<([^>]+)>/) || fromEmail.match(/([^\s<]+@[^\s>]+)/);
            const email = emailMatch ? emailMatch[1] : fromEmail;
            const domain = email.split('@')[1] || 'unknown';
            errorMessage = lang === 'fr'
              ? `Le domaine ${domain} n'est pas vérifié. Vérifiez votre domaine sur resend.com/domains.`
              : `Domain ${domain} is not verified. Check your domain on resend.com/domains.`;
            errorStatus = 400; // Configuration error - treat as bad request
          } else if (errorMsg.includes('only send testing emails')) {
            const emailMatch = errorMsg.match(/\(([^)]+@[^)]+)\)/);
            const allowedEmail = emailMatch ? emailMatch[1] : (lang === 'fr' ? 'votre email de compte' : 'your account email');
            errorMessage = lang === 'fr'
              ? `En mode test, les emails ne peuvent être envoyés qu'à ${allowedEmail}. Vérifiez votre domaine sur resend.com/domains pour envoyer à d'autres destinataires.`
              : `In test mode, emails can only be sent to ${allowedEmail}. Check your domain on resend.com/domains to send to other recipients.`;
            errorStatus = 400; // Configuration error - treat as bad request
          }
          
          // Create error with status code information
          const error = new Error(errorMessage) as Error & { statusCode?: number };
          error.statusCode = errorStatus;
          throw error;
        } else {
          // Succès
          console.log('✅ Email envoyé avec succès via Resend:', result.data?.id);
        }
      } catch (resendError) {
        // Si l'erreur est déjà une Error avec un message, la relancer
        if (resendError instanceof Error) {
          throw resendError;
        }
        // Sinon, créer une nouvelle erreur
        throw new Error(lang === 'fr'
          ? 'Erreur lors de l\'envoi de l\'email via Resend. Veuillez réessayer.'
          : 'Error sending email via Resend. Please try again.');
      }
    } else {
      // Mode développement : log les données si Resend n'est pas configuré
      console.log('📧 Nouveau message de contact (mode développement):');
      console.log('Nom:', sanitizedName);
      console.log('Email:', sanitizedEmail);
      console.log('Message:', sanitizedMessage);
      if (sanitizedDate && sanitizedTime) {
        console.log('Rendez-vous:', sanitizedDate, sanitizedTime);
      }
      console.log('⚠️  Pour envoyer de vrais emails, configurez RESEND_API_KEY dans .env.local');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: sanitizedDate && sanitizedTime 
          ? (lang === 'fr' 
              ? 'Votre rendez-vous a été confirmé. Nous vous enverrons un email de confirmation.'
              : 'Your booking has been confirmed. We will send you a confirmation email.')
          : (lang === 'fr'
              ? 'Votre message a été envoyé avec succès.'
              : 'Your message has been sent successfully.')
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
    // Use status code from error if available, otherwise default to 500
    const statusCode = (error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number') 
      ? error.statusCode 
      : 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

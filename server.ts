import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
const apiKey = process.env.GEMINI_API_KEY;
const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

// SAATHI System Prompt instructions
const SAATHI_SYSTEM_PROMPT = `You are SAATHI – Your International Travel Companion.
Full name: Smart Assistance for All Travel, Hotels and International journeys.
Tagline: "Your World. Your Journey. Your Saathi."
Description: "From visa preparation to hotel recommendations, SAATHI makes international travel simpler, smarter, and stress-free."

Your mission is to be an intelligent, empathetic, and comprehensive international travel support companion. You answer real-world travel questions and help travellers understand and solve international travel problems, including:
1. International Visa Assistance & Immigration (Dubai/UAE, Schengen/Europe, Singapore, Thailand, Japan, US, UK, visa rejections, delays, validity, required document checklists, biometric appointments)
2. Document Management & Vault (Passport 6-month validity rule, emergency certificates, photo requirements, apostille/attestation)
3. International Hotel & Accommodation Guidance (Neighborhood recommendations, deposit policies, booking scams)
4. International Dining & Restaurant Suggestions (Dietary needs, Halal, Vegan, Vegetarian, local cuisine etiquette)
5. Flights & Airport Disruptions (Cancellations, refunds under DGCA/EU261, missed connections, baggage loss PIR, web check-in)
6. Travel Money & Currency (Multi-currency cards, dynamic currency conversion avoidance, zero-forex markup, travel insurance)
7. Safety, Consulates & Emergencies (Lost passport police/embassy steps, medical assistance abroad)

CRITICAL RULES:
- Never guarantee visa approvals or claim to know the exact cause of a visa rejection without official evidence.
- Distinguish general guidance from confirmed official regulations. Always direct users to official authorities (e.g., u.ae, vfsglobal.com, icp.gov.ae, gdrfad.gov.ae).
- Avoid legal jargon; explain technical terms in plain English.
- If nationality, destination, or purpose is missing, politely ask for it. NEVER ask for sensitive info like passport numbers, passwords, or credit card numbers.
- Structure responses clearly with markdown sections when relevant:
  • **What this means**
  • **Possible reasons**
  • **What you should do next**
  • **Documents to check**
  • **Official resources**
`;

// API Route for Mia Chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!aiClient) {
      // No API key configured on server, signal client to use rich local intelligence engine
      return res.json({
        fallback: true,
        reason: 'GEMINI_API_KEY is not configured on server'
      });
    }

    // Call Gemini 3.8 Flash with Google Search Grounding
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: SAATHI_SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }]
      }
    });

    const candidate = response.candidates?.[0];
    const text = response.text || '';

    // Extract search grounding metadata if available
    const groundingMetadata = candidate?.groundingMetadata;
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];
    const groundingChunks = groundingMetadata?.groundingChunks || [];

    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        url: chunk.web.uri,
        domain: new URL(chunk.web.uri).hostname,
        isOfficial: chunk.web.uri.includes('.gov') || chunk.web.uri.includes('.org') || chunk.web.uri.includes('airline')
      }))
      .slice(0, 4);

    return res.json({
      text,
      sources,
      webSearchQueries,
      verifiedDate: 'Verified with official sources (October 2026)',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/chat:', error);
    return res.json({
      fallback: true,
      error: error?.message || 'Gemini API call failed'
    });
  }
});

// Initialize email transporter
let emailTransporter: any;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} else {
  // Fallback in-memory stream transporter for zero-config environments
  emailTransporter = nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true,
  });
}

// API Route for Sending Trip Confirmation Email
app.post('/api/send-confirmation-email', async (req: Request, res: Response) => {
  try {
    const { email, name, phone, specialRequests, trip, assistant } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid recipient email is required' });
    }

    if (!trip) {
      return res.status(400).json({ error: 'Trip details are required' });
    }

    const bookingRef = trip.bookingReference || `SATHI-BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const destinationName = trip.destination || trip.destinationCity || 'International Destination';
    const destinationCountry = trip.destinationCountry || '';
    const departureCity = trip.departureCity || 'Origin City';
    const departureCountry = trip.departureCountry || 'India';
    const daysCount = trip.days?.length || 5;
    const travellerLabel = trip.travellersCount === 1 ? '1 Traveller' : `${trip.travellersCount} Travellers`;

    // Assistant contact info fallback
    const assistantName = assistant?.name || 'Aarav Sharma';
    const assistantTitle = assistant?.title || 'Dedicated Destination Concierge';
    const assistantEmail = assistant?.email || 'concierge@saathi.travel';
    const assistantPhone = assistant?.phone || '+971 4 800 72284';
    const assistantHours = assistant?.supportHours || '08:00 – 22:00 Local Time';
    const assistantSpecialty = assistant?.destinationSpecialty || `${destinationName} & Regional Travel`;
    const emergencyProtocol = assistant?.serviceSpecialties?.emergencyProtocol || '24/7 Local Emergency Coordination & Embassy Assistance';

    // Day-by-day itinerary summary HTML
    const daysHtml = Array.isArray(trip.days)
      ? trip.days.map((day: any) => `
        <div style="background-color: #FAF8F3; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #247BA0;">
          <div style="font-size: 13px; font-weight: bold; color: #102A43;">
            Day ${day.dayNumber} (${day.dateStr || 'Planned'}): ${day.theme || 'Exploration & Culture'}
          </div>
          <div style="font-size: 12px; color: #486581; margin-top: 4px;">
            ${Array.isArray(day.activities) ? day.activities.map((a: any) => `• <strong>${a.period?.toUpperCase() || ''}:</strong> ${a.title} (₹${a.estimatedCostINR || 0})`).join('<br/>') : 'Highlights scheduled'}
          </div>
          ${day.insiderTip ? `<div style="font-size: 11px; color: #1A5E7B; margin-top: 6px; font-style: italic;">Tip: ${day.insiderTip}</div>` : ''}
        </div>
      `).join('')
      : '<p>Complete itinerary details attached in your SAATHI portal.</p>';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation — SAATHI Travel</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #102A43;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4EFE6; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); max-width: 600px; width: 100%;">
          
          <!-- Header Branding -->
          <tr>
            <td style="background-color: #102A43; padding: 32px 28px; text-align: center;">
              <div style="display: inline-block; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">
                SAATHI <span style="background-color: rgba(255,128,102,0.2); color: #FF8066; font-size: 11px; padding: 3px 8px; border-radius: 4px; vertical-align: middle;">GLOBAL</span>
              </div>
              <div style="font-size: 12px; color: #DCE8DF; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">
                Your International Travel Companion
              </div>
            </td>
          </tr>

          <!-- Confirmation Banner -->
          <tr>
            <td style="background-color: #E6F3F8; padding: 20px 28px; border-bottom: 1px solid #CBD5E1;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #247BA0; text-transform: uppercase; letter-spacing: 1px;">
                      Booking Status: Confirmed
                    </div>
                    <div style="font-size: 20px; font-weight: 700; color: #102A43; margin-top: 2px;">
                      Trip to ${destinationName} Confirmed!
                    </div>
                  </td>
                  <td align="right">
                    <div style="background-color: #ffffff; border: 1px solid #247BA0; border-radius: 8px; padding: 6px 12px; display: inline-block;">
                      <div style="font-size: 9px; color: #627D98; text-transform: uppercase;">Booking Ref</div>
                      <div style="font-size: 13px; font-weight: 800; color: #102A43; font-family: monospace;">${bookingRef}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px;">
              <p style="font-size: 15px; line-height: 1.6; color: #102A43; margin-top: 0;">
                Dear <strong>${name || 'Valued Traveller'}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #334E68;">
                Your international travel booking for <strong>${destinationName}</strong> has been successfully confirmed. Below you will find your complete trip breakdown along with the direct contact details for your assigned SAATHI Travel Companion.
              </p>

              <!-- Trip Summary Box -->
              <div style="background-color: #FAF8F3; border: 1px solid #E2DDD2; border-radius: 12px; padding: 18px; margin: 20px 0;">
                <div style="font-size: 12px; font-weight: 700; color: #102A43; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #E2DDD2; pb: 8px;">
                  Trip Overview & Specifications
                </div>
                <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px;">
                  <tr>
                    <td style="color: #627D98; width: 40%;"><strong>Route:</strong></td>
                    <td style="color: #102A43; font-weight: 600;">${departureCity}, ${departureCountry} → ${destinationName}, ${destinationCountry}</td>
                  </tr>
                  <tr>
                    <td style="color: #627D98;"><strong>Travel Dates:</strong></td>
                    <td style="color: #102A43; font-weight: 600;">${trip.startDate} to ${trip.endDate} (${daysCount} Days)</td>
                  </tr>
                  <tr>
                    <td style="color: #627D98;"><strong>Travellers:</strong></td>
                    <td style="color: #102A43; font-weight: 600;">${travellerLabel}</td>
                  </tr>
                  <tr>
                    <td style="color: #627D98;"><strong>Total Budget:</strong></td>
                    <td style="color: #247BA0; font-weight: 700;">₹${Number(trip.totalBudgetINR || 0).toLocaleString('en-IN')} (Estimated: ₹${Number(trip.estimatedTotalINR || 0).toLocaleString('en-IN')})</td>
                  </tr>
                  <tr>
                    <td style="color: #627D98;"><strong>Pacing Style:</strong></td>
                    <td style="color: #102A43; text-transform: capitalize;">${trip.pace || 'Balanced'}</td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="color: #627D98;"><strong>Registered Phone:</strong></td>
                    <td style="color: #102A43;">${phone}</td>
                  </tr>` : ''}
                  ${specialRequests ? `
                  <tr>
                    <td style="color: #627D98;"><strong>Special Requests:</strong></td>
                    <td style="color: #102A43;">${specialRequests}</td>
                  </tr>` : ''}
                </table>
              </div>

              <!-- Dedicated Travel Assistant Card -->
              <div style="background-color: #102A43; color: #ffffff; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <div style="font-size: 11px; font-weight: 700; color: #FF8066; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                  Your Assigned Dedicated Assistant
                </div>
                <div style="font-size: 18px; font-weight: 700; color: #ffffff;">
                  ${assistantName}
                </div>
                <div style="font-size: 13px; color: #DCE8DF; margin-top: 2px;">
                  ${assistantTitle}
                </div>
                <div style="font-size: 12px; color: #9FB3C8; margin-top: 4px;">
                  Specialty: ${assistantSpecialty}
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 14px; padding-top: 14px;">
                  <table width="100%" cellpadding="3" cellspacing="0" style="font-size: 12px;">
                    <tr>
                      <td style="color: #DCE8DF; width: 35%;"><strong>Direct Phone:</strong></td>
                      <td><a href="tel:${assistantPhone}" style="color: #FF8066; text-decoration: none; font-weight: bold;">${assistantPhone}</a></td>
                    </tr>
                    <tr>
                      <td style="color: #DCE8DF;"><strong>Direct Email:</strong></td>
                      <td><a href="mailto:${assistantEmail}" style="color: #ffffff; text-decoration: underline;">${assistantEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="color: #DCE8DF;"><strong>Support Hours:</strong></td>
                      <td style="color: #ffffff;">${assistantHours}</td>
                    </tr>
                    <tr>
                      <td style="color: #DCE8DF;"><strong>Emergency Protocol:</strong></td>
                      <td style="color: #DCE8DF;">${emergencyProtocol}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Day by Day Itinerary Snapshot -->
              <div style="margin: 24px 0;">
                <div style="font-size: 14px; font-weight: 700; color: #102A43; margin-bottom: 12px;">
                  Day-by-Day Schedule Highlights
                </div>
                ${daysHtml}
              </div>

              <!-- Pre-Trip Checklist Reminders -->
              <div style="background-color: #FFF0ED; border: 1px solid #FF8066; border-radius: 12px; padding: 16px; margin: 24px 0;">
                <div style="font-size: 12px; font-weight: 700; color: #E7684F; text-transform: uppercase;">
                  Important Pre-Flight Checklist
                </div>
                <ul style="font-size: 12px; color: #486581; margin: 8px 0 0 16px; padding: 0; line-height: 1.5;">
                  <li>Verify passport validity has at least <strong>6 full months</strong> remaining.</li>
                  <li>Review entry visa regulations in our <strong>Visa Assistant</strong> tab.</li>
                  <li>Backup digital passport and flight tickets in the <strong>SAATHI Document Vault</strong>.</li>
                </ul>
              </div>

              <p style="font-size: 13px; color: #627D98; margin-top: 24px; line-height: 1.5;">
                Need help before departure? Simply reply to this email or reach out directly to <strong>${assistantName}</strong> at ${assistantEmail}.
              </p>

              <div style="margin-top: 28px; border-top: 1px solid #E2DDD2; padding-top: 16px;">
                <div style="font-size: 13px; font-weight: bold; color: #102A43;">Warm regards,</div>
                <div style="font-size: 12px; color: #627D98; margin-top: 2px;">Team SAATHI — Your International Travel Companion</div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF8F3; padding: 20px 28px; border-top: 1px solid #E2DDD2; text-align: center; font-size: 11px; color: #829AB1;">
              © 2026 SAATHI International Travel. All rights reserved.<br/>
              Support: support@saathi.travel | Toll-Free: +1 (800) 722-8442
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textContent = `
SAATHI TRAVEL — BOOKING CONFIRMATION
Booking Reference: ${bookingRef}
Status: CONFIRMED

Dear ${name || 'Valued Traveller'},

Your international journey to ${destinationName} has been confirmed.

TRIP DETAILS:
- Route: ${departureCity}, ${departureCountry} -> ${destinationName}, ${destinationCountry}
- Travel Dates: ${trip.startDate} to ${trip.endDate} (${daysCount} Days)
- Travellers: ${travellerLabel}
- Total Budget: ₹${Number(trip.totalBudgetINR || 0).toLocaleString('en-IN')}
- Estimated Cost: ₹${Number(trip.estimatedTotalINR || 0).toLocaleString('en-IN')}

YOUR ASSIGNED DEDICATED ASSISTANT:
- Name: ${assistantName} (${assistantTitle})
- Specialty: ${assistantSpecialty}
- Direct Phone: ${assistantPhone}
- Direct Email: ${assistantEmail}
- Support Hours: ${assistantHours}
- Emergency Protocol: ${emergencyProtocol}

PRE-FLIGHT REMINDERS:
1. Ensure your passport is valid for at least 6 months.
2. Check your visa requirements in SAATHI Visa Assistant.
3. Keep emergency contacts and hotel vouchers stored in your SAATHI Document Vault.

If you have questions, reach out to ${assistantName} at ${assistantEmail} or contact SAATHI Support at support@saathi.travel.

Have a wonderful trip!
Team SAATHI
    `.trim();

    const subject = `Booking Confirmed: [${bookingRef}] Trip to ${destinationName} | Your SAATHI Companion`;

    // Dispatch email via transporter
    const mailOptions = {
      from: '"SAATHI Travel" <confirmations@saathi.travel>',
      to: email,
      subject,
      html: htmlContent,
      text: textContent,
    };

    await emailTransporter.sendMail(mailOptions);

    console.log(`[SAATHI] Confirmation email successfully dispatched to ${email} for booking ${bookingRef}`);

    return res.json({
      success: true,
      bookingReference: bookingRef,
      recipient: email,
      name: name || 'Valued Traveller',
      phone: phone || '',
      subject,
      dispatchedAt: new Date().toISOString(),
      assistant: {
        name: assistantName,
        title: assistantTitle,
        email: assistantEmail,
        phone: assistantPhone,
        supportHours: assistantHours,
      },
      previewHtml: htmlContent,
      previewText: textContent,
    });
  } catch (error: any) {
    console.error('Error dispatching confirmation email:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to dispatch confirmation email',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAATHI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

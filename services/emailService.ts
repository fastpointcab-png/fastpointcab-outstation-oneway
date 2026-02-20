import { BookingDetails } from '../types';

/**
 * Sends a booking confirmation email via Brevo SMTP API.
 * Uses the primary process.env.API_KEY for authorization.
 */
export const sendBookingEmail = async (details: BookingDetails): Promise<boolean> => {
  const apiKey = process.env.VITE_BREVO_API_KEY;
  const adminEmail = "fastpointcab@gmail.com";
  
  if (!apiKey) {
    console.warn("API_KEY is missing. Booking telemetry logged to console instead.");
    console.debug("Booking Payload:", details);
    return true; 
  }

  const url = "https://api.brevo.com/v3/smtp/email";
  const customerName = details.name || "Valued Customer";

  const recipients = [{ email: adminEmail, name: "FastPoint Dispatch" }];

// Encode pickup and drop locations for clickable maps
const pickupMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.pickup)}`;
const dropMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.drop)}`;

// Format date and time
const formattedDate = details.date ? new Date(details.date).toLocaleDateString() : "Not specified";
const formattedTime = details.time 
  ? new Date(`2000-01-01T${details.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  : "Not specified";

// Prepare share text for WhatsApp & Telegram with clean formatting
const shareText = `🚖 New Booking!

📝 Trip Type: ${details.tripType}
👤 Customer: ${customerName}

📞 Mobile: ${details.phone}

📅 Date: ${formattedDate}
⏰ Time: ${formattedTime}

📍 From: ${details.pickup}
🗺️ Map: ${pickupMapUrl}

📍 To: ${details.drop}
🗺️ Map: ${dropMapUrl}

🚗 Vehicle: ${details.vehicleType}
💰 Estimated Fare: ${details.estimatedFare}
`;

// WhatsApp URL
const whatsappShareText = `👋 Hi / வணக்கம்! 🚖 *FastPointCab* — Your Ride Partner

📍 Need a taxi anytime? Just open:
👉 https://www.fastpointcab.in/

📲 Easy to book:
Add this website to your Home Screen.
Next time — book in just one tap 👍

🛡️ Safe • On-time • Easy Booking

Whenever you need a ride, we are just one tap away
`;

const whatsappUrl = `https://wa.me/${details.phone}?text=${encodeURIComponent(whatsappShareText)}`;

// Telegram URL with the same text (clickable links will render as URLs in Telegram)
const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareText)}`;



  const emailContent = {
    sender: { name: "FastPoint Dispatch", email: "fastpointcab@gmail.com" },
    to: recipients,
    subject: `🚖 New Booking: ${details.pickup.split(',')[0]} to ${details.drop.split(',')[0]}`,
    htmlContent: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden;">
      <div style="background-color: #0f172a; padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em;">FASTPOINT<span style="color: #FDB813;">CAB</span></h1>
        <p style="color: #64748b; margin: 8px 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Internal Dispatch Log</p>
      </div>

      <div style="padding: 32px;">
        <div style="background-color: #f8fafc; border-radius: 20px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; line-height: 1.8;">
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Customer</td><td style="padding: 8px 0; font-weight: 800; text-align: right;">${customerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Mobile</td><td style="padding: 8px 0; font-weight: 800; text-align: right;"><a href="tel:${details.phone}" style="color:#0f172a; text-decoration: underline;">${details.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Trip Type</td><td style="padding: 8px 0; font-weight: 700; text-align: right;">${details.tripType}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Date</td><td style="padding: 8px 0; font-weight: 700; text-align: right;">${formattedDate}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Time</td><td style="padding: 8px 0; font-weight: 700; text-align: right;">${formattedTime}</td></tr>
            <tr style="border-top: 1px solid #e2e8f0;"><td colspan="2" style="padding-top: 16px;"></td></tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">From</td>
              <td style="padding: 8px 0; font-weight: 700; text-align: right;">
                <a href="${pickupMapUrl}" target="_blank" style="color: #0f172a; text-decoration: underline;">${details.pickup}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">To</td>
              <td style="padding: 8px 0; font-weight: 700; text-align: right;">
                <a href="${dropMapUrl}" target="_blank" style="color: #0f172a; text-decoration: underline;">${details.drop}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;"><td colspan="2" style="padding-top: 16px;"></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Vehicle</td><td style="padding: 8px 0; font-weight: 700; text-align: right;">${details.vehicleType}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Estimate</td><td style="padding: 8px 0; font-size: 18px; font-weight: 900; color: #FDB813; text-align: right;">${details.estimatedFare}</td></tr>
          </table>
        </div>

        <div style="text-align: center; display: flex; justify-content: center; gap: 12px;">
          <a href="${whatsappUrl}" 
             style="background-color: #25D366; color: #ffffff; padding: 16px 28px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px;">
             Share on WhatsApp
          </a>
          <a href="${telegramUrl}" 
             style="background-color: #0088cc; color: #ffffff; padding: 16px 28px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px;">
             Share on Telegram
            </a>
          </div>
        </div>
      </div>
    `
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailContent)
    });

    return response.ok;
  } catch (error) {
    console.error("Email Gateway Error:", error);
    return false;
  }
};

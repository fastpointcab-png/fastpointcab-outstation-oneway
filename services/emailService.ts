import { BookingDetails, TripType } from '../types';

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

  const pickupMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.pickup)}`;
  const dropMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.drop)}`;

  const formattedDate = details.date
    ? new Date(details.date).toLocaleDateString()
    : "Not specified";

  const formattedTime = details.time
    ? new Date(`2000-01-01T${details.time}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    : "Not specified";

  // ✅ DISTANCE LOGIC
  let formattedDistance = "Not calculated";

  if (details.distance) {
    formattedDistance = `${details.distance} KM`;
  } else if (details.rawDistance) {
    formattedDistance = `${details.rawDistance.toFixed(1)} KM`;
  }

  // Round trip adjustment
  if (details.tripType === TripType.ROUND_TRIP && details.rawDistance) {
    const totalKm = details.rawDistance * 2;
    formattedDistance = `${totalKm.toFixed(1)} KM (Round Trip)`;
  }

  // ✅ TELEGRAM TEXT
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

🛣️ Distance: ${formattedDistance}

🚗 Vehicle: ${details.vehicleType}
💰 Estimated Fare: ${details.estimatedFare}
`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareText)}`;

  const cleanPhone = details.phone?.replace(/\D/g, "") || "";

const formattedPhone =
  cleanPhone.length === 10
    ? `91${cleanPhone}`
    : cleanPhone;

const waMessage = encodeURIComponent(
`👋 Hi / வணக்கம்!

🚖 *FastPointCab* — Your Ride Partner

📍 Need a taxi anytime?
Just open:
👉 https://www.coimbatoreoutstationcabs.com/

📲 Easy to book:
Add this website to your Home Screen.
Next time — book in just one tap 👍

🛡️ Safe • On-time • Easy Booking

Whenever you need a ride,
we are just one tap away`
);

const whatsappUrl = `https://wa.me/${formattedPhone}?text=${waMessage}`;

  // ✅ EMAIL CONTENT
  const emailContent = {
    sender: { name: "FastPoint Dispatch", email: adminEmail },
    to: recipients,
    subject: `🚖 New Booking: ${details.pickup.split(',')[0]} to ${details.drop.split(',')[0]}`,
    htmlContent: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900;">FASTPOINT<span style="color: #FDB813;">CAB</span></h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 12px;">Internal Dispatch Log</p>
        </div>

        <div style="padding: 32px;">
          <div style="background-color: #f8fafc; border-radius: 20px; padding: 24px; border: 1px solid #f1f5f9;">
            <table style="width: 100%; border-collapse: collapse; line-height: 1.8;">
              <tr><td>Customer</td><td style="text-align:right;font-weight:700;">${customerName}</td></tr>
              <tr><td>Mobile</td><td style="text-align:right;font-weight:700;">${details.phone}</td></tr>
              <tr><td>Trip Type</td><td style="text-align:right;">${details.tripType}</td></tr>
              <tr><td>Date</td><td style="text-align:right;">${formattedDate}</td></tr>
              <tr><td>Time</td><td style="text-align:right;">${formattedTime}</td></tr>

              <tr><td colspan="2" style="padding-top:12px;"></td></tr>

              <tr><td>From</td><td style="text-align:right;"><a href="${pickupMapUrl}" target="_blank">${details.pickup}</a></td></tr>
              <tr><td>To</td><td style="text-align:right;"><a href="${dropMapUrl}" target="_blank">${details.drop}</a></td></tr>
              <tr><td>Distance</td><td style="text-align:right;font-weight:700;">${formattedDistance}</td></tr>

              <tr><td colspan="2" style="padding-top:12px;"></td></tr>

              <tr><td>Vehicle</td><td style="text-align:right;">${details.vehicleType}</td></tr>
              <tr><td>Estimate</td><td style="text-align:right;font-size:18px;font-weight:900;color:#FDB813;">${details.estimatedFare}</td></tr>
            </table>
          </div>

        <div style="margin-top:24px; text-align:center;">
  <table align="center" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding-right:10px;">
        <a href="${telegramUrl}" target="_blank"
           style="background:#0088cc;color:white;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:bold;display:inline-block;">
           Share on Telegram
        </a>
      </td>
      <td align="center">
        <a href="${whatsappUrl}" target="_blank"
           style="background:#25D366;color:white;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:bold;display:inline-block;">
           Chat on WhatsApp
        </a>
      </td>
    </tr>
  </table>
</div>
    `
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
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
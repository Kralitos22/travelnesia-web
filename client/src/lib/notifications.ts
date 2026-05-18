// Email Notification System
// In production, integrate with email service like SendGrid, Resend, or AWS SES

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

// Email templates for affiliate system
export const emailTemplates = {
  affiliateWelcome: (name: string, affiliateId: string) => ({
    subject: "Selamat Bergabung di Program Affiliate Ditoris Travelnesia!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0676a5, #0891b2); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">DITORIS TRAVELNESIA</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Affiliate Program</p>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Halo, ${name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Selamat! Anda telah terdaftar sebagai Affiliate <strong>Ditoris Travelnesia</strong>.
          </p>
          <div style="background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px;"><strong>ID Affiliate:</strong> ${affiliateId}</p>
            <p style="margin: 0; color: #64748b;">Level: <span style="color: #10b981; font-weight: bold;">BASIC</span></p>
          </div>
          <p style="color: #475569; line-height: 1.6;">
            Segera login ke dashboard untuk mulai mempromosikan paket umroh dan raih komisi hingga <strong>Rp 1.000.000+</strong> per jamaah!
          </p>
          <a href="https://ditoris.com/affiliate/login" style="display: inline-block; background: #0676a5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
            Login ke Dashboard
          </a>
        </div>
        <div style="padding: 20px; background: #1e293b; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            &copy; ${new Date().getFullYear()} Ditoris Travelnesia. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  commissionNotification: (name: string, amount: number, details: string) => ({
    subject: `Komisi Anda Sudah Cair! - Rp ${amount.toLocaleString("id-ID")}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Komisi Sudah Cair!</h1>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Selamat, ${name}!</h2>
          <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 10px; padding: 30px; margin: 20px 0; text-align: center;">
            <p style="color: #065f46; margin: 0 0 10px; font-size: 14px;">Total Komisi</p>
            <p style="color: #059669; font-size: 36px; font-weight: bold; margin: 0;">
              Rp ${amount.toLocaleString("id-ID")}
            </p>
          </div>
          <div style="background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 5px; font-weight: bold;">Detail:</p>
            <p style="margin: 0; color: #64748b;">${details}</p>
          </div>
          <p style="color: #475569;">
            Komisi telah ditransfer ke rekening bank Anda. Silakan cek mutasi银行.
          </p>
        </div>
        <div style="padding: 20px; background: #1e293b; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            &copy; ${new Date().getFullYear()} Ditoris Travelnesia. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  newProspectNotification: (affiliateName: string, prospectName: string, source: string) => ({
    subject: "Prospek Baru! - Follow Up Diperlukan",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f59e0b; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Prospek Baru</h1>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <p style="color: #475569;">
            <strong>${affiliateName}</strong> membawa prospek baru:
          </p>
          <div style="background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px;"><strong>Nama:</strong> ${prospectName}</p>
            <p style="margin: 0;"><strong>Sumber:</strong> ${source}</p>
          </div>
          <p style="color: #475569;">
            Tim sales akan segera follow up. Affiliate akan mendapat notifikasi setelah prospek terdaftar.
          </p>
        </div>
        <div style="padding: 20px; background: #1e293b; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            &copy; ${new Date().getFullYear()} Ditoris Travelnesia. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  prospectRegistered: (affiliateName: string, prospectName: string, package: string, commission: number) => ({
    subject: `Jamaah Terdaftar! - ${commission.toLocaleString("id-ID")} Commission`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #60a5fa); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Jamaah Terdaftar!</h1>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Selamat, ${affiliateName}!</h2>
          <p style="color: #475569;">
            Prospek yang Anda bawa telah <strong>terdaftar</strong> untuk paket Umroh!
          </p>
          <div style="background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px;"><strong>Nama Jamaah:</strong> ${prospectName}</p>
            <p style="margin: 0 0 10px;"><strong>Paket:</strong> ${package}</p>
            <p style="margin: 0;"><strong>Komisi:</strong> <span style="color: #10b981; font-weight: bold;">Rp ${commission.toLocaleString("id-ID")}</span></p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            *Komisi akan dicairkan setelah pelunasan atau H-14 keberangkatan
          </p>
        </div>
        <div style="padding: 20px; background: #1e293b; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            &copy; ${new Date().getFullYear()} Ditoris Travelnesia. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),
};

// Email service (mock - implement with real email service in production)
export async function sendEmail(template: EmailTemplate): Promise<{ success: boolean; message: string }> {
  // In production, integrate with email service
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Ditoris Travelnesia <noreply@ditoris.com>',
  //   to: template.to,
  //   subject: template.subject,
  //   html: template.html,
  // });

  console.log("📧 Email sent:", {
    to: template.to,
    subject: template.subject,
  });

  return { success: true, message: "Email sent successfully" };
}

// WhatsApp notification service
export async function sendWhatsAppNotification(
  phone: string,
  message: string
): Promise<{ success: boolean; message: string }> {
  // In production, integrate with WhatsApp Business API or Fonnte
  // Example:
  // await fetch('https://api.fonnte.com/send', {
  //   method: 'POST',
  //   headers: { 'Authorization': process.env.FONNTE_TOKEN },
  //   body: new URLSearchParams({ target: phone, message })
  // });

  console.log("📱 WhatsApp sent to:", phone);

  return { success: true, message: "WhatsApp notification sent" };
}

// Google Sheets integration helper
export const googleSheetsConfig = {
  // Replace with your Google Sheet ID
  spreadsheetId: "YOUR_GOOGLE_SHEET_ID",

  // Sheet names
  sheets: {
    affiliates: "Affiliates",
    prospects: "Prospects",
    commissions: "Commissions",
    events: "Events",
  },
};

// For demo purposes, we'll log to console
export async function syncToGoogleSheets(
  sheet: string,
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  console.log(`📊 Syncing to Google Sheets - ${sheet}:`, data);

  // In production, use Google Sheets API:
  // const { google } = require('googleapis');
  // const sheets = google.sheets({ version: 'v4', auth: client });
  // await sheets.spreadsheets.values.append({
  //   spreadsheetId: googleSheetsConfig.spreadsheetId,
  //   range: `${sheet}!A:A`,
  //   valueInputOption: 'RAW',
  //   resource: { values: [Object.values(data)] },
  // });

  return { success: true, message: "Synced to Google Sheets" };
}
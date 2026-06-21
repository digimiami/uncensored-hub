import { NextRequest, NextResponse } from "next/server";

const RESEND_KEY = process.env.RESEND_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!RESEND_KEY) {
      return NextResponse.json({ success: true, message: "Subscribed! (email service configuring)" });
    }

    // Send welcome email with lead magnet link
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Uncensored Hub <noreply@uncensored-hub.vercel.app>",
        to: [email],
        subject: "Your 30 Questions PDF — Welcome!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #10b981;">Welcome to Uncensored Hub 🔓</h1>
            <p>Thanks for subscribing! Here's your free PDF: <strong>30 Questions ChatGPT Won't Answer</strong>.</p>
            <p><a href="https://uncensored-hub.vercel.app/lead-magnet.pdf" 
                  style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; 
                         text-decoration: none; border-radius: 8px; font-weight: bold;">
              📥 Download Your Free PDF
            </a></p>
            <p>Want the full uncensored AI experience?</p>
            <ul>
              <li><a href="https://uncensored-chat-zeta.vercel.app">🔓 Uncensored Chat</a> — $9.99/mo</li>
              <li><a href="https://deep-truth-eta.vercel.app">🔮 Deep Truth</a> — $14.99/mo</li>
              <li><a href="https://uncensored-hub.vercel.app">🏠 All Apps</a></li>
            </ul>
            <p style="color: #888; font-size: 12px;">Unsubscribe anytime.</p>
          </div>
        `,
      }),
    });

    const result = await emailRes.json();
    
    return NextResponse.json({ 
      success: true, 
      message: "Subscribed! Check your email for the free PDF." 
    });

  } catch (err) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}


const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const clean = (value, max = 2000) => String(value || "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ error: "The contact form is not configured yet. Please contact the website owner through an alternative channel." }, 503);
  }
  const origin = request.headers.get("Origin");
  if (origin && origin !== "https://yaminhasan.pages.dev") return json({ error: "Request not accepted." }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Please submit a valid form." }, 400); }
  // Quiet honeypot: bots fill this field; do not send email.
  if (clean(body.company_fax, 200)) return json({ ok: true });
  const fields = {
    name: clean(body.name, 120), email: clean(body.email, 254),
    business: clean(body.business, 160), website: clean(body.website, 300),
    country: clean(body.country, 40), type: clean(body.type, 80),
    location: clean(body.location, 160), profile: clean(body.profile, 500),
    message: clean(body.message, 3000)
  };
  if (!fields.name || !fields.email || !fields.business || !fields.country || !fields.type || !fields.location || !fields.message) {
    return json({ error: "Please complete all required fields." }, 400);
  }
  if (!emailPattern.test(fields.email)) return json({ error: "Please enter a valid email address." }, 400);
  if (!["United Kingdom", "Australia"].includes(fields.country)) return json({ error: "Please select a supported country." }, 400);
  if (!["Pressure Washing / Pressure Cleaning", "Gutter Cleaning", "Window Cleaning"].includes(fields.type)) return json({ error: "Please select a supported business type." }, 400);
  if (fields.website && !/^https?:\/\/[^\s]+$/i.test(fields.website)) return json({ error: "Please include the full website address, starting with https://." }, 400);
  const text = Object.entries(fields).map(([key, value]) => `${key}: ${value || "Not provided"}`).join("\n");
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL],
        reply_to: fields.email, subject: `Visibility review request — ${fields.business}`,
        text
      })
    });
    if (!result.ok) return json({ error: "Your request could not be delivered at the moment. Please try again later." }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "A temporary delivery error occurred. Please try again later." }, 502);
  }
}

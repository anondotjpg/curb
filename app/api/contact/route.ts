import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, address, services } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // app password (NOT your real password)
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // send to yourself
      subject: "New Curb Appeal Request",
      text: `
New Service Request:

Name: ${name}
Phone: ${phone}
Address: ${address}
Services: ${services}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
}
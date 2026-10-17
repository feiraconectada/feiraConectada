import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json(
        {
          message: "Preencha todos os campos.",
        },
        {
          status: 400,
        },
      );
    }

    const { error } = await resend.emails.send({
      from: "Feira Conectada <onboarding@resend.dev>",

      to: [process.env.EMAIL_TO!],

      replyTo: email,

      subject: "Nova solicitação de cadastro - Feira Conectada",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            color: #052F58;
            line-height: 1.6;
          "
        >
          <h2 style="color: #0A355F;">
            Nova solicitação de cadastro
          </h2>

          <p>
            Uma nova solicitação foi enviada pelo
            site Feira Conectada.
          </p>

          <hr
            style="
              border: 0;
              border-top: 1px solid #D5DEE7;
              margin: 20px 0;
            "
          />

          <p>
            <strong>Nome:</strong>
            ${name}
          </p>

          <p>
            <strong>Telefone / WhatsApp:</strong>
            ${phone}
          </p>

          <p>
            <strong>E-mail:</strong>
            ${email}
          </p>

          <hr
            style="
              border: 0;
              border-top: 1px solid #D5DEE7;
              margin: 20px 0;
            "
          />

          <p style="font-size: 12px; color: #8293AA;">
            Feira Conectada
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar e-mail pelo Resend:", error);

      return NextResponse.json(
        {
          message: "Não foi possível enviar a solicitação de cadastro.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Solicitação de cadastro enviada com sucesso!",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Erro ao processar cadastro:", error);

    return NextResponse.json(
      {
        message: "Não foi possível enviar a solicitação de cadastro.",
      },
      {
        status: 500,
      },
    );
  }
}

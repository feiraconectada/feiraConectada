"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Informe seu nome.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Informe seu telefone ou WhatsApp.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    return newErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      setStatusMessage("");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      setSuccess(false);
      setStatusMessage("");

      const response = await fetch("/api/cadastro", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao enviar solicitação.");
      }

      setSuccess(true);

      setStatusMessage(
        "Solicitação de cadastro enviada com sucesso! Nossa equipe entrará em contato em breve.",
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);

      setSuccess(false);

      setStatusMessage(
        "Não foi possível enviar sua solicitação. Tente novamente em alguns instantes.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNameChange(value: string) {
    setFormData((current) => ({
      ...current,
      name: value,
    }));

    if (errors.name) {
      setErrors((current) => ({
        ...current,
        name: undefined,
      }));
    }
  }

  function handlePhoneChange(value: string) {
    setFormData((current) => ({
      ...current,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((current) => ({
        ...current,
        phone: undefined,
      }));
    }
  }

  function handleEmailChange(value: string) {
    setFormData((current) => ({
      ...current,
      email: value,
    }));

    if (errors.email) {
      setErrors((current) => ({
        ...current,
        email: undefined,
      }));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#D5DEE7] bg-white p-6"
    >
      <h2 className="text-[26px] font-extrabold tracking-[-1px] text-[#052F58]">
        Quero me cadastrar
      </h2>

      <p className="mt-2 text-[13px] leading-5 text-[#8293AA]">
        Preencha seus dados e nossa equipe entrará em contato.
      </p>

      <div className="mt-7 space-y-5">
        {/* NOME */}
        <div>
          <label
            htmlFor="name"
            className="text-[11px] font-extrabold text-[#052F58]"
          >
            Nome completo
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            disabled={isSubmitting}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Digite seu nome"
            className={`mt-2 h-[44px] w-full rounded-lg border bg-white px-3 text-sm text-[#052F58] outline-none transition focus:ring-2 focus:ring-[#07528A]/10 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.name
                ? "border-red-500"
                : "border-[#CDD8E3] focus:border-[#07528A]"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>
          )}
        </div>

        {/* TELEFONE */}
        <div>
          <label
            htmlFor="phone"
            className="text-[11px] font-extrabold text-[#052F58]"
          >
            Telefone / WhatsApp
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            disabled={isSubmitting}
            onChange={(event) => handlePhoneChange(event.target.value)}
            placeholder="(17) 99999-9999"
            className={`mt-2 h-[44px] w-full rounded-lg border bg-white px-3 text-sm text-[#052F58] outline-none transition focus:ring-2 focus:ring-[#07528A]/10 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.phone
                ? "border-red-500"
                : "border-[#CDD8E3] focus:border-[#07528A]"
            }`}
          />

          {errors.phone && (
            <p className="mt-1 text-[11px] text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="text-[11px] font-extrabold text-[#052F58]"
          >
            E-mail
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            disabled={isSubmitting}
            onChange={(event) => handleEmailChange(event.target.value)}
            placeholder="seuemail@exemplo.com"
            className={`mt-2 h-[44px] w-full rounded-lg border bg-white px-3 text-sm text-[#052F58] outline-none transition focus:ring-2 focus:ring-[#07528A]/10 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.email
                ? "border-red-500"
                : "border-[#CDD8E3] focus:border-[#07528A]"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-[44px] w-full rounded-lg bg-[#FF5A1F] text-sm font-extrabold text-white transition hover:bg-[#EF4E12] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando solicitação..." : "Quero me cadastrar"}
      </button>

      {/* MENSAGEM DE STATUS */}
      {statusMessage && (
        <div
          role="status"
          className={`mt-4 rounded-lg px-4 py-3 text-center text-[12px] font-semibold ${
            success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
}

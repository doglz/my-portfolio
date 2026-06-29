export const WHATSAPP_NUMBER = "5522992116308";

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

export const waLinkForPlan = (plan: string) =>
  waLink(
    `Olá, Douglas! Tenho interesse no plano ${plan}. Pode me passar os próximos passos?`,
  );

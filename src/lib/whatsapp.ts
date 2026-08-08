export const WHATSAPP_NUMBER = "5522992116308";
export const EMOTES_WHATSAPP_NUMBER = "5522997477083";

export const waLink = (text?: string, customNumber?: string) =>
  `https://wa.me/${customNumber || WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

export const waLinkForEmotes = (text?: string) =>
  waLink(text, EMOTES_WHATSAPP_NUMBER);

export const waLinkForPlan = (plan: string) => {
  if (plan.toLowerCase().includes("emote")) {
    return waLinkForEmotes(
      `Olá, Douglas! Tenho interesse no pacote ${plan}. Pode me passar os próximos passos?`
    );
  }
  return waLink(
    `Olá, Douglas! Tenho interesse no plano ${plan}. Pode me passar os próximos passos?`
  );
};

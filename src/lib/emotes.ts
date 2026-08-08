// Emotes collection loaded from emotes_gojo and emotes_marin

// Gojo emotes
import gojoNeutro from "@/assets/emotes-preview/emotes_gojo/01_neutro_112x112.png";
import gojoPensando from "@/assets/emotes-preview/emotes_gojo/02_pensando_112x112.png";
import gojoFeliz from "@/assets/emotes-preview/emotes_gojo/03_feliz_112x112.png";
import gojoRindo from "@/assets/emotes-preview/emotes_gojo/04_rindo_112x112.png";
import gojoChorando from "@/assets/emotes-preview/emotes_gojo/05_chorando_112x112.png";
import gojoCoracao from "@/assets/emotes-preview/emotes_gojo/06_coracao_112x112.png";
import gojoBravo from "@/assets/emotes-preview/emotes_gojo/07_bravo_112x112.png";
import gojoSurpreso from "@/assets/emotes-preview/emotes_gojo/08_surpreso_112x112.png";
import gojoTimido from "@/assets/emotes-preview/emotes_gojo/09_timido_112x112.png";
import gojoEspiando from "@/assets/emotes-preview/emotes_gojo/10_espiando_112x112.png";
import gojoAcenando from "@/assets/emotes-preview/emotes_gojo/11_acenando_112x112.png";
import gojoDormindo from "@/assets/emotes-preview/emotes_gojo/12_dormindo_112x112.png";
import gojoJoinha from "@/assets/emotes-preview/emotes_gojo/13_joinha_112x112.png";
import gojoBebendo from "@/assets/emotes-preview/emotes_gojo/14_bebendo_112x112.png";
import gojoFacepalm from "@/assets/emotes-preview/emotes_gojo/15_facepalm_112x112.png";
import gojoChocado from "@/assets/emotes-preview/emotes_gojo/16_chocado_112x112.png";
import gojoSaudacao from "@/assets/emotes-preview/emotes_gojo/17_saudacao_112x112.png";
import gojoConfuso from "@/assets/emotes-preview/emotes_gojo/18_confuso_112x112.png";
import gojoLurk from "@/assets/emotes-preview/emotes_gojo/19_lurk_112x112.png";
import gojoComemorando from "@/assets/emotes-preview/emotes_gojo/20_comemorando_112x112.png";
import gojoCoracaoPartida from "@/assets/emotes-preview/emotes_gojo/21_coracao_partido_112x112.png";
import gojoJogando from "@/assets/emotes-preview/emotes_gojo/22_jogando_112x112.png";
import gojoBebendoJuice from "@/assets/emotes-preview/emotes_gojo/23_bebendo_juice_112x112.png";
import gojoDinheiro from "@/assets/emotes-preview/emotes_gojo/24_dinheiro_112x112.png";

// Marin emotes
import marinRindo from "@/assets/emotes-preview/emotes_marin/01_rindo_master.png";
import marinChorando from "@/assets/emotes-preview/emotes_marin/02_chorando_master.png";
import marinCoracao from "@/assets/emotes-preview/emotes_marin/03_coracao_master.png";
import marinBravo from "@/assets/emotes-preview/emotes_marin/04_bravo_master.png";
import marinSurpreso from "@/assets/emotes-preview/emotes_marin/05_surpreso_master.png";
import marinVergonha from "@/assets/emotes-preview/emotes_marin/06_vergonha_master.png";
import marinOi from "@/assets/emotes-preview/emotes_marin/07_oi_master.png";
import marinDormindo from "@/assets/emotes-preview/emotes_marin/08_dormindo_master.png";
import marinLike from "@/assets/emotes-preview/emotes_marin/09_like_master.png";
import marinCool from "@/assets/emotes-preview/emotes_marin/10_cool_master.png";
import marinPensando from "@/assets/emotes-preview/emotes_marin/11_pensando_master.png";
import marinChocado from "@/assets/emotes-preview/emotes_marin/12_chocado_master.png";
import marinSaudacao from "@/assets/emotes-preview/emotes_marin/13_saudacao_master.png";
import marinConfuso from "@/assets/emotes-preview/emotes_marin/14_confuso_master.png";
import marinLurk from "@/assets/emotes-preview/emotes_marin/15_lurk_master.png";
import marinComemorando from "@/assets/emotes-preview/emotes_marin/16_comemorando_master.png";
import marinCoracaoPartido from "@/assets/emotes-preview/emotes_marin/17_coracao_partido_master.png";
import marinJogando from "@/assets/emotes-preview/emotes_marin/18_jogando_master.png";
import marinBebendo from "@/assets/emotes-preview/emotes_marin/19_bebendo_master.png";
import marinDinheiro from "@/assets/emotes-preview/emotes_marin/20_dinheiro_master.png";

export type EmoteItem = {
  id: string;
  name: string;
  label: string;
  src: string;
  pack: "gojo" | "marin";
};

export const gojoEmotes: EmoteItem[] = [
  { id: "g01", name: "neutro", label: "Neutro", src: gojoNeutro, pack: "gojo" },
  { id: "g02", name: "pensando", label: "Pensando", src: gojoPensando, pack: "gojo" },
  { id: "g03", name: "feliz", label: "Feliz", src: gojoFeliz, pack: "gojo" },
  { id: "g04", name: "rindo", label: "Rindo", src: gojoRindo, pack: "gojo" },
  { id: "g05", name: "chorando", label: "Chorando", src: gojoChorando, pack: "gojo" },
  { id: "g06", name: "coracao", label: "Coração", src: gojoCoracao, pack: "gojo" },
  { id: "g07", name: "bravo", label: "Bravo", src: gojoBravo, pack: "gojo" },
  { id: "g08", name: "surpreso", label: "Surpreso", src: gojoSurpreso, pack: "gojo" },
  { id: "g09", name: "timido", label: "Tímido", src: gojoTimido, pack: "gojo" },
  { id: "g10", name: "espiando", label: "Espiando", src: gojoEspiando, pack: "gojo" },
  { id: "g11", name: "acenando", label: "Acenando", src: gojoAcenando, pack: "gojo" },
  { id: "g12", name: "dormindo", label: "Dormindo", src: gojoDormindo, pack: "gojo" },
  { id: "g13", name: "joinha", label: "Joinha", src: gojoJoinha, pack: "gojo" },
  { id: "g14", name: "bebendo", label: "Bebendo", src: gojoBebendo, pack: "gojo" },
  { id: "g15", name: "facepalm", label: "Facepalm", src: gojoFacepalm, pack: "gojo" },
  { id: "g16", name: "chocado", label: "Chocado", src: gojoChocado, pack: "gojo" },
  { id: "g17", name: "saudacao", label: "Saudação", src: gojoSaudacao, pack: "gojo" },
  { id: "g18", name: "confuso", label: "Confuso", src: gojoConfuso, pack: "gojo" },
  { id: "g19", name: "lurk", label: "Lurk", src: gojoLurk, pack: "gojo" },
  { id: "g20", name: "comemorando", label: "Comemorando", src: gojoComemorando, pack: "gojo" },
  { id: "g21", name: "coracaoPartida", label: "Coração Partido", src: gojoCoracaoPartida, pack: "gojo" },
  { id: "g22", name: "jogando", label: "Jogando", src: gojoJogando, pack: "gojo" },
  { id: "g23", name: "bebendoJuice", label: "Bebendo Suco", src: gojoBebendoJuice, pack: "gojo" },
  { id: "g24", name: "dinheiro", label: "Dinheiro / Stonks", src: gojoDinheiro, pack: "gojo" },
];

export const marinEmotes: EmoteItem[] = [
  { id: "m01", name: "marinRindo", label: "Rindo", src: marinRindo, pack: "marin" },
  { id: "m02", name: "marinChorando", label: "Chorando", src: marinChorando, pack: "marin" },
  { id: "m03", name: "marinCoracao", label: "Coração", src: marinCoracao, pack: "marin" },
  { id: "m04", name: "marinBravo", label: "Brava", src: marinBravo, pack: "marin" },
  { id: "m05", name: "marinSurpreso", label: "Surpresa", src: marinSurpreso, pack: "marin" },
  { id: "m06", name: "marinVergonha", label: "Vergonha", src: marinVergonha, pack: "marin" },
  { id: "m07", name: "marinOi", label: "Oi / Aceno", src: marinOi, pack: "marin" },
  { id: "m08", name: "marinDormindo", label: "Dormindo", src: marinDormindo, pack: "marin" },
  { id: "m09", name: "marinLike", label: "Joinha", src: marinLike, pack: "marin" },
  { id: "m10", name: "marinCool", label: "Estilosa", src: marinCool, pack: "marin" },
  { id: "m11", name: "marinPensando", label: "Pensando", src: marinPensando, pack: "marin" },
  { id: "m12", name: "marinChocado", label: "Chocada", src: marinChocado, pack: "marin" },
  { id: "m13", name: "marinSaudacao", label: "Saudação", src: marinSaudacao, pack: "marin" },
  { id: "m14", name: "marinConfuso", label: "Confusa", src: marinConfuso, pack: "marin" },
  { id: "m15", name: "marinLurk", label: "Lurk", src: marinLurk, pack: "marin" },
  { id: "m16", name: "marinComemorando", label: "Comemorando", src: marinComemorando, pack: "marin" },
  { id: "m17", name: "marinCoracaoPartido", label: "Coração Partido", src: marinCoracaoPartido, pack: "marin" },
  { id: "m18", name: "marinJogando", label: "Gamer", src: marinJogando, pack: "marin" },
  { id: "m19", name: "marinBebendo", label: "Bebendo", src: marinBebendo, pack: "marin" },
  { id: "m20", name: "marinDinheiro", label: "Dinheiro", src: marinDinheiro, pack: "marin" },
];

export const allEmotes: EmoteItem[] = [...gojoEmotes, ...marinEmotes];

// Alternating 8 emotes for the Hero composition (Gojo / Marin / Gojo / Marin...)
export const heroEmotes: EmoteItem[] = [
  gojoEmotes[3],   // Gojo Rindo
  marinEmotes[2],  // Marin Coração
  gojoEmotes[19],  // Gojo Comemorando
  marinEmotes[8],  // Marin Like
  gojoEmotes[14],  // Gojo Facepalm
  marinEmotes[19], // Marin Dinheiro
  gojoEmotes[18],  // Gojo Lurk
  marinEmotes[9],  // Marin Cool
];

// Alternating 12 curated emotes for a clean, non-extended compact gallery
export const galleryEmotes: EmoteItem[] = [
  gojoEmotes[3],   // Gojo Rindo
  marinEmotes[2],  // Marin Coração
  gojoEmotes[6],   // Gojo Bravo
  marinEmotes[6],  // Marin Oi
  gojoEmotes[12],  // Gojo Joinha
  marinEmotes[9],  // Marin Cool
  gojoEmotes[15],  // Gojo Chocado
  marinEmotes[11], // Marin Chocada
  gojoEmotes[19],  // Gojo Comemorando
  marinEmotes[15], // Marin Comemorando
  gojoEmotes[23],  // Gojo Dinheiro
  marinEmotes[19], // Marin Dinheiro
];

export const emotes = {
  joia: gojoEmotes[12],
  salute: gojoEmotes[16],
  estrelas: marinEmotes[0],
  troll: gojoEmotes[3],
  comemora: marinEmotes[15],
  hype: gojoEmotes[15],
  dinheiro: marinEmotes[19],
  coracao: marinEmotes[2],
  jogando: gojoEmotes[21],
};

export function getEmoteClipPath(_name: string): string | undefined {
  return undefined;
}

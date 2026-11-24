import type { Machine, MachineWriteup, WriteupFlag } from "../../types";

/** Las 7 secciones de texto del writeup (las flags van aparte), en orden de metodología. */
export const writeupSections = [
  { key: "summary", title: "Resumen", hint: "Qué máquina es, qué la hace interesante y la cadena de ataque en 2–3 líneas.\n\nEj: Linux Easy. FTP anónimo → credenciales en un backup → SSH → sudo mal configurado → root." },
  { key: "recon", title: "Reconocimiento", hint: "Escaneo inicial y qué puertos/servicios aparecieron.\n\n```bash\nnmap -sC -sV -oN nmap/inicial <IP>\n```\n\n- 21/tcp ftp …\n- 80/tcp http …" },
  { key: "enumeration", title: "Enumeración", hint: "Qué revisaste de cada servicio y qué encontraste (directorios, usuarios, versiones).\n\n```bash\ngobuster dir -u http://<IP> -w /usr/share/wordlists/dirb/common.txt\n```" },
  { key: "exploitation", title: "Explotación", hint: "Cómo conseguiste el primer acceso (foothold) y por qué funcionó. Explicá la vulnerabilidad con tus palabras." },
  { key: "privesc", title: "Escalada de privilegios", hint: "Cómo pasaste de usuario a root/Administrator. Qué buscaste (sudo -l, SUID, servicios) y qué funcionó." },
  { key: "conclusions", title: "Conclusiones", hint: "Qué aprendiste, qué te costó, qué harías distinto y cómo se defendería (visión Blue Team)." },
  { key: "references", title: "Referencias", hint: "- https://… (documentación, CVE, artículos)\n- Módulo de HTB Academy relacionado" },
] as const;

export type WriteupTextKey = typeof writeupSections[number]["key"];

/** Tope por writeup (incluye capturas). localStorage ronda los 5 MB para toda la app. */
export const WRITEUP_MAX_CHARS = 3_000_000;
const EVIDENCE_MAX = 300;

const text = (value: unknown, max: number) => (typeof value === "string" ? value : "").slice(0, max);
const isoDate = (value: unknown) => { const v = text(value, 10); return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ""; };

export const defaultFlags = (): WriteupFlag[] => [
  { id: crypto.randomUUID(), label: "user", obtained: false, date: "", evidence: "" },
  { id: crypto.randomUUID(), label: "root", obtained: false, date: "", evidence: "" },
];

export function emptyWriteup(): MachineWriteup {
  return { summary: "", recon: "", enumeration: "", exploitation: "", privesc: "", flags: defaultFlags(), conclusions: "", references: "", updatedAt: "" };
}

export function normalizeWriteup(value: unknown): MachineWriteup | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const flags = (Array.isArray(raw.flags) ? raw.flags : []).slice(0, 10).map((item): WriteupFlag | null => {
    if (!item || typeof item !== "object") return null;
    const flag = item as Record<string, unknown>;
    const label = text(flag.label, 40).trim();
    if (!label) return null;
    const evidence = text(flag.evidence, EVIDENCE_MAX).trim();
    return {
      id: text(flag.id, 80) || crypto.randomUUID(),
      label,
      obtained: flag.obtained === true,
      date: isoDate(flag.date),
      // Defensa extra: si la evidencia trae algo con forma de flag, se tapa.
      evidence: redactSecrets(evidence),
    };
  }).filter((flag): flag is WriteupFlag => Boolean(flag));
  const writeup = emptyWriteup();
  for (const { key } of writeupSections) writeup[key] = text(raw[key], WRITEUP_MAX_CHARS);
  writeup.flags = flags;
  writeup.updatedAt = text(raw.updatedAt, 40);
  return writeup;
}

/** Cuántas de las 8 secciones tienen contenido (las flags cuentan si hay al menos una obtenida). */
export function writeupProgress(writeup?: MachineWriteup) {
  if (!writeup) return 0;
  return writeupSections.filter(({ key }) => writeup[key].trim()).length + (writeup.flags.some((flag) => flag.obtained) ? 1 : 0);
}

export const writeupSize = (writeup: MachineWriteup) => JSON.stringify(writeup).length;

// HTB{...}, THM{...}, flag{...} y hashes de 32 caracteres hex (formato de las flags de HTB).
const SECRET_PATTERNS = [/\b[A-Za-z0-9_]{2,10}\{[^}\s]{4,}\}/g, /\b[a-f0-9]{32}\b/gi];
const IMAGE_LINE = /^\s*!\[[^\]]*\]\(\S+\)\s*$/;

/** ¿Hay algo con forma de flag? Se ignoran las líneas de imágenes (base64). */
export function findSecrets(value: string) {
  return value.split("\n").some((line) => !IMAGE_LINE.test(line) && SECRET_PATTERNS.some((pattern) => { pattern.lastIndex = 0; return pattern.test(line); }));
}

/** Reemplaza lo que parezca una flag (o un hash) por [REDACTADO]. */
export function redactSecrets(value: string) {
  return value.split("\n").map((line) => IMAGE_LINE.test(line) ? line : SECRET_PATTERNS.reduce((acc, pattern) => acc.replace(pattern, "[REDACTADO]"), line)).join("\n");
}

const yaml = (value: string) => JSON.stringify(value);

/**
 * Writeup en Markdown listo para Obsidian o GitHub. Nunca incluye notas privadas,
 * IP del laboratorio ni datos de ayuda/IA, y tapa cualquier cosa con forma de flag.
 */
export function writeupMarkdown(machine: Machine) {
  const writeup = machine.writeup ?? emptyWriteup();
  const body = writeupSections.filter(({ key }) => key !== "conclusions" && key !== "references").map(({ key, title }) => `## ${title}\n\n${writeup[key].trim() || "_Sin completar._"}`);
  const flags = writeup.flags.length
    ? writeup.flags.map((flag) => `- **${flag.label}**: ${flag.obtained ? `obtenida${flag.date ? ` el ${flag.date}` : ""}` : "no obtenida"}${flag.evidence ? ` — ${flag.evidence}` : ""}`).join("\n")
    : "_Sin flags registradas._";
  const tail = writeupSections.filter(({ key }) => key === "conclusions" || key === "references").map(({ key, title }) => `## ${title}\n\n${writeup[key].trim() || "_Sin completar._"}`);
  const markdown = `---
title: ${yaml(machine.name)}
tipo: writeup
plataforma: ${yaml(machine.platform)}
sistema: ${yaml(machine.os)}
dificultad: ${yaml(machine.difficulty)}
estado: ${yaml(machine.status)}
resuelta: ${machine.completedAt || "null"}
visibilidad: ${yaml(machine.writeupVisibility)}
tecnicas: ${JSON.stringify(machine.techniques)}
herramientas: ${JSON.stringify(machine.tools)}
tags: [writeup, ctf, ${machine.platform.toLowerCase().replace(/[^a-z0-9]+/g, "-")}]
---

# ${machine.name}

> ${machine.platform} · ${machine.os} · ${machine.difficulty}

${body.join("\n\n")}

## Flags

${flags}

${tail.join("\n\n")}
`;
  return redactSecrets(markdown);
}

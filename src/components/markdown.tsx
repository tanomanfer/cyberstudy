import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Lector Markdown seguro: arma componentes React línea por línea y nunca
 * inyecta HTML. Lo usan el Cuaderno, el tutor y los writeups de máquinas.
 */

export type MatchCounter = { current: number };

export const MAX_NOTE_IMAGE_BYTES = 1024 * 1024;
export const SUPPORTED_NOTE_IMAGES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export function fileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("No se pudo leer la imagen."));
    reader.onerror = () => reject(reader.error ?? new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

export function safeImageSource(source: string) {
  return source.startsWith("/") || source.startsWith("https://") || /^data:image\/(png|jpeg|webp|gif);base64,/i.test(source);
}

export function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

export function Highlight({ text, query, counter, activeIndex }: { text: string; query: string; counter?: MatchCounter; activeIndex?: number }) {
  const term = query.trim();
  if (!term) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, "gi"));
  return <>{parts.map((part, index) => {
    if (part.toLowerCase() !== term.toLowerCase()) return part;
    const idx = counter ? counter.current++ : undefined;
    return <mark key={index} data-match-idx={idx} className={idx === activeIndex ? "active" : undefined}>{part}</mark>;
  })}</>;
}

export function ReadableText({ text, query, counter, activeIndex }: { text: string; query: string; counter?: MatchCounter; activeIndex?: number }) { return <>{text.split(/\n+/).filter(Boolean).map((line, index) => <p key={index}><Highlight text={line} query={query} counter={counter} activeIndex={activeIndex}/></p>)}</>; }

const SHELL_LANGS = new Set(["bash", "sh", "shell", "zsh", "fish", "console", "terminal", "powershell", "ps1", "cmd"]);
const SHELL_TOKEN = /(#.*$)|("(?:[^"\\]|\\.)*"|'[^']*')|((?:^|(?<=\s))--?[A-Za-z][\w-]*)|(\b\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?\b|\b\d+\b)/g;

/** Resaltado simple para comandos de terminal: comando, flags, textos, IPs y comentarios. */
function ShellLine({ line }: { line: string }) {
  const prompt = line.match(/^(\s*(?:\$|#|>|PS [^>]*>)\s+)/);
  const start = prompt ? prompt[1].length : 0;
  const body = line.slice(start);
  const command = body.match(/^\s*(sudo\s+)?[\w./-]+/);
  const out: React.ReactNode[] = [];
  if (prompt) out.push(<span className="tok-prompt" key="p">{prompt[1]}</span>);
  let rest = body;
  if (command && !body.trimStart().startsWith("#")) { out.push(<span className="tok-cmd" key="c">{command[0]}</span>); rest = body.slice(command[0].length); }
  let last = 0;
  for (const match of rest.matchAll(SHELL_TOKEN)) {
    const at = match.index ?? 0;
    if (at > last) out.push(rest.slice(last, at));
    const kind = match[1] ? "comment" : match[2] ? "string" : match[3] ? "flag" : "number";
    out.push(<span className={`tok-${kind}`} key={at}>{match[0]}</span>);
    last = at + match[0].length;
  }
  if (last < rest.length) out.push(rest.slice(last));
  return <>{out}</>;
}

function CodeBlock({ code, lang, query, counter, activeIndex }: { code: string; lang: string; query: string; counter?: MatchCounter; activeIndex?: number }) {
  const [copied, setCopied] = useState(false);
  const shell = SHELL_LANGS.has(lang.toLowerCase());
  async function copy() {
    let ok = false;
    try { await navigator.clipboard.writeText(code); ok = true; } catch {
      // Respaldo para navegadores que bloquean la API del portapapeles.
      const area = document.createElement("textarea");
      area.value = code; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select();
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      area.remove();
    }
    setCopied(ok);
    if (ok) window.setTimeout(() => setCopied(false), 1500);
  }
  const lines = code.split("\n");
  return <div className="code-block">
    <div className="code-head"><span>{lang || "código"}</span><button type="button" onClick={() => void copy()} aria-label="Copiar código">{copied ? <><Check size={13}/> Copiado</> : <><Copy size={13}/> Copiar</>}</button></div>
    <pre><code>{query.trim() || !shell
      ? <Highlight text={code} query={query} counter={counter} activeIndex={activeIndex}/>
      : lines.map((line, index) => <span key={index}><ShellLine line={line}/>{index < lines.length - 1 ? "\n" : ""}</span>)}</code></pre>
  </div>;
}

export function MarkdownText({ text, query, counter, activeIndex }: { text: string; query: string; counter?: MatchCounter; activeIndex?: number }) {
  const blocks: React.ReactNode[] = [];
  let code: string[] | null = null;
  let lang = "";
  const h = (value: string) => <Highlight text={value} query={query} counter={counter} activeIndex={activeIndex}/>;
  text.split("\n").forEach((line, index) => {
    const fence = line.trim().match(/^```\s*([\w+-]*)/);
    if (fence) {
      if (code) { blocks.push(<CodeBlock key={`code-${index}`} code={code.join("\n")} lang={lang} query={query} counter={counter} activeIndex={activeIndex}/>); code = null; }
      else { code = []; lang = fence[1] ?? ""; }
      return;
    }
    if (code) { code.push(line); return; }
    const image = line.trim().match(/^!\[([^\]]*)\]\((\S+)\)$/);
    if (image && safeImageSource(image[2])) blocks.push(<figure className="reader-image" key={index}><img src={image[2]} alt={image[1] || "Imagen del apunte"} loading="lazy"/>{image[1] ? <figcaption>{h(image[1])}</figcaption> : null}</figure>);
    else if (line.startsWith("### ")) blocks.push(<h4 key={index}>{h(line.slice(4))}</h4>);
    else if (line.startsWith("## ")) blocks.push(<h3 key={index}>{h(line.slice(3))}</h3>);
    else if (line.startsWith("# ")) blocks.push(<h2 key={index}>{h(line.slice(2))}</h2>);
    else if (/^[-*] /.test(line)) blocks.push(<div className="reader-list-item" key={index}><span>•</span><p>{h(line.slice(2))}</p></div>);
    else if (/^\d+\. /.test(line)) blocks.push(<div className="reader-list-item" key={index}><span>{line.match(/^\d+/)?.[0]}.</span><p>{h(line.replace(/^\d+\. /, ""))}</p></div>);
    else if (line.trim()) blocks.push(<p key={index}>{h(line)}</p>);
  });
  if (code !== null) blocks.push(<CodeBlock key="code-last" code={(code as string[]).join("\n")} lang={lang} query={query} counter={counter} activeIndex={activeIndex}/>);
  return <>{blocks}</>;
}

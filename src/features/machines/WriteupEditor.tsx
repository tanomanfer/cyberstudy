import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Check, Code2, Download, Eye, ImagePlus, Lock, Pencil, Plus, Printer, Trash2, Wand2 } from "lucide-react";
import type { Machine, MachineWriteup, WriteupFlag } from "../../types";
import { Modal } from "../../components/ui";
import { MarkdownText, MAX_NOTE_IMAGE_BYTES, SUPPORTED_NOTE_IMAGES, fileAsDataUrl } from "../../components/markdown";
import { downloadMarkdown } from "../../lib/markdown";
import { LIMITS } from "./machines";
import { emptyWriteup, findSecrets, redactSecrets, WRITEUP_MAX_CHARS, writeupMarkdown, writeupProgress, writeupSections, writeupSize, type WriteupTextKey } from "./writeup";

type Tab = WriteupTextKey | "flags" | "notes" | "full";

export function WriteupEditor({ machine, onSave, onClose }: { machine: Machine; onSave: (writeup: MachineWriteup, notes: string) => void; onClose: () => void }) {
  const initial = useMemo(() => structuredClone(machine.writeup ?? emptyWriteup()), [machine]);
  const [draft, setDraft] = useState<MachineWriteup>(initial);
  const [notes, setNotes] = useState(machine.notes);
  const [tab, setTab] = useState<Tab>("summary");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const [printing, setPrinting] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const dirty = JSON.stringify(draft) !== JSON.stringify(initial) || notes !== machine.notes;
  const size = writeupSize(draft);
  const allText = writeupSections.map(({ key }) => draft[key]).join("\n");
  const hasSecrets = findSecrets(allText) || draft.flags.some((flag) => findSecrets(flag.evidence));
  const current = writeupSections.find((section) => section.key === tab);
  const preview_machine: Machine = { ...machine, writeup: draft };

  function close() { if (!dirty || window.confirm("Tenés cambios sin guardar en el writeup. ¿Cerrar igual?")) onClose(); }
  const setText = (key: WriteupTextKey, value: string) => setDraft((d) => ({ ...d, [key]: value }));

  /** Inserta texto donde está el cursor (o al final si el editor no tiene foco). */
  function insert(key: WriteupTextKey, snippet: string) {
    const el = textarea.current;
    const value = draft[key];
    const at = el && document.activeElement === el ? el.selectionStart : value.length;
    const before = value.slice(0, at);
    const pad = before && !before.endsWith("\n\n") ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
    setText(key, `${before}${pad}${snippet}\n${value.slice(at)}`);
    setPreview(false);
  }

  async function addImage(file: File | undefined, key: WriteupTextKey) {
    setError("");
    if (!file) return;
    if (!SUPPORTED_NOTE_IMAGES.has(file.type)) { setError("Formato no admitido. Usá PNG, JPG, WebP o GIF."); return; }
    if (file.size > MAX_NOTE_IMAGE_BYTES) { setError("La captura supera 1 MB. Recortala o comprimila antes de agregarla."); return; }
    try {
      const source = await fileAsDataUrl(file);
      if (size + source.length > WRITEUP_MAX_CHARS) { setError("El writeup ya está cerca del límite de 3 MB. Usá capturas más chicas."); return; }
      const alt = (file.name.replace(/\.[^.]+$/, "").replace(/[[\]()]/g, " ").trim() || "Captura").slice(0, 80);
      insert(key, `![${alt}](${source})`);
    } catch { setError("No se pudo leer la imagen."); }
    if (imageInput.current) imageInput.current.value = "";
  }

  function setFlag(id: string, patch: Partial<WriteupFlag>) { setDraft((d) => ({ ...d, flags: d.flags.map((flag) => flag.id === id ? { ...flag, ...patch } : flag) })); }

  function save() {
    setError("");
    if (size > WRITEUP_MAX_CHARS) { setError("El writeup supera los 3 MB (casi siempre por las capturas). Sacá alguna imagen."); return; }
    if (draft.flags.some((flag) => !flag.label.trim())) { setError("Cada flag necesita un nombre (por ejemplo user o root)."); return; }
    if (draft.flags.some((flag) => findSecrets(flag.evidence))) { setError("La evidencia de una flag parece contener el valor de la flag. Describí cómo la obtuviste, sin pegarla."); return; }
    onSave({ ...draft, updatedAt: new Date().toISOString() }, notes.slice(0, LIMITS.notes));
  }

  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done, { once: true });
    const timer = window.setTimeout(() => window.print(), 150);
    return () => { window.clearTimeout(timer); window.removeEventListener("afterprint", done); };
  }, [printing]);

  const tabs: { key: Tab; label: string }[] = [
    ...writeupSections.slice(0, 5).map(({ key, title }) => ({ key, label: title })),
    { key: "flags", label: "Flags" },
    ...writeupSections.slice(5).map(({ key, title }) => ({ key, label: title })),
  ];

  return <Modal wide title={`Writeup · ${machine.name}`} subtitle={`${writeupProgress(draft)}/8 secciones · ${machine.writeupVisibility}. Usá Markdown: ## títulos, - listas y bloques \`\`\`bash para comandos.`} onClose={close}>
    <div className="writeup-tabs" role="tablist">
      {tabs.map((item, index) => <button key={item.key} role="tab" aria-selected={tab === item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key)}><small>{index + 1}</small>{item.label}{item.key === "flags" ? (draft.flags.some((f) => f.obtained) ? " ✓" : "") : draft[item.key as WriteupTextKey].trim() ? " ✓" : ""}</button>)}
      <button role="tab" aria-selected={tab === "notes"} className={`private ${tab === "notes" ? "active" : ""}`} onClick={() => setTab("notes")}><Lock size={12}/> Notas privadas</button>
      <button role="tab" aria-selected={tab === "full"} className={tab === "full" ? "active" : ""} onClick={() => setTab("full")}><Eye size={12}/> Vista completa</button>
    </div>

    {current ? <div className="writeup-pane">
      <div className="writeup-toolbar">
        <div className="segmented"><button className={!preview ? "active" : ""} onClick={() => setPreview(false)}><Pencil size={13}/> Editar</button><button className={preview ? "active" : ""} onClick={() => setPreview(true)}><Eye size={13}/> Vista previa</button></div>
        <button className="btn ghost small" onClick={() => insert(current.key, "```bash\n\n```")}><Code2 size={14}/> Bloque de comandos</button>
        <button className="btn ghost small" onClick={() => imageInput.current?.click()}><ImagePlus size={14}/> Captura</button>
        {!draft[current.key].trim() ? <button className="btn ghost small" onClick={() => setText(current.key, current.hint)} title="Rellena con una guía que después editás"><Wand2 size={14}/> Usar guía</button> : null}
        <input ref={imageInput} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => void addImage(e.target.files?.[0], current.key)}/>
      </div>
      {preview
        ? <div className="writeup-preview reader-copy">{draft[current.key].trim() ? <MarkdownText text={draft[current.key]} query=""/> : <p className="muted-note">Esta sección está vacía.</p>}</div>
        : <textarea ref={textarea} className="writeup-textarea" value={draft[current.key]} placeholder={current.hint} onChange={(e) => setText(current.key, e.target.value)} onPaste={(e) => { const file = [...e.clipboardData.files].find((f) => f.type.startsWith("image/")); if (file) { e.preventDefault(); void addImage(file, current.key); } }} spellCheck={false}/>}
      <p className="muted-note">Podés pegar capturas con Ctrl+V (máx. 1 MB cada una).</p>
    </div> : null}

    {tab === "flags" ? <div className="writeup-pane">
      <p className="writeup-warning"><AlertTriangle size={14}/> Registrá solo si la obtuviste, cuándo y cómo. <b>Nunca pegues el valor de la flag.</b></p>
      <div className="flag-list">{draft.flags.map((flag) => <div className="flag-row" key={flag.id}>
        <input aria-label="Nombre de la flag" maxLength={40} value={flag.label} onChange={(e) => setFlag(flag.id, { label: e.target.value })}/>
        <label className="flag-check"><input type="checkbox" checked={flag.obtained} onChange={(e) => setFlag(flag.id, { obtained: e.target.checked, date: e.target.checked && !flag.date ? new Date().toISOString().slice(0, 10) : flag.date })}/> Obtenida</label>
        <input type="date" aria-label="Fecha" value={flag.date} onChange={(e) => setFlag(flag.id, { date: e.target.value })}/>
        <input aria-label="Evidencia" maxLength={300} value={flag.evidence} placeholder="Cómo la obtuve (ej: cat en /home/usuario tras SSH)" onChange={(e) => setFlag(flag.id, { evidence: e.target.value })}/>
        <button className="icon-button danger" title="Quitar flag" onClick={() => setDraft((d) => ({ ...d, flags: d.flags.filter((item) => item.id !== flag.id) }))}><Trash2 size={15}/></button>
      </div>)}</div>
      {draft.flags.length < 10 ? <button className="btn ghost small" onClick={() => setDraft((d) => ({ ...d, flags: [...d.flags, { id: crypto.randomUUID(), label: `flag ${d.flags.length + 1}`, obtained: false, date: "", evidence: "" }] }))}><Plus size={14}/> Agregar flag</button> : null}
    </div> : null}

    {tab === "notes" ? <div className="writeup-pane">
      <p className="writeup-warning private-note"><Lock size={14}/> Solo para vos: <b>nunca se exportan</b> ni salen en el PDF. Igual, no guardes contraseñas ni flags.</p>
      <textarea className="writeup-textarea" maxLength={LIMITS.notes} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ideas sueltas, intentos que fallaron, dudas…"/>
    </div> : null}

    {tab === "full" ? <div className="writeup-pane writeup-full"><WriteupDocument machine={preview_machine}/></div> : null}

    {hasSecrets ? <p className="writeup-warning"><AlertTriangle size={14}/> Hay algo con forma de flag o hash (HTB&#123;…&#125; o 32 caracteres hex). Al exportar se reemplaza por [REDACTADO], pero mejor no guardarlo.</p> : null}
    {error ? <p className="form-error" role="alert">{error}</p> : null}
    <div className="writeup-footer">
      <span className={size > WRITEUP_MAX_CHARS * 0.8 ? "size warn" : "size"}>{(size / 1_000_000).toFixed(2)} / 3 MB</span>
      <button className="btn ghost small" onClick={() => downloadMarkdown(`writeup-${machine.name}`, writeupMarkdown(preview_machine))}><Download size={14}/> Exportar .md</button>
      <button className="btn ghost small" onClick={() => setPrinting(true)}><Printer size={14}/> PDF / Imprimir</button>
      <button className="btn primary" onClick={save} disabled={!dirty}><Check size={16}/> Guardar writeup</button>
    </div>
    {printing ? createPortal(<div className="print-root"><WriteupDocument machine={preview_machine} redact/></div>, document.body) : null}
  </Modal>;
}

/** Writeup completo, de solo lectura. Con `redact` tapa todo lo que parezca una flag (para PDF). */
export function WriteupDocument({ machine, redact = false }: { machine: Machine; redact?: boolean }) {
  const writeup = machine.writeup ?? emptyWriteup();
  const clean = (value: string) => redact ? redactSecrets(value) : value;
  const section = (key: WriteupTextKey, title: string) => <section key={key} className="writeup-doc-section"><h3>{title}</h3>{writeup[key].trim() ? <MarkdownText text={clean(writeup[key])} query=""/> : <p className="muted-note">Sin completar.</p>}</section>;
  return <article className="writeup-doc reader-copy">
    <header><h2>{machine.name}</h2><p>{machine.platform} · {machine.os} · {machine.difficulty}{machine.completedAt ? ` · resuelta el ${machine.completedAt}` : ""}</p>{machine.techniques.length ? <p className="writeup-doc-tags">{machine.techniques.join(" · ")}</p> : null}</header>
    {writeupSections.slice(0, 5).map(({ key, title }) => section(key, title))}
    <section className="writeup-doc-section"><h3>Flags</h3>{writeup.flags.length ? writeup.flags.map((flag) => <div className="reader-list-item" key={flag.id}><span>{flag.obtained ? "✓" : "✗"}</span><p><b>{flag.label}</b>: {flag.obtained ? `obtenida${flag.date ? ` el ${flag.date}` : ""}` : "no obtenida"}{flag.evidence ? ` — ${clean(flag.evidence)}` : ""}</p></div>) : <p className="muted-note">Sin flags registradas.</p>}</section>
    {writeupSections.slice(5).map(({ key, title }) => section(key, title))}
  </article>;
}

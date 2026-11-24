import { useEffect, useMemo, useState } from "react";
import { Check, Clock3, Edit3, ExternalLink, FileText, Flag, LayoutGrid, Plus, Rows3, Server, Target, Trash2, X } from "lucide-react";
import type { CyberStudyData, Machine, StudyModule } from "../../types";
import { formatMinutes } from "../../lib/dates";
import { Empty, Field, Metric, Modal, PanelTitle } from "../../components/ui";
import {
  defaultFilters, emptyMachine, filterMachines, helpLevels, learningLabel, learningScore, LIMITS, loadFilters, machineKey,
  machineStats, machineStatuses, normalizeMachine, repeatOptions, saveFilters, suggestions, visibilities, type MachineFilters,
} from "./machines";
import { WriteupEditor } from "./WriteupEditor";
import { writeupProgress } from "./writeup";
import type { MachineWriteup } from "../../types";
import "./machines.css";

type Draft = ReturnType<typeof emptyMachine>;
type SetData = React.Dispatch<React.SetStateAction<CyberStudyData>>;

export function MachinesView({ data, setData }: { data: CyberStudyData; setData: SetData }) {
  const machines = data.machines ?? [];
  const [filters, setFilters] = useState<MachineFilters>(() => loadFilters());
  const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [writingId, setWritingId] = useState<string | null>(null);
  useEffect(() => saveFilters(filters), [filters]);

  const stats = useMemo(() => machineStats(machines), [machines]);
  const options = useMemo(() => suggestions(machines), [machines]);
  const visible = useMemo(() => filterMachines(machines, filters), [machines, filters]);
  const viewing = machines.find((machine) => machine.id === viewingId);
  const writing = machines.find((machine) => machine.id === writingId);
  const activeFilters = (Object.keys(defaultFilters) as (keyof MachineFilters)[]).filter((key) => !["sort", "direction", "layout"].includes(key) && filters[key] !== defaultFilters[key]).length;
  const set = <K extends keyof MachineFilters>(key: K, value: MachineFilters[K]) => setFilters((current) => ({ ...current, [key]: value }));

  function openNew() { setViewingId(null); setEditing({ id: null, draft: emptyMachine() }); }
  function openEdit(machine: Machine) { setViewingId(null); const { id, createdAt: _c, updatedAt: _u, ...draft } = machine; setEditing({ id, draft }); }

  function save(draft: Draft): string | null {
    const existing = machines.find((machine) => machine.id === editing?.id);
    const machine = normalizeMachine({ ...draft, id: existing?.id ?? crypto.randomUUID(), createdAt: existing?.createdAt, updatedAt: new Date().toISOString() });
    if (!machine) return "El nombre es obligatorio.";
    if (machines.some((item) => item.id !== machine.id && machineKey(item) === machineKey(machine))) return `Ya tenés “${machine.name}” registrada en ${machine.platform}.`;
    if (draft.url && !machine.url) return "La URL oficial no es válida (tiene que empezar con https://).";
    if (draft.writeupUrl && !machine.writeupUrl) return "El enlace al writeup no es válido (tiene que empezar con https://).";
    if (draft.labIp && !machine.labIp) return "La IP del laboratorio no es válida.";
    if (machine.status === "Resuelta" && !machine.completedAt) machine.completedAt = new Date().toISOString().slice(0, 10);
    setData((current) => {
      const list = current.machines ?? [];
      return { ...current, machines: existing ? list.map((item) => item.id === machine.id ? machine : item) : [machine, ...list] };
    });
    setEditing(null);
    return null;
  }

  function saveWriteup(id: string, writeup: MachineWriteup, notes: string) {
    setData((current) => ({ ...current, machines: (current.machines ?? []).map((item) => item.id === id ? { ...item, writeup, notes, updatedAt: new Date().toISOString() } : item) }));
    setWritingId(null);
    setViewingId(id);
  }

  function remove(machine: Machine) {
    if (!window.confirm(`¿Eliminar la máquina “${machine.name}”? No se puede deshacer.`)) return;
    setData((current) => ({ ...current, machines: (current.machines ?? []).filter((item) => item.id !== machine.id), deletedIds: [...(current.deletedIds ?? []), machine.id] }));
    setViewingId(null);
  }

  return <section className="content machines">
    <div className="section-intro"><p>Tu laboratorio de máquinas CTF. Su progreso es independiente del de tus cursos.</p><button className="btn primary" onClick={openNew}><Plus size={18}/> Nueva máquina</button></div>

    <div className="metric-grid machines-metrics">
      <Metric icon={<Server/>} value={`${stats.total}`} label="Máquinas" note={`${stats.pending} pendientes · ${stats.inProgress} en progreso · ${stats.abandoned} abandonadas`}/>
      <Metric icon={<Flag/>} value={`${stats.solved} (${stats.completion}%)`} label="Resueltas" note="sobre el total registrado" hot/>
      <Metric icon={<Clock3/>} value={formatMinutes(stats.minutes)} label="Horas de laboratorio" note={stats.learning === null ? "aprendizaje: sin datos" : `aprendizaje medio: ${stats.learning}/100`}/>
    </div>
    {stats.total ? <div className="machines-charts">
      <BarPanel title="Por dificultad" rows={stats.byDifficulty}/>
      <BarPanel title="Por sistema operativo" rows={stats.byOs}/>
      <BarPanel title="Técnicas más practicadas" rows={stats.topTechniques}/>
    </div> : null}

    <div className="machine-filters">
      <input className="machine-search" value={filters.query} onChange={(e) => set("query", e.target.value)} placeholder="Buscar por nombre…" aria-label="Buscar máquina por nombre"/>
      <Select label="Plataforma" value={filters.platform} options={options.platforms} onChange={(v) => set("platform", v)}/>
      <Select label="Dificultad" value={filters.difficulty} options={options.difficulties} onChange={(v) => set("difficulty", v)}/>
      <Select label="Sistema" value={filters.os} options={options.os} onChange={(v) => set("os", v)}/>
      <Select label="Estado" value={filters.status} options={machineStatuses} onChange={(v) => set("status", v)}/>
      <Select label="Certificación" value={filters.certification} options={options.certifications} onChange={(v) => set("certification", v)}/>
      <Select label="Técnica" value={filters.technique} options={options.techniques} onChange={(v) => set("technique", v)}/>
      <label className="mini-field"><span>Desde</span><input type="date" value={filters.from} onChange={(e) => set("from", e.target.value)}/></label>
      <label className="mini-field"><span>Hasta</span><input type="date" value={filters.to} onChange={(e) => set("to", e.target.value)}/></label>
      <label className="mini-field"><span>Ordenar</span><select value={filters.sort} onChange={(e) => set("sort", e.target.value as MachineFilters["sort"])}><option value="completedAt">Fecha de resolución</option><option value="name">Nombre</option><option value="difficulty">Dificultad</option><option value="minutes">Tiempo invertido</option></select></label>
      <button className="btn ghost small" onClick={() => set("direction", filters.direction === "asc" ? "desc" : "asc")} title="Cambiar el sentido del orden">{filters.direction === "asc" ? "↑ Asc" : "↓ Desc"}</button>
      <button className="btn ghost small" onClick={() => set("layout", filters.layout === "cards" ? "table" : "cards")} title="Cambiar vista">{filters.layout === "cards" ? <Rows3 size={15}/> : <LayoutGrid size={15}/>} {filters.layout === "cards" ? "Tabla" : "Tarjetas"}</button>
      {activeFilters ? <button className="text-button" onClick={() => setFilters((current) => ({ ...defaultFilters, sort: current.sort, direction: current.direction, layout: current.layout }))}><X size={14}/> Limpiar {activeFilters} filtro(s)</button> : null}
    </div>
    <p className="machine-count">{visible.length} de {machines.length} máquinas</p>

    {!machines.length ? <Empty text="Todavía no registraste máquinas. Cuando hagas una, cargala acá." action="Registrar la primera" onAction={openNew}/>
      : !visible.length ? <Empty text="Ninguna máquina coincide con los filtros."/>
      : filters.layout === "table" ? <MachineTable machines={visible} onOpen={(m) => setViewingId(m.id)}/>
      : <div className="machine-grid">{visible.map((machine) => <MachineCard key={machine.id} machine={machine} onOpen={() => setViewingId(machine.id)}/>)}</div>}

    {editing ? <Modal wide title={editing.id ? "Editar máquina" : "Registrar máquina"} subtitle="Solo el nombre es obligatorio. Nunca guardes el valor de las flags." onClose={() => setEditing(null)}>
      <MachineForm initial={editing.draft} options={options} modules={data.modules} onSubmit={save}/>
    </Modal> : null}
    {viewing ? <Modal wide title={viewing.name} subtitle={`${viewing.platform} · ${viewing.os} · ${viewing.difficulty}${viewing.startingPointTier !== null ? ` · Tier ${viewing.startingPointTier}` : ""}`} onClose={() => setViewingId(null)}>
      <MachineDetail machine={viewing} modules={data.modules} onEdit={() => openEdit(viewing)} onWriteup={() => { setViewingId(null); setWritingId(viewing.id); }} onDelete={() => remove(viewing)}/>
    </Modal> : null}
    {writing ? <WriteupEditor machine={writing} onSave={(writeup, notes) => saveWriteup(writing.id, writeup, notes)} onClose={() => { setWritingId(null); setViewingId(writing.id); }}/> : null}
  </section>;
}

function BarPanel({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = Math.max(1, ...rows.map(([, count]) => count));
  return <article className="panel"><PanelTitle title={title} meta={`${rows.length}`}/>{rows.length ? <div className="hbars">{rows.map(([label, count]) => <div className="hbar" key={label}><span title={label}>{label}</span><div><i style={{ width: `${(count / max) * 100}%` }}/></div><b>{count}</b></div>)}</div> : <p className="muted-note">Sin datos todavía.</p>}</article>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="mini-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}><option value="">Todas</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

const statusClass = (status: string) => `machine-status s-${status.toLowerCase().replace(/\s+/g, "-")}`;

function MachineCard({ machine, onOpen }: { machine: Machine; onOpen: () => void }) {
  const score = learningScore(machine);
  return <button className="machine-card" onClick={onOpen}>
    <header><span className={statusClass(machine.status)}>{machine.status}</span><small>{machine.platform}</small></header>
    <h3>{machine.name}</h3>
    <p>{machine.os} · {machine.difficulty}{machine.startingPointTier !== null ? ` · Tier ${machine.startingPointTier}` : ""}{machine.minutes ? ` · ${formatMinutes(machine.minutes)}` : ""}</p>
    {writeupProgress(machine.writeup) ? <p className="writeup-badge"><FileText size={12}/> Writeup {writeupProgress(machine.writeup)}/8</p> : null}
    {machine.techniques.length ? <div className="chips">{machine.techniques.slice(0, 4).map((tag) => <span className="chip" key={tag}>{tag}</span>)}{machine.techniques.length > 4 ? <span className="chip">+{machine.techniques.length - 4}</span> : null}</div> : null}
    <footer><span>Aprendizaje: <b>{learningLabel(score)}</b>{score !== null ? ` (${score})` : ""}</span><span>{machine.completedAt || machine.startedAt || "Sin fecha"}</span></footer>
  </button>;
}

function MachineTable({ machines, onOpen }: { machines: Machine[]; onOpen: (machine: Machine) => void }) {
  return <div className="machine-table-wrap"><table className="machine-table"><thead><tr><th>Nombre</th><th>Plataforma</th><th>SO</th><th>Dificultad</th><th>Estado</th><th>Tiempo</th><th>Resuelta</th><th>Aprendizaje</th></tr></thead><tbody>{machines.map((machine) => <tr key={machine.id} onClick={() => onOpen(machine)} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onOpen(machine); }}><td><b>{machine.name}</b></td><td>{machine.platform}</td><td>{machine.os}</td><td>{machine.difficulty}{machine.startingPointTier !== null ? ` T${machine.startingPointTier}` : ""}</td><td><span className={statusClass(machine.status)}>{machine.status}</span></td><td>{machine.minutes ? formatMinutes(machine.minutes) : "—"}</td><td>{machine.completedAt || "—"}</td><td>{learningLabel(learningScore(machine))}</td></tr>)}</tbody></table></div>;
}

function MachineDetail({ machine, modules, onEdit, onWriteup, onDelete }: { machine: Machine; modules: StudyModule[]; onEdit: () => void; onWriteup: () => void; onDelete: () => void }) {
  const progress = writeupProgress(machine.writeup);
  const score = learningScore(machine);
  const related = modules.filter((module) => machine.relatedModuleIds.includes(module.id));
  const row = (label: string, value: React.ReactNode) => value ? <div><dt>{label}</dt><dd>{value}</dd></div> : null;
  const tags = (items: string[]) => items.length ? <div className="chips">{items.map((item) => <span className="chip" key={item}>{item}</span>)}</div> : null;
  return <div className="machine-detail">
    <div className="machine-detail-head"><span className={statusClass(machine.status)}>{machine.status}</span><span className="learning-pill">Aprendizaje: {learningLabel(score)}{score !== null ? ` · ${score}/100` : ""}</span></div>
    <dl>
      {row("Inicio", machine.startedAt)}{row("Resolución", machine.completedAt)}{row("Tiempo", machine.minutes ? formatMinutes(machine.minutes) : "")}
      {row("IP del laboratorio", machine.labIp)}{row("Dificultad personal", `${machine.personalDifficulty}/5`)}{row("Ayuda recibida", machine.helpLevel)}
      {row("IA usada", machine.aiAssistants.join(", "))}{row("¿La repetiría solo?", machine.canRepeatAlone)}{row("Writeup", machine.writeupVisibility)}
    </dl>
    {machine.certifications.length ? <h4>Certificaciones objetivo</h4> : null}{tags(machine.certifications)}
    {machine.techniques.length ? <h4>Técnicas</h4> : null}{tags(machine.techniques)}
    {machine.tools.length ? <h4>Herramientas</h4> : null}{tags(machine.tools)}
    {machine.learnedConcept ? <><h4>Concepto nuevo</h4><p>{machine.learnedConcept}</p></> : null}
    {machine.reviewConcept ? <><h4>Para repasar</h4><p>{machine.reviewConcept}</p></> : null}
    {machine.notes ? <><h4>Notas privadas</h4><p className="pre-line">{machine.notes}</p></> : null}
    <div className="writeup-callout"><div><FileText size={18}/><span><b>Writeup</b><small>{progress ? `${progress}/8 secciones completas · ${machine.writeupVisibility}` : "Todavía no empezaste el writeup de esta máquina."}</small></span></div><button className="btn ghost small" onClick={onWriteup}>{progress ? "Abrir writeup" : "Empezar writeup"}</button></div>
    <h4>Cursos relacionados</h4>{related.length ? <div className="chips">{related.map((module) => <span className="chip course-chip" key={module.id}>{module.title}</span>)}</div> : <p className="muted-note">Sin cursos asociados todavía.</p>}
    <div className="machine-links">
      {machine.url ? <a className="text-button" href={machine.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14}/> Página oficial</a> : null}
      {machine.writeupUrl ? <a className="text-button" href={machine.writeupUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={14}/> Writeup publicado</a> : null}
    </div>
    <div className="machine-detail-actions"><button className="btn primary" onClick={onEdit}><Edit3 size={16}/> Editar</button><button className="icon-button danger" onClick={onDelete} title="Eliminar máquina"><Trash2 size={16}/> Eliminar</button></div>
  </div>;
}

function TagInput({ label, value, options, onChange, placeholder }: { label: string; value: string[]; options: string[]; onChange: (value: string[]) => void; placeholder?: string }) {
  const [text, setText] = useState("");
  const id = `tags-${label.replace(/\W+/g, "-").toLowerCase()}`;
  function add(raw: string) {
    const items = raw.split(",").map((item) => item.trim().slice(0, LIMITS.tag)).filter(Boolean);
    if (!items.length) return;
    const next = [...value];
    for (const item of items) if (!next.some((tag) => tag.toLowerCase() === item.toLowerCase()) && next.length < LIMITS.tags) next.push(item);
    onChange(next); setText("");
  }
  return <div className="field tag-field"><span>{label}</span>
    <div className="tag-box">
      {value.map((tag) => <span className="chip" key={tag}>{tag}<button type="button" aria-label={`Quitar ${tag}`} onClick={() => onChange(value.filter((item) => item !== tag))}><X size={12}/></button></span>)}
      <input list={id} value={text} placeholder={placeholder ?? "Escribí y Enter"} onChange={(e) => { const v = e.target.value; if (v.endsWith(",")) add(v); else setText(v); }} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(text); } else if (e.key === "Backspace" && !text && value.length) onChange(value.slice(0, -1)); }} onBlur={() => add(text)}/>
      <datalist id={id}>{options.filter((option) => !value.includes(option)).map((option) => <option key={option} value={option}/>)}</datalist>
    </div>
  </div>;
}

function MachineForm({ initial, options, modules, onSubmit }: { initial: Draft; options: ReturnType<typeof suggestions>; modules: StudyModule[]; onSubmit: (draft: Draft) => string | null }) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [error, setError] = useState("");
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const isStartingPoint = draft.difficulty.toLowerCase() === "starting point";
  const hours = Math.floor(draft.minutes / 60);
  const minutes = draft.minutes % 60;
  return <form onSubmit={(e) => { e.preventDefault(); if (draft.completedAt && draft.startedAt && draft.completedAt < draft.startedAt) { setError("La fecha de finalización no puede ser anterior al inicio."); return; } setError(onSubmit(draft) ?? ""); }}>
    <fieldset className="form-block"><legend>Datos de la máquina</legend>
      <Field label="Nombre *"><input required maxLength={LIMITS.name} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Ej: Appointment" autoFocus/></Field>
      <div className="form-grid">
        <Field label="Plataforma"><input list="machine-platforms" maxLength={60} value={draft.platform} onChange={(e) => set("platform", e.target.value)}/><datalist id="machine-platforms">{options.platforms.map((o) => <option key={o} value={o}/>)}</datalist></Field>
        <Field label="Sistema operativo"><input list="machine-os" maxLength={40} value={draft.os} onChange={(e) => set("os", e.target.value)}/><datalist id="machine-os">{options.os.map((o) => <option key={o} value={o}/>)}</datalist></Field>
        <Field label="Dificultad"><input list="machine-difficulties" maxLength={40} value={draft.difficulty} onChange={(e) => set("difficulty", e.target.value)}/><datalist id="machine-difficulties">{options.difficulties.map((o) => <option key={o} value={o}/>)}</datalist></Field>
        {isStartingPoint ? <Field label="Tier de Starting Point"><select value={draft.startingPointTier ?? ""} onChange={(e) => set("startingPointTier", e.target.value === "" ? null : Number(e.target.value))}><option value="">Sin indicar</option><option value="0">Tier 0</option><option value="1">Tier 1</option><option value="2">Tier 2</option></select></Field> : <div/>}
        <Field label="URL oficial"><input type="url" maxLength={LIMITS.url} value={draft.url} onChange={(e) => set("url", e.target.value)} placeholder="https://…"/></Field>
        <Field label="IP del laboratorio (opcional)"><input maxLength={45} value={draft.labIp} onChange={(e) => set("labIp", e.target.value)} placeholder="10.10.10.10"/></Field>
      </div>
    </fieldset>
    <fieldset className="form-block"><legend>Progreso</legend>
      <div className="form-grid">
        <Field label="Estado"><select value={draft.status} onChange={(e) => set("status", e.target.value as Draft["status"])}>{machineStatuses.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Tiempo dedicado"><div className="time-inputs"><input type="number" min="0" max="1600" value={hours} onChange={(e) => set("minutes", Math.max(0, Number(e.target.value) || 0) * 60 + minutes)} aria-label="Horas"/><span>h</span><input type="number" min="0" max="59" value={minutes} onChange={(e) => set("minutes", hours * 60 + Math.min(59, Math.max(0, Number(e.target.value) || 0)))} aria-label="Minutos"/><span>min</span></div></Field>
        <Field label="Fecha de inicio"><input type="date" value={draft.startedAt} onChange={(e) => set("startedAt", e.target.value)}/></Field>
        <Field label="Fecha de finalización"><input type="date" value={draft.completedAt} onChange={(e) => set("completedAt", e.target.value)}/></Field>
      </div>
    </fieldset>
    <fieldset className="form-block"><legend>Qué practiqué</legend>
      <TagInput label="Técnicas / vulnerabilidades" value={draft.techniques} options={options.techniques} onChange={(v) => set("techniques", v)}/>
      <TagInput label="Herramientas" value={draft.tools} options={options.tools} onChange={(v) => set("tools", v)}/>
      <TagInput label="Certificaciones objetivo" value={draft.certifications} options={options.certifications} onChange={(v) => set("certifications", v)} placeholder="eJPT, CPTS…"/>
      <Field label="Cursos relacionados"><div className="check-list">{modules.length ? modules.map((module) => <label key={module.id}><input type="checkbox" checked={draft.relatedModuleIds.includes(module.id)} onChange={(e) => set("relatedModuleIds", e.target.checked ? [...draft.relatedModuleIds, module.id] : draft.relatedModuleIds.filter((id) => id !== module.id))}/> {module.title}</label>) : <span className="muted-note">Todavía no hay cursos.</span>}</div></Field>
    </fieldset>
    <fieldset className="form-block"><legend>Aprendizaje</legend>
      <div className="form-grid">
        <Field label="Ayuda recibida"><select value={draft.helpLevel} onChange={(e) => set("helpLevel", e.target.value as Draft["helpLevel"])}>{helpLevels.map((h) => <option key={h}>{h}</option>)}</select></Field>
        <Field label="¿Podrías repetirla sin ayuda?"><select value={draft.canRepeatAlone} onChange={(e) => set("canRepeatAlone", e.target.value as Draft["canRepeatAlone"])}>{repeatOptions.map((r) => <option key={r}>{r}</option>)}</select></Field>
        <Field label={`Dificultad personal: ${draft.personalDifficulty}/5`}><input type="range" min="1" max="5" value={draft.personalDifficulty} onChange={(e) => set("personalDifficulty", Number(e.target.value))}/></Field>
        <Field label="Writeup"><select value={draft.writeupVisibility} onChange={(e) => set("writeupVisibility", e.target.value as Draft["writeupVisibility"])}>{visibilities.map((v) => <option key={v}>{v}</option>)}</select></Field>
      </div>
      <TagInput label="IA usada" value={draft.aiAssistants} options={options.aiAssistants} onChange={(v) => set("aiAssistants", v)} placeholder="ChatGPT, Codex, Claude…"/>
      <Field label="Concepto nuevo que aprendí"><input maxLength={1000} value={draft.learnedConcept} onChange={(e) => set("learnedConcept", e.target.value)}/></Field>
      <Field label="Concepto que necesito repasar"><input maxLength={1000} value={draft.reviewConcept} onChange={(e) => set("reviewConcept", e.target.value)}/></Field>
      <Field label="Enlace al writeup"><input type="url" maxLength={LIMITS.url} value={draft.writeupUrl} onChange={(e) => set("writeupUrl", e.target.value)} placeholder="https://github.com/…"/></Field>
      <Field label="Notas generales (sin flags ni contraseñas)"><textarea rows={4} maxLength={LIMITS.notes} value={draft.notes} onChange={(e) => set("notes", e.target.value)}/></Field>
    </fieldset>
    {error ? <p className="form-error" role="alert">{error}</p> : null}
    <button className="btn primary full" type="submit"><Check size={18}/> Guardar máquina</button>
    <p className="muted-note"><Target size={12}/> Las máquinas resueltas no equivalen a certificaciones: son práctica.</p>
  </form>;
}

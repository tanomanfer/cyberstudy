import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookMarked, BookOpen, Check, ChevronRight, CircleHelp, Clock3, Cloud, Download, Flame, FolderOpen, LayoutDashboard,
  Edit3, LogOut, Pause, Play, Plus, RotateCcw, Save, Search, ShieldCheck, Snowflake, Target, TimerReset, Trash2, Upload, X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { formatMinutes, lastSevenDays, localDate } from "./lib/dates";
import { downloadMarkdown, moduleMarkdown, sectionMarkdown, sessionMarkdown } from "./lib/markdown";
import { exportData, importData, loadData, loadTimer, saveData, saveTimer } from "./lib/storage";
import { isSupabaseConfigured, loadCloudData, mergeData, saveCloudData, supabase } from "./lib/supabase";
import type { CyberStudyData, ModuleStatus, StudyModule, StudySection, StudySession } from "./types";

type View = "dashboard" | "modules" | "notebook" | "questions" | "sessions" | "search";
type ModalKind = "module" | "section" | "reader" | "session" | "freeze" | "cloud";

const moduleDefaults = {
  title: "", platform: "Hack The Box Academy", category: "Fundamentos", difficulty: "Tier 0",
  status: "En progreso" as ModuleStatus, progress: 0, startedAt: localDate(), completedAt: "",
  url: "", notes: "", learnings: "", questions: "",
};

const sectionDefaults = {
  moduleId: "", number: 1, total: 30, title: "", status: "En progreso" as ModuleStatus,
  progress: 0, notes: "", learnings: "", questions: "",
};

const sessionDefaults = {
  date: localDate(), startedAt: "", endedAt: "", durationMinutes: 60, topic: "",
  category: "Linux", platform: "Hack The Box Academy", learned: "", difficulties: "",
  questions: "", comprehension: 3, tags: "",
};

export function App() {
  const initialTimer = useRef(loadTimer()).current;
  const [data, setData] = useState<CyberStudyData>(() => loadData());
  const [view, setView] = useState<View>("dashboard");
  const [modal, setModal] = useState<ModalKind | null>(null);
  const [moduleForm, setModuleForm] = useState(moduleDefaults);
  const [sectionForm, setSectionForm] = useState(sectionDefaults);
  const [sessionForm, setSessionForm] = useState(sessionDefaults);
  const [freezeReason, setFreezeReason] = useState("");
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [readingSectionId, setReadingSectionId] = useState<string | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"saved" | "error">("saved");
  const [user, setUser] = useState<User | null>(null);
  const [cloudReady, setCloudReady] = useState(false);
  const [cloudState, setCloudState] = useState<"local" | "syncing" | "synced" | "error">("local");
  const importInput = useRef<HTMLInputElement>(null);
  const [timerSeconds, setTimerSeconds] = useState(initialTimer.seconds);
  const [timerRunning, setTimerRunning] = useState(initialTimer.running);
  const [search, setSearch] = useState("");
  const timerStart = useRef<number | null>(null);

  useEffect(() => {
    try { saveData(data); setSaveState("saved"); }
    catch { setSaveState("error"); }
  }, [data]);
  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data: auth }) => setUser(auth.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!user) { setCloudReady(false); setCloudState("local"); return; }
    let active = true;
    setCloudState("syncing");
    void loadCloudData(user.id).then((cloud) => {
      if (!active) return;
      if (cloud) setData((local) => mergeData(local, cloud));
      setCloudReady(true); setCloudState("synced");
    }).catch(() => { if (active) setCloudState("error"); });
    return () => { active = false; };
  }, [user]);
  useEffect(() => {
    if (!user || !cloudReady) return;
    setCloudState("syncing");
    const id = window.setTimeout(() => void saveCloudData(user.id, data).then(() => setCloudState("synced")).catch(() => setCloudState("error")), 600);
    return () => window.clearTimeout(id);
  }, [data, user, cloudReady]);
  useEffect(() => {
    if (!timerRunning) return;
    timerStart.current = Date.now() - timerSeconds * 1000;
    const id = window.setInterval(() => {
      setTimerSeconds(Math.floor((Date.now() - (timerStart.current ?? Date.now())) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]); // Se reinicia sólo al pausar/reanudar.
  useEffect(() => { saveTimer(timerSeconds, timerRunning); }, [timerSeconds, timerRunning]);

  const today = localDate();
  const todayMinutes = data.sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.durationMinutes, 0);
  const week = lastSevenDays();
  const weekMinutes = data.sessions.filter((s) => week.includes(s.date)).reduce((sum, s) => sum + s.durationMinutes, 0);
  const inProgress = data.modules.filter((m) => m.status === "En progreso");
  const latestSession = [...data.sessions].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const streak = useMemo(() => calculateStreak(data), [data]);
  const progress = Math.min(100, Math.round((todayMinutes / data.dailyGoalMinutes) * 100));

  function addModule(event: React.FormEvent) {
    event.preventDefault();
    if (!moduleForm.title.trim()) return;
    const item: StudyModule = { ...moduleForm, title: moduleForm.title.trim(), id: editingModuleId ?? crypto.randomUUID(), createdAt: data.modules.find((m) => m.id === editingModuleId)?.createdAt ?? new Date().toISOString() };
    setData((current) => ({ ...current, modules: editingModuleId ? current.modules.map((m) => m.id === editingModuleId ? item : m) : [item, ...current.modules] }));
    setEditingModuleId(null);
    setModuleForm(moduleDefaults);
    setModal(null);
  }

  function addSection(event: React.FormEvent) {
    event.preventDefault();
    if (!sectionForm.moduleId || !sectionForm.title.trim()) return;
    const existing = data.sections.find((section) => section.id === editingSectionId);
    const item: StudySection = { ...sectionForm, title: sectionForm.title.trim(), id: editingSectionId ?? crypto.randomUUID(), createdAt: existing?.createdAt ?? new Date().toISOString() };
    setData((current) => {
      const sections = editingSectionId ? current.sections.map((section) => section.id === editingSectionId ? item : section) : [item, ...current.sections];
      return { ...current, sections, modules: updateCourseProgress(current.modules, sections, item.moduleId) };
    });
    setEditingSectionId(null);
    setSectionForm(sectionDefaults);
    setModal(null);
  }

  function addSession(event: React.FormEvent) {
    event.preventDefault();
    if (!sessionForm.topic.trim() || sessionForm.durationMinutes < 1) return;
    const item: StudySession = {
      ...sessionForm, topic: sessionForm.topic.trim(), id: editingSessionId ?? crypto.randomUUID(),
      tags: sessionForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdAt: data.sessions.find((s) => s.id === editingSessionId)?.createdAt ?? new Date().toISOString(),
    };
    setData((current) => ({ ...current, sessions: editingSessionId ? current.sessions.map((s) => s.id === editingSessionId ? item : s) : [item, ...current.sessions] }));
    setEditingSessionId(null);
    setSessionForm(sessionDefaults);
    setModal(null);
  }

  function finishTimer() {
    const minutes = Math.max(1, Math.round(timerSeconds / 60));
    const end = new Date();
    const start = new Date(end.getTime() - timerSeconds * 1000);
    setSessionForm({ ...sessionDefaults, durationMinutes: minutes, startedAt: start.toTimeString().slice(0, 5), endedAt: end.toTimeString().slice(0, 5) });
    setTimerRunning(false);
    setTimerSeconds(0);
    setEditingSessionId(null);
    setModal("session");
  }

  function closeModal() {
    setModal(null);
    setEditingModuleId(null);
    setEditingSectionId(null);
    setEditingSessionId(null);
    setReadingSectionId(null);
  }

  function editModule(module: StudyModule) {
    setEditingModuleId(module.id);
    setModuleForm({ title: module.title, platform: module.platform, category: module.category, difficulty: module.difficulty, status: module.status, progress: module.progress, startedAt: module.startedAt, completedAt: module.completedAt, url: module.url, notes: module.notes, learnings: module.learnings, questions: module.questions });
    setModal("module");
  }

  function editSection(section: StudySection) {
    setEditingSectionId(section.id);
    setSectionForm({ moduleId: section.moduleId, number: section.number, total: section.total, title: section.title, status: section.status, progress: section.progress, notes: section.notes, learnings: section.learnings, questions: section.questions });
    setModal("section");
  }

  function readSection(section: StudySection) {
    setReadingSectionId(section.id);
    setModal("reader");
  }

  function editSession(session: StudySession) {
    setEditingSessionId(session.id);
    setSessionForm({ ...session, tags: session.tags.join(", ") });
    setModal("session");
  }

  async function restoreBackup(file?: File) {
    if (!file) return;
    try { setData(await importData(file)); setSaveState("saved"); }
    catch (error) { window.alert(error instanceof Error ? error.message : "No se pudo importar el respaldo."); }
    finally { if (importInput.current) importInput.current.value = ""; }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("dashboard")}>
          <span className="brand-mark"><ShieldCheck size={22} /></span>
          <span><strong>CYBERSTUDY</strong><small>learning operations</small></span>
        </button>
        <nav aria-label="Navegación principal">
          <NavButton active={view === "dashboard"} icon={<LayoutDashboard />} label="Panel" onClick={() => setView("dashboard")} />
          <NavButton active={view === "modules"} icon={<FolderOpen />} label="Cursos" count={data.modules.length} onClick={() => setView("modules")} />
          <NavButton active={view === "notebook"} icon={<BookMarked />} label="Cuaderno" count={data.sections.length} onClick={() => setView("notebook")} />
          <NavButton active={view === "questions"} icon={<CircleHelp />} label="Dudas" count={data.sections.filter((section) => section.questions.trim()).length} onClick={() => setView("questions")} />
          <NavButton active={view === "sessions"} icon={<Clock3 />} label="Sesiones" count={data.sessions.length} onClick={() => setView("sessions")} />
        </nav>
        <div className={`sidebar-status ${saveState === "error" ? "save-error" : ""}`}><span className="status-dot" /> {saveState === "saved" ? "Guardado en este navegador" : "Error al guardar"}</div>
        <p className="sidebar-note">Tu centro de operaciones para convertir horas de estudio en progreso real.</p>
      </aside>

      <main>
        <header className="topbar">
          <div><p className="eyebrow">{new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</p><h1>{view === "dashboard" ? "Buenas, Tano." : view === "modules" ? "Cursos y módulos" : view === "notebook" ? "Cuaderno global" : view === "questions" ? "Dudas para practicar" : view === "search" ? "Resultados de búsqueda" : "Sesiones de estudio"}</h1></div>
          <div className="header-actions">
            <label className="global-search"><Search size={16}/><input value={search} onChange={(event) => { const value = event.target.value; setSearch(value); if (value.trim()) setView("search"); else if (view === "search") setView("dashboard"); }} placeholder="Buscar en todo…" aria-label="Buscar en todo" /></label>
            <button className="btn ghost" onClick={() => setModal("cloud")}><Cloud size={18} /> {user ? "Sincronizado" : "Nube"}</button>
            <button className="btn ghost" onClick={() => exportData(data)}><Save size={18} /> Respaldo</button>
            <button className="btn ghost" onClick={() => importInput.current?.click()}><Upload size={18} /> Importar</button>
            <input ref={importInput} className="visually-hidden" type="file" accept="application/json,.json" onChange={(e) => void restoreBackup(e.target.files?.[0])} />
            <button className="btn ghost" onClick={() => { setEditingSessionId(null); setSessionForm(sessionDefaults); setModal("session"); }}><Plus size={18} /> Sesión manual</button>
            <button className="btn primary" onClick={() => { setEditingSectionId(null); setSectionForm({ ...sectionDefaults, moduleId: data.modules[0]?.id ?? "" }); setModal(data.modules.length ? "section" : "module"); }}><Plus size={18} /> {data.modules.length ? "Nuevo módulo" : "Nuevo curso"}</button>
          </div>
        </header>

        {view === "dashboard" ? (
          <Dashboard data={data} todayMinutes={todayMinutes} weekMinutes={weekMinutes} progress={progress} streak={streak} latestSession={latestSession} inProgress={inProgress} setData={setData} onFreeze={() => setModal("freeze")} />
        ) : view === "modules" ? (
          <Modules modules={data.modules} sections={data.sections} setData={setData} onAddCourse={() => { setEditingModuleId(null); setModuleForm(moduleDefaults); setModal("module"); }} onAddSection={(moduleId) => { setEditingSectionId(null); setSectionForm({ ...sectionDefaults, moduleId }); setModal("section"); }} onEditCourse={editModule} onEditSection={readSection} search={search} />
        ) : view === "notebook" ? (
          <Notebook modules={data.modules} sections={data.sections} search={search} onOpen={readSection} />
        ) : view === "questions" ? (
          <Questions modules={data.modules} sections={data.sections} search={search} onOpen={readSection} />
        ) : view === "search" ? (
          <SearchResults data={data} query={search} onOpenCourse={() => setView("modules")} onOpenSection={readSection} onOpenSession={editSession} />
        ) : (
          <Sessions sessions={data.sessions} setData={setData} onAdd={() => { setEditingSessionId(null); setSessionForm(sessionDefaults); setModal("session"); }} onEdit={editSession} />
        )}

        <TimerBar seconds={timerSeconds} running={timerRunning} onToggle={() => setTimerRunning((value) => !value)} onReset={() => { setTimerRunning(false); setTimerSeconds(0); }} onFinish={finishTimer} />
      </main>

      {modal === "module" ? <Modal title={editingModuleId ? "Editar curso" : "Registrar curso padre"} subtitle="Ejemplo: Linux Fundamentals, Redes o Web" onClose={closeModal}><ModuleForm value={moduleForm} setValue={setModuleForm} onSubmit={addModule} /></Modal> : null}
      {modal === "section" ? <Modal title={editingSectionId ? "Editar módulo" : "Registrar módulo hijo"} subtitle="Cada módulo queda ordenado dentro de su curso" onClose={closeModal}><SectionForm modules={data.modules} value={sectionForm} setValue={setSectionForm} onSubmit={addSection} /></Modal> : null}
      {modal === "reader" && readingSectionId ? (() => { const section = data.sections.find((item) => item.id === readingSectionId); if (!section) return null; const course = data.modules.find((item) => item.id === section.moduleId); return <Modal title={`${section.number} de ${section.total} — ${section.title}`} subtitle={`${course?.title ?? "Sin curso"} · ${section.status} · ${section.progress}%`} onClose={closeModal} wide><SectionReader section={section} course={course} onEdit={() => editSection(section)} /></Modal>; })() : null}
      {modal === "session" ? <Modal title={editingSessionId ? "Editar sesión" : "Registrar sesión"} subtitle="Guardá lo que hiciste, no sólo cuánto tiempo" onClose={closeModal}><SessionForm value={sessionForm} setValue={setSessionForm} onSubmit={addSession} /></Modal> : null}
      {modal === "freeze" ? <Modal title="Congelar hoy" subtitle="Un descanso justificado no rompe tu constancia" onClose={() => setModal(null)}><form onSubmit={(event) => { event.preventDefault(); if (!freezeReason.trim()) return; setData((current) => ({ ...current, frozenDays: [...current.frozenDays.filter((d) => d.date !== today), { date: today, reason: freezeReason.trim() }] })); setFreezeReason(""); setModal(null); }}><Field label="Motivo"><input required value={freezeReason} onChange={(e) => setFreezeReason(e.target.value)} placeholder="Ej: descanso, trabajo, salud..." /></Field><button className="btn primary full" type="submit"><Snowflake size={18} /> Congelar día</button></form></Modal> : null}
      {modal === "cloud" ? <Modal title="Sincronización segura" subtitle={isSupabaseConfigured ? "Tus datos locales se conservan y se combinan con la nube." : "Primero configurá las variables de Supabase."} onClose={() => setModal(null)}><CloudAccount user={user} state={cloudState} /></Modal> : null}
    </div>
  );
}

function Dashboard({ data, todayMinutes, weekMinutes, progress, streak, latestSession, inProgress, setData, onFreeze }: { data: CyberStudyData; todayMinutes: number; weekMinutes: number; progress: number; streak: number; latestSession?: StudySession; inProgress: StudyModule[]; setData: React.Dispatch<React.SetStateAction<CyberStudyData>>; onFreeze: () => void }) {
  const week = lastSevenDays();
  return <section className="content">
    <div className="hero-card">
      <div className="hero-copy"><span className="live-label"><span /> OBJETIVO DE HOY</span><h2>{formatMinutes(todayMinutes)} <small>/ {formatMinutes(data.dailyGoalMinutes)}</small></h2><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><p>{progress >= 100 ? "Objetivo cumplido. Excelente trabajo." : `Te faltan ${formatMinutes(Math.max(0, data.dailyGoalMinutes - todayMinutes))}. Una sesión enfocada te acerca.`}</p></div>
      <div className="progress-orbit"><strong>{progress}%</strong><span>completado</span></div>
    </div>
    <div className="metric-grid">
      <Metric icon={<Clock3 />} value={formatMinutes(weekMinutes)} label="Esta semana" note="últimos 7 días" />
      <Metric icon={<Flame />} value={`${streak} días`} label="Racha actual" note="seguí construyendo" hot />
      <Metric icon={<Target />} value={`${inProgress.length}`} label="En progreso" note={`${data.modules.filter((m) => m.status === "Completado").length} completados`} />
    </div>
    <div className="dashboard-grid">
      <article className="panel"><PanelTitle title="Últimos 7 días" meta={formatMinutes(weekMinutes)} /><div className="week-chart">{week.map((date) => { const total = data.sessions.filter((s) => s.date === date).reduce((sum, s) => sum + s.durationMinutes, 0); const frozen = data.frozenDays.some((d) => d.date === date); return <div className="day" key={date}><div className="bar-wrap"><span className={frozen ? "bar frozen" : "bar"} style={{ height: `${Math.max(4, Math.min(100, total / data.dailyGoalMinutes * 100))}%` }} /></div><small>{new Intl.DateTimeFormat("es-AR", { weekday: "short" }).format(new Date(`${date}T12:00:00`)).slice(0, 2)}</small></div>; })}</div></article>
      <article className="panel"><PanelTitle title="Último foco" meta={latestSession ? latestSession.date : "Sin datos"} />{latestSession ? <div className="focus-item"><span className="icon-box"><BookOpen /></span><div><strong>{latestSession.topic}</strong><p>{latestSession.platform} · {formatMinutes(latestSession.durationMinutes)}</p></div><ChevronRight /></div> : <Empty text="Registrá tu primera sesión y aparecerá acá." />}</article>
    </div>
    <article className="panel modules-panel"><PanelTitle title="Módulos en progreso" meta={`${inProgress.length} activos`} />{inProgress.length ? <div className="module-list">{inProgress.slice(0, 4).map((module) => <div className="module-row" key={module.id}><div className="platform-badge">{module.platform.includes("Hack") ? "HTB" : module.platform.slice(0, 3).toUpperCase()}</div><div className="module-main"><strong>{module.title}</strong><p>{module.category} · {module.difficulty}</p><div className="mini-track"><span style={{ width: `${module.progress}%` }} /></div></div><b>{module.progress}%</b></div>)}</div> : <Empty text="Todavía no hay módulos activos. Creá el primero para arrancar." />}</article>
    <div className="goal-settings"><label>Objetivo diario <input type="number" min="15" step="15" value={data.dailyGoalMinutes} onChange={(e) => setData((current) => ({ ...current, dailyGoalMinutes: Number(e.target.value) || 120 }))} /> minutos</label><button className="text-button" onClick={onFreeze}><Snowflake size={15} /> Congelar hoy</button></div>
  </section>;
}

function Modules({ modules, sections, setData, onAddCourse, onAddSection, onEditCourse, onEditSection, search }: { modules: StudyModule[]; sections: StudySection[]; setData: React.Dispatch<React.SetStateAction<CyberStudyData>>; onAddCourse: () => void; onAddSection: (moduleId: string) => void; onEditCourse: (module: StudyModule) => void; onEditSection: (section: StudySection) => void; search: string }) {
  const query = search.trim().toLowerCase();
  const visible = modules.filter((module) => !query || `${module.title} ${module.category} ${module.platform}`.toLowerCase().includes(query) || sections.some((section) => section.moduleId === module.id && sectionText(section).includes(query)));
  return <section className="content"><div className="section-intro"><p>Los cursos son carpetas principales; dentro viven los módulos numerados.</p><button className="btn primary" onClick={onAddCourse}><Plus size={18} /> Agregar curso</button></div>{visible.length ? <div className="course-list">{visible.map((module) => { const children = sections.filter((section) => section.moduleId === module.id && (!query || sectionText(section).includes(query))); return <article className="course-card" key={module.id}><header className="course-head"><div className="platform-badge">{module.platform.includes("Hack") ? "HTB" : module.platform.slice(0, 3).toUpperCase()}</div><div><span className="parent-label">CURSO PADRE</span><h2>{module.title}</h2><p>{module.category} · {module.difficulty} · {children.length} módulos guardados</p></div><div className="course-actions"><button className="text-button" onClick={() => onEditCourse(module)}><Edit3 size={15}/> Editar curso</button><button className="btn small" onClick={() => onAddSection(module.id)}><Plus size={15}/> Añadir módulo</button></div></header><div className="course-progress"><div className="mini-track"><span style={{ width: `${module.progress}%` }}/></div><b>{module.progress}%</b></div>{children.length ? <div className="section-list">{children.sort((a,b) => a.number-b.number).map((section) => <div className="section-item" key={section.id}><span className="section-number">{section.number}/{section.total}</span><div><strong>{section.title}</strong><small>{section.status} · {section.questions.trim() ? "Con dudas pendientes" : "Sin dudas"}</small></div><b>{section.progress}%</b><button className="text-button" onClick={() => onEditSection(section)}><Edit3 size={15}/> Abrir</button><button className="text-button" onClick={() => downloadMarkdown(`${section.number}-de-${section.total}-${section.title}`, sectionMarkdown(section, module))}><Download size={15}/> MD</button><button className="icon-button danger" title="Eliminar módulo" onClick={() => { if (window.confirm(`¿Eliminar el módulo ${section.number} de ${section.total}?`)) setData((current) => { const nextSections = current.sections.filter((item) => item.id !== section.id); return { ...current, sections: nextSections, modules: updateCourseProgress(current.modules, nextSections, module.id) }; }); }}><Trash2 size={15}/></button></div>)}</div> : <div className="empty-child"><p>Todavía no hay módulos dentro de este curso.</p><button className="text-button" onClick={() => onAddSection(module.id)}>Crear el primero →</button></div>}<footer><button className="text-button" onClick={() => downloadMarkdown(module.title, moduleMarkdown(module))}><Download size={15}/> Exportar resumen del curso</button><button className="icon-button danger" title="Eliminar curso" onClick={() => { if (window.confirm(`¿Eliminar el curso “${module.title}” y sus módulos?`)) setData((current) => ({ ...current, modules: current.modules.filter((item) => item.id !== module.id), sections: current.sections.filter((section) => section.moduleId !== module.id) })); }}><Trash2 size={15}/></button></footer></article>; })}</div> : <Empty text={query ? "No hay resultados para esa búsqueda." : "Tu ruta empieza creando un curso padre."} action={!query ? "Crear primer curso" : undefined} onAction={onAddCourse} />}</section>;
}

function Notebook({ modules, sections, search, onOpen }: { modules: StudyModule[]; sections: StudySection[]; search: string; onOpen: (section: StudySection) => void }) {
  const query = search.trim().toLowerCase();
  const visible = sections.filter((section) => !query || sectionText(section).includes(query) || modules.find((module) => module.id === section.moduleId)?.title.toLowerCase().includes(query));
  return <section className="content"><div className="section-intro"><p>Todo lo aprendido, agrupado por curso pero disponible desde una búsqueda global.</p></div>{visible.length ? <div className="knowledge-grid">{visible.map((section) => { const module = modules.find((item) => item.id === section.moduleId); return <article className="knowledge-card" key={section.id}><span>{module?.title ?? "Sin curso"}</span><h3>{section.number} de {section.total} — {section.title}</h3><p>{section.learnings || section.notes || "Todavía no agregaste contenido."}</p><div className="card-actions"><button className="text-button" onClick={() => onOpen(section)}><Edit3 size={15}/> Abrir</button><button className="text-button" onClick={() => downloadMarkdown(`${section.number}-de-${section.total}-${section.title}`, sectionMarkdown(section, module))}><Download size={15}/> Markdown</button></div></article>; })}</div> : <Empty text={query ? "No encontramos ese concepto." : "Cuando guardes módulos, aparecerán juntos en tu cuaderno."}/>}</section>;
}

function Questions({ modules, sections, search, onOpen }: { modules: StudyModule[]; sections: StudySection[]; search: string; onOpen: (section: StudySection) => void }) {
  const query = search.trim().toLowerCase();
  const visible = sections.filter((section) => section.questions.trim() && (!query || sectionText(section).includes(query)));
  return <section className="content"><div className="section-intro"><p>Una cola separada con todo lo que todavía necesitás comprender o practicar.</p></div>{visible.length ? <div className="question-list">{visible.map((section) => { const module = modules.find((item) => item.id === section.moduleId); return <article className="question-card" key={section.id}><CircleHelp/><div><span>{module?.title} · Módulo {section.number}/{section.total}</span><h3>{section.title}</h3><p>{section.questions}</p></div><button className="btn ghost" onClick={() => onOpen(section)}>Estudiar duda</button></article>; })}</div> : <Empty text={query ? "No hay dudas que coincidan." : "No tenés dudas pendientes. Las que registres aparecerán acá."}/>}</section>;
}

function SearchResults({ data, query, onOpenCourse, onOpenSection, onOpenSession }: { data: CyberStudyData; query: string; onOpenCourse: () => void; onOpenSection: (section: StudySection) => void; onOpenSession: (session: StudySession) => void }) {
  const term = query.trim().toLowerCase();
  const courses = term ? data.modules.filter((module) => `${module.title} ${module.platform} ${module.category} ${module.difficulty} ${module.notes} ${module.learnings} ${module.questions}`.toLowerCase().includes(term)) : [];
  const sections = term ? data.sections.filter((section) => sectionText(section).includes(term) || data.modules.find((module) => module.id === section.moduleId)?.title.toLowerCase().includes(term)) : [];
  const sessions = term ? data.sessions.filter((session) => `${session.topic} ${session.category} ${session.platform} ${session.learned} ${session.difficulties} ${session.questions} ${session.tags.join(" ")}`.toLowerCase().includes(term)) : [];
  const total = courses.length + sections.length + sessions.length;
  return <section className="content"><div className="section-intro"><p>{total ? `${total} coincidencias para “${query.trim()}” en toda tu biblioteca.` : `No encontramos “${query.trim()}”.`}</p></div>{total ? <div className="search-results">{courses.map((course) => <button key={course.id} className="search-result" onClick={onOpenCourse}><FolderOpen/><span><small>CURSO</small><strong>{course.title}</strong><p>{course.platform} · {course.category}</p></span><ChevronRight/></button>)}{sections.map((section) => { const course = data.modules.find((module) => module.id === section.moduleId); return <button key={section.id} className="search-result" onClick={() => onOpenSection(section)}><BookMarked/><span><small>MÓDULO · {course?.title}</small><strong>{section.number} de {section.total} — {section.title}</strong><p>{section.learnings || section.notes || section.questions || "Sin contenido adicional"}</p></span><ChevronRight/></button>; })}{sessions.map((session) => <button key={session.id} className="search-result" onClick={() => onOpenSession(session)}><Clock3/><span><small>SESIÓN · {session.date}</small><strong>{session.topic}</strong><p>{session.learned || session.difficulties || session.platform}</p></span><ChevronRight/></button>)}</div> : <Empty text="Probá con un comando, concepto, curso, duda o etiqueta."/>}</section>;
}

function Sessions({ sessions, setData, onAdd, onEdit }: { sessions: StudySession[]; setData: React.Dispatch<React.SetStateAction<CyberStudyData>>; onAdd: () => void; onEdit: (session: StudySession) => void }) {
  return <section className="content"><div className="section-intro"><p>Un historial concreto de tiempo, aprendizajes y dificultades.</p><button className="btn primary" onClick={onAdd}><Plus size={18} /> Cargar sesión</button></div>{sessions.length ? <div className="session-list">{sessions.map((session) => <article className="session-row" key={session.id}><div className="date-block"><strong>{session.date.slice(8)}</strong><span>{new Intl.DateTimeFormat("es-AR", { month: "short" }).format(new Date(`${session.date}T12:00:00`))}</span></div><div className="session-info"><h3>{session.topic}</h3><p>{session.platform} · {session.category}</p>{session.learned ? <small>{session.learned}</small> : null}</div><div className="session-score"><strong>{formatMinutes(session.durationMinutes)}</strong><span>Comprensión {session.comprehension}/5</span><div className="session-actions"><button className="icon-button" title="Editar sesión" onClick={() => onEdit(session)}><Edit3 size={17} /></button><button className="icon-button" title="Exportar Markdown" onClick={() => downloadMarkdown(session.topic, sessionMarkdown(session))}><Download size={17} /></button><button className="icon-button danger" title="Eliminar sesión" onClick={() => { if (window.confirm(`¿Eliminar la sesión “${session.topic}”?`)) setData((current) => ({ ...current, sessions: current.sessions.filter((item) => item.id !== session.id) })); }}><Trash2 size={17} /></button></div></div></article>)}</div> : <Empty text="Todavía no registraste sesiones de estudio." action="Registrar primera sesión" onAction={onAdd} />}</section>;
}

function ModuleForm({ value, setValue, onSubmit }: { value: typeof moduleDefaults; setValue: React.Dispatch<React.SetStateAction<typeof moduleDefaults>>; onSubmit: (e: React.FormEvent) => void }) {
  return <form onSubmit={onSubmit}><Field label="Nombre del curso padre"><input required maxLength={140} value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} placeholder="Ej: Linux Fundamentals" autoFocus /></Field><div className="form-grid"><Field label="Plataforma"><input list="platforms" value={value.platform} onChange={(e) => setValue({ ...value, platform: e.target.value })} /><datalist id="platforms"><option value="Hack The Box Academy"/><option value="TryHackMe"/><option value="PortSwigger Academy"/><option value="Curso propio"/></datalist></Field><Field label="Área"><input value={value.category} onChange={(e) => setValue({ ...value, category: e.target.value })} placeholder="Linux, Redes, Web…" /></Field><Field label="Nivel"><input value={value.difficulty} onChange={(e) => setValue({ ...value, difficulty: e.target.value })} /></Field><Field label="Estado"><select value={value.status} onChange={(e) => setValue({ ...value, status: e.target.value as ModuleStatus })}><option>Pendiente</option><option>En progreso</option><option>Completado</option><option>Repasar</option></select></Field></div><button className="btn primary full" type="submit"><Check size={18} /> Guardar curso</button></form>;
}

function SectionForm({ modules, value, setValue, onSubmit }: { modules: StudyModule[]; value: typeof sectionDefaults; setValue: React.Dispatch<React.SetStateAction<typeof sectionDefaults>>; onSubmit: (e: React.FormEvent) => void }) {
  const mdInput = useRef<HTMLInputElement>(null);
  async function loadMarkdown(file?: File) { if (!file) return; const text = await file.text(); setValue({ ...value, notes: text }); }
  return <form onSubmit={onSubmit}><Field label="Curso padre"><select required value={value.moduleId} onChange={(e) => setValue({ ...value, moduleId: e.target.value })}><option value="">Seleccionar curso…</option>{modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}</select></Field><div className="form-grid"><Field label="Número del módulo"><input type="number" min="1" max="999" required value={value.number} onChange={(e) => setValue({ ...value, number: Number(e.target.value) })}/></Field><Field label="Total del curso"><input type="number" min="1" max="999" required value={value.total} onChange={(e) => setValue({ ...value, total: Number(e.target.value) })}/></Field></div><Field label="Nombre del módulo"><input required maxLength={160} value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} placeholder="Ej: Filtrado de contenido en Linux" autoFocus/></Field><div className="form-grid"><Field label="Estado"><select value={value.status} onChange={(e) => setValue({ ...value, status: e.target.value as ModuleStatus, progress: e.target.value === "Completado" ? 100 : value.progress })}><option>Pendiente</option><option>En progreso</option><option>Completado</option><option>Repasar</option></select></Field><Field label={`Progreso: ${value.progress}%`}><input type="range" min="0" max="100" step="5" value={value.progress} onChange={(e) => setValue({ ...value, progress: Number(e.target.value), status: Number(e.target.value) === 100 ? "Completado" : value.status })}/></Field></div><div className="import-md-row"><span>Notas en Markdown</span><button type="button" className="btn ghost small" onClick={() => mdInput.current?.click()}><Upload size={15}/> Importar .md</button><input ref={mdInput} className="visually-hidden" type="file" accept="text/markdown,.md" onChange={(e) => void loadMarkdown(e.target.files?.[0])}/></div><Field label=""><textarea rows={7} value={value.notes} onChange={(e) => setValue({ ...value, notes: e.target.value })} placeholder="Comandos, conceptos y contexto…"/></Field><Field label="Qué aprendí"><textarea rows={3} value={value.learnings} onChange={(e) => setValue({ ...value, learnings: e.target.value })}/></Field><Field label="Dudas pendientes"><textarea rows={3} value={value.questions} onChange={(e) => setValue({ ...value, questions: e.target.value })} placeholder="Una duda por línea…"/></Field><button className="btn primary full" type="submit"><Check size={18}/> Guardar módulo</button></form>;
}

function SessionForm({ value, setValue, onSubmit }: { value: typeof sessionDefaults; setValue: React.Dispatch<React.SetStateAction<typeof sessionDefaults>>; onSubmit: (e: React.FormEvent) => void }) {
  return <form onSubmit={onSubmit}><Field label="Tema estudiado"><input required maxLength={160} value={value.topic} onChange={(e) => setValue({ ...value, topic: e.target.value })} placeholder="Ej: Permisos de archivos en Linux" autoFocus /></Field><div className="form-grid"><Field label="Fecha"><input type="date" required value={value.date} onChange={(e) => setValue({ ...value, date: e.target.value })} /></Field><Field label="Duración (minutos)"><input type="number" min="1" max="1440" required value={value.durationMinutes} onChange={(e) => setValue({ ...value, durationMinutes: Number(e.target.value) })} /></Field><Field label="Plataforma"><input value={value.platform} onChange={(e) => setValue({ ...value, platform: e.target.value })} /></Field><Field label="Categoría"><input value={value.category} onChange={(e) => setValue({ ...value, category: e.target.value })} /></Field></div><Field label="Qué aprendí"><textarea rows={3} value={value.learned} onChange={(e) => setValue({ ...value, learned: e.target.value })} /></Field><Field label="Dificultades o dudas"><textarea rows={2} value={value.difficulties} onChange={(e) => setValue({ ...value, difficulties: e.target.value })} /></Field><div className="form-grid"><Field label={`Comprensión: ${value.comprehension}/5`}><input type="range" min="1" max="5" value={value.comprehension} onChange={(e) => setValue({ ...value, comprehension: Number(e.target.value) })} /></Field><Field label="Tags (separados por coma)"><input value={value.tags} onChange={(e) => setValue({ ...value, tags: e.target.value })} placeholder="linux, permisos, bash" /></Field></div><button className="btn primary full" type="submit"><Check size={18} /> Guardar sesión</button></form>;
}

function CloudAccount({ user, state }: { user: User | null; state: "local" | "syncing" | "synced" | "error" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function authenticate(mode: "signin" | "signup") {
    if (!supabase || !email || password.length < 6) { setMessage("Ingresá un email y una contraseña de al menos 6 caracteres."); return; }
    setBusy(true); setMessage("");
    const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setBusy(false);
    setMessage(result.error ? result.error.message : mode === "signup" && !result.data.session ? "Revisá tu email para confirmar la cuenta." : "Cuenta conectada correctamente.");
  }

  if (!isSupabaseConfigured) return <div className="cloud-message"><p>La aplicación está lista, pero este equipo todavía no tiene una URL y una clave pública de Supabase en <code>.env.local</code>.</p><p>Mientras tanto, usá <strong>Respaldo</strong> para descargar una copia JSON.</p></div>;
  if (user) return <div className="cloud-message"><p><strong>{state === "syncing" ? "Sincronizando…" : state === "error" ? "No se pudo sincronizar" : "Datos sincronizados"}</strong></p><p>{user.email}</p><button className="btn ghost" onClick={() => void supabase?.auth.signOut()}><LogOut size={17} /> Cerrar sesión</button></div>;
  return <form onSubmit={(e) => { e.preventDefault(); void authenticate("signin"); }}><Field label="Email"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></Field><Field label="Contraseña"><input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>{message ? <p className="form-message">{message}</p> : null}<div className="auth-actions"><button className="btn primary" disabled={busy} type="submit">Entrar</button><button className="btn ghost" disabled={busy} type="button" onClick={() => void authenticate("signup")}>Crear cuenta</button></div></form>;
}

function TimerBar({ seconds, running, onToggle, onReset, onFinish }: { seconds: number; running: boolean; onToggle: () => void; onReset: () => void; onFinish: () => void }) { const time = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; return <div className="timer-bar"><div><TimerReset size={20}/><span>Sesión en vivo</span><strong>{time}</strong></div><div><button className="timer-button" onClick={onToggle}>{running ? <Pause size={18}/> : <Play size={18}/>} {running ? "Pausar" : seconds ? "Continuar" : "Iniciar"}</button>{seconds ? <><button className="icon-button" title="Descartar timer" onClick={onReset}><RotateCcw size={17}/></button><button className="btn small" onClick={onFinish}>Finalizar y guardar</button></> : null}</div></div>; }
function SectionReader({ section, course, onEdit }: { section: StudySection; course?: StudyModule; onEdit: () => void }) {
  const [query, setQuery] = useState("");
  const content = `${section.notes}\n${section.learnings}\n${section.questions}`.toLowerCase();
  const matches = query.trim() ? content.split(query.trim().toLowerCase()).length - 1 : 0;
  return <div className="reader-shell">
    <div className="reader-toolbar">
      <label className="reader-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar dentro de este módulo…" autoFocus/><span>{query.trim() ? `${matches} resultado${matches === 1 ? "" : "s"}` : ""}</span></label>
      <button className="btn ghost" onClick={onEdit}><Edit3 size={16}/> Editar</button>
      <button className="btn ghost" onClick={() => downloadMarkdown(`${section.number}-de-${section.total}-${section.title}`, sectionMarkdown(section, course))}><Download size={16}/> Descargar .md</button>
    </div>
    <div className="reader-meta"><span>{course?.platform ?? "Biblioteca personal"}</span><span>{course?.category ?? "Apuntes"}</span><span>{section.status}</span></div>
    {section.learnings.trim() ? <ReaderBlock title="Resumen — qué aprendí"><ReadableText text={section.learnings} query={query}/></ReaderBlock> : null}
    <ReaderBlock title="Apuntes completos"><MarkdownText text={section.notes || "Todavía no agregaste apuntes a este módulo."} query={query}/></ReaderBlock>
    {section.questions.trim() ? <ReaderBlock title="Dudas para practicar" tone="question"><ReadableText text={section.questions} query={query}/></ReaderBlock> : null}
  </div>;
}

function ReaderBlock({ title, tone, children }: { title: string; tone?: "question"; children: React.ReactNode }) { return <section className={`reader-block ${tone ?? ""}`}><h3>{title}</h3><div className="reader-copy">{children}</div></section>; }

function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (!term) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, "gi"));
  return <>{parts.map((part, index) => part.toLowerCase() === term.toLowerCase() ? <mark key={index}>{part}</mark> : part)}</>;
}

function ReadableText({ text, query }: { text: string; query: string }) { return <>{text.split(/\n+/).filter(Boolean).map((line, index) => <p key={index}><Highlight text={line} query={query}/></p>)}</>; }

function MarkdownText({ text, query }: { text: string; query: string }) {
  const blocks: React.ReactNode[] = [];
  let code: string[] | null = null;
  text.split("\n").forEach((line, index) => {
    if (line.trim().startsWith("```")) { if (code) { blocks.push(<pre key={`code-${index}`}><code><Highlight text={code.join("\n")} query={query}/></code></pre>); code = null; } else code = []; return; }
    if (code) { code.push(line); return; }
    if (line.startsWith("### ")) blocks.push(<h4 key={index}><Highlight text={line.slice(4)} query={query}/></h4>);
    else if (line.startsWith("## ")) blocks.push(<h3 key={index}><Highlight text={line.slice(3)} query={query}/></h3>);
    else if (line.startsWith("# ")) blocks.push(<h2 key={index}><Highlight text={line.slice(2)} query={query}/></h2>);
    else if (/^[-*] /.test(line)) blocks.push(<div className="reader-list-item" key={index}><span>•</span><p><Highlight text={line.slice(2)} query={query}/></p></div>);
    else if (/^\d+\. /.test(line)) blocks.push(<div className="reader-list-item" key={index}><span>{line.match(/^\d+/)?.[0]}.</span><p><Highlight text={line.replace(/^\d+\. /, "")} query={query}/></p></div>);
    else if (line.trim()) blocks.push(<p key={index}><Highlight text={line} query={query}/></p>);
  });
  if (code !== null) blocks.push(<pre key="code-last"><code><Highlight text={(code as string[]).join("\n")} query={query}/></code></pre>);
  return <>{blocks}</>;
}

function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function Modal({ title, subtitle, onClose, children, wide = false }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) { return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" onClick={onClose} aria-label="Cerrar"><X /></button><h2>{title}</h2><p>{subtitle}</p>{children}</section></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
function NavButton({ active, icon, label, count, onClick }: { active: boolean; icon: React.ReactNode; label: string; count?: number; onClick: () => void }) { return <button className={active ? "nav-button active" : "nav-button"} onClick={onClick}>{icon}<span>{label}</span>{count !== undefined ? <small>{count}</small> : null}</button>; }
function Metric({ icon, value, label, note, hot }: { icon: React.ReactNode; value: string; label: string; note: string; hot?: boolean }) { return <article className="metric"><span className={hot ? "metric-icon hot" : "metric-icon"}>{icon}</span><div><strong>{value}</strong><span>{label}</span><small>{note}</small></div></article>; }
function PanelTitle({ title, meta }: { title: string; meta: string }) { return <div className="panel-title"><h3>{title}</h3><span>{meta}</span></div>; }
function Empty({ text, action, onAction }: { text: string; action?: string; onAction?: () => void }) { return <div className="empty"><BookOpen size={34}/><p>{text}</p>{action ? <button className="btn ghost" onClick={onAction}>{action}</button> : null}</div>; }

function sectionText(section: StudySection) {
  return `${section.number} ${section.total} ${section.title} ${section.notes} ${section.learnings} ${section.questions}`.toLowerCase();
}

function updateCourseProgress(modules: StudyModule[], sections: StudySection[], moduleId: string) {
  const children = sections.filter((section) => section.moduleId === moduleId);
  const total = children[0]?.total ?? 0;
  const completed = children.filter((section) => section.status === "Completado" || section.progress === 100).length;
  const progress = total ? Math.min(100, Math.round(completed / total * 100)) : 0;
  return modules.map((module) => module.id === moduleId ? { ...module, progress, status: progress === 100 ? "Completado" as ModuleStatus : completed || children.length ? "En progreso" as ModuleStatus : module.status } : module);
}

function calculateStreak(data: CyberStudyData) {
  const active = new Set(data.sessions.map((s) => s.date));
  data.frozenDays.forEach((day) => active.add(day.date));
  let streak = 0; const cursor = new Date();
  if (!active.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (active.has(localDate(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

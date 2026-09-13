import type { StudyModule, StudySection, StudySession } from "../types";

const safeYaml = (value: string) => JSON.stringify(value);

export function moduleMarkdown(module: StudyModule) {
  return `---
title: ${safeYaml(module.title)}
fecha: ${module.startedAt || module.createdAt.slice(0, 10)}
tipo: modulo
plataforma: ${safeYaml(module.platform)}
categoria: ${safeYaml(module.category)}
dificultad: ${safeYaml(module.difficulty)}
estado: ${safeYaml(module.status)}
progreso: ${module.progress}
tags: [estudio, ${module.platform.toLowerCase().replace(/[^a-z0-9]+/g, "-")}]
---

# ${module.title}

## Notas

${module.notes || "Sin notas todavía."}

## Aprendizajes

${module.learnings || "Sin aprendizajes registrados todavía."}

## Dudas pendientes

${module.questions || "Sin dudas pendientes."}
`;
}

export function sectionMarkdown(section: StudySection, module?: StudyModule) {
  return `---
title: ${safeYaml(`${section.number} de ${section.total} — ${section.title}`)}
tipo: seccion-de-curso
curso: ${safeYaml(module?.title ?? "Sin curso")}
plataforma: ${safeYaml(module?.platform ?? "")}
estado: ${safeYaml(section.status)}
progreso: ${section.progress}
---

# ${section.number} de ${section.total} — ${section.title}

## Notas

${section.notes || "Sin notas todavía."}

## Aprendizajes

${section.learnings || "Sin aprendizajes registrados todavía."}

## Dudas pendientes

${section.questions || "Sin dudas pendientes."}
`;
}

export function sessionMarkdown(session: StudySession) {
  return `---
title: ${safeYaml(session.topic)}
fecha: ${session.date}
tipo: sesion-de-estudio
plataforma: ${safeYaml(session.platform)}
categoria: ${safeYaml(session.category)}
duracion_minutos: ${session.durationMinutes}
comprension: ${session.comprehension}
tags: [${session.tags.join(", ")}]
---

# ${session.topic}

## Qué aprendí

${session.learned || "Sin aprendizajes registrados."}

## Dificultades

${session.difficulties || "Sin dificultades registradas."}

## Dudas pendientes

${session.questions || "Sin dudas pendientes."}
`;
}

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filename.replace(/[^a-z0-9áéíóúñ]+/gi, "-").toLowerCase()}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

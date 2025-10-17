// utils/calendarMapper.js

export function safeParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return {};
  }
}

export function taskToEvent(task) {
  const data = safeParseJSON(task.task_data);

  return {
    id: String(task.id),
    title: task.title,
    start: task.start,
    end: task.due,
    allDay: true,
    extendedProps: {
      project_id: task.project_id,
      assignee: task.assignee,
      assigner: task.assigner,
      status: task.status,
      priority: task.priority,
      description: data.detail || "",
      file: data.file || "",
      tags: data.tags || [],
    },
  };
}

export function eventToTask(event) {
  return {
    id: Number(event.id),
    project_id: event.extendedProps.project_id,
    title: event.title,
    assignee: event.extendedProps.assignee || "미정",
    assigner: event.extendedProps.assigner || "",
    status: event.extendedProps.status || "할 일",
    priority: event.extendedProps.priority || "low",
    start: event.start instanceof Date ? event.start.toLocaleDateString("en-CA"): event.start,
    due: event.end instanceof Date ? event.end.toLocaleDateString("en-CA"): event.end,
    task_data: JSON.stringify({
      detail: event.extendedProps.description || "",
      file: event.extendedProps.file || "",
      tags: event.extendedProps.tags || [],
    }),
  };
}

export const tasksToEvents = (tasks = []) => tasks.map(taskToEvent);
export const eventsToTasks = (events = []) => events.map(eventToTask);

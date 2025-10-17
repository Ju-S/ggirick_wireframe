
import api from "../api.js"
import { eventToTask } from "./calendarMapper.js";

/**
 * FullCalendar 이벤트가 변경(드래그, 리사이즈 등)될 때 DB에 반영
 */
export async function syncEventUpdate(changeInfo) {
  const updatedTask = eventToTask(changeInfo.event);

  try {
    await api.put(`project/task/${updatedTask.id}`, updatedTask);
    console.log(`✅ Task ${updatedTask.id} 업데이트 성공`);
  } catch (err) {
    console.error("❌ Task 업데이트 실패:", err);
  }
}

/**
 * 새로운 이벤트가 생성될 때 DB에 추가
 */
export async function syncEventCreate(newEvent) {
  const newTask = eventToTask(newEvent);
  try {
    const res = await api.post(`project/task`, newTask);
    console.log("✅ 새 Task 생성 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Task 생성 실패:", err);
  }
}

/**
 * 이벤트 삭제 시 DB에서 제거
 */
export async function syncEventDelete(eventId) {
  try {
    await api.delete(`project/task/${eventId}`);

    console.log(`🗑️ Task ${eventId} 삭제 성공`);
  } catch (err) {
    console.error("❌ Task 삭제 실패:", err);
  }
}

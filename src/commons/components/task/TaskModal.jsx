import { useEffect, useState } from "react";

export default function TaskModal({ open, onClose, task }) {
  const [taskDetail, setTaskDetail] = useState(null);

  useEffect(() => {
    if (open && task) {
      // task_data 파싱
      const parsed = task.task_data
        ? JSON.parse(task.task_data)
        : { detail: "", file: "", tags: [] };
      setTaskDetail({ ...task, ...parsed });
    }
  }, [open, task]);

  if (!open || !taskDetail) return null;

  return (
    <>
      <dialog id="taskModal" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl bg-base-100">
          <h3 className="font-bold text-xl mb-4 text-primary">{taskDetail.title}</h3>

          <div className="space-y-3">

            <div>
              <span className="font-semibold">담당자:</span>{" "}
              { taskDetail.assignee}
            </div>
            <div>
              <span className="font-semibold">상태:</span> {taskDetail.status}
            </div>
            <div>
              <span className="font-semibold">중요도:</span> {taskDetail.priority}
            </div>
            <div>
              <span className="font-semibold">기간:</span>{" "}
              {taskDetail.start} ~ {taskDetail.due}
            </div>

            <div>
              <span className="font-semibold">상세 내용:</span>
              <p className="mt-1 whitespace-pre-wrap bg-base-200 rounded-lg p-2">
                {taskDetail.detail || "(내용 없음)"}
              </p>
            </div>

            <div>
              <span className="font-semibold">파일:</span>{" "}
              {taskDetail.file ? (
                <a
                  href={`#`}
                  className="link link-primary"
                  onClick={(e) => e.preventDefault()}
                >
                  {taskDetail.file}
                </a>
              ) : (
                "첨부된 파일 없음"
              )}
            </div>

            <div>
              <span className="font-semibold">태그:</span>{" "}
              {taskDetail.tags?.length ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {taskDetail.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge bg-secondary text-secondary-content badge-outline badge-sm px-2 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                "태그 없음"
              )}
            </div>
          </div>

          <div className="modal-action mt-6">
            <button className="btn btn-primary" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

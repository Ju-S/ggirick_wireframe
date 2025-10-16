import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CustomDrawer from "../../components/Drawer.jsx";
import TagsInput from "../../components/TagsInput.jsx";
import api from "../../../utils/api.js";

export default function TaskDrawer({ open, onClose, projects, setProjects, selectedTask,  mode = "create"  }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [showCalendar, setShowCalendar] = useState(false);

  const [task, setTask] = useState({
    title: "",
    project_id: "", // 빈 문자열 초기값
    assignee: "",
    status: "할 일",
    priority: "medium",
    start: "",
    due: "",
  });

  const [taskData, setTaskData] = useState({
    detail: "",
    file: "",
    tags: [],
  });

  useEffect(() => {
    if (!open) return;

    if (selectedTask && mode === "edit" && projects.length > 0) {
      setTask({
        ...selectedTask,
        assignee: selectedTask.assignee || "",
        project_id: selectedTask.project_id || "",
      });

      const parsedData = selectedTask.task_data
        ? JSON.parse(selectedTask.task_data)
        : { detail: "", file: "", tags: [] };

      setTaskData(parsedData);

      setRange({
        from: selectedTask.start ? new Date(selectedTask.start) : undefined,
        to: selectedTask.due ? new Date(selectedTask.due) : undefined,
      });
    } else if (mode === "create") {
      setTask({
        title: "",
        project_id: "",
        assignee: "",
        status: "할 일",
        priority: "medium",
        start: "",
        due: "",
      });
      setTaskData({ detail: "", file: "", tags: [] });
      setRange({ from: undefined, to: undefined });
    }
  }, [open, selectedTask, mode, projects]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskDataChange = (name, value) => {
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (value) => {
    setTask((prev) => ({ ...prev, project_id: value }));
  };

  const handleAssigneeChange = (e) => {
    setTask((prev) => ({ ...prev, assignee: e.target.value }));
  };

  const formatDate = (date) => {
    if (!date) return null;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };


  const formatRange = () => {
    if (!range.from) return "기간을 선택하세요";
    const fromStr = range.from.toLocaleDateString();
    const toStr = range.to ? range.to.toLocaleDateString() : "";
    return toStr ? `${fromStr} ~ ${toStr}` : `${fromStr} ~ `;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const formatToday = formatDate(today);

    const finalTask = {
      ...task,
      start: range.from ? formatDate(range.from) : formatToday,
      due: range.to ? formatDate(range.to) : formatToday,
      task_data: JSON.stringify(taskData),
    };

    if (mode === "create") {
      //할일 생성
      api.post("/project/task", finalTask)
        .then(resp => {
          if (resp.data.result) {
            api.get("/project")
              .then((res) => {
                setProjects(res.data);
              })
              .then(() => {
                alert("작업이 성공적으로 생성되었습니다!");
                onClose();
              });
          } else {
            alert("작업 생성에 실패했습니다!");
          }
        })
        .catch(err => {
          console.error(err);
          alert("서버 요청 중 오류가 발생했습니다.");
        });
      
    } else if (mode === "edit") {
      console.log("수정상황에서 보낸 task:"+ task);
      //할일 수정
      api.put(`/project/task/${selectedTask.id}`, finalTask)
        .then(resp => {
          if (resp.data.result) {
            api.get("/project")
              .then((res) => {
                setProjects(res.data);
              })
              .then(() => {
                alert("작업이 성공적으로 변경되었습니다!");
                onClose();
              });
          } else {
            alert("작업 변경에 실패 했습니다!");
          }
        })
        .catch(err => {
          console.error(err);
          alert("서버 요청 중 오류가 발생했습니다.");
        });
    }

  };


  return (
    <CustomDrawer isOpen={open} onClose={onClose} title="할 일 생성 /수정">
      <form className="space-y-4">
        {/* 할 일 제목 */}
        <div>
          <label className="block text-sm font-medium mb-1">할 일 제목</label>
          <input
            name="title"
            type="text"
            placeholder="예: API 연동 작업"
            onChange={handleChange}
            value={task.title}
            className="input input-bordered w-full bg-base-100"
          />
        </div>

        {/* 프로젝트 선택 */}
        <div>
          <label className="block text-sm font-medium mb-1">프로젝트</label>
          <select
            name="project_id"
            value={task.project_id || ""} // undefined 보호

            className="select select-bordered w-full bg-base-100"
            onChange={(e) => handleProjectChange(Number(e.target.value))}
          >
            <option disabled selected>
              프로젝트 선택
            </option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* 담당자 */}
        <div>
          <label className="block text-sm font-medium mb-1">담당자</label>
          <select
            name="assignee"
            value={task.assignee || ""}
            onChange={handleAssigneeChange}
            className="select select-bordered w-full bg-base-100"
          >
            <option disabled value="">
              담당자 선택
            </option>
            {task.project_id &&
              projects
                .find((p) => p.id === task.project_id)
                ?.members?.map((member) => (
                <option key={member.employee_Id} value={member.employee_Id}>
                  {member.name}
                </option>
              ))}
          </select>

        </div>

        {/* 상태 */}
        <div>
          <label className="block text-sm font-medium mb-1">상태</label>
          <select
            name="status"
            value={task.status}
            className="select select-bordered w-full bg-base-100"
            onChange={handleChange}
          >
            <option value="할 일">할 일</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
          </select>
        </div>

        {/* 중요도 */}
        <div>
          <label className="block text-sm font-medium mb-1">중요도</label>
          <select
            name="priority"
            value={task.priority}
            className="select select-bordered w-full bg-base-100"
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* 상세 내용 */}
        <div>
          <label className="block text-sm font-medium mb-1">상세 내용</label>
          <textarea
            name="detail"
            className="textarea textarea-bordered w-full bg-base-100"
            rows="4"
            placeholder="작업 상세 내용을 입력하세요."
            value={taskData.detail}
            onChange={(e) => handleTaskDataChange("detail", e.target.value)}
          ></textarea>
        </div>

        {/* 파일 첨부 */}
        <div>
          <label className="block text-sm font-medium mb-1">파일 첨부 (아직 껍데기)</label>
          {/* 파일 input 수정 */}
          <input
            type="file"
            className="input input-bordered w-full bg-base-100"
            onChange={(e) =>
              handleTaskDataChange("file", e.target.files?.[0]?.name || "")
            }
          />

        </div>

        {/* 태그 입력 */}
        <div>
          <label className="block text-sm font-medium mb-1">태그</label>
          <TagsInput
            value={taskData.tags}
            onChange={(newTags) => handleTaskDataChange("tags", newTags)}
            placeholder="태그 입력 후 Enter"
          />
        </div>

        {/* 날짜 범위 */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">기간 설정</label>
          <button
            type="button"
            className="input input-bordered w-full text-left bg-base-100"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {formatRange()}
          </button>
          {showCalendar && (
            <div className="absolute z-50 mt-2 bg-base-100 shadow-lg rounded-xl border border-base-300">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={(selected) => {
                  if (!selected) return; // undefined 보호
                  setRange(selected);

                  // from과 to가 모두 있고 from <= to일 경우만 닫기
                  if (selected.from && selected.to) {
                    setShowCalendar(false);
                  }
                }}

              />
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            취소
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            저장
          </button>
        </div>
      </form>
    </CustomDrawer>
  );
}

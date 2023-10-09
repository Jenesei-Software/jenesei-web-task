import { useState } from "react";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";

import { Column, Task } from "../../../stores/projects/interfaces";
import { ProjectColumnItem } from "../atoms/project-column-item";
import { ProjectColumnItemAdd } from "../atoms/project-column-item-add";
import { ModalEditColumn } from "../../../modules/modal-edit-column/organelles/modal-edit-column";

import "../styles/project-column.css";

interface IProjectColumn {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  listName: string;
  projectNumber: string;
  changeIsAdd: (type?: string) => void;
  column: Column;
  changeIsChildrenView: () => void;
  isChildrenView: boolean;
}
export const ProjectColumn = (props: IProjectColumn) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const changeIsEdit = () => {
    setIsEdit(!isEdit);
    props.changeIsChildrenView();
  };
  return (
    <>
      <div
        ref={props.provided.innerRef}
        className="ProjectColumn__Item"
        //@ts-ignore
        snapshot={props.snapshot}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
        style={{
          ...props.provided.draggableProps.style,
        }}
      >
        <div className="ProjectColumn__Item__Header">
          <div className="ProjectColumn__Item__Header__Title">
            {props.listName}
          </div>
          <svg
            className="ProjectColumn__Item__Header__Icon"
            onClick={changeIsEdit}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_4_82"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4_82)">
              <path
                d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                fill="#49454E"
              />
            </g>
          </svg>
        </div>
        {/* Project  Droppable*/}
        <Droppable
          isDropDisabled={props.isChildrenView}
          droppableId={JSON.stringify({
            listName: props.listName,
            taskNumber: undefined,
          })}
          type="TASK"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="ProjectColumn__Item__List"
            >
              {props.column.list.map((task: Task, index: number) => (
                // Task Draggable
                <ProjectColumnItem
                  {...task}
                  key={task.taskNumber}
                  projectNumber={props.projectNumber}
                  listName={props.listName}
                  index={index}
                  changeIsChildrenView={props.changeIsChildrenView}
                  isChildrenView={props.isChildrenView}
                  fullName={task.heading}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <ProjectColumnItemAdd
          title="Add a Task"
          onClick={() => props.changeIsAdd(props.listName)}
        />
      </div>
      {isEdit && (
        <ModalEditColumn
          listName={props.listName}
          projectNumber={props.projectNumber}
          changeIsEdit={changeIsEdit}
          column={props.column}
        />
      )}
    </>
  );
};
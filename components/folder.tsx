import React, { Dispatch, SetStateAction } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FolderObj } from "../types/interface";

interface FolderProps {
  folderIndex: number;
  folder: FolderObj;
  folders: FolderObj[];
  setFolders: Dispatch<SetStateAction<FolderObj[]>>;
}

function Folder({ folderIndex, folder, folders, setFolders }: FolderProps) {
  let relativePath = "";
  //@ts-ignore
  if (folder.fileList[0].path) {
    //@ts-ignore
    relativePath = folder.fileList[0].path.slice(1);
  } else {
    relativePath = folder.fileList[0].webkitRelativePath;
  }
  var folderName = relativePath.split("/")[0];

  const onClickX = () => {
    setFolders(
      folders.filter((value) => {
        return folder.id !== value.id;
      })
    );
  };

  return (
    <Draggable draggableId={folder.id} index={folderIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="flex items-center "
        >
          <div className="mr-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
          <span>{folderName}</span>
          <div onClick={onClickX} className="cursor-pointer ml-auto">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Folder);

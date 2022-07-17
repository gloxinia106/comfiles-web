import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FileWithPath, fromEvent } from "file-selector";
import { cls, extracFolderName, sortArrayByDirName } from "../lib/utils";
import { useTranslation } from "next-i18next";
import { Droppable } from "react-beautiful-dnd";
import { FolderObj } from "../types/interface";

interface DndBoxProps {
  children: React.ReactNode;
  setFolders: Dispatch<SetStateAction<FolderObj[]>>;
  setFolderName: Dispatch<SetStateAction<string>>;
}

export function DndBox({ children, setFolders, setFolderName }: DndBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleDragenter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragleave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragover = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = await fromEvent(e);
    let folderNames = files.map((file) => {
      //@ts-ignore
      const folderName: string = file.path.split("/")[1];
      return folderName;
    });
    //@ts-ignore
    folderNames = [...new Set(folderNames)];
    const folderList = folderNames.map((folderName) => {
      const newFolderList = new DataTransfer();
      //@ts-ignore
      files.forEach((file: FileWithPath) => {
        if (file.path?.split("/")[1] === folderName) {
          newFolderList.items.add(file);
        }
      });
      return newFolderList.files;
    });
    setFolders((value) => {
      const newFolderList = folderList.map((oldFolderList, index) => ({
        id: value.length + index + 1 + "",
        fileList: oldFolderList,
      }));
      const sortedFolders = sortArrayByDirName([...value, ...newFolderList]);
      const firstName = extracFolderName(sortedFolders[0]);
      setFolderName(firstName);
      return sortedFolders;
    });
    setIsDragging(false);
  };

  useEffect(() => {
    dragRef.current?.addEventListener("dragenter", handleDragenter);
    dragRef.current?.addEventListener("dragleave", handleDragleave);
    dragRef.current?.addEventListener("dragover", handleDragover);
    dragRef.current?.addEventListener("drop", handleDrop);
    return () => {
      dragRef.current?.removeEventListener("dragenter", handleDragenter);
      dragRef.current?.removeEventListener("dragleave", handleDragleave);
      dragRef.current?.removeEventListener("dragover", handleDragover);
      dragRef.current?.removeEventListener("drop", handleDrop);
    };
  }, []);
  const { t } = useTranslation("common");

  return (
    <div className="mt-10 w-full flex justify-center flex-col items-center">
      <span>{t("dnd-description")}</span>
      <Droppable droppableId="dndBox">
        {(provided) => (
          <div
            ref={(el) => {
              dragRef.current = el;
              provided.innerRef(el);
            }}
            {...provided.droppableProps}
            className={cls(
              "bg-white py-2 space-y-3 divide-y px-3 rounded-xl border-2 w-4/5 h-96 flex flex-col overflow-y-auto",
              isDragging ? "border-blue-500" : ""
            )}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

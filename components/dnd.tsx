import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FileWithPath, fromEvent } from "file-selector";
import { cls, sortArrayByDirName } from "../lib/utils";

interface DndBoxProps {
  children: React.ReactNode;
  setFolders: Dispatch<SetStateAction<FileList[]>>;
}

export function DndBox({ children, setFolders }: DndBoxProps) {
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
      return sortArrayByDirName([...value, ...folderList]);
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

  return (
    <div className="mt-10 w-full flex justify-center flex-col items-center">
      <span>또는 폴더를 아래에 두기</span>
      <div
        ref={dragRef}
        className={cls(
          "bg-white py-2 space-y-3 divide-y px-3 rounded-xl border-2 w-4/5 h-96 flex flex-col overflow-y-auto",
          isDragging ? "border-blue-500" : ""
        )}
      >
        {children}
      </div>
    </div>
  );
}

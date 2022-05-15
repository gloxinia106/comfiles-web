import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FileWithPath, fromEvent } from "file-selector";
import { sortArrayByDirName } from "../lib/sort-array";

interface DndBoxProps {
  children: React.ReactNode;
  folders: FileList[];
  setFolders: Dispatch<SetStateAction<FileList[]>>;
}

export function DndBox({ children, setFolders, folders }: DndBoxProps) {
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
    console.log("drops");
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
    setFolders(sortArrayByDirName([...folders, ...folderList]));
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
    <div ref={dragRef} className="border w-32 h-32">
      {children}
    </div>
  );
}

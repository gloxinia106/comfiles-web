import { FolderObj } from "../types/interface";
import { sortArrayByFileName } from "./utils";

export const combineFile = (folders: FolderObj[]): FileList => {
  let startNum = 1;
  const newFolderList = new DataTransfer();
  folders.forEach((folder) => {
    const sotredFolder = sortArrayByFileName(folder.fileList);
    Array.prototype.forEach.call(sotredFolder, (file: File) => {
      const fileName = file.name;
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File(
        [blob],
        fileName.replace(/^[^.]*/, startNum + ""),
        {
          type: file.type,
        }
      );
      startNum++;
      newFolderList.items.add(newFile);
    });
  });
  return newFolderList.files;
};

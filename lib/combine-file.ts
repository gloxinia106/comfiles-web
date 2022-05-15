import { sortArrayByFileName } from "./sort-array";

export const combineFile = (folders: FileList[]): FileList => {
  let startNum = 1;
  const newFolderList = new DataTransfer();
  folders.forEach((folder) => {
    const sotredFolder = sortArrayByFileName(folder);
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

import { FolderObj } from "../types/interface";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

const extractDirName = (folder: FileList): string => {
  let relativePath = "";
  //@ts-ignore
  if (folder[0].path) {
    //@ts-ignore
    relativePath = folder[0].path.slice(1);
  } else {
    relativePath = folder[0].webkitRelativePath;
  }
  const folderName = relativePath.split("/")[0];
  return folderName;
};

export const sortArrayByDirName = (arr: FolderObj[]) => {
  return arr.sort(function (a, b) {
    let a1 = extractDirName(a.fileList);
    let b1 = extractDirName(b.fileList);

    return a1.localeCompare(b1, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
};

export const sortArrayByFileName = (arr: FileList) => {
  const ArrFileList = Array.from(arr);
  const sortedArr = ArrFileList.sort((a, b) => {
    let a1 = a.name;
    let b1 = b.name;
    return a1.localeCompare(b1, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  return sortedArr;
};

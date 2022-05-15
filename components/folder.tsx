interface FolderProps {
  folder: FileList;
}

export function Folder({ folder }: FolderProps) {
  let relativePath = "";
  //@ts-ignore
  if (folder[0].path) {
    //@ts-ignore
    relativePath = folder[0].path.slice(1);
  } else {
    relativePath = folder[0].webkitRelativePath;
  }
  var folderName = relativePath.split("/")[0];
  return <div>{folderName}</div>;
}

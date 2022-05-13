interface FolderProps {
  folder: FileList;
}

export function Folder({ folder }: FolderProps) {
  var relativePath = folder[0].webkitRelativePath;
  var folderName = relativePath.split("/")[0];
  return <div>{folderName}</div>;
}

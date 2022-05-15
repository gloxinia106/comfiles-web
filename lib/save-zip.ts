import JSZip from "jszip";
import { saveAs } from "file-saver";

export const saveZip = (folder: FileList) => {
  const zip = new JSZip();
  const folderZip = zip.folder("newFolder");
  Array.prototype.forEach.call(folder, (file: File) => {
    folderZip?.file(file.name, file);
  });
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, "newFolder.zip");
  });
};

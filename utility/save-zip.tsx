import JSZip from "jszip";
import { saveAs } from "file-saver";

export const saveZip = (folders: FileList[]) => {
  const zip = new JSZip();
  folders.forEach((files, index) => {
    const folderZip = zip.folder(`${index}name`);
    Array.prototype.forEach.call(files, (file: File) => {
      folderZip?.file(file.name, file);
    });
  });
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, "test.zip");
  });
};

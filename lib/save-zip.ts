import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Dispatch, SetStateAction } from "react";

export const saveZip = (
  folder: FileList,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPercent: Dispatch<SetStateAction<number>>,
  folderName: string
) => {
  const zip = new JSZip();
  const folderZip = zip.folder(folderName);
  Array.prototype.forEach.call(folder, (file: File) => {
    folderZip?.file(file.name, file);
  });
  zip
    .generateAsync({ type: "blob", streamFiles: true }, (metadata) => {
      setPercent(Math.floor(metadata.percent));
    })
    .then(function (blob) {
      saveAs(blob, `${folderName}.zip`);
      setLoading(false);
    });
};

import { useTranslation } from "next-i18next";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { sortArrayByDirName } from "../lib/utils";
import { FolderObj } from "../types/interface";

interface PlusBtnProps {
  folders: FolderObj[];
  setFolders: Dispatch<SetStateAction<FolderObj[]>>;
}

export default function PlusBtn({ setFolders, folders }: PlusBtnProps) {
  const { t } = useTranslation("common");
  const onChangeBtn = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        const newFolderObj = {
          id: folders.length + 1 + "",
          fileList: e.target.files,
        };
        setFolders(sortArrayByDirName([...folders, newFolderObj]));
      }
    }
  };
  return (
    <label className="mt-6 flex justify-center flex-col items-center cursor-pointer bg-sky-400 rounded py-3 px-20 hover:bg-sky-600 transition">
      <span className="text-white text-xl font-semibold">
        {t("add-folder")}
      </span>
      <input
        type="file"
        //@ts-expect-error
        directory=""
        webkitdirectory=""
        onChange={onChangeBtn}
        className="hidden"
      />
    </label>
  );
}

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { sortArrayByDirName } from "../lib/utils";

interface PlusBtnProps {
  folders: FileList[];
  setFolders: Dispatch<SetStateAction<FileList[]>>;
}

export default function PlusBtn({ setFolders, folders }: PlusBtnProps) {
  const onChangeBtn = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        setFolders(sortArrayByDirName([...folders, e.target.files]));
      }
    }
  };
  return (
    <label className="mt-6 flex justify-center flex-col items-center cursor-pointer bg-sky-400 rounded py-3 px-20 hover:bg-sky-600 transition">
      <span className="text-white text-xl font-semibold">파일 추가하기</span>
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

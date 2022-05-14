import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PlusBtnProps {
  folders: FileList[];
  setFolders: Dispatch<SetStateAction<FileList[]>>;
}

export default function PlusBtn({ setFolders, folders }: PlusBtnProps) {
  const onChangeBtn = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        setFolders([...folders, e.target.files]);
      }
    }
  };

  return (
    <input
      type="file"
      //@ts-expect-error
      directory=""
      webkitdirectory=""
      onChange={onChangeBtn}
    />
  );
}

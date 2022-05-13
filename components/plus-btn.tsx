import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PlusBtnProps {
  setFolder: Dispatch<SetStateAction<File[]>>;
}

export default function PlusBtn({ setFolder }: PlusBtnProps) {
  const onChangeBtn = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFolder(Array.from(e.target.files));
    }
  };

  return (
    <input
      type="file"
      //@ts-expect-error
      directory=""
      webkitdirectory=""
      onChange={onChangeBtn}
      multiple
    />
  );
}

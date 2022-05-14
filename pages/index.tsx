import type { NextPage } from "next";
import { useState } from "react";
import { Folder } from "../components/folder";
import PlusBtn from "../components/plus-btn";
import { saveZip } from "../lib/save-zip";
import { DndBox } from "../components/dnd";

const Home: NextPage = () => {
  const [folders, setFolders] = useState<FileList[]>([]);
  const clickBtn = () => {
    saveZip(folders);
  };
  return (
    <>
      <DndBox folders={folders} setFolders={setFolders}>
        <PlusBtn setFolders={setFolders} folders={folders} />
        {folders.map((folder, index) => {
          return <Folder key={index} folder={folder} />;
        })}
      </DndBox>
      <button onClick={clickBtn}>저장</button>
    </>
  );
};

export default Home;

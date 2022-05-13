import type { NextPage } from "next";
import { useState } from "react";
import { Folder } from "../components/folder";
import PlusBtn from "../components/plus-btn";

const Home: NextPage = () => {
  const [folders, setFolders] = useState<FileList[]>([]);
  console.log(folders);
  return (
    <div>
      <PlusBtn setFolders={setFolders} folders={folders} />
      {folders.map((folder, index) => {
        return <Folder key={index} folder={folder} />;
      })}
    </div>
  );
};

export default Home;

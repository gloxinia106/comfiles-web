import type { NextPage } from "next";
import { useState } from "react";
import PlusBtn from "../components/plus-btn";

const Home: NextPage = () => {
  const [folder, setFolder] = useState<File[]>([]);
  console.log(folder);
  return (
    <div>
      <PlusBtn setFolder={setFolder} />
    </div>
  );
};

export default Home;

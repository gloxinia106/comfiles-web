import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Folder } from "../components/folder";
import PlusBtn from "../components/plus-btn";
import { saveZip } from "../lib/save-zip";
import { DndBox } from "../components/dnd";
import { combineFile } from "../lib/combine-file";
import Head from "next/head";

const Home: NextPage = () => {
  const [folders, setFolders] = useState<FileList[]>([]);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState<string>("newFolder");
  const clickBtn = async () => {
    setLoading(true);
    const folder = combineFile(folders);
    saveZip(folder, setLoading, setPercent, folderName);
  };
  const onChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  return (
    <>
      <Head>
        <title>폴더 합치기</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 w-screen h-screen">
        <div className="flex justify-center flex-col items-center">
          <div className="mt-14 flex justify-center flex-col items-center ">
            <h1 className="font-bold text-4xl">폴더 합치기</h1>
            <span className="mt-3 text-lg">
              폴더 안에 있는 파일들을 하나로 합치세요
            </span>
            <PlusBtn setFolders={setFolders} folders={folders} />
            <label className="mt-5" htmlFor="folder-name">
              폴더 이름
            </label>
            <input
              id="folder-name"
              className="bg-white px-2 py-1 w-full focus:outline-none border-2 rounded"
              defaultValue={folderName}
              onChange={onChangeFolderName}
            />
          </div>
          <DndBox setFolders={setFolders}>
            {folders.map((folder, index) => {
              return (
                <Folder
                  key={index}
                  folderIndex={index}
                  folder={folder}
                  folders={folders}
                  setFolders={setFolders}
                />
              );
            })}
          </DndBox>
          {loading ? (
            <div
              className={
                "mt-10 bg-sky-400 rounded py-3 px-20 text-white font-semibold text-xl hover:bg-sky-600 transition"
              }
            >
              {`${percent}%`}
            </div>
          ) : (
            <button
              className={
                "mt-10 bg-sky-400 rounded py-3 px-20 text-white font-semibold text-xl hover:bg-sky-600 transition"
              }
              onClick={clickBtn}
            >
              저장
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

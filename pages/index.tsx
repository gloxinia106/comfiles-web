import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import Folder from "../components/folder";
import PlusBtn from "../components/plus-btn";
import { saveZip } from "../lib/save-zip";
import { DndBox } from "../components/dnd";
import { combineFile } from "../lib/combine-file";
import { FolderObj } from "../types/interface";

const Home: NextPage = () => {
  const [folders, setFolders] = useState<FolderObj[]>([]);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState<string>("newFolder");
  const { t } = useTranslation("common");

  const clickBtn = async () => {
    setLoading(true);
    const folder = combineFile(folders);
    saveZip(folder, setLoading, setPercent, folderName);
  };
  const onChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    setFolders((oldFolders) => {
      if (!destination) return oldFolders;
      const newFolders = [...oldFolders];
      const slicedFolder = newFolders[source.index];
      newFolders.splice(source.index, 1);
      newFolders.splice(destination.index, 0, slicedFolder);
      return newFolders;
    });
  };
  return (
    <>
      <Head>
        <title>{t("head-title")}</title>
        <meta name="description" content={t("head-description")} />
        <meta
          name="google-site-verification"
          content="rc3UMPHLSf5ifn3slyl_A4o3kj9y2oquWTr6Yoa4cTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 w-screen h-screen">
        <div className="flex justify-center flex-col items-center">
          <div className="mt-14 flex justify-center flex-col items-center ">
            <h1 className="font-bold text-4xl">{t("title")}</h1>
            <span className="mt-3 text-lg">{t("description")}</span>
            <PlusBtn
              setFolders={setFolders}
              folders={folders}
              setFolderName={setFolderName}
            />
            <label className="mt-5" htmlFor="folder-name">
              {t("folder-name")}
            </label>
            <input
              id="folder-name"
              className="bg-white px-2 py-1 w-full focus:outline-none border-2 rounded"
              defaultValue={folderName}
              onChange={onChangeFolderName}
            />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <DndBox setFolders={setFolders} setFolderName={setFolderName}>
              {folders.map((folder, index) => {
                return (
                  <Folder
                    key={folder.id}
                    folderIndex={index}
                    folder={folder}
                    folders={folders}
                    setFolders={setFolders}
                    setFolderName={setFolderName}
                  />
                );
              })}
            </DndBox>
          </DragDropContext>
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
              {t("save")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: any }) => {
  resetServerContext();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

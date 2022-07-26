import { GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import fileDownload from 'js-file-download';

import { IFile } from "../../../libs/types";
import RenderFile from "@components/RenderFile";

const index: NextPage<{ file:IFile }> = ({ file: { format, name, sizeInBytes, id } }) => {
  const handleDownload = async () => {
    const { data } = await axios.get(`api/files/${id}/download`,
      {
        responseType: "blob"
      }
    );
    fileDownload(data, name);
  }

  return <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-lg w-96">
    {
      !id
        ? <span>File not found!</span>
        : <>
          <img src="/images/file-download.png" alt="" className="w-16 h-16"/>
          <h1 className="text-xl">File is ready to be downloaded.</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
        <button className="button" onClick={handleDownload}>Download</button>
        </>
    }
  </div>
};

export default index;

export async function getServerSideProps(context:GetServerSidePropsContext) {
  console.log(context.query)
  const { id } = context.query;
  console.log(id)
  let file;
  console.log("id="+id)
  console.log()
  try {
    const { data }  = await axios.get(`${process.env.API_BASE_ENDPOINT}/api/files/${id}`)
    file = data;
    console.log(data)
  } catch (e) {
    console.log(e?.response?.data);
    file = {}
  }
  console.log(file)

  return {
    props: {
      file
    }
  }
}

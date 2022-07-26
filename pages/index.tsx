import DropZone from "@components/DropZone";
import { useState } from "react";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import DownloadPageLink from "@components/DownloadFile";
import EmailForm from "@components/EmailForm";

export default function Home() {
  const [ file, setFile ] = useState(null);
  const [ id, setId ] = useState(null);
  const [ downloadPageLink, setDownloadPageLink ] = useState(null);
  const [ uploadState, setUploadState ] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

  const handleUpload = async () => {
    if(uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multiple/form-data"
        }
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (e) {
      console.log(e.response.data);
      setUploadState("Upload Failed");
    }
  }

  const resetComponents = () => {
    setFile(null);
    setDownloadPageLink(null);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">Share your file!</h1>
      <div className="w-96 flex flex-col items-center justify-center bg-gray-800 shadow-xl rounded-xl">
        {!downloadPageLink && <DropZone setFile={setFile} />}
        {/* Render File */}
        {
          file && (
            <RenderFile file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }} />
          )
        }
        {/* Upload Button */}
        {!downloadPageLink && file && (
          <button
            className="button"
            onClick={handleUpload}
          >
            {uploadState}
          </button>
        )}

        {
          downloadPageLink && (
            <div className="p-2 text-center">
              <DownloadPageLink downloadPageLink={downloadPageLink} />
              <button
                className="button"
                onClick={resetComponents}
              >
                Upload New File
              </button>

              <EmailForm id={id}/>

            </div>
          )
        }
      </div>
    </div>
  );
}

import { useDropzone } from "react-dropzone";
import { useCallback, FunctionComponent, Dispatch } from "react";

const DropZone:FunctionComponent<{setFile:Dispatch<any>}> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    accept: {
      'image/*': ['.jpeg, .png'],
      'audio/mpeg': ['.mpeg'],
    }
  });

// TODO: Adding on click open
  return (
    <div className="p-4 w-full">
      <div
        {...getRootProps()}
        className="w-full h-80 rounded-md cursor-pointer focus:outline-none"
      >
        <input {...getInputProps()} />
        <div className={`flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl h-full space-y-3
          ${isDragReject === true && " border-red-500 "} 
          ${isDragAccept === true && "border-green-500"}`
        }
        >
          <img src="/images/folder.png" alt="none" className="h-16 w-16"/>
          {isDragReject ? (
            <p>Only supports images and png</p>
          ): (
            <div>
              <p>Drag & Drop Files Here</p>
              <p className="mt-2 text-base text-gray-300">Only jpeg, png and mp3 are allowed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DropZone;

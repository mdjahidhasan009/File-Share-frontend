import {FunctionComponent} from "react";
import {IFile} from "../libs/types";
import {sizeInMB} from "../libs/sizeInMb";

const RenderFile:FunctionComponent<{
  file: IFile
}>= ({ file: {format, sizeInBytes, name} }) => {
  return(
    <div className="flex items-center w-full p-4 my-2">
      <img src={`/images/${format}.png`} alt="" className="w-14 h-14" />
      <span className="mx-2">{name}</span>
      <span className="ml-auto">{sizeInMB(sizeInBytes)}</span>
    </div>
  )
}

export default RenderFile;

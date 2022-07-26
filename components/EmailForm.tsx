import {FunctionComponent, useState} from 'react';
import axios from "axios";

const EmailForm:FunctionComponent<{
  id: string
}> = ({ id }) => {
  const [ emailFrom, setEmailFrom ] = useState("");
  const [ emailTo, setEmailTo ] = useState("");
  const [ message, setMessage ] = useState(null);

  const handleEmail = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: {
          id,
          emailFrom,
          emailTo
        }
      });
      setMessage(data.message);
    } catch (e) {
      console.log(e);
      setMessage(e.data.response.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3">
     <h3>Send file link throw email</h3>
      <form className="flex flex-col items-center justify-center w-full p-2 space-y-3" action="" onSubmit={handleEmail}>
        <input className="p-1 text-white bg-gray-800 border-2 focus:outline-none" type="email" placeholder="Email From" required
          onChange={(e) => setEmailFrom(e.target.value)} value={emailFrom}/>
        <input className="p-1 text-white bg-gray-800 border-2 focus:outline-none" required type="email" placeholder="Email To"
               onChange={(e) => setEmailTo(e.target.value)} value={emailTo}/>
        <button className="button" type="submit">Email</button>
      </form>
      {
        message && <p className="font-medium text-red-500">{message}</p>
      }
    </div>
  )
}

export default EmailForm;

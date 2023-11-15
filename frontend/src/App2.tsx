import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from "react";



const GET_USERS = gql`
  query User {
    user(where: {email: "user@company.com" } ) {
      id
      email
    }
  }
`;

const UPLOAD_FILE_MUTATION = gql`
  mutation CreateAttachment($name: String!, $description: String, $file: Upload!) {
    createAttachment(data: { name: $name, description: $description, file: { upload: $file } }) {
      id
      name
      description
      file {
        filename
        url
      }
    }
  }
`;

function DisplayUser() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const {id, email} = data?.user

  return (
    <div key={id}>
      <p>{id}</p>
      <p>{email}</p>
    </div>
  );
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [uploadFile, { data, loading, error }] = useMutation(UPLOAD_FILE_MUTATION);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file)
    uploadFile({ variables: { file, name, description } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={!file || loading}>Upload File</button>
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>File uploaded: {data.createAttachment.file.filename}</p>}
    </form>
  );
}

export default function App() {
  return (
    <div className="App">
      <DisplayUser />
      <FileUpload />
    </div>
  )  
}
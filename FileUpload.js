import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [message, setMessage] = useState('');
  const [uploadedFileLinks, setUploadedFileLinks] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setProgress({});
    setMessage('');
    setUploadedFileLinks([]);
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      setMessage('Please select a file to upload.');
      return;
    }

    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return fetch('YOUR_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: percent,
          }));
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUploadedFileLinks((prevLinks) => [
            ...prevLinks,
            { name: file.name, url: data.fileUrl },
          ]);
        })
        .catch((error) => {
          console.error('Upload failed', error);
          setMessage((prev) => `${prev} ${file.name} upload failed.`);
        });
    });

    try {
      await Promise.all(uploadPromises);
      setMessage('All files uploaded successfully!');
    } catch {
      setMessage('Some files failed to upload.');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles}>Upload</button>

      {Object.keys(progress).length > 0 && (
        <div>
          {Array.from(files).map((file) => (
            <div key={file.name}>
              <span>{file.name}: </span>
              <progress value={progress[file.name] || 0} max="100" />
              <span>{progress[file.name] || 0}%</span>
            </div>
          ))}
        </div>
      )}

      {uploadedFileLinks.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFileLinks.map((fileLink) => (
              <li key={fileLink.name}>
                <a href={fileLink.url} target="_blank" rel="noopener noreferrer">
                  {fileLink.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <div>{message}</div>}
    </div>
  );
};

export default FileUpload;

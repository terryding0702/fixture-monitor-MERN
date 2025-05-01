'use client';

import Spinner from '@/app/components/Spinner';
import { Status } from '@/app/types/fixtureType';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function UploadPage() {
  const router = useRouter();

  const controllerRef = useRef<AbortController | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setMessage('');
    setStatus(Status.Idle);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please Select A CSV File First');
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus(Status.Uploading);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (res.ok) {
        setStatus(Status.Success);
        setMessage('Upload Successfully');
        setTimeout(() => {
          router.push('/fixtures');
        }, 500);
      } else {
        setStatus(Status.Error);
        setMessage('Upload Failed, Please retry!');
      }
    } catch (err) {
      console.error(err);
      setStatus(Status.Error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      {status === Status.Uploading && <Spinner />}
      <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6'>
        <h1 className='text-2xl font-semibold text-center text-gray-800'>
          Upload Your Fixtures CSV
        </h1>

        <input
          type='file'
          accept='.csv'
          onChange={handleFileChange}
          className='w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />

        <button
          onClick={handleUpload}
          className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                     hover:bg-blue-700 transition '
          disabled={status === Status.Uploading}
        >
          {status === Status.Uploading ? 'Uploading..' : 'Upload'}
        </button>

        {message && (
          <p
            className={`text-center text-sm ${
              status === Status.Success ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

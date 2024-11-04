import React from 'react';
import { Upload, File, X } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { FILE_UPLOAD } from '../../utils/constants';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string[];
  maxSize?: number;
}

export default function FileUpload({
  onFilesChange,
  maxFiles,
  accept = FILE_UPLOAD.ACCEPTED_TYPES,
  maxSize = FILE_UPLOAD.MAX_SIZE,
}: FileUploadProps) {
  const { files, errors, handleFiles, removeFile } = useFileUpload({
    maxFiles,
    acceptedTypes: accept,
    maxSize,
  });

  React.useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  return (
    <div>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
              <span>Upload files</span>
              <input
                type="file"
                className="sr-only"
                multiple
                accept={accept.join(',')}
                onChange={(e) => handleFiles(e.target.files || [])}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {accept.join(', ')} up to {maxSize / 1024 / 1024}MB
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center">
                <File className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
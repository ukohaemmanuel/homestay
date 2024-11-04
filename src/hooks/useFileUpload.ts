import { useState } from 'react';
import { FILE_UPLOAD } from '../utils/constants';

interface UseFileUploadOptions {
  maxSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const maxSize = options.maxSize || FILE_UPLOAD.MAX_SIZE;
  const acceptedTypes = options.acceptedTypes || FILE_UPLOAD.ACCEPTED_TYPES;
  const maxFiles = options.maxFiles || Infinity;

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`;
    }

    if (!acceptedTypes.includes(file.type)) {
      return `File ${file.name} has an invalid type. Accepted types are: ${acceptedTypes.join(
        ', '
      )}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const newErrors: string[] = [];

    if (files.length + fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    const validFiles = fileArray.filter((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
        return false;
      }
      return true;
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setErrors(newErrors);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setErrors([]);
  };

  const clearFiles = () => {
    setFiles([]);
    setErrors([]);
  };

  return {
    files,
    errors,
    handleFiles,
    removeFile,
    clearFiles,
  };
}
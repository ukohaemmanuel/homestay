import React from 'react';
import { X, Upload, File, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskStatus, TaskPriority, CreateTaskInput } from '../../types';
import { useTeamMembers } from '../../lib/queries/team';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  assigneeId: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTaskInput>();
  const { data: teamMembers } = useTeamMembers();
  const [documents, setDocuments] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      reset();
      setDocuments([]);
    }
  }, [isOpen, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) =>
        file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
    );
    setDocuments((prev) => [...prev, ...validFiles]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: CreateTaskInput) => {
    await onSubmit({ ...data, documents });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="label">Title</label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className="input"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="label">Description</label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className="input"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="label">Status</label>
                <select
                  id="status"
                  {...register('status')}
                  className="input"
                >
                  {Object.values(TaskStatus).map((status) => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="label">Priority</label>
                <select
                  id="priority"
                  {...register('priority')}
                  className="input"
                >
                  {Object.values(TaskPriority).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="assigneeId" className="label">Assignee</label>
              <select
                id="assigneeId"
                {...register('assigneeId')}
                className="input"
              >
                <option value="">Select assignee</option>
                {teamMembers?.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.assigneeId && (
                <p className="mt-1 text-sm text-red-600">{errors.assigneeId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dueDate" className="label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                {...register('dueDate')}
                className="input"
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
              )}
            </div>

            <div>
              <label className="label">Documents</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="documents"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="documents"
                        type="file"
                        className="sr-only"
                        multiple
                        accept={ACCEPTED_FILE_TYPES.join(',')}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, Word, PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {documents.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {documents.map((file, index) => (
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
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
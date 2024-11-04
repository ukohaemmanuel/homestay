import React from 'react';
import { Upload, Search, Filter, FileText, Download, Trash2 } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Equipment Manual - CNC Machine.pdf',
    type: 'Manual',
    size: '2.5 MB',
    uploadedBy: 'John Doe',
    uploadedAt: '2024-03-15',
  },
  {
    id: 2,
    name: 'Safety Guidelines 2024.docx',
    type: 'Guidelines',
    size: '1.2 MB',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-03-14',
  },
  {
    id: 3,
    name: 'Maintenance Checklist.xlsx',
    type: 'Checklist',
    size: '856 KB',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2024-03-13',
  },
];

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize workshop documentation
          </p>
        </div>
        <button className="btn">
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="pl-10 input"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select className="input !py-1.5">
            <option value="all">All Types</option>
            <option value="manual">Manuals</option>
            <option value="guidelines">Guidelines</option>
            <option value="checklist">Checklists</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.uploadedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.uploadedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-brand-600 hover:text-brand-900 mr-3">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
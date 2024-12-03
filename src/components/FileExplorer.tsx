import React from 'react';
import { FileSystemItem } from '../types/type';

interface FileExplorerProps {
  filesystem: FileSystemItem[];
  onSelect?: (item: FileSystemItem) => void;
  selectedParent?: FileSystemItem | null;
  parentId?: number | null; // Track parentId for proper nesting
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  filesystem,
  onSelect,
  selectedParent,
  parentId = null,
}) => {
  // Filter items by their parentId to render only direct children
  const filteredItems = filesystem.filter((item) => item.parentId === parentId);

  return (
    <div className="pl-4">
      {filteredItems.map((item) => (
        <div key={item.id} className="mb-2">
          <div
            className={`flex items-center cursor-pointer ${selectedParent?.id === item.id ? 'bg-gray-200' : ''
              }`}
            onClick={() => onSelect?.(item)}
          >
            <span className="text-lg">{item.type === 'folder' ? '📂' : '📄'}</span>
            <span className="ml-2 font-medium">{item.name}</span>
          </div>
          {/* Recursively render children */}
          {item.type === 'folder' && (
            <FileExplorer
              filesystem={filesystem}
              onSelect={onSelect}
              selectedParent={selectedParent}
              parentId={item.id} // Pass current item ID as the parentId for children
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;

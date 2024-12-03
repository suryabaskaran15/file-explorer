import React, { useState } from 'react';
import './App.css';
import FileExplorer from './components/FileExplorer';
import { FileSystemItem, FileType } from './types/type';
import Modal from './components/modal';


function App() {
  const initialFilesystem: FileSystemItem[] = [
    {
      id: 1,
      type: 'folder',
      name: 'Document',
      parentId:null
    },
    {
      id: 2,
      type: 'folder',
      name: 'new',
      parentId: 1
    },
    {
      id: 5872,
      type: 'folder',
      name: 'INNN',
      parentId: 2
    },
    {
      id: 3,
      type: 'file',
      name: 'newwww',
      parentId: 2
    },
    {
      id: 15,
      type: 'folder',
      name: 'DOV',
      parentId: null
    },
    {
      id: 145,
      type: 'folder',
      name: 'DOC!!',
      parentId: 15
    },
  ];

  const [fs, setFS] = useState<FileSystemItem[]>(initialFilesystem);
  const [name, setName] = useState<string>('');
  const [selectedParent, setSelectedParent] = useState<FileSystemItem | null>(initialFilesystem[0]);
  const [isModal, setIsModal] = useState<{open:boolean , text:string}>({open:false , text:""});
  
  const isNameExists = (filesystem: FileSystemItem[], name: string , type: FileType): boolean => {
    return filesystem.some((item) => {
      if (item.name === name && item.type === type) return true;
      if (item.children) return isNameExists(item.children, name, type);
      return false;
    });
  };

  const updateFilesystem = (filesystem: FileSystemItem[], type: FileType , isDelete:boolean = false ): any  =>
    filesystem.map((item) => {
      if(item.id === selectedParent?.id && isDelete){
        return {};
      }
      if (item.id === selectedParent?.id && selectedParent.type === FileType.FOLDER && !isDelete) {
        if (isNameExists(item?.children ?? [], name, type)) {
          throw new Error('Duplicate name');
        }

        const newItem: FileSystemItem = {
          id: Math.random(),
          name,
          type,
          children: type === FileType.FOLDER ? [] : undefined,
        };

        return {
          ...item,
          children: [...(item.children ?? []), newItem],
        };
      }

      return item.children
        ? { ...item, children: updateFilesystem(item.children , type , isDelete) }
        : item;
    });

  const addFileOrFolder = (type: FileType , isDelete:boolean = false) => {
    if (!name.trim() && !isDelete) {
      setIsModal({ open: true, text: "Name cannot be empty!" });
      return;
    }

    try {
      const newFs = updateFilesystem(fs, type , isDelete)
      setFS(newFs);
      setName('');
    } catch {
      setIsModal({ open: true, text: `${type} name already exsists!` });
    }
  };

  return (
    <div className="p-4">
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="border border-black rounded-md px-3 py-2 mr-3 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => addFileOrFolder(FileType.FILE)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
      >
        Add File
      </button>
      <button
        onClick={() => addFileOrFolder(FileType.FOLDER)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Folder
      </button>
        <button
          onClick={() => addFileOrFolder(FileType.FOLDER , true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Delete
        </button>

    </div>
      <FileExplorer
        filesystem={fs}
        onSelect={(item) => setSelectedParent(item)}
        selectedParent={selectedParent}
      />
      <Modal
        isOpen={isModal.open}
        message={isModal.text}
        onClose={() => setIsModal({open:false,text:''})}
      />
  </div>
  );
}

export default App;

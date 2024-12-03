export enum FileType{
    FILE = "file",
    FOLDER="folder"
}

export interface FileSystemItem {
    id: number;
    type: 'file' | 'folder';
    name: string;
    children?: FileSystemItem[];
    parentId?: number | null;
  }
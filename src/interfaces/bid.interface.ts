import { UploadUserFile } from 'element-plus'

export type AnimalType = 'Собака' | 'Кот'

export enum BidStatus {
  Free,
  InProgress,
  Completed,
  Cancelled
}

export interface IBid {
  _id?:string;
  image?: string;
  title: string;
  animalType: AnimalType;
  description: string;
  award: number;
  address: string;
  author?: string;
  status?: BidStatus;
  helper?: string;
  contributors?: string[];
  files?: UploadUserFile[];
  createdAt?: string;
  updatedAt?: string;
}

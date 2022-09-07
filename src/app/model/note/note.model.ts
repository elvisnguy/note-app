import { BackgroundColorModel } from './background-color.model';
import { BackgroundImageModel } from './background-image.model';

export interface NoteModel {
  backgroundColor: BackgroundColorModel;
  backgroundImage: BackgroundImageModel;
  labels: Array<string>;
  title: string;
  body: string;
  id: number;
  order: number;
  isNew: boolean;
}

import { BackgroundColorModel } from './background-color.model';

export interface NoteModel {
  backgroundColor: BackgroundColorModel;
  backgroundImage: any;
  labels: Array<string>;
  title: string;
  body: string;
  id: number;
}

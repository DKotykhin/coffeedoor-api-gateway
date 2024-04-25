import { LanguageCode } from './enums';
import { MenuItem } from './menu-item';

export class MenuCategory {
  id: string;
  language: LanguageCode;
  title: string;
  description: string;
  image: string;
  hidden: boolean;
  position: number;
  menuItems: MenuItem[];
}

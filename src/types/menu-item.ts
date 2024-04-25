import { LanguageCode } from './enums';
import { MenuCategory } from './menu-category';

export class MenuItem {
  id: string;
  language: LanguageCode;
  title: string;
  description: string;
  price: number;
  hidden: boolean;
  position: number;
  category: MenuCategory;
}

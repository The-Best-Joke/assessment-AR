import { Logo } from './logo'

export interface Challenge {
  id: number;
  title: string;
  teaser: string;
  logo: Logo;
  favorite: boolean;
}

// Images
import ClashImage from '../../assets/images/Library/clash.jpg';
import FarmImage from '../../assets/images/Library/farm.jpg';
import PokemonImage from '../../assets/images/Library/pokemon.jpg';
import FruitImage from '../../assets/images/Library/fruit.jpg';

let libId = 0;

export const tempLibraryItems = [
  {
    id: libId++,
    name: 'clash-of-clans',
    label: 'Clash of Clans',
    imageUrl: ClashImage,
    description:
      'A clash of clans simple gold coin collection routine for the arduplot, works best on a tablet. Can also be used to purchase units when your ranks are empty.',
    author: 'Dave Collins',
    userId: 'string',
    rating: 4,
  },
  {
    id: libId++,
    name: 'auto-farm-sim',
    label: 'Auto Farm Simulator',
    imageUrl: FarmImage,
    description:
      'Automated routine for farming resources in popular simulation games. Designed for maximum efficiency with minimal user intervention, perfect for overnight farming.',
    author: 'Sarah Lee',
    userId: 'string',
    rating: 4,
  },
  {
    id: libId++,
    name: 'pokemon-go-catcher',
    label: 'Pokemon Go Auto Catcher',
    imageUrl: PokemonImage,
    description:
      'A bot routine to auto-catch Pokemon in Pokemon Go. Includes options for berry usage and auto-spinning Pokestops to keep your inventory stocked.',
    author: 'Jake Turner',
    userId: 'string',
    rating: 4,
  },
  {
    id: libId++,
    name: 'fruit-slicer-master',
    label: 'Fruit Slicer Master',
    imageUrl: FruitImage,
    description:
      'Automated slice sequences for classic fruit-slicing games. Perfectly timed swipes ensure high scores without missing any fruit, ideal for touchscreens.',
    author: 'Lisa Wong',
    userId: 'string',
    rating: 4,
  },
];

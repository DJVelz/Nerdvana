import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import cart_icon from "./cart_icon.svg";
import add_icon from "./add_icon.svg";
import order_icon from "./order_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import box_icon from "./box_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import menu_icon from "./menu_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import my_location_image from "./my_location_image.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import heart_icon from "./heart_icon.svg";
import star_icon from "./star_icon.svg";
import redirect_icon from "./redirect_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import upload_area from "./upload_area.png";
import checkmark from "./checkmark.png";
import anakin_funko from "./anakin_funko.png";
import batman_costume from "./batman_costume.png";
import cloak from "./cloak.png";
import disney_villainous from "./disney_villainous.png";
import fake_sting_sword from "./fake_sting_sword.png";
import ff_epic_collection from "./ff_epic_collection.png";
import glow_dice from "./glow_dice.png";
import potion_bottles from "./potion_bottles.png";
import tauriel_maxi_overdress from "./tauriel_maxi_overdress.png";
import tricorner_hat from "./tricorner_hat.png";
import chevron_left from "./chevron_left.svg";
import chevron_right from "./chevron_right.svg";

export const assets = {
  search_icon,
  user_icon,
  cart_icon,
  add_icon,
  order_icon,
  instagram_icon,
  facebook_icon,
  twitter_icon,
  box_icon,
  product_list_icon,
  menu_icon,
  arrow_icon,
  increase_arrow,
  decrease_arrow,
  arrow_right_icon_colored,
  my_location_image,
  arrow_icon_white,
  heart_icon,
  star_icon,
  redirect_icon,
  star_dull_icon,
  upload_area,
  checkmark,
  anakin_funko,
  batman_costume,
  cloak,
  disney_villainous,
  fake_sting_sword,
  ff_epic_collection,
  glow_dice,
  potion_bottles,
  tauriel_maxi_overdress,
  tricorner_hat,
  chevron_left,
  chevron_right
};

export const BagIcon = () => {
  return (
    <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
    </svg>
  )
}

export const CartIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 0.75H3.75L5.76 10.7925C5.82858 11.1378 6.01643 11.448 6.29066 11.6687C6.56489 11.8895 6.90802 12.0067 7.26 12H14.55C14.902 12.0067 15.2451 11.8895 15.5193 11.6687C15.7936 11.448 15.9814 11.1378 16.05 10.7925L17.25 4.5H4.5M7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM15.75 15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <rect width="18" height="18" fill="white" />
      </defs>
    </svg>

  )
}

export const BoxIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
  </svg>
);

export const HomeIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
  </svg>
);

export const productsDummyData = [
  {
    "_id": "67a1f4e43f34a77b6dde9144",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Anakin Skywalker Funko!",
    "description": "The Dark Side never looked as good or ominous as it does in this exclusive Pop! Dark Side Anakin. His intense stare and brandished lightsaber will intimidate even the toughest of collectors.",
    "price": 14.99,
    "offerPrice": 12.99,
    "image": [
      anakin_funko
    ],
    "category": "Collectible",
    "date": 1738667236865,
    "__v": 0
  },
  {
    "_id": "67a1f52e3f34a77b6dde914a",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Adult Batman Costume",
    "description": "Become the dark knight for Halloween with this costume!",
    "price": 44.99,
    "offerPrice": 33.99,
    "image": [
      batman_costume
    ],
    "category": ["Apparel"],
    "date": 1738667310300,
    "__v": 0
  },
  {
    "_id": "67a1f5663f34a77b6dde914c",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Black Hooded Cloak",
    "description": "Perfect for role playing as your favorite characters, this cloak will add the perfect touch to any costume.",
    "price": 14.99,
    "offerPrice": 10.99,
    "image": [
      cloak
    ],
    "category": ["Apparel", "Medieval"],
    "date": 1738667366224,
    "__v": 0
  },
  {
    "_id": "67a1f5993f34a77b6dde914e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Disney Villainous",
    "description": "Disney Villainous, winner of the 2019 TOTY “Game of the Year” award, invites players to step into the shoes of their favorite Disney villains in a strategic battle for dominance. Each villain has a unique objective and special abilities, creating a dynamic gameplay experience where players must outwit opponents while navigating unexpected twists of fate. Designed for families with kids ages 10 and up, as well as avid board gamers, Disney Villainous offers a rich, immersive experience that makes it a standout gift for Disney fans and a must-have for game night.",
    "price": 44.99,
    "offerPrice": 40.99,
    "image": [
      disney_villainous
    ],
    "category": "Board Game",
    "date": 1738667417511,
    "__v": 0
  },
  {
    "_id": "67a1f5ef3f34a77b6dde9150",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Fake Sting Sword",
    "description": "Don Bilbo Baggins' iconic sword with this one to one foam replica.",
    "price": 59.99,
    "offerPrice": 55.99,
    "image": [
      fake_sting_sword
    ],
    "category": ["Accessories", "Medieval"],
    "date": 1738667503075,
    "__v": 0
  },
  {
    "_id": "67a1f70c3f34a77b6dde9156",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Fantastic Four Epic Collection",
    "description": "In 1961, Stan Lee and Jack Kirby lit the fuse of the greatest revolution in comic book history - the Marvel Age of Comics - and it started right here, in the pages of the Fantastic Four! With the space race on, Reed Richards, Ben Grimm, Sue Storm and Johnny Storm shoot for the stars...but after their craft is bombarded by cosmic rays, they return to Earth with the startling powers of the Fantastic Four! These weren't just any super heroes, though - the Fantastic Four were a realistic, relatable, bickering and loveable family that couldn't pay their rent and didn't always love their superpowers.",
    "price": 49.99,
    "offerPrice": 40.99,
    "image": [
      ff_epic_collection
    ],
    "category": "Graphic novel",
    "date": 1738667788883,
    "__v": 0
  },
  {
    "_id": "67a1f7c93f34a77b6dde915a",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Glow-in-the-dark polyhedral dice set",
    "description": "Don't let the dark stop you from playing your favorite RPGs or card games. No matter how dark it is you'll always be able to spot that natural 20 you just rolled.",
    "price": 19.99,
    "offerPrice": 10.99,
    "image": [
      glow_dice
    ],
    "category": "Collectible",
    "date": 1738667977644,
    "__v": 0
  },
  {
    "_id": "67a1f8363f34a77b6dde915c",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "2 Potion Bottles",
    "description": "Time to heal up! These plastic potion bottles will elevate your medieval costume.",
    "price": 29.99,
    "offerPrice": 25.99,
    "image": [
      potion_bottles
    ],
    "category": ["Collectibles", "Medieval"],
    "date": 1738668086331,
    "__v": 0
  },
  {
    "_id": "67a1f85e3f34a77b6dde915e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Tauriel Maxi Overdress",
    "description": "Named for the free-spirited elven warrior from The Hobbit, our Tauriel Overdress truly is a magical piece. There’s something really fantastic and awe-inspiring about this hooded overdress, from the falling vines of leaves to her mysterious oversized hood.",
    "price": 104.99,
    "offerPrice": 94.99,
    "image": [
      tauriel_maxi_overdress
    ],
    "category": ["Apparel", "Medieval"],
    "date": 1738668126660,
    "__v": 0
  },
  {
    "_id": "67a1fa4b3f34a77b6dde9166",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Tricorner Hat",
    "description": "Aye matey! This tricorner hat is essential for any swashbuckler worth their salt!!!.",
    "price": 29.99,
    "offerPrice": 27.99,
    "image": [
      tricorner_hat
    ],
    "category": ["Apparel", "Medieval"],
    "date": 1738668619198,
    "__v": 0
  }
]

export const userDummyData = {
  "_id": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
  "name": "GreatStack",
  "email": "admin@example.com",
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycnlnUnFiUDBYT2dEZ2h1ZmRXcGlpdWV5OXoiLCJyaWQiOiJ1c2VyXzJzWkZIUzFVSUl5c0p5RFZ6Q3BRaFVoVElodyJ9",
  "cartItems": {
    // "67a1f4e43f34a77b6dde9144": 3
  },
  "__v": 0
}

export const addressDummyData = [
  {
    "_id": "67a1e4233f34a77b6dde9055",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "fullName": "GreatStack",
    "phoneNumber": "0123456789",
    "pincode": 654321,
    "area": "Main Road , 123 Street, G Block",
    "city": "City",
    "state": "State",
    "__v": 0
  }
]
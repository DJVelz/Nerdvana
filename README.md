# Nerdvana 

Visit https://nerdvana-eight.vercel.app

Nerdvana is a full-stack open-source web application designed to serve as a community-driven platform for discovering, discussing, and saving nerdy and pop-culture products. The project combines e-commerce style features with social functionality, allowing users to browse products, manage wishlists, interact through forums, and maintain personalized accounts.

This project was developed as a final course project with a focus on modern web development practices, authentication, database security, and real-world application design.

---

## Features

### User Authentication
- Secure user registration and login using **Supabase Auth**
- Session persistence and protected routes
- User-specific data isolation through Row Level Security (RLS)

### Product Browsing
- Browse a catalog of nerdy and pop-culture products
- Product data fetched dynamically from the database
- Clean and responsive UI built with modern React patterns

### Wishlist System
- Users can add or remove products from their wishlist
- Wishlists are unique per user (multi-user safe)
- Real-time UI updates when modifying wishlist items

### Shopping Cart
- Add products to a local cart
- Update quantities or remove items
- Automatic price calculations
- Toast notifications for cart interactions

### Community Forum & Comments
- Users can create posts and comments
- Display usernames instead of raw user IDs
- Clean separation of forum and product-related discussions

### UI Enhancements
- Toast notifications for key actions (login, logout, cart updates)
- Properly structured register and login pages
- Responsive navigation bar shared across pages

---

## Tech Stack

### Front-End
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **React Hot Toast**

### Back-End
- **Supabase**
  - Authentication
  - PostgreSQL database
  - Row Level Security (RLS)

### Database
- PostgreSQL (managed via Supabase)
- Secure policies ensuring users can only access their own data
- Relational tables for users, products, wishlists, posts, and comments

---

## Project Structure (High-Level)

/app
/components
/context
/wishlist
/forum
/lib
supabaseClient.js


- **AppContext** manages global state (auth, products, wishlist, cart)
- Pages are structured using the Next.js App Router
- Supabase client is centralized for consistency

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Supabase account

### Installation Steps

1. Clone the repository:
git clone https://github.com/your-username/nerdvana.git
cd nerdvana


2. Install dependencies:

npm install

3. Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CURRENCY=$

4. Run the development server:

npm run dev

5. Open your browser at:

http://localhost:3000

### License

This project is open-source and intended for educational and portfolio purposes.

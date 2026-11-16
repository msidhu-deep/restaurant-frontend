# Smart Restaurant Management System (Frontend)

This is my SODV2201 Assignment 1 project. It is the React frontend for a
restaurant website where customers can browse the menu, order food, book
tables, and chat with a simple assistant. There is also an admin dashboard.

There is no backend yet. All the data is stored in React state, so it resets
when you refresh the page. The backend is coming in Assignment 2.

## Features

**Customer side**
- Menu with search, category filter, dietary filter, and max price
- Cart with add, remove, and quantity buttons
- Checkout with pickup or delivery, simulated payment, and order confirmation
- My Orders page that shows live order status
- Reservation form for regular tables, birthdays, and corporate events
- My Reservations page where customers can see status and cancel
- Chat assistant (simulated AI that matches keywords to answers)

**Admin side**
- Login (fake password, frontend only)
- Add, edit, and delete menu items
- Change order status (Preparing, Ready, Delivered)
- Approve or cancel reservations

## Built with
- React (Vite)
- React Router
- Context API and useState for state
- Plain CSS

## How to run it
1. Install Node.js
2. Clone this repo and open the folder
3. Run `npm install`
4. Run `npm run dev`
5. Open the link it shows (usually http://localhost:5173)

## Admin login
Go to the Admin page and use the password: `admin123`

## Folder structure
- `src/pages` - one file per page
- `src/components` - Navbar and MenuItem card
- `src/context` - shared state for cart, orders, and menu
- `src/data` - hardcoded menu items and chat answers

## Things I know are limited
- Data resets on refresh (no database yet)
- The admin password is fake and not secure
- My Orders shows all orders from the session, since there are no customer accounts yet
- The chat only matches keywords, so it can miss some questions
- Payment and delivery are simulated

## What's next
Assignment 2 will add a Node and Express backend with a database, real login,
and reservation checks.

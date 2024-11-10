# Berry Fresh - Point of Sales Web Application for a Fruit Store

## Introduction
Berry Fresh serves as a Point of Sales (POS) system for an online fruit store, catering to two main user personas: customers and store owners. 

## Project Links
- **Front-End Deployment**: [Berry Fresh Frontend](https://berry-fresh.vercel.app/)
  (App may take a while to load as Render has slow rendering time) 
- **Backend Deployment**: Deployed on Render
- **GitHub Repositories**:
  - [Frontend Repository](https://github.com/koyostar/BerryFresh_FE)
  - [Backend Repository](https://github.com/koyostar/BerryFresh_BE)
 
![Alt text](https://res.cloudinary.com/dxsr7tutn/image/upload/v1731281075/Screenshot_2024-11-11_at_06.29.58_raxuwf.png)

## User Stories Implemented

### Required User Stories
1. **Customer - View Available Fruits**:
   - As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.

2. **Customer - Shopping Cart Functionality**:
   - As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.

3. **Customer - Submit Order**:
   - As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping. Assume that payment is done separate from this POS application.

4. **Owner - View Customer Orders**:
   - As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.

### Optional User Stories
- **Owner - Update Stock**:
  - As an owner, I want to be able to add new fruits and amend my stock levels, so that I can keep my online store up to date.

- **Customer (Member) - View Order History**:
  - As a customer, I want to be able to log in and see my order history, so that I can track my previous purchases.

- **Customer (Guest) - View Cart**:
  - As a customer, I want my order shortlist to be saved so that I can continue shopping on my device layer, even if I have not logged in.

- **Customer (Member) - View Saved Cart**:
  - As a customer, after logging in, I want my order shortlist to be saved so that I can log in and continue shopping on another device later.

- **Owner - Admin Access**:
  - As an owner, I do not want my customers to be able to see the whole store's order history, or amend my stocks, or perform any actions that should only be available for me.


## Technical Stack
- **Front End**: React.js with Vite for development and Tailwind CSS for styling.
- **Back End**: Node.js with Express.js for server-side logic.
- **Databases**: MongoDB for storing fruit data, user information, and orders. Cloudinary for image uploading storage.
- **Deployment**: Front end deployed on Vercel, back end deployed on Render.


## Future Improvements
- Implementing advanced analytics for sales performance.
- Adding customer notifications for order status updates.
- Enhancing mobile responsiveness and optimizing load times.

## Setup Instructions
To run this project locally:
1. **Clone the repositories**:
   - Frontend: `git clone https://github.com/koyostar/BerryFresh_FE`
   - Backend: `git clone https://github.com/koyostar/BerryFresh_BE`
2. **Install dependencies**:
   - Frontend: `cd BerryFresh_FE && npm install`
   - Backend: `cd BerryFresh_BE && npm install`
3. **Run the applications**:
   - Frontend: `npm start`
   - Backend: `npm run dev`




import { v4 as uuidv4 } from 'uuid';

// Persist User ID in localStorage to simulate a session
const USER_ID_KEY = 'meli_user_id';
let userId = localStorage.getItem(USER_ID_KEY);
if (!userId) {
  userId = uuidv4();
  localStorage.setItem(USER_ID_KEY, userId);
}
export const DUMMY_USER_ID = userId;

export const PRODUCTS = [
  { id: "prod-1", name: "Wireless Mouse", price: 25.99, category: "Electronics" },
  { id: "prod-2", name: "Mechanical Keyboard", price: 89.5, category: "Electronics" },
  { id: "prod-3", name: "Bluetooth Headphones", price: 59.99, category: "Electronics" },
  { id: "prod-4", name: "USB-C Charger", price: 18.75, category: "Electronics" },
  { id: "prod-5", name: "Smartwatch", price: 129.99, category: "Electronics" },

  { id: "prod-6", name: "Water Bottle", price: 12.0, category: "Home" },
  { id: "prod-7", name: "Ceramic Mug", price: 9.49, category: "Home" },
  { id: "prod-8", name: "Throw Pillow", price: 15.99, category: "Home" },
  { id: "prod-9", name: "LED Desk Lamp", price: 27.5, category: "Home" },
  { id: "prod-10", name: "Wall Clock", price: 19.99, category: "Home" },

  { id: "prod-11", name: "Running Shoes", price: 59.99, category: "Clothing" },
  { id: "prod-12", name: "T-Shirt", price: 14.99, category: "Clothing" },
  { id: "prod-13", name: "Jeans", price: 39.99, category: "Clothing" },
  { id: "prod-14", name: "Hoodie", price: 44.5, category: "Clothing" },
  { id: "prod-15", name: "Baseball Cap", price: 11.99, category: "Clothing" },

  { id: "prod-16", name: "Fiction Novel", price: 17.5, category: "Books" },
  { id: "prod-17", name: "Programming in Java", price: 45.0, category: "Books" },
  { id: "prod-18", name: "Cookbook: Easy Recipes", price: 22.99, category: "Books" },
  { id: "prod-19", name: "Notebook", price: 8.49, category: "Books" },
  { id: "prod-20", name: "Travel Guide", price: 19.75, category: "Books" },

  { id: "prod-21", name: "Yoga Mat", price: 29.99, category: "Sports" },
  { id: "prod-22", name: "Basketball", price: 24.5, category: "Sports" },
  { id: "prod-23", name: "Tennis Racket", price: 74.99, category: "Sports" },
  { id: "prod-24", name: "Cycling Helmet", price: 49.99, category: "Sports" },
  { id: "prod-25", name: "Gym Gloves", price: 14.5, category: "Sports" },
];
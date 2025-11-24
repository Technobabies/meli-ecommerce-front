import { v4 as uuidv4 } from 'uuid';

// Persist User ID in localStorage to simulate a session
const USER_ID_KEY = 'meli_user_id';
let userId = localStorage.getItem(USER_ID_KEY);
if (!userId) {
  userId = uuidv4();
  localStorage.setItem(USER_ID_KEY, userId);
}
export const DUMMY_USER_ID = userId;

// Hardcoded user ID specifically for cards API (must match existing user in database)
export const CARDS_USER_ID = "11111111-1111-1111-1111-111111111111";

export const PRODUCTS = [
  { id: "550e8400-e29b-41d4-a716-446655440001", name: "Wireless Mouse", price: 25.99, category: "Electronics" },
  { id: "550e8400-e29b-41d4-a716-446655440002", name: "Mechanical Keyboard", price: 89.5, category: "Electronics" },
  { id: "550e8400-e29b-41d4-a716-446655440003", name: "Bluetooth Headphones", price: 59.99, category: "Electronics" },
  { id: "550e8400-e29b-41d4-a716-446655440004", name: "USB-C Charger", price: 18.75, category: "Electronics" },
  { id: "550e8400-e29b-41d4-a716-446655440005", name: "Smartwatch", price: 129.99, category: "Electronics" },

  { id: "550e8400-e29b-41d4-a716-446655440006", name: "Water Bottle", price: 12.0, category: "Home" },
  { id: "550e8400-e29b-41d4-a716-446655440007", name: "Ceramic Mug", price: 9.49, category: "Home" },
  { id: "550e8400-e29b-41d4-a716-446655440008", name: "Throw Pillow", price: 15.99, category: "Home" },
  { id: "550e8400-e29b-41d4-a716-446655440009", name: "LED Desk Lamp", price: 27.5, category: "Home" },
  { id: "550e8400-e29b-41d4-a716-446655440010", name: "Wall Clock", price: 19.99, category: "Home" },

  { id: "550e8400-e29b-41d4-a716-446655440011", name: "Running Shoes", price: 59.99, category: "Clothing" },
  { id: "550e8400-e29b-41d4-a716-446655440012", name: "T-Shirt", price: 14.99, category: "Clothing" },
  { id: "550e8400-e29b-41d4-a716-446655440013", name: "Jeans", price: 39.99, category: "Clothing" },
  { id: "550e8400-e29b-41d4-a716-446655440014", name: "Hoodie", price: 44.5, category: "Clothing" },
  { id: "550e8400-e29b-41d4-a716-446655440015", name: "Baseball Cap", price: 11.99, category: "Clothing" },

  { id: "550e8400-e29b-41d4-a716-446655440016", name: "Fiction Novel", price: 17.5, category: "Books" },
  { id: "550e8400-e29b-41d4-a716-446655440017", name: "Programming in Java", price: 45.0, category: "Books" },
  { id: "550e8400-e29b-41d4-a716-446655440018", name: "Cookbook: Easy Recipes", price: 22.99, category: "Books" },
  { id: "550e8400-e29b-41d4-a716-446655440019", name: "Notebook", price: 8.49, category: "Books" },
  { id: "550e8400-e29b-41d4-a716-446655440020", name: "Travel Guide", price: 19.75, category: "Books" },

  { id: "550e8400-e29b-41d4-a716-446655440021", name: "Yoga Mat", price: 29.99, category: "Sports" },
  { id: "550e8400-e29b-41d4-a716-446655440022", name: "Basketball", price: 24.5, category: "Sports" },
  { id: "550e8400-e29b-41d4-a716-446655440023", name: "Tennis Racket", price: 74.99, category: "Sports" },
  { id: "550e8400-e29b-41d4-a716-446655440024", name: "Cycling Helmet", price: 49.99, category: "Sports" },
  { id: "550e8400-e29b-41d4-a716-446655440025", name: "Gym Gloves", price: 14.5, category: "Sports" },
];
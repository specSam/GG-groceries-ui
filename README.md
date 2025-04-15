# Grocery Price Comparison App

This is a React/TypeScript front-end application for a grocery price comparison service that allows users to find the best prices for groceries at nearby stores.

## Project Structure

The application consists of the following main components:

- **Login/Signup Page**: Entry point for user authentication
- **Home Page**: Dashboard with grocery list and recommended meals
- **Search Page**: For finding grocery items with filtering options
- **Recipes Page**: For managing and viewing recipes
- **Favorite Stores Page**: For managing preferred stores
- **Favorite Groceries Page**: For managing frequently purchased items

## Features

- User authentication (login/signup)
- Search for grocery products by name
- Sort results by price, distance, etc.
- Save favorite stores and grocery items
- Recipe management with ingredient lists
- Grocery list creation
- Add all ingredients from a recipe to the grocery list

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/grocery-price-app.git TODO: move repo go github
cd grocery-price-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add:

```
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

## Development Notes

### Backend Integration

This front-end application is designed to work with a backend API that provides:

- Authentication services
- Product data retrieval
- Store information
- User profile management
- Recipe storage and retrieval

The `apiService.ts` file contains all the API endpoints that need to be implemented on the backend.

### API Services

The application uses the following key API endpoints:

- `/auth/login` and `/auth/signup` - User authentication
- `/products/search` - Search for grocery items
- `/stores/favorites` - Manage favorite stores
- `/groceries/favorites` - Manage favorite grocery items
- `/recipes` - Manage recipes
- `/shopping-list` - Manage shopping list

### Data Models

Key data models used throughout the application:

- User
- GroceryItem
- Store
- Recipe
- ShoppingList

## Future Enhancements

- Implementation of price comparison visualization
- User reviews and ratings for products
- Coupon integration
- Barcode scanning for easy product lookup
- Meal planning calendar

## License

[MIT License](LICENSE)
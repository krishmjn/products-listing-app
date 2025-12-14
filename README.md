# Product Favorites App

This is a simple Next.js application that displays a list of products and allows users to mark them as favorites.

## Setup Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd product-favorites-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Structure Explanation

- `app/`: Contains Next.js pages and API routes.
- `components/`: Reusable React components like `ProductCard` and `FavoriteButton`.
- `lib/`: Utility functions for data fetching and favorite management.
- `data/`: Static product data.

## What I'd Improve with More Time

- **Backend Integration:** Implement a persistent backend for storing user favorites and product data, moving away from client-side `localStorage` and static data.
- **Styling & Responsiveness:** Further refine the UI/UX, ensuring full responsiveness across various devices and applying a more cohesive design system.
- **Testing:** Add comprehensive unit and integration tests to ensure robustness and prevent regressions.

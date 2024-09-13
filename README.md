# Safe Space Share

Safe Space Share is a mobile-first React application designed to collect and visualize personal experiences related to emotional well-being and safety. The application is built with modern web technologies to ensure scalability and a responsive user experience across both mobile devices and desktops.

#### System Architecture

- **Frontend**:
    - **React**: Provides a dynamic and responsive user interface.
- **Backend**:
    - **Express**: Handles API requests and server-side logic.
    - **Node.js**: The runtime environment for executing JavaScript on the server.
    - **npm**: Manages dependencies and scripts for the application.
    - **nvm**: Used for managing multiple versions of Node.js.
- **Database**:
    - **AWS RDS PostgreSQL**: For robust data storage.
    - **PostGIS**: Extension that provides geospatial capabilities.
- **Web Server**:
    - **Apache**: Serves as a proxy, routing requests between the frontend and backend.
- **Hosting & Deployment**:
    - **EC2 Instance**: The entire application, including the frontend, backend, and database connections, is fully hosted and served on an Amazon EC2 instance. This ensures reliable performance and scalability.
- **Mapping & Geolocation**:
    - **Google Maps API**: Used for geolocation services.
    - **Mapbox GL JS API**: Used for rendering the final heatmap, offering interactive and visually compelling map visualizations.

#### Features

- **Mobile-First Design**: Optimized for mobile devices but fully functional on desktops, ensuring accessibility across various platforms.
- **Interactive Mapping**: Visualize and explore user experiences on a map with detailed heatmaps and other layers that represent emotional well-being data.
- **Emotional Well-being Data Collection**: Users can share their feelings and experiences related to happiness, calmness, safety, belonging, and more, which are then mapped to specific locations.
- **Data Security**: User data is securely stored in a PostgreSQL database hosted on AWS RDS, with geospatial data managed through the PostGIS extension.

## Getting Started

### Prerequisites

* **Node.js and npm (or yarn):** Make sure you have Node.js and either npm or yarn installed on your local machine. You can check this by running `node -v` and `npm -v` (or `yarn -v`) in your terminal.

### Installation

1. **Clone the Repository:**
    ```sh
    git clone https://github.com/afenix/safespaceshare-ec2.git
    cd safespaceshare
    ```

2. **Install Dependencies:**

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3. **Start the Development Server:**

    ```sh
    npm start
    ```

    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes.\
    You may also see any lint errors in the console.

## Contributing

Contributions are welcome! Please feel free to submit bug reports, feature requests, or pull requests.

1. **Fork the repository.**

2. **Create a new branch for your feature or bug fix:**

    ```sh
    git checkout -b feature-name
    ```

3. **Commit your changes:**

    ```sh
    git commit -m "Add feature"
    ```

4. **Push to your branch:**

    ```sh
    git push origin feature-name
    ```

5. **Open a pull request.**

## License

This project is licensed under the GNU General Public License (GPL).


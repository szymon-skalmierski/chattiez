# Chattiez

Chattiez is a real-time chat application built with **Angular**. It provides a seamless communication platform where users can sign up, create chat rooms, and message friends or colleagues in real-time.

The application leverages **Firebase** for secure user authentication and **SendBird** as the backend infrastructure for handling chat channels and messaging. It features a responsive design using **Bootstrap**, ensuring a consistent experience across devices.

**Key Features:**
* **User Authentication:** Secure Login and Signup using Firebase Auth.
* **Real-time Messaging:** Instant message delivery via SendBird.
* **Group Chats:** Create and manage group channels.
* **User Management:** Add friends to groups and view active members.
* **Responsive UI:** Clean interface built with Bootstrap.

## Status
Working with the possibility of adding new features.

## Demo
You can view a live demo of the application here:
[https://chattiez.vercel.app](https://chattiez.vercel.app)

## Development server

To run this application locally, you will need to set up the environment variables for the backend services.

### Prerequisites
* Node.js installed
* Angular CLI installed (`npm install -g @angular/cli`)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd chattiez
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    This project uses a script to generate the Angular environment files securely. You must provide your API keys.
    
    Create a `.env` file inside the `src/environments/` directory with the following keys:
    ```env
    APP_ID=your_sendbird_app_id
    FIREBASE_KEY=your_firebase_api_key
    ```

4.  **Generate Configuration**
    Run the configuration script to create the `environment.prod.ts` file based on your `.env` variables:
    ```bash
    npm run config
    ```

5.  **Run the Application**
    Start the development server:
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## License
This project is licensed under the MIT License.

## Author
- [xketris](https://github.com/xketris)

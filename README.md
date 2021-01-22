# Classic Snake Game: Multiplayer

A real time multiplayer functionality was added to the classic snake game using a web Socket npm package dependency called _socket.io_. The game was developed using pure Javascript with Node JS as the game server. The game is multiplayer and therefore uses the socket.io library to establish a connection handshake between players (clients) and the server, keeping the _http request_ open for the duration of the game.

## Built With

1. React
2. Bootstrap, Sass
3. Node JS
4. MongoDB, Mongoose
5. Socket IO

## Getting Started

1. You can run the Application locally

   Clone the repository and install the dependencies by running

   ```
   npm install
   ```

   Create a .env file to mirror the `.sample.env` providing their corresponding values.

   Locate the `index.html` file in the `client/src` folder and add the following script just before the closing `</body>` tag.

   ```
   <script src="./dist/bundle.js"></script>
   ```

   Serve the React frontend

   ```
   npm run dev
   ```

   For the backend server, open another terminal and run

   ```
   npm start
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) to view application in the browser.

2. Or go directly to the website here [snakerace](https://snakerace.herokuapp.com)

## Key Feature: SOCKET.IO

The **[Socket.io](https://socket.io/)** library is the main piece of the whole puzzle. A Javascript library that enables the multiplayer functionality in real time and provides persistent connection between client and server. It is responsible for keeping the HTTP Request to the node server and listens for connection based on data passed through identities known as messages. It uses web sockets for creating a client/server structure to enable real time exchange of data. Most commonly used for Chat Applications.

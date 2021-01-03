# Classic Snake Game: Multiplayer

A real time multiplayer functionality was added to the classic snake game using a web Socket npm package dependency called _socket.io_. The game was developed using pure Javascript with Node JS as the game server. The game is multiplayer and therefore uses the socket.io library to establish a connection handshake between players (clients) and the server, keeping the _http request_ open for the duration of the game.

## KEY FEATURE: SOCKET.IO

The **[Socket.io](https://socket.io/)** library is the main piece of the whole puzzle. A Javascript library that enables multiplayer functionality in real time and provides persistent connection between client and server.It is responsible for keeping the HTTP Request to the node server and listens for connection based on data passed through identities known as messages. It uses web sockets for creating a client/server structure to enable real time exchange of data. Most commonly used for Chat Applications.

## Getting Started

Clone the repository and install the dependencies by running

`npm install`

Run the Application

`npm start`

## OR

Go directly to the website here [snakerace.herokuapp.com](https://snakerace.herokuapp.com)

## Forked From

The foundational snake game codebase was forked from

\*[CodeExplainedRepo](https://github.com/CodeExplainedRepo/Snake-JavaScript)

\*[Tutorial link](https://youtu.be/9TcU2C1AACw)

## Deployment

This application was deployed on Heroku: A PaaS (Platform as a Service) web application deployment manager.

## Built With

1. JavaScript
2. Bootstrap
3. Node JS
4. Socket.io

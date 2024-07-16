### 1-discover-travels

This example of a web page is created mainly to demonstrate the back-end functionality. It fully implements the MERN stack (MongoDB, Express.js, React.js, Node.js), CRUD operations, and REST API. A recursive function is created on this page to display comments with their functionality, which significantly reduces the load on the database as it is implemented using the Primary-Secondary key principle, which MongoDB does not support. Additionally, secure page connection to the database is implemented.

**You can visit this webpage at**
https://discovertravels.netlify.app
I have deployed this project on two servers, one for the front-end and another for the back-end and the database. A few travel description examples are preloaded to demonstrate the functionality of the 'New' button. Comments are also included to showcase the recursive function in action. You can log in and test the application. You can delete your own travel descriptions and accounts. However, you cannot delete your comments, only edit them to preserve the continuity of discussions.

The following libraries are used in the project:

- express, mongoose, dotenv, bcryptjs, jsonwebtoken, cors
- react-router-dom, @phosphor-icons/react, axios, react-auth-kit, @auth-kit/react-router

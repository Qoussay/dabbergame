# DabberGame
This is a web application implemented using the MERN stack. It is an online marketplace for trading, selling or buying video games. 

I am working on this as my final year project in the university.

## What I have worked on

- Backend system using Express and Mongodb
- API that reads and writes data into the database using Mongoose package
- Authentication system that is not optimal. Users passwords are hashed and salted in the database.
- Fetch data from external API (IGDB.com) for video games information such as cover image, platforms, release date, etc. 
- One page application using ReactJs and React-router-dom. TailwindCSS was used heavily for creating custom components. 
Some MUI components were used, mostly for the input fields.
- Custom hook to send a fetch request to the backend that in turns sends a request to IGDB to get game information. 
- All html requests are handled using Axios.
- All CRUD operation are implemented

## To work on

This project is not fully complete. There are few things that were not implemented:
- better authentication
- real-time messaging between user
- user's profile settings
- report system

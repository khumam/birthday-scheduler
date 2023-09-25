# Birthday scheduler
This is a small implementation of a scheduler and message broker service. This project is built in TypeScript with Express.js and utilizes RabbitMQ.

## How to run
First, you need to clone the repository and then run the `npm install` command. After successfully installing all the packages, copy the .env file and set up your database. Migrate the database using `npx prisma migrate dev`, and you can then manage the User.

## User payload
The create payload for user defined by
```
{
	"username": "khumam2",
	"first_name": "Khoerul2",
	"last_name": "Umam",
	"email": "khoerul27@gmail.com",
	"birthday": "1999-10-27",
	"location": "Indonesia",
	"timezone": "America/Nome"
}
```
We can add more function to detect the location and timezone automatically.

## Run the scheduler
I recommend running this through a cron job hourly. Make a request to the API at (POST) `/api/v1/scheduler``, and this endpoint will retrieve the users who have birthdays at that time. It will then send an email using an email service. If the user fails to receive the email, their information will be stored on RabbitMQ, and we can consume it at a later time.
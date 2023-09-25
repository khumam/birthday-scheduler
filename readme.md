# Birthday scheduler
This is small implementation of scheduler and broker message service. This small project built in Typescript ExpressJS, and RabbitMQ.

## How to run
First you need to clone and then run the `npm install` command. After you successfully install all the packages, copy the .env file and setup your database. Migrate the the database using `npx prisma migrate dev` and you can manage the User.

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
I recommend to run this by doing a cron job hourly. Hit the API at (post) `/api/v1/scheduler` and this endpoint would get the user who has birthday at this time. Then it will send the email using email service. If the user fail to received the email, the user will stored on rabbitmq and we can consume in the next time.
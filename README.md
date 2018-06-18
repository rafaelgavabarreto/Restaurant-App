# Restaurant App


## Project restaurant pick up

Mid term project on LightHouse Labs. A food ordering experience for a restaurants. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. API service such as Twilio to implement SMS communication and Stripe integration for implementing secure e-commerce. 


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- morgan
- knex
- node-sass-middleware
- twilio
- cookie-session
- body-parser

## Screen shots

Main screen of the project
!["Main screen of the project"](https://github.com/rafaelgavabarreto/Restaurant-App/blob/master/img/RestaurantApp%20Main%20Screen.png)

Show the item
![Show the item](https://github.com/rafaelgavabarreto/Restaurant-App/blob/master/img/RestaurantApp%20Item.png)

Show the user cart
![Show the cart](https://github.com/rafaelgavabarreto/Restaurant-App/blob/master/img/RestaurantApp%20Cart.png)

User using a card to pay
![User pay by card](https://github.com/rafaelgavabarreto/Restaurant-App/blob/master/img/RestaurantApp%20Card%20Pay.png)
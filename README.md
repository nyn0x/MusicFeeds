### Blitz app

Project for playing with blitz & redux

Start the dev server

npm run dev

### libraries used :

- UI - [https://material-ui.com/](https://material-ui.com/) - [https://material-ui.com/components/material-icons/](https://material-ui.com/components/material-icons/)

* State management - [https://redux.js.org/](https://redux.js.org/) - [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

### MEMO

- Deployment on Heroku: increase boot timeout, put on max (because take more than 60sec to generate files) [https://tools.heroku.support/limits/boot_timeout](https://tools.heroku.support/limits/boot_timeout)

* Always use option `refetchOnWindowFocus: true` when useQuery is used

### TODO

- [ ] Auth by Blitz (currently in pre-release)

- [ ] User can not fetch more than N entities maximun (via postman)

- [ ] User can not fetch attributs not public (via postman)

- [ ] User can not fetch too much deep relationship

- [ ] Possibility to group attributs of an entity like serializer in Symfony ?

- [ ] Admin

- [ ] Blog

- [ ] React Player living on every public front page - [ ] test switch pages

- [ ] Artist page - [ ] access via artist/id/slug-name-artist - [ ] HTTP 301 redirect any inbound display url that matches ID but doesn't match the text to the correct text. - [https://stackoverflow.com/questions/820493/can-an-seo-friendly-url-contain-a-unique-id](https://stackoverflow.com/questions/820493/can-an-seo-friendly-url-contain-a-unique-id) - [ ] design; default cover , name...

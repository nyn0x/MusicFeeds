### BLITZ APP

Project for playing with blitz & redux & other useful tools

Start the dev server :

    npm run dev

### LIBRARIES USED :

- UI : [material ui](https://material-ui.com/) - [material ui icons](https://material-ui.com/components/material-icons/)
- State management : [redux](https://redux.js.org/) - [redux toolkit](https://redux-toolkit.js.org/)

### MEMO

- **Deployment**
  - Deployment on **Heroku**: increase boot timeout, put on max (because take more than 60sec to generate files) here [https://tools.heroku.support/limits/boot_timeout](https://tools.heroku.support/limits/boot_timeout)
- **Blitz / Next.js**
  - https://blitzjs.com/
  - https://nextjs.org/
  - Always use option `refetchOnWindowFocus: true` when **useQuery** is used
  - double render page in dev mode when **getServerSideProps** used (it's ok in prod)
  - don't forget to use `as` on `<Link>` if use dynamic routing, if not it's trigger an error 404
- **Redux**
  - https://redux.js.org
  - https://redux-toolkit.js.org
  - Select from global state : `const extractedState = useSelector(fnSelectFromSlice)`
  - Dispatch action : `const dispatch = useDispatch(); dispatch(fnAction())`
- **Prisma**
  - https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud

### TODO / QUESTIONS

- [ ] Auth by Blitz (currently in pre-release)

- [ ] User can not fetch more than N entities maximun (via postman)

  - [x] function checker
  - [ ] function checker when `take` argument it's used with include
  - [ ] test with middleware (prisma >=2.3 in next release of blitz) for global check

- [ ] User can not fetch attributs not public (via postman)

- [ ] User can not fetch too much deep relationship

- [ ] Possibility to group attributs of an entity like serializer in Symfony ?

- [ ] Admin

  - [ ] [https://swr.vercel.app/docs/with-nextjs](https://swr.vercel.app/docs/with-nextjs)

- [ ] Blog

- [x] ~~React Player living on every public front page~~

  - [x] ~~test switch pages~~

- [ ] Artist page
  - [x] access via artist/[id]/[slugArtist]
  - [ ] HTTP 301 redirect any inbound display url that matches ID but doesn't match the text to the correct text.
    - [https://stackoverflow.com/questions/820493/can-an-seo-friendly-url-contain-a-unique-id](https://stackoverflow.com/questions/820493/can-an-seo-friendly-url-contain-a-unique-id)
  - [ ] design: default cover , name...

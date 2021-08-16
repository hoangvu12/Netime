# Netime

Netime is a website to watch anime with vietnamese subtitle, built with React and Tailwind.

## Table of contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Example](#example)
- [To do](#todo)
- [Sources](#sources)

## Technologies

- Front-end:
  - [React](https://github.com/facebook/react), [Tailwind](https://github.com/tailwindlabs/tailwindcss)
  - Libraries: [React Query](https://github.com/tannerlinsley/react-query), [React Slick](https://github.com/akiran/react-slick), [Plyr](https://github.com/sampotts/plyr)
- Back-end:
  - [Nodejs](https://github.com/nodejs), [Express](https://github.com/expressjs/express)
  - Libraries: [Cheerio](https://github.com/cheeriojs/cheerio)

#### Note: Both of them using Typescript

##### Server github repo: [Netime-server](https://github.com/hoangvu12/Netime-server)

## Setup

To run this project, install it locally using npm (or yarn):

```
npm install
npm start
```

Change API_URL in `src/constants.ts` to let the project works properly

## Example

Here is some screenshots to show how the website would looks like.

![homescreen](https://user-images.githubusercontent.com/68330291/129450435-384fcb5e-490b-48b8-92a2-4679b98ea13d.png)
![watchscreen](https://user-images.githubusercontent.com/68330291/129450531-003515cb-49cc-4007-9bc0-ef36ddef2243.png)

Or here is [live example](https://netime.vercel.app)

## Todo

- <s>Guide tour in watch screen.</s> ❌
- <s>Footer</s> ✔️
- <s>Skeleton loading</s> ✔️
- More compatible with mobile devices
- Meta Tags
- Save user's episodes. (Maybe using localStorage, or a database if I have time.)
- Comments
- <s>Restyle InfoScreen</s> ✔️

#### Maybe

- A domain
- Comics section to read.
- Authorization system (If I have enough time.)

## Sources

- Video player design is inspired by Netflix (Sadly I can't make the same as them)
- Data from [AnimeVSub](https://animevietsub.tv)

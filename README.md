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
    , Typescript
  - Libraries: [React Query](https://github.com/tannerlinsley/react-query), [React Slick](https://github.com/akiran/react-slick), [Plyr](https://github.com/sampotts/plyr)
- Back-end:
  - [Nodejs](https://github.com/nodejs), [Express](https://github.com/expressjs/express)
  - Libraries: <s>[Cheerio](https://github.com/cheeriojs/cheerio)</s> [JSDom](https://github.com/jsdom/jsdom)

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

![homescreen](https://i.ibb.co/zxJggGg/netime-vercel-app-3.png)
![watchscreen](https://user-images.githubusercontent.com/68330291/129450531-003515cb-49cc-4007-9bc0-ef36ddef2243.png)
![mobile-watchscreen](https://i.ibb.co/ch7kVDb/localhost-3000-watch-getter-robo-arc-episode-index-0-i-Phone-6-7-8-Plus.png)

Or here is [live example](https://netime.vercel.app)

## Todo

- <s>Guide tour in watch screen.</s> ❌ Reason: it breaks my styles.
- <s>Footer</s> ✔️
- <s>Skeleton loading</s> ✔️
- <s>Restyle InfoScreen</s> ✔️
- <s>More compatible with mobile devices</s>
- <s>Save user's episodes.</s> ✔️
- <s>Video player overlay.</s> ✔️
- <s>Video controls on mobile</s> ✔️
- <s>"Chunk" episodes into chunks.</s> ✔️
- Meta Tags (Maybe can't with React....)
- Comments

#### Maybe

- A domain
- <s>Comics section to read</s> ❌ Reason: This is anime website.
- <s>Authorization system (If I have enough time.)</s> ❌ Reason: I don't have time

## Sources

- Video player design is inspired by Netflix (Sadly I can't make the same as them)
- Data from <s>[AnimeVSub](https://animevietsub.tv)</s> [Vuighe](https://vuighe.com)

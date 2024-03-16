# Delfino Games

This is a Next.js app backed by a Postgresql database for managing the board game inventory of Monday Night boardgames.

## Project Goals

The final product should:

- serve a catalog of boardgames owned by group members
- allow users to sort those games by various filters to satisfy likely use cases (e.g. finding a short game to play, finding a game for 5 players)
- allow users to express interest in games, so that games holders know which games to bring on a boardgames night
- be frictionless to use - manual data entry sucks

The technical goals of the project are:

- Make full use of the Vercel free tier with regards to the final deployment
- Make a robust web app. Responsive, well-styled and accessible
- The web app should be maintainable without having to log into Vercel or connecting to the database
- Make good use of the BGG API

The technical goals are NOT:

- SQL-heavy - I'm using prisma so that I don't have to deal with the nuts and bolts of hand-rolling SQL
- Sophisticated deployment process - I'm using Vercel because it's plug-and-play and lets me just build something faster

## Technologies

- prisma for database-side
- vercel for deployments
- Nextjs framework, with typescript and tailwind
- shadcn used a crib sheet for UI
- BoardGameGeek API as a source of truth for boardgame data

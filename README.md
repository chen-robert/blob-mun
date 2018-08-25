# blob-mun

## Setup
You will need a Postgres database.
```
npm install
npm run db:init
npm start
```

### Environmental Variables
| Name         | Meaning                                         |
|--------------|-------------------------------------------------|
| PORT         | The port `npm run server` listens to            |
| DATABASE_URL | The connection string for the Postgres instance |

## Contributing

Code can be found in `./src`. 
Please run `npm run format` before comitting. 
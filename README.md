# channel-forum

### this project base on
- express
- typescript
- typeorm for date accessing and migration
- jest for testing
- dotenv for environment variables

### development start steps 
1. `npm run install`
2. edit your environment variables in .env
3. run migration cli `npm run typeorm:cli migration:run`
4. `npm run dev`

### deploy production

1. `build docker image`
2. inject env variables in cli or use docker-compose to organize
3. just run the image.
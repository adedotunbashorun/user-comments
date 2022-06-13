export const config  = {
  app: {
    port: process.env.PORT as string,
  },
  db: {
    url: process.env.MONGODB_URI as string,
  },
  data: {
    limit: "50mb",
    extended: false,
  },
};
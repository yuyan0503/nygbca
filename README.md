This is a project created with [Next.js](https://nextjs.org) , which is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning and downloading the required dependencies, rename .env.example to .env and change it to your credintials, and then run

```bash
npx prisma db push
```

 and then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Most part of the web app should be included within the /src file. 

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Before making a pull request, a quick check for bugs will be very appreciated. 

When creating new files, using .ts and .tsx is recommended, although .js is also acceptable. 

## Deploying

To deploy, there are multiple ways available. Start by cloning and cd into the nygbca folder.

### Docker
To deploy with docker, run the following

```bash
docker build -t nygbca .
```

then, to start, run

```bash
docker run -p 3000:3000 -e DATABASE_URL=postgresql://ACCOUNT:PASSWORD@YOUR.DATABASE.HOSTNAME.com:PORT/DATABASE nygbca
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Node.js server
To use a conventional Node.js server, simply run the following.

```bash
npm run build && npm run start
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


dev.db削除
dev.db作成
Debianでnpx prisma db push実行
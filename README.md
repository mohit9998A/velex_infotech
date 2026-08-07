This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment

The lead form at `/api/contact` mails submissions through the company's own
SMTP mailbox. Set these in `.env.local` for development and in the Vercel
dashboard for production. Only the first two are required — everything else has
a working default.

| Variable | Required | Default | Notes |
|---|---|---|---|
| `SMTP_USER` | **yes** | — | `team@velexinfotech.com` |
| `SMTP_PASSWORD` | **yes** | — | The **mailbox** password, not the hPanel one. Mark Sensitive in Vercel. |
| `SMTP_HOST` | no | `smtp.hostinger.com` | |
| `SMTP_PORT` | no | `465` | 465 (SSL) or 587 (TLS). `secure` is derived from this, never set separately. |
| `LEAD_FROM_EMAIL` | no | `Velex Infotech <SMTP_USER>` | Its address **must** match `SMTP_USER` — most hosts reject anything else with 550/553. |
| `LEAD_INBOX` | no | `siteConfig.leadInbox` | Where notifications land. |
| `LEAD_AUTOREPLY` | no | off | Acknowledgement to the visitor. Leave off until an edge rate-limit rule is in place — see `lib/mail.ts`. |
| `LEAD_MAIL_DISABLED` | no | off | **Kill switch.** Set to `1` to stop all outbound mail without a deploy. |
| `LEAD_MAX_SENDS_PER_HOUR` | no | `20` | Per instance — see `lib/rate-limit.ts`. |
| `LEAD_MAX_SENDS_PER_DAY` | no | `40` | Per instance. |
| `SMTP_DEBUG` | no | off | Logs the SMTP conversation. Ignored in production. |

Check the whole contract against the live mail server before trusting it:

```bash
npm run verify:smtp            # resolve config, handshake, report problems
npm run verify:smtp -- --send  # also deliver a real test email
```

> A mailbox password containing `$` needs escaping as `\$` in `.env.local`
> (Next expands `$VAR` in dotenv files) but **not** in the Vercel dashboard,
> which stores it literally. Getting this backwards authenticates in one
> environment and fails forever in the other. Regenerating the password as 24
> alphanumeric characters avoids the problem entirely.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

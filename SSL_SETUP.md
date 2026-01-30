# SSL Support for Local Development

To test PWA features locally, you need HTTPS. Next.js 14.2+ supports this via `--experimental-https`.

## 1. Using Built-in Next.js HTTPS (Recommended)

Simply run:

```bash
pnpm dev:https
```

This will automatically generate a development certificate and start the server on `https://localhost:4000`.

## 2. Using mkcert (Custom)

If you prefer custom certificates:

### Windows (Chocolatey)

```bash
choco install mkcert
mkcert -install
mkdir certificates
cd certificates
mkcert localhost 127.0.0.1 ::1
```

### macOS (Homebrew)

```bash
brew install mkcert
mkcert -install
mkdir certificates
cd certificates
mkcert localhost 127.0.0.1 ::1
```

Then update your dev script to use the custom certificates if needed, though `--experimental-https` is usually sufficient for PWA testing.

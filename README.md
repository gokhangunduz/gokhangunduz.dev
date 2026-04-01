# gokhangunduz.dev

An interactive terminal-style portfolio and resume website. Built with Next.js and xterm.js — explore my background, skills, projects, and more by typing commands directly in the browser.

**Live:** [gokhangunduz.dev](https://gokhangunduz.dev)

---

## Commands

| Command | Description |
|---|---|
| `whoami` | Full profile as JSON |
| `skills` | List of technical skills |
| `experience` | Work history |
| `education` | Education background |
| `projects` | Projects with links |
| `socials` | Social media links |
| `contact` | Contact information |
| `whatsmyip` | Your current IP address and location |
| `version` | Current site version |
| `clear` | Clear the terminal |
| `reload` | Reload the page |
| `help` | Show all available commands |

**Tips:**
- Use `↑` / `↓` arrow keys to navigate command history
- Press `Tab` to autocomplete a command
- Mistyped a command? The terminal will suggest the closest match

---

## Tech Stack

- **Next.js 16** — App Router, static export
- **React 19**
- **xterm.js** — Terminal emulator
- **Tailwind CSS 4**
- **TypeScript**
- **JetBrains Mono** — Terminal font (via `next/font/google`)

---

## Local Development

```bash
git clone https://github.com/gokhangunduz/gokhangunduz.dev.git
cd gokhangunduz.dev
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_IP_TOKEN` in a `.env.local` file (see `.env.example`) to enable the `whatsmyip` command.

---

## Deployment

### GitHub Pages (automatic)

Push to `main` — the included GitHub Actions workflow builds and deploys automatically.

Required: add `NEXT_PUBLIC_IP_TOKEN` as a repository secret under **Settings → Secrets → Actions**.

### Docker

```bash
docker build --build-arg NEXT_PUBLIC_IP_TOKEN=your_token -t gokhangunduz.dev .
docker run -p 80:80 gokhangunduz.dev
```

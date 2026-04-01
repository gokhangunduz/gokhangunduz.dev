const NEXT_PUBLIC_IP_TOKEN = process.env.NEXT_PUBLIC_IP_TOKEN;

if (!NEXT_PUBLIC_IP_TOKEN) {
  console.warn("NEXT_PUBLIC_IP_TOKEN is not set — IP lookup will fail");
}

export { NEXT_PUBLIC_IP_TOKEN };

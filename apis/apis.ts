"use client";

import axios, { AxiosError } from "axios";
import { TIPInfo } from "@/types/types";
import { NEXT_PUBLIC_IP_TOKEN } from "@/constants/env";

const CACHE_TTL = 5 * 60 * 1000;
let cachedResult: TIPInfo | undefined;
let cachedAt = 0;

export async function getIPInfo(): Promise<TIPInfo | undefined> {
  if (cachedResult && Date.now() - cachedAt < CACHE_TTL) {
    return cachedResult;
  }

  try {
    const { data: publicIP } = await axios.get<string>(`https://ipinfo.io/ip`, {
      timeout: 5000,
      params: { token: NEXT_PUBLIC_IP_TOKEN },
    });

    if (!publicIP || typeof publicIP !== "string") return undefined;

    const { data: ipInfo } = await axios.get<TIPInfo>(
      `https://ipinfo.io/${publicIP.trim()}`,
      {
        timeout: 5000,
        params: { token: NEXT_PUBLIC_IP_TOKEN },
      },
    );

    const { readme: _readme, ...cleanInfo } = ipInfo;
    cachedResult = cleanInfo as TIPInfo;
    cachedAt = Date.now();
    return cachedResult;
  } catch (e) {
    if (e instanceof AxiosError && e.code === "ECONNABORTED") {
      console.error("IP info request timed out.", e);
    } else {
      console.error("Could not fetch IP information.", e);
    }
    return undefined;
  }
}

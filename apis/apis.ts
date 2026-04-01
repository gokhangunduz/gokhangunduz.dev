"use client";

import axios from "axios";
import { TIPInfo } from "@/types/types";
import { NEXT_PUBLIC_IP_TOKEN } from "@/constants/env";

export async function getIPInfo(): Promise<TIPInfo | undefined> {
  try {
    const { data: publicIP } = await axios.get<string>(`https://ipinfo.io/ip`, {
      timeout: 5000,
      params: {
        token: NEXT_PUBLIC_IP_TOKEN,
      },
    });

    if (!publicIP || typeof publicIP !== "string") return undefined;

    const { data: ipInfo } = await axios.get<TIPInfo>(
      `https://ipinfo.io/${publicIP.trim()}`,
      {
        timeout: 5000,
        params: {
          token: NEXT_PUBLIC_IP_TOKEN,
        },
      },
    );

    const { readme: _readme, ...cleanInfo } = ipInfo;
    return cleanInfo as TIPInfo;
  } catch (e) {
    console.error("Could not fetch IP information.", e);
    return undefined;
  }
}

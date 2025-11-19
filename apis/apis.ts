"use client";

import axios from "axios";
import { TIPInfo } from "@/types/types";
import { NEXT_PUBLIC_IP_TOKEN } from "@/constants/env";

export async function getIPInfo(): Promise<TIPInfo | undefined> {
  try {
    const { data: publicIP } = await axios.get<string>(`https://ipinfo.io/ip`, {
      params: {
        token: NEXT_PUBLIC_IP_TOKEN,
      },
    });

    if (!publicIP) return undefined;

    const { data: ipInfo } = await axios.get<TIPInfo>(
      `https://ipinfo.io/${publicIP}`,
      {
        params: {
          token: NEXT_PUBLIC_IP_TOKEN,
        },
      },
    );

    delete ipInfo.readme;
    return ipInfo;
  } catch (e) {
    console.error("Could not fetch IP information.", e);
    return undefined;
  }
}

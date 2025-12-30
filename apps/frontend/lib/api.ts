import { cache } from "./cache";

const API_URL = "http://[::1]:4000";

// Cache TTLs in milliseconds
const CACHE_TTL = {
  default: 5 * 60 * 1000, // 5 minutes
  billing: 2 * 60 * 1000, // 2 minutes
  monitoring: 30 * 1000, // 30 seconds
  resources: 3 * 60 * 1000, // 3 minutes
  deployments: 1 * 60 * 1000, // 1 minute
  alerts: 1 * 60 * 1000, // 1 minute
};

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Clear cache on unauthorized
    cache.clear();
    console.warn("Unauthorized access");
  }

  return response;
}

function getCacheKey(endpoint: string): string {
  return `api:${endpoint}`;
}

function getTTL(endpoint: string): number {
  if (endpoint.includes("/billing")) return CACHE_TTL.billing;
  if (endpoint.includes("/monitoring")) return CACHE_TTL.monitoring;
  if (endpoint.includes("/cloud-resources")) return CACHE_TTL.resources;
  if (endpoint.includes("/deployments")) return CACHE_TTL.deployments;
  if (endpoint.includes("/alerts")) return CACHE_TTL.alerts;
  return CACHE_TTL.default;
}

export const api = {
  get: async (endpoint: string, useCache: boolean = true) => {
    const cacheKey = getCacheKey(endpoint);

    // Check cache first
    if (useCache) {
      const cached = cache.get(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    // Fetch from API
    const res = await fetchWithAuth(endpoint);
    if (!res.ok) throw new Error(`GET ${endpoint} failed`);
    const data = await res.json();

    // Store in cache
    if (useCache) {
      cache.set(cacheKey, data, getTTL(endpoint));
    }

    return data;
  },
  post: async (endpoint: string, body: any) => {
    const res = await fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    const data = await res.json();

    // Invalidate related cache entries
    if (endpoint.includes("/cloud-resources")) {
      cache.clearPattern("cloud-resources");
    } else if (endpoint.includes("/deployments")) {
      cache.clearPattern("deployments");
    }

    return data;
  },
  // Clear cache for specific endpoint
  clearCache: (endpoint?: string) => {
    if (endpoint) {
      cache.delete(getCacheKey(endpoint));
    } else {
      cache.clear();
    }
  },
};

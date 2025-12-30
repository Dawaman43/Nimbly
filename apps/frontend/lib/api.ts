const API_URL = "http://localhost:4000";

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
        // Optional: Redirect to login or dispatch event
        console.warn("Unauthorized access");
    }

    return response;
}

export const api = {
    get: async (endpoint: string) => {
        const res = await fetchWithAuth(endpoint);
        if (!res.ok) throw new Error(`GET ${endpoint} failed`);
        return res.json();
    },
    post: async (endpoint: string, body: any) => {
        const res = await fetchWithAuth(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`POST ${endpoint} failed`);
        return res.json();
    },
};

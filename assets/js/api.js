const CINA_API_BASE = "https://seriously-classic-repeated-sep.trycloudflare.com/v1";

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${CINA_API_BASE}${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.token
                ? { Authorization: `Bearer ${options.token}` }
                : {})
        },
        body: options.body
            ? JSON.stringify(options.body)
            : undefined
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        throw new Error(
            data?.error?.message ||
            data?.message ||
            `API request failed: ${response.status}`
        );
    }

    return data;
}

const CinaAPI = {
    signup(data) {
        return apiRequest("/auth/signup", {
            method: "POST",
            body: data
        });
    },

    login(data) {
        return apiRequest("/auth/login", {
            method: "POST",
            body: data
        });
    },

    getModels(apiKey) {
        return apiRequest("/models", {
            token: apiKey
        });
    },

    getModel(modelId, apiKey) {
        return apiRequest(`/models/${encodeURIComponent(modelId)}`, {
            token: apiKey
        });
    },

    chat(messages, apiKey, options = {}) {
        return apiRequest("/chat/completions", {
            method: "POST",
            token: apiKey,
            body: {
                model: options.model || "cina-1",
                messages,
                temperature: options.temperature ?? 0.7,
                max_tokens: options.max_tokens || 500,
                stream: false
            }
        });
    },

    createApiKey(data, jwt) {
        return apiRequest("/api-keys", {
            method: "POST",
            token: jwt,
            body: data
        });
    },

    getApiKeys(jwt) {
        return apiRequest("/api-keys", {
            token: jwt
        });
    },

    revokeApiKey(id, jwt) {
        return apiRequest(`/api-keys/${encodeURIComponent(id)}`, {
            method: "DELETE",
            token: jwt
        });
    }
};

window.CinaAPI = CinaAPI;

import type { BaseResponse } from "../Utils";

export interface TopPost {
  postId: string;
  count: number;
}

export async function fetchTopPostsByClicksUsingQuery(): Promise<
  BaseResponse<TopPost[]>
> {
  const projectId = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_PROJECT_ID;
  const url = `${
    import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST
  }/api/projects/${projectId}/query`;

  const payload = {
    query: {
      kind: "HogQLQuery",
      query: `
        SELECT 
          JSONExtractString(properties, 'post_id') AS postId, 
          COUNT(*) AS count 
        FROM events 
        WHERE event = 'post_clicked'
        GROUP BY postId
        ORDER BY count DESC
        LIMIT 5
      `,
    },
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_API_KEY
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseJson = await response.json();

  return {
    status: response.status,
    data: responseJson.results ?? responseJson,
    error: null,
    args: { url, options: requestOptions },
    responseHeaders: response.headers,
  };
}

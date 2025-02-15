/* eslint-disable */
// THIS FILE WAS GENERATED
// ALL CHANGES WILL BE OVERWRITTEN

// INFRASTRUCTURE START
  export type StandardError = globalThis.Error;
  export type Error500s = 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
  export type ErrorStatuses = 0 | Error500s;
  export type ErrorResponse = FetchResponse<unknown, ErrorStatuses>;

  export type FetchResponseOfError = {
    data: null;
    error: StandardError;
    status: ErrorStatuses;
    args: FetchArgs;
  };

  export type FetchResponseOfSuccess<TData, TStatus extends number = 0> = 
  {
    data: TData;
    error: null;
    status: TStatus;
    args: FetchArgs;
    responseHeaders: Headers;
  };

  export type FetchResponse<TData, TStatus extends number = 0> = 
    TStatus extends ErrorStatuses ? FetchResponseOfError: FetchResponseOfSuccess<TData, TStatus>;

  export type TerminateRequest = null;
  export type TerminateResponse = null;

  export type Configuration = {
    apiUrl: string | (() => string);
    jwtKey: string | undefined | (() => string | null | undefined);
    requestMiddlewares?: Array<{
      name: string;
      fn: (request: FetchArgs) => FetchArgs | TerminateRequest;
    }>;
    responseMiddlewares?: Array<{
      name: string;
      fn: <TData, TStatus extends number>(
        response: FetchResponse<TData, TStatus>,
      ) => FetchResponse<TData, TStatus> | TerminateResponse;
    }>;
  };

  let CONFIG: Configuration = {
    apiUrl: () => "",
    jwtKey: undefined,
    requestMiddlewares: [],
    responseMiddlewares: [],
  };

  export function setupClient(configuration: Configuration) {
    CONFIG = {
      ...CONFIG,
      ...configuration,
      requestMiddlewares: [
        ...(CONFIG.requestMiddlewares || []),
        ...(configuration.requestMiddlewares || []),
      ],
      responseMiddlewares: [
        ...(CONFIG.responseMiddlewares || []),
        ...(configuration.responseMiddlewares || []),
      ],
    };
  }

  export function getApiUrl() {
    if (typeof CONFIG.apiUrl === "function") {
      return CONFIG.apiUrl();
    }
    return CONFIG.apiUrl;
  }

  export type Termination = {
    termination: {
      name: string;
    };
  };

  export function processRequestWithMiddlewares(
    request: FetchArgs
  ): FetchArgs | Termination {
    for (const middleware of CONFIG.requestMiddlewares || []) {
      try {
        const middlewareResponse = middleware.fn(request);
        if (middlewareResponse === null) {
          return { termination: { name: middleware.name } };
        }
        return middlewareResponse;
      } catch (e) {
        console.error("Request middleware error", e);
      }
    }
    return request;
  }

  export function processResponseWithMiddlewares<TData, TStatus extends number>(
    response: FetchResponse<TData, TStatus>,
  ): FetchResponse<TData, TStatus | 0> {
    for (const middleware of CONFIG.responseMiddlewares || []) {
      try {
        const middlewareResponse = middleware.fn(response);
        if (middlewareResponse === null) {
          return {
            status: 0,
            args: response.args,
            data: null,
            error: new Error(
              `Response terminated by middleware: ${middleware.name}`
            ),
          } satisfies FetchResponseOfError;
        }
        response = middlewareResponse;
      } catch (e) {
        console.error("Response middleware error", e);
      }
    }
    return response;
  }

  export type FetchArgsOptions = Omit<RequestInit, "method" | "redirect" | "body">;

  export type FetchArgs = {
    url: string;
    options: RequestInit;
  }

  export type UriComponent = string | number | boolean;
  export type ParamsObject = {
    [key: string]: UriComponent | UriComponent[] | undefined | null;
  };

  export async function fetchJson<TData>(args: FetchArgs): Promise<FetchResponse<TData, number> | FetchResponseOfError> {
    const errorResponse = (error: StandardError, status: number, args: FetchArgs) => {  
      const errorResponse = {
        status: status as ErrorStatuses,
        args,
        data: null,
        error,
      } satisfies FetchResponseOfError;

      return processResponseWithMiddlewares(errorResponse);
    };

    const errorStatus = (args: FetchArgs) => {
      const errorResponse = {
        status: 0,
        args,
        data: null,
        error: new Error("Network error"),
      } satisfies FetchResponseOfError;

      return processResponseWithMiddlewares(errorResponse);
    };

    try {
      const fetchRequest = processRequestWithMiddlewares(args);

      if ("termination" in fetchRequest) {
        const terminationResponse = {
          status: 0,
          args,
          data: null,
          error: new Error(
            `Request terminated by middleware: ${fetchRequest.termination.name}`
          ),
        } satisfies FetchResponseOfError;

        return processResponseWithMiddlewares(terminationResponse);
      }

      const fetchResponse: Response = await fetch(fetchRequest.url, fetchRequest.options);
      const status = fetchResponse.status;
      try {
        const json = await fetchResponse.json();
        const response = {
          data: json,
          status: fetchResponse.status,
          args,
          error: null,
          responseHeaders: fetchResponse.headers,
        };
        return processResponseWithMiddlewares(response);
      } catch (error) {
        return errorResponse(error as StandardError, status, args);
      }
    } catch {
      return errorStatus(args);
    }
  }

  export function getJwtKey(): string | null | undefined {
    if (typeof CONFIG.jwtKey === "function") {
      return CONFIG.jwtKey();
    }

    if (typeof CONFIG.jwtKey === "string") {
      return localStorage.getItem(CONFIG.jwtKey);
    }

    return undefined;
  } 
  
  
 function getApiRequestData<Type extends any>(
    requestContract: Type | undefined,
    isFormData: boolean = false
  ): FormData | Type | {} {
  
    if (!isFormData) {
      return requestContract !== undefined ? requestContract : {};
    }
  
    //multipart/form-data
    const formData = new FormData();
  
     if (requestContract) {
      Object.keys(requestContract).forEach(key => {
        const value = requestContract[key as keyof Type];
        const isKeyArrayAndValueIterable = key.endsWith('[]') && typeof (value as any)[Symbol.iterator] === 'function';
        const values = isKeyArrayAndValueIterable ? Array.from(value as Iterable<any>) : [value];
          for (const val of values) {
              if (val === undefined) {
                  continue;
              }
              if (val === null) {
                  formData.append(key, '');
              } else if (val instanceof File) {
                  formData.append(key, val);
              } else if (typeof val === 'object' && val !== null) {
                  formData.append(key, JSON.stringify(val));
              } else {
                  formData.append(key, val);
              }
          }
      });
    }
  
    return formData;
  }

  
function updateHeaders(headers: HeadersInit) {
  const token = getJwtKey();
  if (headers instanceof Headers) {
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }
    if (!headers.has("Authorization") && !!token) {
      headers.append("Authorization", token);
    }
    return;
  }

  if (Array.isArray(headers)) {
    if (!headers.find(([key]) => key === "Content-Type")) {
      headers.push(["Content-Type", "application/json"]);
    }
    if (!headers.find(([key]) => key === "Authorization") && !!token) {
      headers.push(["Authorization", token]);
    }
    return;
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (!headers.Authorization && !!token) {
    headers.Authorization = token;
  }
}

function removeContentTypeHeader(headers: HeadersInit) {
  if (headers instanceof Headers) {
    headers.delete("Content-Type");
    return;
  }

  if (Array.isArray(headers)) {
    return headers.filter(([key]) => key !== "Content-Type");
  }

  delete headers["Content-Type"];
}

export function createRequest<TRequest>(
  method: string,
  request: TRequest | undefined,
  options: FetchArgsOptions | undefined,
  url: string,
  paramsObject: ParamsObject = {},
) {
  const fetchOptions = options ?? {};

  if (!fetchOptions.headers) {
    fetchOptions.headers = new Headers();
  }

  updateHeaders(fetchOptions.headers);
  if (request instanceof FormData) {
    removeContentTypeHeader(fetchOptions.headers);
  }

  const body = request !== undefined || !(request instanceof FormData) ? JSON.stringify(request) : undefined;
  const maybeQueryString = getQueryParamsString(paramsObject);

  const requestOptions: RequestInit = {
    ...fetchOptions,
    method,
    body,
    redirect: "follow",
  };

  return { options: requestOptions, url: `${url}${maybeQueryString}` } as FetchArgs;
}

export function getQueryParamsString(paramsObject: ParamsObject = {}) {
	const queryString = Object.entries(paramsObject)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(
            val,
          )}`)
          .join('&');
      }
      // Handling non-array parameters
      return value !== undefined && value !== null 
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` 
        : '';
    })
    .filter(part => part !== '')
    .join("&");

	return queryString.length > 0 ? `?${queryString}` : '';
}

export function apiPost<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("POST", request, options, url, paramsObject));
}

export function apiGet<TResponse extends FetchResponse<unknown, number>>(
  url: string,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("GET", undefined, options, url, paramsObject));
}

export function apiPut<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("PUT", request, options, url, paramsObject));
}

export function apiDelete<TResponse extends FetchResponse<unknown, number>>(
  url: string,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("DELETE", undefined, options, url, paramsObject));
}

export function apiPatch<TResponse extends FetchResponse<unknown, number>, TRequest>(
  url: string,
  request: TRequest,
  options: FetchArgsOptions | undefined,
  paramsObject: ParamsObject = {}
) {
  return fetchJson<TResponse>(createRequest("PATCH", request, options, url, paramsObject));
}
// INFRASTRUCTURE END

export type CommentDTO = {
	id: number;
	body?: string | null;
	createdAt: string;
	user: UserDTO;
};

export type CreateCommentDTO = {
	postId: number;
	body: string;
};

export type CreatePostDTO = {
	title?: string | null;
	body?: string | null;
	imageUrl?: string | null;
};

export type EditPostDto = {
	title?: string | null;
	body?: string | null;
	imageUrl?: string | null;
	status: PostStatus;
};

export type LoginDTO = {
	token?: string | null;
	expiration: string;
	refreshToken?: string | null;
	isAdmin: boolean;
};

export type LoginModel = {
	username?: string | null;
	password?: string | null;
};

export type PostDTO = {
	id: number;
	title?: string | null;
	body?: string | null;
	user: UserDTO;
	createdAt: string;
	imageUrl?: string | null;
};

export enum PostStatus {
	Draft = "Draft",
	Pending = "Pending",
	Published = "Published",
	Archived = "Archived"
};

export type RegisterModel = {
	username?: string | null;
	email?: string | null;
	password?: string | null;
};

export type TokenModel = {
	accessToken?: string | null;
	refreshToken?: string | null;
};

export type UserDTO = {
	id?: string | null;
	username?: string | null;
	email?: string | null;
	phoneNumber?: string | null;
	roles?: string[] | null;
};

export type PostApiAuthRegisterFetchResponse = 
| FetchResponse<void, 200> 
| ErrorResponse;

export const postApiAuthRegisterPath = () => `/api/Auth/Register`;

export const postApiAuthRegister = (requestContract: RegisterModel, options?: FetchArgsOptions):
  Promise<PostApiAuthRegisterFetchResponse> => {
    const requestData = getApiRequestData<RegisterModel>(requestContract, false);

    return apiPost(`${getApiUrl()}${postApiAuthRegisterPath()}`, requestData, options) as Promise<PostApiAuthRegisterFetchResponse>;
}

export type PostApiAuthLoginFetchResponse = 
| FetchResponse<LoginDTO, 200> 
| ErrorResponse;

export const postApiAuthLoginPath = () => `/api/Auth/Login`;

export const postApiAuthLogin = (requestContract: LoginModel, options?: FetchArgsOptions):
  Promise<PostApiAuthLoginFetchResponse> => {
    const requestData = getApiRequestData<LoginModel>(requestContract, false);

    return apiPost(`${getApiUrl()}${postApiAuthLoginPath()}`, requestData, options) as Promise<PostApiAuthLoginFetchResponse>;
}

export type PostApiAuthRefreshTokenFetchResponse = 
| FetchResponse<LoginDTO, 200> 
| ErrorResponse;

export const postApiAuthRefreshTokenPath = () => `/api/Auth/RefreshToken`;

export const postApiAuthRefreshToken = (requestContract: TokenModel, options?: FetchArgsOptions):
  Promise<PostApiAuthRefreshTokenFetchResponse> => {
    const requestData = getApiRequestData<TokenModel>(requestContract, false);

    return apiPost(`${getApiUrl()}${postApiAuthRefreshTokenPath()}`, requestData, options) as Promise<PostApiAuthRefreshTokenFetchResponse>;
}

export type PostApiAuthLogoutFetchResponse = 
| FetchResponse<void, 200> 
| ErrorResponse;

export const postApiAuthLogoutPath = () => `/api/Auth/Logout`;

export const postApiAuthLogout = (options?: FetchArgsOptions):
  Promise<PostApiAuthLogoutFetchResponse> => {
    const requestData = getApiRequestData<object>(undefined, false);

    return apiPost(`${getApiUrl()}${postApiAuthLogoutPath()}`, requestData, options) as Promise<PostApiAuthLogoutFetchResponse>;
}

export type PostApiCommentsFetchResponse = 
| FetchResponse<CommentDTO, 200> 
| ErrorResponse;

export const postApiCommentsPath = () => `/api/Comments`;

export const postApiComments = (requestContract: CreateCommentDTO, options?: FetchArgsOptions):
  Promise<PostApiCommentsFetchResponse> => {
    const requestData = getApiRequestData<CreateCommentDTO>(requestContract, false);

    return apiPost(`${getApiUrl()}${postApiCommentsPath()}`, requestData, options) as Promise<PostApiCommentsFetchResponse>;
}

export type GetApiCommentsPostPostIdFetchResponse = 
| FetchResponse<CommentDTO[], 200> 
| ErrorResponse;

export const getApiCommentsPostPostIdPath = (postId: number) => `/api/Comments/post/${postId}`;

export const getApiCommentsPostPostId = (postId: number, options?: FetchArgsOptions):
  Promise<GetApiCommentsPostPostIdFetchResponse> => {
    return apiGet(`${getApiUrl()}${getApiCommentsPostPostIdPath(postId)}`, options, {}) as Promise<GetApiCommentsPostPostIdFetchResponse>;
}

export type GetApiPostsFetchResponse = 
| FetchResponse<PostDTO[], 200> 
| ErrorResponse;

export const getApiPostsPath = () => `/api/Posts`;

export const getApiPosts = (options?: FetchArgsOptions):
  Promise<GetApiPostsFetchResponse> => {
    return apiGet(`${getApiUrl()}${getApiPostsPath()}`, options, {}) as Promise<GetApiPostsFetchResponse>;
}

export type PostApiPostsFetchResponse = 
| FetchResponse<PostDTO, 200> 
| ErrorResponse;

export const postApiPostsPath = () => `/api/Posts`;

export const postApiPosts = (requestContract: CreatePostDTO, options?: FetchArgsOptions):
  Promise<PostApiPostsFetchResponse> => {
    const requestData = getApiRequestData<CreatePostDTO>(requestContract, false);

    return apiPost(`${getApiUrl()}${postApiPostsPath()}`, requestData, options) as Promise<PostApiPostsFetchResponse>;
}

export type GetApiPostsIdFetchResponse = 
| FetchResponse<PostDTO, 200> 
| ErrorResponse;

export const getApiPostsIdPath = (id: number) => `/api/Posts/${id}`;

export const getApiPostsId = (id: number, options?: FetchArgsOptions):
  Promise<GetApiPostsIdFetchResponse> => {
    return apiGet(`${getApiUrl()}${getApiPostsIdPath(id)}`, options, {}) as Promise<GetApiPostsIdFetchResponse>;
}

export type DeleteApiPostsIdFetchResponse = 
| FetchResponse<void, 200> 
| ErrorResponse;

export const deleteApiPostsIdPath = (id: number) => `/api/Posts/${id}`;

export const deleteApiPostsId = (id: number, options?: FetchArgsOptions):
  Promise<DeleteApiPostsIdFetchResponse> => {
    return apiDelete(`${getApiUrl()}${deleteApiPostsIdPath(id)}`, options, {}) as Promise<DeleteApiPostsIdFetchResponse>;
}

export type PutApiPostsIdFetchResponse = 
| FetchResponse<void, 200> 
| ErrorResponse;

export const putApiPostsIdPath = (id: number) => `/api/Posts/${id}`;

export const putApiPostsId = (requestContract: EditPostDto, id: number, options?: FetchArgsOptions):
  Promise<PutApiPostsIdFetchResponse> => {
    const requestData = getApiRequestData<EditPostDto>(requestContract, false);

    return apiPut(`${getApiUrl()}${putApiPostsIdPath(id)}`, requestData, options) as Promise<PutApiPostsIdFetchResponse>;
}

export type GetApiUserProfileFetchResponse = 
| FetchResponse<UserDTO, 200> 
| ErrorResponse;

export const getApiUserProfilePath = () => `/api/User/Profile`;

export const getApiUserProfile = (options?: FetchArgsOptions):
  Promise<GetApiUserProfileFetchResponse> => {
    return apiGet(`${getApiUrl()}${getApiUserProfilePath()}`, options, {}) as Promise<GetApiUserProfileFetchResponse>;
}

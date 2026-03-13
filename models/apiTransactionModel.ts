export interface HeaderItem {
  name: string;
  value: string;
}

export interface ApiTransactionModel<TRequest, TResponse = unknown> {
  method: string;
  url: string;
  requestHeaders: Record<string, string>;
  requestBody: TRequest;
  responseStatus: number;
  responseHeaders: HeaderItem[];
  responseBody: TResponse;
}
type StepLike = {
  attach: (
    name: string,
    options: { body: string; contentType: string }
  ) => Promise<void>;
};

export class ApiReportHelper {
  private static pretty(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }

  public static async attachTransaction<TRequest, TResponse>(
    step: StepLike,
    tx: {
      method: string;
      url: string;
      requestHeaders: Record<string, string>;
      requestBody: TRequest;
      responseStatus: number;
      responseHeaders: unknown;
      responseBody: TResponse;
    }
  ): Promise<void> {
    await step.attach("PreRequest", {
      body: this.pretty({
        method: tx.method,
        url: tx.url,
        responseStatus: tx.responseStatus
      }),
      contentType: "application/json"
    });

    await step.attach("Request Headers", {
      body: this.pretty(tx.requestHeaders),
      contentType: "application/json"
    });

    await step.attach("Request Body", {
      body: this.pretty(tx.requestBody),
      contentType: "application/json"
    });

    await step.attach("Response Headers", {
      body: this.pretty(tx.responseHeaders),
      contentType: "application/json"
    });

    await step.attach("Response Body", {
      body: this.pretty(tx.responseBody),
      contentType: "application/json"
    });
  }
}
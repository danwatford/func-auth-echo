import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const header = req.headers["x-ms-client-principal"];
  if (header) {
    // Client-principal header found. It is in base64 format so needs to be converted to ascii before parsing as JSON.
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);

    context.res = {
      body: {
        clientPrincipal,
      },
    };
  } else {
    // No client-principal header found. This is not an authenticated request.
    context.res = {
      body: {
        clientPrincipal: "None",
      },
    };
  }
};

export default httpTrigger;

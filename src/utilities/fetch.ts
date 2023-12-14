import Cookies from "js-cookie";

export async function request<Data extends object>(
  path: string,
  opts: RequestInit = {},
  raw: boolean = false,
): Promise<Data> {
  if (typeof path !== "string") {
    throw new Error("First argument must be a string");
  }

  const mergedPath = path.startsWith("http")
    ? path
    : `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  const token = Cookies.get("token");
  const mergedOpts = opts;

  if (
    typeof token === "string" &&
    token.length > 0 &&
    !path.startsWith("https://api.cloudinary.com")
  ) {
    mergedOpts.headers = { Authorization: token, ...opts.headers };
  }

  const response = await fetch(mergedPath, mergedOpts);
  const result = (await response.json()) as { success: boolean; data: Data };

  if (result.success) {
    if (raw) return result;
    return result.data;
  } else if (
    result.verified_email ||
    "exists" in result ||
    result.type === "upload"
  ) {
    return result;
  } else {
    console.error(path, result);
    throw new Error("something went wrong");
  }
}

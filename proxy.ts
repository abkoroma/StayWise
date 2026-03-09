import { auth } from "./app/_lib/auth";

export { auth as proxy }

export const config = {
    matcher: ["/account"],
}
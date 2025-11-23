import { auth } from "./app/_lib/auth";

export { auth as middleware }

export const config = {
    matcher: ["/account"],
}
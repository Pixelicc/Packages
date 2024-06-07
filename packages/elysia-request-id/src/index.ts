/**
 * Contains all main Exports of the Elysia-Request-ID Module
 *
 * @module
 */

import { Elysia } from "elysia";
import { ulid } from "ulidx";

/**
 * X-Request-ID types supported by this package
 *
 * @type
 *
 * @default "ULID"
 */
export type RequestIDType = "UUID" | "ULID";

/**
 * Elysia plugin which automatically attaches the `X-Request-ID` header to every request
 *
 */
export const requestID = (type?: RequestIDType): Elysia => {
  const app = new Elysia({
    name: "@pixelic/elysia-request-id",
    seed: type,
  });
  return app.onRequest(({ set }) => {
    set.headers["X-Request-ID"] = type === "UUID" ? crypto.randomUUID() : ulid();
  });
};

// File sourced from https://github.com/4lejandrito/next-plausible
// (with modifications)

import * as React from "react";
import config from "../config";

export const PlausibleSnippet: React.FC = () =>
  process.env.NODE_ENV === "production" ? (
    <script
      async
      defer
      data-domain={config.meta.domain}
      src="https://plausible.io/js/plausible.js"
    />
  ) : null;

type Props = Record<string, unknown> | never;
type EventOptions<P extends Props> = {
  props: P;
  callback?: VoidFunction;
};
type EventOptionsTuple<P extends Props> = P extends never
  ? [Omit<EventOptions<P>, "props">?]
  : [EventOptions<P>];
type Events = { [K: string]: Props };

export const usePlausible = <E extends Events = any>() => <N extends keyof E>(
  eventName: N,
  ...rest: EventOptionsTuple<E[N]>
) => (window as any).plausible?.(eventName, rest[0]);

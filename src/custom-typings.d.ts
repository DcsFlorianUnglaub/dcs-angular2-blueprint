declare var ENV: string;
declare var HMR: boolean;

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor extends ErrorStackTraceLimit {}

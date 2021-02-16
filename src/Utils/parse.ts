export function parse(string: string): string[] {
  const args: string[] = [];

  getNextArg(string);
  function getNextArg(str: string) {
    if (str.startsWith('"')) {
      const i = str.indexOf('"', 2);
      args.push(str.substring(1, i > 0 ? i : str.length));
      if (i > 0) getNextArg(str.substring(i + 1).trim());
    } else {
      const i = str.indexOf(' ', 1);
      args.push(str.substring(0, i > 0 ? i : str.length));
      if (i > 0) getNextArg(str.substring(i + 1).trim());
    }
  }

  return args;
}
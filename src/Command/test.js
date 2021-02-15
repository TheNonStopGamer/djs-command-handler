function parse(str) {
  const args = [];

  function getNextArg(str) {
    if (str.startsWith())
  }
  while (str) {
    if (str.startsWith('"')) {
      const i = str.indexOf('"', 2);
      if (i > 1) {
        args.push(str.substring(1, i));
        str = str.substring((i + 1) || 0).trim();
      }
    } else {
      const i = str.indexOf(' ');
      if (i > 1) args.push(str.substring(0, i + 1 ? i : str.length));
      str = str.substring((i + 1) || str.length).trim();
      console.log(str, i, args);
    }
  }

  console.log(args);
}


parse(',man "i don\'t even know" but like i legit "don\'t know');
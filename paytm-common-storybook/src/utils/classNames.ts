/**
 * It accepts strings, objects as arguments, and returns a class string
 * e.g
 * 1. classNames('c1', 'c2', 'c3') => 'c1 c2 c3'
 * 2. classNames('c1', {c2: true, c3: false}) => 'c1 c2'
 * @returns {string}
 */
const classNames = function (...args: any[]) {
  const classes = args.reduce((acc: string[], val) => {
    if (typeof val === "string") {
      acc.push(val);
    } else if (typeof val === "object" && Object.keys(val).length) {
      for (const key in val) {
        if (val.hasOwnProperty(key) && val[key]) {
          acc.push(key);
        }
      }
    }
    return acc;
  }, []);
  return classes.join(" ");
};

export default classNames;

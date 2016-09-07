
const files = [
  "first-article"
];

const articles = (() => files.map((file) => require("./" + file)))();

export default articles;


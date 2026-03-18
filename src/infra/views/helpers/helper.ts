import handlebars from "handlebars";
handlebars.registerHelper("includes", function (array, value) {
  return array && array.includes(value);
});
handlebars.registerHelper("eq", (a: string, b: string) => a === b);
handlebars.registerHelper("join", function (array, separator) {
  return Array.isArray(array) ? array.join(separator) : "";
});

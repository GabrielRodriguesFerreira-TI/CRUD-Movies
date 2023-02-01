export function typeOf(type: string = "", value: unknown) {
  const toStringResult = Object.prototype.toString
    .call(value)
    .toLowerCase()
    .replace(/[\[\]']/g, "")
    .split(" ")[1];
  return type === toStringResult;
}

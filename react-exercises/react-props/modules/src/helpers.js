function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function remove(items, item) {
  const i = items.findIndex((elem) => elem === item);
  return i !== -1 ? items.splice(i, 1) : undefined;
}

export { choice, remove };

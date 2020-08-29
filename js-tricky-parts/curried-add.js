function curriedAdd(total) {
  if (!total) return 0;

  return function add(num) {
    if (!num) return total;
    total += num;
    return add;
  };
}

module.exports = { curriedAdd };

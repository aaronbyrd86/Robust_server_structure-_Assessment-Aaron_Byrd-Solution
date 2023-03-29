const uses = require("../data/uses-data");

function useExists(req, res, next) {
  const useId = Number(req.params.useId);
  const foundUse = uses.find((use) => use.id === useId);

  if (foundUse) {
    res.locals.use = foundUse;
    next();
  }
  next({
    status: 404,
    message: `Use id not found: ${req.params.useId}`,
  });
}

function list(req, res) {
  const { urlId } = req.params;
  res.json({
    data: uses.filter(urlId ? (use) => use.urlId == urlId : () => true),
  });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy]
};

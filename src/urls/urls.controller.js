const urlsData = require("../data/urls-data");
const uses = require("../data/uses-data");

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urlsData.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `URL id not found: ${req.params.urlId}`,
  });
}

function hasHref(req, res, next) {
    const { data: { href } = {} } = req.body;
  
    if (href) {
      return next();
    }
    next({ status: 400, message: "An 'href' property is required." });
  }

function list(req, res) {
  res.json({ data: urlsData });
}

function create(req, res, next) {
  const {
    data: { href },
  } = req.body;

  const newUrl = {
    id: urlsData.length + 1,
    href,
  };

  urlsData.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function update(req, res) {
    const {data: {href} = {}} = req.body;

    res.locals.url.href = href; 

    res.json({data: res.locals.url})
}

function read(req, res, next) {
  const newUse = {
    id: uses.length + 1,
    urlId: Number(req.params.urlId),
    time: Date.now()
  }  
  uses.push(newUse);
  res.json({ data: res.locals.url });
}

module.exports = {
  list,
  read: [urlExists, read],
  update: [urlExists, hasHref, update],
  create: [hasHref, create],
  urlExists
};

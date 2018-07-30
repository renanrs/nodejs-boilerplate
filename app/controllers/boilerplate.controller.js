const _example = ( req, res, next ) => {
  const exampleId = req.params.exampleId;

  res.status( 200 ).json({
    id: `${exampleId}`,
    message: 'Vai corinthians'
  });

  next();
};

module.exports = {
  example: _example
};
module.exports = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({message: err.message})
  } else if (err.name === `SequelizeValidationError`) {
    return res.status(400).json({message: err.errors[0].message})
  } else { 
    return res.status(500).json({message: err.message})
  }
}
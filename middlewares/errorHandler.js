module.exports = (err, req, res, next) => {
  if (err) {
    if (err.name === 'SequelizeValidationError') {
      let errorMessage = err.errors.map((err) => {
        return {
          message: err.message,
        };
      });
      res.status(400).json(errorMessage);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      let errorMessage = err.errors.map((err) => {
        return {
          message: err.message,
        };
      });
      res.status(400).json([errorMessage]);
    } else if (err.name === 'LoginValidation') {
      res.status(422).json([{ message: 'Must provide email and password' }]);
    } else if (err.name === 'RegisterValidation') {
      res
        .status(400)
        .json([
          { message: 'Must provide first_name, last_name, email and password' },
        ]);
    } else if (err.name === 'OrgValidation') {
      res.status(400).json([{ message: 'Name organization is required' }]);
    } else if (err.name === 'LoginFailed') {
      res.status(400).json([{ message: 'Invalid email or password' }]);
    } else if (err.name === 'NotFound') {
      res.status(404).json([{ message: `${err.attr} not found` }]);
    } else if (err.name === 'Auth') {
      res.status(401).json([{ message: 'You must be logged in.' }]);
    } else if (err.name === 'Member') {
      res.status(400).json([{ message: 'User is already member' }]);
    } else if (err.name === 'NotAdmin') {
      if (err.attr === 0) {
        res.status(403).json([
          {
            message: 'You are not Admin',
          },
        ]);
      } else if (err.attr === 1) {
        res.status(400).json([
          {
            message:
              'Admin cannot remove, change role to member for remove member',
          },
        ]);
      }
    } else if (err.name === 'NotMember') {
      res.status(403).json([
        {
          message: 'You are not member',
        },
      ]);
    } else if (err.name === 'NotOwner') {
      res.status(403).json([
        {
          message: 'You are not owner task',
        },
      ]);
    } else if (err.name === 'BoardValidation') {
      res
        .status(400)
        .json([{ message: 'Name and OrganizationId is Required' }]);
    } else {
      console.log(err);
      res.status(500).json([{ message: 'Internal Server Error', error: err }]);
    }
  }
};

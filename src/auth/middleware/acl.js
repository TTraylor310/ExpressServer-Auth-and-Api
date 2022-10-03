'use strict';

module.exports = (permission) => {
  return (req, res, next) => {
    try {
      if (req.user.permissions.includes(permission)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (e) {
      console.error('Error in acl.js:', e.message);
      next('Invalid Login');
    }
  };
};

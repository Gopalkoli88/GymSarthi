 // middleware/role.js
const checkRole = (role) => {
    return (req, res, next) => {
      // Check if req.user exists (set by authMiddleware)
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No user authenticated' });
      }
  
      // Check if the user's role matches the required role
      if (req.user.role !== role) {
        return res.status(403).json({ 
          success: false, 
          message: `Forbidden: Requires ${role} role, but user is ${req.user.role}` 
        });
      }
  
      // If role matches, proceed to the next middleware/route handler
      next();
    };
  };

  module.exports={checkRole};
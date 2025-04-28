// backend/middleware/headerValidation.js

module.exports = function headerValidation(req, res, next) {
    // Get the IP from the header or from the request
    const ip = req.header('X-Forwarded-For') || req.connection.remoteAddress;
  
    // Allow localhost (127.0.0.1 or ::1) and other trusted local IPs
    const trustedIps = ['::ffff:127.0.0.1', '127.0.0.1', '::1'];  // Add any other trusted IPs here
  
    console.log("Request IP:", ip);  // Debug log to see the IP
  
    if (!trustedIps.includes(ip)) {
      return res.status(403).json({ message: 'Forbidden: IP not trusted' });
    }
  
    next();  // Proceed to the next middleware or route handler
  };
  
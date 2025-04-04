const checkPlanStatus = async (req, res, next) => {
    const userId = req.user.id; // Assuming user is authenticated
    const member = await Member.findById(userId);
  
    if (!member) return res.status(404).json({ message: "Member not found" });
  
    // Check if plan expired
    if (new Date() > new Date(member.planExpiry)) {
      member.status = "inactive";
      await member.save();
      return res.status(403).json({ message: "Your plan has expired. Please renew to access." });
    }
  
    next();
  };
  
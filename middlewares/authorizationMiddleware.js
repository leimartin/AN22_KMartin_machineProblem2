// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const authorizeAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Not authorized' });
    }
    next();
};

module.exports = { authorizeAdmin };
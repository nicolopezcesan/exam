module.exports.responseFilenamesListMiddleware = async (req, res) => {
    res.status(200).json({ status: 'OK', data: req.filenamesList });
}
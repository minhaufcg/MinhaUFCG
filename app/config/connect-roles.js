const ConnectRoles = require('connect-roles');
const RestHelper = require('../helpers/rest-helper')

const user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        var message = 'Access Denied - You don\'t have permission to: ' + action;
        RestHelper.sendJsonResponse(res, 403, {"message": message});
    }
});

user.use('access admin route', function (req) {
    return req.user.isAdmin;
});

module.exports = user;

module.exports = function ValidationError(message) 
{
    this.name = 'ValidationError'
    this.status = 400
    this.message = message
};
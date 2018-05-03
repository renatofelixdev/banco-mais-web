export default class Notification{
    constructor(status = '', message = '') {

        this.status = status;
        this.message = message;
        this.validators = {};
    }
}
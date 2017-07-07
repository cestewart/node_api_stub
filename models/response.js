'use strict';

module.exports = {
    success: true,
    data: {},
    messages: [ ],
    reset: function() {
        this.success = true;
        this.data = {};
        this.messages = [];
    }
};

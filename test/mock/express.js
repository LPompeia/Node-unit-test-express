class AppMock {
    constructor() {
        this.gets = {}
        this.posts = {}
        this.uses = []

        //use case loggers etc
        //.....
    }

    get(name, handler) {
        if(handler) {
            this.get[name] = handler;
        } 
    } 
    
    post(name, handler) {
        this.post[name] = handler;
    }

    use(handler) { 
        this.uses.push(handler);
        this.errorHandler = handler;
    }

    send() { }
}

class ExpressRequestMock {
    constructor() {
        this.app = new AppMock();
        this.body = {}
        this.query = {}
    }

    get(key) {
        return this.query[key]
    }
}

class ExpressResponseMock {

    json(data) {
        this.data = JSON.stringify(data);
        return this;
    }

    render(viewName, data) {
        this.data = data;
        this.viewName = viewName;
        return this;
    }

    status(statusCode) {
        this.statusCode = statusCode;
        return this
    }
}


module.exports = {
    AppMock,
    ExpressRequestMock,
    ExpressResponseMock
}
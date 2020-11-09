function run(paramsOrCallback, optionsOrCallback, callback) {

    let params = (paramsOrCallback || {});

    let options = (optionsOrCallback || {});

    if (typeof paramsOrCallback === 'function') {

        callback = paramsOrCallback;

        params = {};

        options = {};

    }

    if (typeof optionsOrCallback === 'function') {

        callback = optionsOrCallback;

        options = {};

    }

    const rootUrl = options.rootUrl || 'https://script.googleapis.com/';

    const parameters = {

        options: Object.assign({

            url: (rootUrl + '/v1/scripts/{scriptId}:run').replace(/([^:]\/)\/+/g, '$1'),

            method: 'POST',

        }, options),

        params,

        requiredParams: ['scriptId'],

        pathParams: ['scriptId'],

        context: this.context,

    };

    if (callback) {

        googleapis_common_1.createAPIRequest(parameters, callback);

    }

    else {

        return googleapis_common_1.createAPIRequest(parameters);

    }

}
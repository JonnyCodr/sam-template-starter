import { APIGatewayProxyResult } from 'aws-lambda';
import { stat } from 'fs';

const response = {

    success: (statusCode: number = 200, headers: any = {}, data: any = {}): APIGatewayProxyResult => {

        const response: {
            statusCode: number;
            headers: any;
            body: any;
        } = {
            statusCode,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            }, body: JSON.stringify({})
        };

        if (statusCode !== 204) {
            response.body = JSON.stringify({
                error: {},
                data,
            });
        }

        return response;
    },

    error: (statusCode: number = 500, headers: any = {}, err?: Error): APIGatewayProxyResult => {
        console.log(err);

        const response: {
            statusCode: number;
            headers: any;
            body: any;
        } = {
            statusCode,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify({
                error: {},
                data: {},
            }),
        };

        if (statusCode === 500) {
            response.body = JSON.stringify({
                error: {
                    message:
                        'there was an internal server error. Please try again later. it the problem persists...keep trying',
                },
                data: {}
            });
        }

        if (statusCode === 500 && err.message) {
            response.body = JSON.stringify({
                error: {
                    message: err.message,
                },
                data: {},
            });
        }

        return response;
    },
};

export default response;
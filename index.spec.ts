'use strict';

import {expect} from 'chai';
import * as cmd from 'node-cmd';
import rewiremock from 'rewiremock';

let mockedId: string = "I'm mocked!!";

rewiremock('shortid').with(() => {
	return "I'm mocked!!";
} );
rewiremock.enable();

let server = require('./index.js')['default'];

describe("server", function() {
	this.timeout(7000);

	before( (done) => {
		(server as any).listen(4000, '127.0.0.1', done);
	});

	after( (done) => {
		(server as any).close(done);
		rewiremock.disable()
	} );

	it('should give text shortid', async () => {
		await new Promise ((resolve, reject) => {
			cmd.get(`curl http://127.0.0.1:4000`, (err: Error, mess: string) => {
				expect(mess).to.be.equal(mockedId);
				resolve();
			});
		});
	});
});

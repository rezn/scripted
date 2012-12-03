/*******************************************************************************
 * @license
 * Copyright (c) 2012 VMware, Inc. All Rights Reserved.
 * THIS FILE IS PROVIDED UNDER THE TERMS OF THE ECLIPSE PUBLIC LICENSE
 * ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS FILE
 * CONSTITUTES RECIPIENTS ACCEPTANCE OF THE AGREEMENT.
 * You can obtain a current copy of the Eclipse Public License from
 * http://www.opensource.org/licenses/eclipse-1.0.php
 *
 * Contributors:
 *     Scott Andrews
 *     Andrew Eisenberg
 ******************************************************************************/

var fs = require('fs');
var path = require('path');

var EDITOR_HTML = path.resolve(__dirname, '../../client/editor.html');
var CLIENT_TESTS_HTML = path.resolve(__dirname, '../../tests/client/scriptedClientTests.html');
var CLIENT_SERVER_TESTS_HTML = path.resolve(__dirname, '../../tests/client/scriptedClientServerTests.html');
var TEST_FILE = path.resolve(__dirname, '../../');


exports.install = function (app) {

	function sendEditor(req, res) {
		res.header('Content-Type', 'text/html');
		fs.createReadStream(EDITOR_HTML).pipe(res);
	}
	function sendClientTests(req, res) {
		try {
			console.log ("Handling client tests");
			res.header('Content-Type', 'text/html');
			fs.createReadStream(CLIENT_TESTS_HTML).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}
	function sendClientServerTests(req, res) {
		try {
			console.log ("Handling client server tests");
			res.header('Content-Type', 'text/html');
			fs.createReadStream(CLIENT_SERVER_TESTS_HTML).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}
	function sendTestFile(req, res) {
		try {
			console.log ("Handling test file: " + req.path);
			res.header('Content-Type', 'text/javascript');
			fs.createReadStream(TEST_FILE + req.path).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}



	app.get('/editor', sendEditor);
	app.get('/editor/:path(*)', sendEditor);

	app.get('/clientTests', sendClientTests);
	app.get('/clientServerTests', sendClientServerTests);
	app.get('/tests/:path(*)', sendTestFile);


};

var request = require("request"), 
	expect = require("chai").expect,
	baseUrl="http://localhose:3000";

	describe("to do app testing", function(){
		it("should return 200 when getting the data", function(done){
			request(baseUrl + "/todos", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
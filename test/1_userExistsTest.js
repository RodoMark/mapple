const chai = require('chai'); // 1
const assert = chai.assert;



// const data = {
//  1: {
//     user_id: 1,
//     name: 'Example',
//     email: 'example@domain.com',
//     password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
//   }
// }

const { userExists } = require('../helpers/userHelpers.js'); // 2

describe("#userExists(email)", function() { // 3

  it("should return true if email exists in database", function() { // 4
    const incomingEmail = 'example@domain.com'

    assert.equal(userExists(incomingEmail), true)

  });

  it("should return false if email doesn't exist in database", function() { // 4
    const incomingEmail = 'not@there.com'

    assert.equal(userExists(incomingEmail), false)


  });

});

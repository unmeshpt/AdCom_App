const db = require("../config/connection");
const collection = require("./table_collection");
const bcrypt = require("bcrypt");
const objectid = require("objectid");

module.exports = {
  //user signup
  signupUser: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let userexist = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Email: userData.Email });
      if (userexist) {
        response.userexist = true;
        resolve(response);
      } else {
        userData.Password = await bcrypt.hash(userData.Password, 10);
        if (userData.Password) {
          await db
            .get()
            .collection(collection.USER_COLLECTION)
            .insertOne(userData);
          response.status = true;
          response.userData = userData;
          resolve(response);
        }
      }
    });
  },

  //udate profile
  updateprofile: (userinfo) => {
    let Id = userinfo.UserId;
    var user = {};
    delete userinfo.UserId;
    user = userinfo;
    user.Avatar = Id;
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: objectid(Id) },
          {
            $set: user,
          }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },

  //find One
  fineOne: (userId) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: objectid(userId) });
      resolve(user);
    });
  },

  //user login
  loginUser: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Email: userData.Email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },

  //Admin Order Items

  addOrderitem: (item) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      await db
        .get()
        .collection(collection.ORDERITEMS_COLLECTION)
        .insertOne(item);
      response.status = true;
      resolve(response);
    });
  },

  getallOrderitems: () => {
    return new Promise(async (resolve, reject) => {
      let orderitems = await db
        .get()
        .collection(collection.ORDERITEMS_COLLECTION)
        .find()
        .toArray();
      resolve(orderitems);
    });
  },

  deleteOrdertype: (id) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      await db
        .get()
        .collection(collection.ORDERITEMS_COLLECTION)
        .deleteOne({ _id: objectid(id) })
        .then(response);
      response.status = true;
      resolve(response);
    });
  },

  //Client Request
  getallQuoterequest: (id) => {
    return new Promise(async (resolve, reject) => {
      let allrequestedQuote = await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .find({ UserId: id })
        .toArray();
      resolve(allrequestedQuote);
    });
  },

  deleteQuoterequest: (id) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .deleteOne({ _id: objectid(id) })
        .then(response);
      response.status = true;
      resolve(response);
    });
  },

  //Admin inbox
  getalladminQuoterequest: () => {
    return new Promise(async (resolve, reject) => {
      let allrequestedQuote = await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .find()
        .toArray();
      resolve(allrequestedQuote);
    });
  },

  //Admin inbox notification Count
  getcountQuoterequest: (readstatus) => {
    return new Promise(async (resolve, reject) => {
      let unreadCountQuote = await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .find({ Read: readstatus })
        .count();
      resolve(unreadCountQuote);
    });
  },

  //Add New ordertype
  sendquoterequest: (quoteDetails) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .insertOne(quoteDetails);
      response.status = true;
      resolve(response);
    });
  },


//for edit ordertype
getuserQuoterequest: (id) => {
    return new Promise(async (resolve, reject) => {
      let quoteInfo = await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .findOne({ _id: objectid(id) });
          resolve(quoteInfo);      
    });
  },
  
  //update order type

  updatequoterequest: (quoteinfo) => {
    let Id = quoteinfo.Id;
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.QUOTATIONREQUEST_COLLECTION)
        .updateOne(
          { _id: objectid(Id) },
          {
            $set: {
              "Ordertype":quoteinfo.Ordertype,
              "Requirements":quoteinfo.Requirements
            }
          }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },

  //   //Add New Todo
  //   addtodo: (todoData) => {
  //     return new Promise(async (resolve, reject) => {
  //       let response = {};
  //       await db.get().collection(collection.TODO_COLLECTION).insertOne(todoData);
  //       response.status = true;
  //       resolve(response);
  //     });
  //   },

  //   //List All Todos
  //   getalltodo: () => {
  //     return new Promise(async (resolve, reject) => {
  //       let alltodos = await db
  //         .get()
  //         .collection(collection.TODO_COLLECTION)
  //         .find()
  //         .toArray();
  //       resolve(alltodos);
  //     });
  //   },

  //   //List Selected Todo For Update
  //   getselectedtodo: (id) => {
  //     return new Promise(async (resolve, reject) => {
  //       db.get()
  //         .collection(collection.TODO_COLLECTION)
  //         .findOne({ _id: objectid(id) })
  //         .then((todo) => {
  //           resolve(todo);
  //         });
  //     });
  //   },
};

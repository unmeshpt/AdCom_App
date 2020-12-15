
module.exports = {
  //user signup
  checkRole: (userInfo) => {
    let roles=[]
    return new Promise((resolve, reject) => {
        if (userInfo.role === "CLIENT") {roles.push({ userClient: true })}
        if (userInfo.role === "ADMIN") {roles.push({ userAdmin: true })}
        if (userInfo.role === "STAFF") {roles.push({ userStaff: true })}
        if (userInfo.role === "SADMIN") {roles.push({ userSadmin: true })}
        resolve( roles)
    })
  }
};

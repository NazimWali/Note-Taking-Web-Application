const users = [
    {
        userId: 12345,
        userName: "nazim",
        password: "wali"
    },
    {
        userId: 12534,
        userName: "anthony",
        password: "ramirez"
    },
    {
        userId: 12212,
        userName: "justin",
        password: "boswell"
    }
];

let getUsers = () => users;

module.exports = { getUsers };
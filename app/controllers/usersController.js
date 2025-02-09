const { Op } = require("sequelize");
const User = require('../models/userSchema');

const usersController = {
    getAllUsers: async (req, res) => {
        const {offset, limit, search, orderBy, order} = req.query;
        let filter = {};
        if(search) {
            filter.where = {
                name: {
                    [Op.like]: `${search}%`,
                }
            }
        }
        if(orderBy) {
            if(order == 'desc') {
                filter.order = [[orderBy, order]]
            }
            else {
                filter.order = [[orderBy, 'ASC']]
            }
        }   
        if(offset) {
            filter.offset = offset;
        }
        if(limit) {
            filter.limit = limit;
        }
        try {
            const response = await User.findAll(filter);
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    getAllUsersCount: async (req, res) => {
        const {search} = req.query;
        let filter = {};
        if(search) {
            filter.where = {
                name: {
                    [Op.like]: `${search}%`,
                }
            }
        } 
        try {
            const response = await User.count(filter);
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }, 
    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await User.findByPk(id);
            // const response = await User.findOne({id});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        const {name, email} = req.body;
        try {
            const response = await User.create({name, email});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        const {id} = req.body
        try {
            const response = await User.destroy({where: {id}});;
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        const {id, name, email} = req.body; 
        try {
            const response = await User.update({name, email},{where: {id}});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
}
module.exports = usersController;
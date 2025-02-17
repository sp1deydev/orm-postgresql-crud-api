const { Op } = require("sequelize");
const Comment = require('../models/commentSchema');
const User = require("../models/userSchema");

const commentsController = {
    getAllComments: async (req, res) => {
        const {offset, limit, search, orderBy, order, userId} = req.query;
        let filter = {};
        if(search) {
            filter.where = {
                content: {
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
        if(userId) {
            filter.where = {...filter.where, userId: userId}
        }
        filter.include = {model: User, as: 'userInfo', attributes: ['name']};
        try {
            const response = await Comment.findAll(filter);
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    getAllCommentsCount: async (req, res) => {
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
            const response = await Comment.count(filter);
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }, 
    getCommentById: async (req, res) => {
        const id = req.params.id;
        let include = {model: User, as: 'userInfo', attributes: ['name', 'email']}
        try {
            const response = await Comment.findByPk(id, {include});
            // const response = await User.findOne({id});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    createComment: async (req, res) => {
        const {userId, content} = req.body;
        try {
            const response = await User.create({userId, content});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    deleteComment: async (req, res) => {
        const {id} = req.body
        try {
            const response = await Comment.destroy({where: {id}});;
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    updateComment: async (req, res) => {
        const {id, userId, content} = req.body; 
        try {
            const response = await Comment.update({userId, content},{where: {id}});
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
}
module.exports = commentsController;
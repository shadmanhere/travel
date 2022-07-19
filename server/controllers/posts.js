import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try{
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body);

    try{
        await newPost.save()
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({message: err.message});
    }
}

export const updatePost = async (req, res) => {
    // id renamed to _id
    const { id: _id } = req.params

    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id was found');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true})
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id was found');

    await PostMessage.findByIdAndRemove(id)
    res.json({message: 'post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id was found');

    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {
        likeCount: post.likeCount + 1
    }, {new: true})

    res.json(updatedPost);
}
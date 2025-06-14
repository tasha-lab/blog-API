import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json())
app.get(`/`,async (_req,res) => {
    res.send("<h1>Welcome to Tasha's blog API</h1>")
})
const port = process.env.PORT || 6500;

app.post(`/users`, async (req,res) => {
    try {
        const users = req.body
        const user = await client.users.createManyAndReturn({
            data:users,
        })
        return res.status(201).json({
            message:`successful`,
            data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
});

app.get(`/users`,async (_req,res) => {
    try {
        const users = await client.users.findMany()
        return res.status(201).json({
            message:`getting all users was successful`,
            data:users
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.get(`/users/:id`, async (req,res) => {
    try {
        const {id} = req.params
        const user = await client.users.findUnique({
            where :{id}
        })
        if(user){
            return res.status(201).json({
                message:`user retrieved successfully`,
                data:user
            })
        }else{
            return res.status(500).json({
                message:`user not found`,
                data:user
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

//posts
app.post(`/posts`, async (req,res) => {
    try {
        const posts = req.body
        const post = await client.posts.createManyAndReturn({
            data:posts
        })
        return res.status(201).json({
            message:`post created successfully`,
            data:post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.get(`/posts`, async (req,res) => {
    try {
        const posts = await client.posts.findMany({
            include: {
                user:{
                    select:{
                        f_name:true,
                        l_name:true,
                        email:true,
                        username:true
                    }
                }
            }
        })
        return res.status(201).json({
            message:`posts gotten successfully`,
            data:posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.get(`/posts/:id`,async (req,res) => {
    try {
        const {id} = req.params
        const posts = await client.posts.findUnique({
            where:{id},
            include:{
                user:{
                    select:{
                        f_name:true,
                        l_name:true,
                        email:true,
                        username:true
                    }
                }
            }
        })
        if (posts){
            return res.status(201).json({
                message:`post gotten successfully`,
                data:posts
            })
        }else{
            return res.status(404).json({
                message:`post not found`,
                data:posts
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.put(`/posts/:id`,async (req,res) => {
    try {
        const {title,isDeleted,} = req.body
        const {id}= req.params
        const posts = await client.posts.update({
            where:{id},
            data:{
                title,
                isDeleted,
            }
        })
        return res.status(201).json({
            message:`post updated successfully`,
            data:posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.delete(`/posts/:id`, async (req,res) => {
    try {
        const {id} =req.params
        const posts = await client.posts.update({
            where:{id},
            data:{
                isDeleted:true
            }
        }) 
        return res.status(200).json({
            message:`deleted successfully`,
            data:posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})

app.delete(`/posts/:id`,async (req,res) => {
    try {
        const {id} = req.params
        const posts = await client.posts.delete({
            where:{id}
        })
        return res.status(200).json({
            message:`post deleted successfully`,
            data:posts
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`something went wrong`
        })
    }
})


app.listen(port, ()=>{
    console.log(`This app is running on port ${port}`)
}
)
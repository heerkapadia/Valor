import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




function Blogs() {

    const [blogs, setBlogs] = useState([{}]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [userid, setUserid] = useState(localStorage.getItem('userid'));
    console.log("inside", userid);


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getBlogs = async () => {
        const res = await axios.get("http://localhost:5000/api/blogs/");

        setBlogs(res.data);
        // console.log(blogs)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const res = await axios.post(`http://localhost:5000/api/blogs/createblog/${userid}`,
                JSON.stringify({ title, content }),
                {
                    headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
                    withCredential: true
                });
            // handleClose();

        } catch (err) {
            if (!err?.res) {
                console.log('NO RESPONSE');

            } else if (err.res?.status === 409) {
                console.log("Product exists")
            } else console.log("product addition failed");

        }
    }
    useEffect(() => {

        getBlogs();

    }, [])
    return (
        <>
            {
                blogs.map((blog, index) => (
                    <li key={index}>
                        <div className="card" style={{ width: 18 + 'rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Category:{blog.creator}</h6>
                                <p className="card-text">{blog.content} </p>
                                {/*             
             <button className="btn btn-danger" onClick={(e)=>deleteProduct(e,blog._id)}>Delete</button> */}
                            </div>
                        </div>
                    </li>
                ))

            }
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD BLOG
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD YOUR BLOG</DialogTitle>
                <form>
                    <div className="form-group">

                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="form-group">

                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Blog Content</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </>

    )
}

export default Blogs
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function FileUploadForm() {



    const [title, setTitle] = useState('');
    const [sublines, setSublines] = useState('');
    const [image, setImage] = useState(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('sublines', sublines);
    formData.append('image', image);

    // to add a new banner image
    function HandleAddPhoto(e) {
        e.preventDefault();
        axios.post('http://localhost:1200/uploadimg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(()=>{
            window.location.reload()
        })
        .catch(err => console.error(err));
    }

    // to get banner image
    const [imgdata, setImgdata] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:1200/getfiles')
            .then((res) => {
                setImgdata(res.data)
            })
            .catch(err => console.error("error :" + err));
    }, [])

    // Set update data using id
    const [updateId,setupdateId] = useState('');
    function setUpdate(id) {
        setupdateId(id)
        console.log(updateId);
        axios.get('http://localhost:1200/getfiles/' + id)

            .then(res => {
                setTitle(res.data.title)
                setSublines(res.data.sublines)
            })
            .catch(err => console.error("error :" + err));

    }

    // to update Banner
    function HandleUpdate(e) {
        e.preventDefault();

        axios.put(`http://localhost:1200/${updateId}`,formData)

            .then(() => {
                console.log('Updated');
                window.location.reload()
            })
            .catch(err => console.error("error :" + err));
    }



    //  to delete an Banner
    function HandleDelete(id) {
        axios.delete('http://localhost:1200/delete/' + id)

            .then(()=>{
                window.location.reload();
            })
            .catch(err => console.error(err));
    }
    return (
        <div className='container w-50'>
            <Link className='btn btn-danger' to={'/home'}>Home</Link>

            <form>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="" className="form-lable">Title</label>
                        <input type="text" name="" onChange={(e) => setTitle(e.target.value)} id="" className="form-control" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="" className="form-lable">Image</label>
                        <input type="file" accept='image/*' name="" onChange={(e) => setImage(e.target.files[0])} id="" className="form-control" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="" className="form-lable">Image</label>
                        <textarea type="text" name="" onChange={(e) => setSublines(e.target.value)} id="" className="form-control h-100" />
                    </div>
                </div>
                <button onClick={HandleAddPhoto} className='btn btn-dark mt-5 w-25 col-12'>Add Image</button>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Picture</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        imgdata.map((items, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={`http://localhost:1200/${items.BannerImage}`} width={200} height={100} alt="" />
                                    </td>
                                    <td>
                                        {/* update button */}
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setUpdate(items._id)
                                            }}>
                                            Update
                                        </button>

                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        {/* Update Form */}
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="" className="form-lable">Title</label>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    value={title}
                                                                    onChange={(e) => setTitle(e.target.value)} id="" className="form-control" />
                                                            </div>
                                                            <div className="col-6">
                                                                <label htmlFor="" className="form-lable">Image</label>
                                                                <input
                                                                    type="file"
                                                                    accept='image/*'
                                                                    name=""
                                                                    onChange={(e) => setImage(e.target.files[0])} id="" className="form-control" />
                                                            </div>
                                                            <div className="col-12">
                                                                <label htmlFor="" className="form-lable">Image</label>
                                                                <textarea
                                                                    type="text"
                                                                    name=""
                                                                    value={sublines}
                                                                    onChange={(e) => setSublines(e.target.value)}
                                                                    id=""
                                                                    className="form-control h-100" />
                                                            </div>
                                                        </div>
                                                        {/* Update form end */}
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={HandleUpdate}>Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* update button end */}
                                        <button className="btn btn-danger"
                                            onClick={() => {
                                                HandleDelete(items._id)
                                            }}
                                        >delete</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

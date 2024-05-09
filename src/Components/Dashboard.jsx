import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
export default function Dashboard() {

    const [img, setImg] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:1200/getfiles')
            .then((res) => {
                setImg(res.data)
            })
            .catch(err => console.error("error :" + err));
    }, [])
    console.log(img);

    return (

        
        <div>
            <Link className='btn btn-dark' to={'/update'}>Update</Link>
            <h1>Dashboard</h1>
            <Carousel>
                {
                    img.map((items) => {
                        return (
                            <Carousel.Item interval={1500}>

                                <img src={`http://localhost:1200/upload/${items.BannerImage}`} style={{ width: '100%', height: '700px' }} alt="" />

                                <Carousel.Caption>
                                    <h3>{items.title}</h3>
                                    <p>{items.sublines}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>


        </div>
    )
}

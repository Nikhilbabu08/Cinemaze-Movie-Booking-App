import React from 'react'


const Carousel = () => {
    return (
        <div className="container-fluid mt-4">
            <div className="row justiy-content-center carousel-wrapper">
                <div className="col carousel-col">
                    <h5 className=' text-dark px-2'><b>Coming Soon🎥</b></h5>
                    <div id="carouselExampleAutoplaying" className="carousel slide mt-2" data-bs-ride="carousel"  >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://static.moviecrow.com/gallery/20240815/232882-The%20Greatest%20of%20All%20Time%20Vijay%20Trailer%20Release%20Date%20Time%20Tamil.jpg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://timesofindia.indiatimes.com/photo/msid-102067247,imgsize-143524.cms" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item" >
                                <img src="https://www.kerala9.com/wp-content/uploads/2022/01/barroz-movie-hd-poster-002.jpg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4V-oT2drLU1gMd3e3kSbUqIt4wQgNWThLy6n6WT9CSPrEeJ22hLt6nepGj0HHraBaxj3MSTprs6KmggJ-J-gokD9ao0h1nIE7A2qzw3tTnSCdeIHKIPRGTk06Rnd0jrGlU7ZwbjSS4OXT-h68WqXi-DDEVF4lN3ULdkNtitupIbPgMid5WYqMFnfZgrg/s1280/Lucky%20Baskhar%20First%20Look.jpg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://www.indiatourism.guide/wp-content/uploads/2023/04/pushpa-2-release-date-1024x576.jpeg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel

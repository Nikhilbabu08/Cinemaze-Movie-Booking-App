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
                                <img src="https://i.ytimg.com/vi/Wwr-UL5e02U/maxresdefault.jpg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://timesofindia.indiatimes.com/photo/msid-102067247,imgsize-143524.cms" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item" >
                                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4V-oT2drLU1gMd3e3kSbUqIt4wQgNWThLy6n6WT9CSPrEeJ22hLt6nepGj0HHraBaxj3MSTprs6KmggJ-J-gokD9ao0h1nIE7A2qzw3tTnSCdeIHKIPRGTk06Rnd0jrGlU7ZwbjSS4OXT-h68WqXi-DDEVF4lN3ULdkNtitupIbPgMid5WYqMFnfZgrg/s1280/Lucky%20Baskhar%20First%20Look.jpg" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://images.ottplay.com/images/mammootty-in-turbo-first-look-poster-1701006051.jpg?impolicy=ottplay-20210210&width=1200&height=675" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://english.mathrubhumi.com/image/contentid/policy:1.8238174:1674289460/New%20Project%20(15).png?$p=2bd0e28&f=16x10&w=852&q=0.8" className=" w-100 " alt="..." style={{ maxHeight: '300px' }} />
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

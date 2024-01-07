"use client"
import React from "react";
// import {useLocation} from "react-router-dom";
import 'photoswipe/dist/photoswipe.css'
// import {Gallery, Item} from 'react-photoswipe-gallery'
// import rotate from '@/components/rotate'

function Details({ params }: { params: { id: string } }) {


    // const location = useLocation();
    // const project = location.state;
    // const images = [];
    // for (let i = 1; i <= project.cant_img; i++) {
    //     images[i] = `${project.images}${project.images.split("/")[2]}${i}.png`;
    // }
    // let imageSizeWidth: number, imageSizeHeight: number;
    // let published = project.publish_url !== "";
    // imageSizeWidth = project.type === "Aplicación móvil" ? 300 : 1024;
    // imageSizeHeight = project.type === "Aplicación móvil" ? 600 : 600;


    return (
        <div id="details">
            {/*<div className="container">*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-md-1 wow fadeInUp" data-wow-delay="0.6s">*/}
            {/*            <div className="small">*/}
            {/*                <div className="media-object media-left media-body">*/}
            {/*                    <a href={"/"} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*                        <i className="fa fa-home fa-2x" title="Ir a casa"/>*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="col-md-10">*/}
            {/*            <h1 className="wow bounce">{project.name}</h1>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <div className="col-lg-6 col-md-6">*/}
            {/*        <br/>*/}
            {/*        <Gallery withDownloadButton uiElements={rotate}>*/}
            {/*            <div>*/}
            {/*                <Item original={project.banner_src}*/}
            {/*                      thumbnail={project.banner_src}*/}
            {/*                      width="1000"*/}
            {/*                      height="600">*/}
            {/*                    {({ref, open}) => (*/}
            {/*                        <img className="image-item"*/}
            {/*                             ref={ref} onClick={open} src={project.banner_src} alt=""/>*/}
            {/*                    )}*/}
            {/*                </Item>*/}
            {/*                {images.map(image =>*/}
            {/*                    <Item key={image}*/}
            {/*                          original={image}*/}
            {/*                          thumbnail={image}*/}
            {/*                          width={imageSizeWidth} height={imageSizeHeight}>*/}
            {/*                        {({ref, open}) => (*/}
            {/*                            <img className="image-item"*/}
            {/*                                 ref={ref} onClick={open} src="" alt=""/>*/}
            {/*                        )}*/}
            {/*                    </Item>)}*/}
            {/*            </div>*/}
            {/*        </Gallery>*/}
            {/*    </div>*/}
            {/*    <br/>*/}


            {/*    <div className="col-lg-6 col-md-6 form-check-input justify-content-start">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <h4>Logo:</h4>*/}
            {/*            </div>*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <div className="wow fadeInUp" data-wow-delay="0.6s">*/}
            {/*                    <div className="small">*/}
            {/*                        <div className="media-object media-left media-body">*/}
            {/*                            <img className="image-logo" width="50px" height="50px" src={project.logo}*/}
            {/*                                 alt=""/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="row">*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <h4>Tipo:</h4>*/}
            {/*            </div>*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <div className="wow fadeInUp" data-wow-delay="0.6s">*/}
            {/*                    <div className="small">*/}
            {/*                        <div className="media-object media-left media-body">*/}
            {/*                            {project.type === "Aplicación móvil" ?*/}
            {/*                                <i className="fa fa-mobile fa-2x" title={project.type}/> :*/}
            {/*                                <i className="fa fa-desktop fa-2x" title={project.type}/>*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        <div className="row">*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <h4>Estado:</h4>*/}
            {/*            </div>*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <div className="wow fadeInUp" data-wow-delay="0.6s">*/}
            {/*                    <div className="small">*/}
            {/*                        <div className="media-object media-left media-body">*/}
            {/*                            {project.status === "Terminado" ?*/}
            {/*                                <i className="fa fa-check fa-2x" title={project.status}/> :*/}
            {/*                                <i className="fa fa-clock-o fa-2x" title={project.status}/>*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        <div className="row">*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <h4>Tecnologías:</h4>*/}
            {/*            </div>*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <label>{project.stack_tec}</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        <div className="row">*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <h4>Github:</h4>*/}
            {/*            </div>*/}
            {/*            <div className="col-xs-6">*/}
            {/*                <div className="wow fadeInUp" data-wow-delay="0.6s">*/}
            {/*                    <div className="small">*/}
            {/*                        <div className="media-object media-left media-body">*/}
            {/*                            <a rel="noreferrer" href={project.github_url} target="_blank">*/}
            {/*                                <i className="fa fa-github fa-2x" title={project.github_url}*/}
            {/*                                   style={{cursor: "pointer"}}/>*/}
            {/*                            </a>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        {published === true ?*/}
            {/*            <div>*/}
            {/*                <div className="row mb-4">*/}
            {/*                    <div className="col-xs-6">*/}
            {/*                        <h4>Publicada:</h4>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-xs-6">*/}
            {/*                        <a rel="noreferrer" href={project.publish_url} target="_blank">Ver en Google Play*/}
            {/*                            Store</a>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            : ""}*/}


            {/*        <h4>Descripción:</h4>*/}
            {/*        <div className="row">*/}
            {/*            <div className="form-check-inline">*/}
            {/*                <p id="description">{project.description}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default Details;

import React from "react";


function Work(props: any) {

    return <div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
        <div className="media">
            <div className="media-object media-left">
                <i className={props.image}/>
            </div>
            <div className="media-body">
                <h3 className="media-heading">{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    </div>
}


export default function Summarize() {
    return (

        <div id="work" className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 wow bounce">
                        <h2>QUE PUEDO HACER</h2>
                    </div>
                </div>

                <div className="row">
                    <Work title = {"Software Escritorio"}
                        description={"Desarrollo de software de escritorio multiplataforma con Java Swing y Javafx"}
                        image={"fa fa-desktop"}/>
                    <Work title = {"Desarrollo Móvil"}
                        description={"Desarrollo de aplicaciones nativas para el sistema operativo Android con Java y Kotlin"}
                        image={"fa fa-tablet"}/>
                    <Work title = {"Desarrollo Web"}
                        description={"Desarrollo de aplicaciones web con Spring Boot, React JS, y otras tecnologías web"}
                        image={"fa fa-cloud"}/>
                    <Work title = {"Creación de Juegos"}
                        description={"Disfruto aprender y trabajar como hobby en el desarrollo independiente de juegos con Unity"}
                        image={"fa fa-gamepad"}/>
                </div>
            </div>
        </div>

    );
}
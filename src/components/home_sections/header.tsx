import React from "react";
import Image from "next/image";
import Link from "next/link";

const cvUrl = "https://drive.google.com/file/d/1dpX8DJVef6nP8XYJX-5TRdjuDnn3c31Y/view?usp=sharing";


export default function Header() {
    return (
        <div id="home" className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8 wow fadeIn" data-wow-delay="0.9s">
                        <h3>José Ernesto Cortes</h3>
                        <br/>
                        <Image className="p-4" src="/logo.png" width={100} height={100} alt="portfolio img"/>
                        <br/>
                        <h1>CorteStudios</h1>
                        <h3 className="rotate">DESARROLLO MÓVIL, DESARROLLO DE SOFTWARE, DESARROLLO WEB</h3>
                        <p>Ingeniero de software con experiencia en el desarrollo móvil y de escritorio, con ganas de
                            aprender cada día y superarme mediante nuevos desafíos</p>
                        <Link href={cvUrl} target="_blank" rel="noopener noreferrer"
                           className="btn btn-default smoothScroll wow fadeInUp" data-wow-delay="1s">
                            Descargar CV</Link>
                    </div>
                    <div className="col-md-2"/>
                </div>
            </div>
        </div>
    );
}

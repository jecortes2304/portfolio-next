import React from "react";
import Image from "next/image";


function Footer() {

    const currentYear = new Date(Date.now()).getFullYear();
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 wow fadeIn" data-wow-delay="0.9s">
                        <p id="footer">Todos los derechos reservados
                            <Image width={20} height={20} src={"/logo.png"} alt="portfolio img"/>
                             CorteStudios &copy; {currentYear}
                        </p>
                        <ul className="social-icon">
                            <li>
                                <a href="https://linkedin.com/in/josé-ernesto-cortes-mendez-7bb8671b6"
                                   target="_blank" rel="noreferrer">
                                    <i className="fa fa-linkedin" aria-hidden="true"></i></a>
                            </li>
                            <li>
                                <a href="https://twitter.com/Joshecm94"
                                   target="_blank" rel="noreferrer">
                                    <i className="fa fa-twitter" aria-hidden="true"></i></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/josh.e.cortes.m94"
                                   target="_blank" rel="noreferrer">
                                    <i className="fa fa-instagram" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
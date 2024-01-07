import FormContact from "@/components/formContact";

export default function Contact() {

    return (

        <div id="contact" className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-lg-offset-1 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <address>
                            <p className="contact-title">CONTACTAR</p>
                            <p><i className="fa fa-phone"/> +34 643 52 1716</p>
                            <p><i className="fa fa-envelope-o"/> jecortes2304@gmail.com</p>
                            <p><i className="fa fa-map-marker"/> Calle Villabona #5, Madrid</p>
                        </address>
                    </div>
                    <FormContact/>
                    <div className="col-md-1 col-sm-1"/>
                </div>
            </div>
        </div>

    );
}
import React from "react";
import projectsJson from "@/projects.json"
import Link from "next/link";
import Image from "next/image";

interface Project {
    id: number
    name: string
    type: string
    bannerSrc: string
    logo: string
    imagesUrl: string
    imagesAmount: number
    githubUrl: string
    publishUrl: string
    status: string
    stackTech: string
    description: string
}

function getProjectsList() {
    let projectList: Array<Project> = new Array<Project>()
    projectsJson.map(project => {
        let newProject: Project = project
        projectList.push(newProject)
    })
    return projectList
}


function ProjectComponent({projectProp,}: { projectProp: Project }) {

    return (

        <div className="col-md-3 col-xs-6 wow fadeIn" data-wow-delay="0.6s">
            <div className="portfolio-thumb">
                <Image
                    src={"/"+projectProp.bannerSrc}
                    className={"img-responsive"}
                    alt={"portfolio img"}
                    width={400}
                    height={400}
                />
                <div className="portfolio-overlay">
                    <Link href={`/details/${projectProp.id}`}>
                        <h4 className="">{projectProp.name}</h4>
                    </Link>
                    <h5>{projectProp.type}</h5>
                </div>
            </div>
        </div>
    );
}

export default function Portfolio() {

    return (
        <div id="portfolio" className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="wow bounce">PORTAFOLIO</h2>
                    </div>
                    {
                        getProjectsList().map((value, index) => {
                            return <ProjectComponent key={index} projectProp={value}/>
                        })
                    }
                </div>
            </div>
        </div>

    );
}
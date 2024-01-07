import React from "react";
import skillsJson from "../../skils.json"


interface Skill {
    name: string
    percent: number
}

function getSkillsList() {
    let skillList: Array<Skill> = new Array<Skill>()
    skillsJson.map(skill => {
        let newSkill: Skill = skill
        skillList.push(newSkill)
    })
    return skillList
}

function SkillComponent(skill: Skill) {
    return (
        <div className="col-md-3 wow fadeInRight" data-wow-delay="0.9s">
            <span className="text-top">{skill.name}
                <small>{skill.percent}%</small>
            </span>
            <div className="progress">
                <div className={"progress-bar progress-bar-danger"}
                     role={"progressbar"} style={{width: skill.percent + "%"}}></div>
            </div>
        </div>
    );
}

export default function About() {
    return (
        <div>
            <div id="about" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 wow fadeInLeft" data-wow-delay="0.9s">
                            <h2>ACERCA DE MÍ</h2>
                            <h4>DISEÑO & DESARROLLO</h4>
                            <p>Soy Ingeniero de Software desde hace 4 años, disfruto estudiar en solitario y aprender
                                nuevas formas de hacer las cosas, nuevos retos que siempre me permitan poner en práctica
                                cualquier conocimiento que haya
                                adquirido o esté aprendiendo. He desarrollado software mayormente con Java en varios
                                entornos, aunque he usado otros lenguajes y frameworks como C# y .Net, Javascript y
                                React, Kotlin
                                para Android, entre otros. No me dedico profesionalmente a desarrollar juegos, pero
                                disfruto mucho aprendiendo como hobby C# y Unity. Pienso que las tecnologías son
                                realmente negociables,
                                que debemos usarla a conveniencia para solucionar nuestras tareas de la manera mas
                                eficiente, no es necesario aprenderlas todas, tampoco solo una que funcione como una
                                navaja suiza,
                                debemos aprender la que se requiere para el proyecto dependiendo de sus requisitos
                                funcionales.
                            </p>
                        </div>
                        {
                            getSkillsList().map((value, index) => {
                                return <SkillComponent key={index} name={value.name} percent={value.percent}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}